import { UserService } from "../services/User.service";
import { Response, Request } from "express";
import { UserSchema } from "../utils/validation";

const usersService = new UserService();

export async function getAllUsers(req: Request, res: Response) {
  try {
    const users = await usersService.getAllUsers();
    res.json(users);
  } catch (er) {
    console.log(er);
    return;
  }
}

export async function createAdmin(req: Request, res: Response) {
  try {
    const { error } = UserSchema.validate(req.body);

    if (error) {
      res
        .status(400)
        .json(
          error.details.map((error) =>
            error.message.replace(/\n/g, " ").replace(/"/g, "")
          )
        );
      return;
    }

    const admin = await usersService.createAdmin(
      req.body.email,
      req.body.password
    );

    if (!admin) {
      res.json("User with this email already Exists");
      return;
    }

    res.json("admin created successfully");
  } catch (er) {
    console.log(er);
    return;
  }
}

export async function createUser(req: Request, res: Response) {
  const { error } = UserSchema.validate(req.body);

  if (error) {
    res
      .status(400)
      .json(
        error.details.map((error) =>
          error.message.replace(/\n/g, " ").replace(/"/g, "")
        )
      );
    return;
  }

  const user = await usersService.createUser(req.body.email, req.body.password);

  if (!user) {
    res.json("User with this email already Exists");
    return;
  }

  res.json("user created successfully");
  try {
  } catch (er) {
    console.log(er);
    return;
  }
}

export async function logInUser(req: Request, res: Response) {
  try {
    const { error } = UserSchema.validate(req.body);

    if (error) {
      res
        .status(400)
        .json(
          error.details.map((error) =>
            error.message.replace(/\n/g, " ").replace(/"/g, "")
          )
        );
      return;
    }

    const token = await usersService.logInUser(
      req.body.email,
      req.body.password
    );
    if (!token) {
      res.json({ message: "invalid creditentials" });
      return;
    }
    res.json({ token });
  } catch (er) {
    console.log(er);
    return;
  }
}
