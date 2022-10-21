import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from "@nestjs/typeorm";
// postgres://cafclowq:CH2rNYUvTJnUnrVVjbXxqTifUd2G1xcf@tyke.db.elephantsql.com/cafclowq
export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
	imports: [ConfigModule],
	inject: [ConfigService],
	useFactory: async (): Promise<TypeOrmModuleOptions> => {
		return {
			type: 'postgres',
			// username: 'postgres',
			// password: 'postgres',
			url: process.env.DATABASE_URL,
			// port:5432,
			// host:'localhost',
			database: 'bluePages',
			synchronize: false,
			entities: [__dirname + '/../**/*.entity.{js,ts}'],
			migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
			cli: {
				migrationsDir: __dirname + '/../database/migrations',
			},
			extra: {
				charset: 'utf8mb4_unicode_ci',
			},
		}
	}
}
export const typeOrmConfig: TypeOrmModuleOptions = {
	type: 'postgres',
	// username: 'postgres',
	// password: 'postgres',
	url: process.env.DATABASE_URL,
	// port:5432,
	// host:'localhost',
	database: 'bluePages',
	synchronize: false,
	entities: [__dirname + '/../**/*.entity.{js,ts}'],
	migrations: [__dirname + '/../database/migrations/*{.ts,.js}'],
	cli: {
		migrationsDir: __dirname + '/../database/migrations',
	},
	extra: {
		charset: 'utf8mb4_unicode_ci',
	},
}
// export default class TypeOrmConfig {
// 	static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
// 		return {
// 			type: 'postgres',
// 			url: configService.get('DATABASE_URL'),
// 			autoLoadEntities: true,
// 			synchronize: true,
// 		}
// 	}
// }

// export const typeOrmConfigAsync: TypeOrmModuleAsyncOptions = {
// 	imports:[ConfigModule],
// 	useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => TypeOrmConfig.getOrmConfig(configService),
// 	inject:[ConfigService]
// }