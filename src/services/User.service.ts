import { AppDataSource } from "../db/database-connect";
import { User } from "../db/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserService {
  private UsersRepository = AppDataSource.getRepository(User);

  async getAllUsers() {
    // return await this.UsersRepository.clear();
    return await this.UsersRepository.find();
  }

  async createAdmin(email: string, password: string) {
    const existingUser = await this.UsersRepository.findOneBy({ email });
    if (existingUser) return null;

    const hashedPassword = await bcrypt.hash(password, 10);
    const adminUser = this.UsersRepository.create({
      email,
      password: hashedPassword,
      role: "ADMIN",
    });
    return await this.UsersRepository.save(adminUser);
  }

  async createUser(email: string, password: string) {
    const existingUser = await this.UsersRepository.findOneBy({ email });
    if (existingUser) return null;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.UsersRepository.create({
      email,
      password: hashedPassword,
      role: "USER",
    });

    return await this.UsersRepository.save(user);
  }

  async logInUser(email: string, password: string) {
    const user = await this.UsersRepository.findOneBy({ email });
    if (!user) return null;

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return null;

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    return token;
  }
}
