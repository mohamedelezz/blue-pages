import { User } from "../auth/models/user.entity";
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne } from "typeorm";
import { City } from "../cities/city.entity";

export enum Status {
  pending = 'pending',
  accepted = 'accepted',
  rejected = 'rejected'
}

export enum Type {
  paper = 'paper',
  pdf = 'pdf',
  both = 'both'
}

@Entity('request-directory')
export class RequestDirectory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'enum', enum: Status, default: Status.pending })
  status: Status;

  @Column({ type: 'enum', enum: Type })
  type: Status;

  @Column()
  company_name: string;

  @Column()
  email: string;
 

  @Column()
  phone: string;

  @Column()
  pdf: string;

  @ManyToOne(() => City, city => city.request_directory, { eager: true, cascade: true, orphanedRowAction: 'delete' })
  city: City | number;
  @Column()
  cityId: number;

  @ManyToOne(() => User, req => req.request_directory, { eager: true, cascade: true, orphanedRowAction: 'delete' })
  user: User | number;
  @Column()
  userId: number;

}
