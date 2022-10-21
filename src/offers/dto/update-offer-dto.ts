import { SaleTypes } from './../sale-type.enum';
import { IsArray, IsBoolean, IsEnum,  IsOptional } from "class-validator";


export class UpdateOfferDto {
		@IsOptional()
		companyId: number;
		@IsOptional()
		countryId: number;
		@IsOptional()
		cityId: number;
		@IsOptional()
		userId: number;
    @IsOptional()
    name_en: string;
    @IsOptional()
    name_ar: string;
    @IsOptional()
    @IsArray()
    categories: number[];
    @IsOptional()
    address_ar: string;
    @IsOptional()
    address_en: string;
    @IsOptional()
    description_en: string;
    @IsOptional()
    description_ar: string;
    @IsBoolean()
		@IsOptional()
		on_sale:boolean
		@IsOptional()
		sale_amount:number
		@IsOptional()
		@IsEnum(SaleTypes)
		sale_type: SaleTypes
		@IsOptional()
    @IsBoolean()
		paid: boolean
		@IsOptional()
		endAt: Date

}