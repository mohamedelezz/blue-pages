import { User } from '../auth/models/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Company } from '../companies/company.entity';
import { City } from '../cities/city.entity';

@Entity('directory')
export class Directory {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    pdf: string

    @Column()
    pdf_key: string

    @Column({ nullable: true })
    year: string


    @ManyToOne(() => City, city => city.directory, { onDelete: 'CASCADE', eager: false })
    city: City | number;
    @Column({ unique: true })
    cityId: number

}