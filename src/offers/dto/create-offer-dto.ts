import { imageMimeTypes } from './../../helpers/types';
import { SaleTypes } from './../sale-type.enum';
import { IsArray, IsBoolean, IsEnum, IsNotEmpty, IsOptional } from "class-validator";
import { HasMimeType, IsFile, MemoryStoredFile } from 'nestjs-form-data';


export class CreateOfferDto {
		@IsNotEmpty()
		companyId: number;
		@IsNotEmpty()
		countryId: number;
		@IsNotEmpty()
		cityId: number;
		@IsNotEmpty()
		userId: number;
    @IsNotEmpty()
    name_en: string;
    @IsNotEmpty()
    name_ar: string;
    @IsOptional()
    @IsArray()
    categories: number[];
		@IsOptional()
    @IsArray()
    videos: string[];
    @IsOptional()
    address_ar: string;
    @IsOptional()
    address_en: string;
    @IsOptional()
    description_en: string;
    @IsOptional()
    description_ar: string;
		@IsNotEmpty()
		on_sale:string
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
		@IsOptional()
		@IsArray()
		// @MaxFileSize(5e6)
		@HasMimeType(imageMimeTypes,{each:true})
		@IsFile({each:true})
		images: MemoryStoredFile[];
		
}