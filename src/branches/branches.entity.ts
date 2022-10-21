import { User } from '../auth/models/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Company } from '../companies/company.entity';

@Entity('branch')
export class Branch {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name_en: string

    @Column()
    name_ar: string

    @Column()
    address_ar: string

    @Column()
    address_en: string

    @Column()
    phone: string

    @Column()
    description_ar: string

    @Column()
    description_en: string

    @Column({ nullable: true })
    link: string

    @ManyToOne(() => User, user => user.branch, { onDelete: 'CASCADE', eager: false })
    @Column()
    userId: number;

    @ManyToOne(() => Company, company => company.branches, { onDelete: 'CASCADE', eager: false })
    @Column()
    companyId: number;

}