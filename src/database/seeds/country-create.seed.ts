import { City } from './../../cities/city.entity';
import { Country } from './../../countries/country.entity';
import { Category } from './../../categories/category.entity';
import { Connection, getConnection, getManager,getRepository } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';


export class CountryCreateSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
		const countries = await getRepository(Country).find();
		const cities = await getRepository(City).find();
		if(countries.length && cities.length) return;
		// if(!cities.length) {
		// 	const repository = await getConnection().getRepository('country');
		// 	await repository.query(`TRUNCATE countries RESTART IDENTITY CASCADE;`);
		// 	return ;
		// };
		
    await factory(Country)().createMany(5);
		const firstCountry = await getRepository(Country).findOne();
		await factory(City)().create({
			name_ar: 'city1',
			name_en: 'city1',
			countryId: firstCountry.id,
			image: 'https://images.pexels.com/photos/2129796/pexels-photo-2129796.png?auto=compress&cs=tinysrgb&w=600',
		});
  }
}
