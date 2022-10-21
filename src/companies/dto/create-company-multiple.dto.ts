import { Type } from "class-transformer";
import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { BranchesDto } from "../../branches/dto/branches.dto";
 
export class CompanyInsertInterface {
	@IsString()
	@IsNotEmpty()
	name_en: string;
	@IsString()
	@IsNotEmpty()
	name_ar: string;
	@IsEmail()
	@IsNotEmpty()
	email: string;
	@IsString()
	@IsNotEmpty()
	standard_phone: string;
	@IsString()
	@IsNotEmpty()
	website: string;
	@IsArray()
	@IsOptional()
	categories: number[];
}

export class CreateCompanyMultipleDto {
	@IsArray()
	@ValidateNested({ each: true })
	@Type(() => CompanyInsertInterface)
	data: CompanyInsertInterface[];
	@IsNotEmpty()
	countryId: number;
	@IsNotEmpty()
	cityId: number;
}