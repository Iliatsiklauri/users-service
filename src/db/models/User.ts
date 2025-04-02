import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;
}
