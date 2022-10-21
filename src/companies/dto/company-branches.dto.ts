import { ValidationPipe } from "@nestjs/common";
import { IsNotEmpty, IsOptional } from "class-validator";

export class CompanyBranchesDto {

	@IsNotEmpty()
	name_en: string;

	@IsNotEmpty()
	name_ar: string;
	@IsNotEmpty()
	address_ar: string;

	@IsNotEmpty()
	address_en: string;

	@IsOptional()
	phone: string;

	@IsNotEmpty()
	description_ar: string;

	@IsNotEmpty()
	description_en: string;

	@IsOptional()
	link: string;


	
}