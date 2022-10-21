import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('setting')
export class Setting {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, default: 'done' })
    setting: string

    @Column()
    title_en: string;

    @Column()
    title_ar: string;

    @Column()
    description_en: string;

    @Column()
    description_ar: string;

    @Column()
    keywords: string;

    @Column()
    facebook: string;

    @Column()
    twitter: string;

    @Column()
    instagram: string;

    @Column()
    linkedin: string;

    @Column()
    snapchat: string;

    @Column()
    youtube: string;

    @Column()
    logo: string;

    @Column({nullable:true})
    logo_key: string;

    @Column()
    phone: string;

    @Column()
    email: string;

    @Column()
    whatsapp: string;

    @Column()
    address_en: string;

    @Column()
    address_ar: string;

    @Column()
    copyright_en: string;

    @Column()
    copyright_ar: string;

    @Column()
    location: string;

    @Column({ default: 0 })
    total_views: number

    @Column({ default: 0 })
    company_views: number

    @Column({ default: 0 })
    offer_views: number

}