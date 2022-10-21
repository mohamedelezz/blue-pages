import { Setting } from './../../settings/setting.entity';

import { Connection, getConnection, getManager,getRepository } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';


export class SettingsCreateSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
		const settings = await getRepository(Setting).find({id:1});
		if(settings.length) return;
		try{
			await factory(Setting)().create({
				title_en: 'Blue Pages',
				title_ar: 'الصفحات الزرقاء',
				description_en: 'Biggest Directory For Companies',
				description_ar: 'أكبر مكان لزياده أعمالك',
				keywords: 'directory, business',
				facebook: 'http://facebook.com',
				twitter: 'http://twitter.com',
				instagram: 'http://instagram.com',
				linkedin: 'http://linkedin.com',
				snapchat: 'http://snapchat.com',
				youtube: 'http://youtube.com',
				phone: '9600000000',
				email: 'bluepages@gmail.com',
				whatsapp: '9600000000',
				address_en: 'Mekka',
				address_ar: 'مكه',
				copyright_en: '© directory 2022, All Rights Reserved',
				copyright_ar: '©directory 2022, جميع الحقوق محفوظة	',
				location: 'Mekka',
				logo: 'https://images.pexels.com/photos/2129796/pexels-photo-2129796.png?auto=compress&cs=tinysrgb&w=600',
			});
		}catch(err){
			console.log({err})
		}
  }
}
