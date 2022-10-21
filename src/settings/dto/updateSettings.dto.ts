import { imageMimeTypes } from './../../helpers/types';
import { IsOptional } from "class-validator";
import { HasMimeType, IsFile, MaxFileSize, MemoryStoredFile } from "nestjs-form-data";

export class UpdateSettingDto {
    @IsOptional()
    title_en: string;

    @IsOptional()
    title_ar: string;

    @IsOptional()
    description_en: string;

    @IsOptional()
    description_ar: string;

    @IsOptional()
    keywords: string;

    @IsOptional()
    facebook: string;

    @IsOptional()
    twitter: string;

    @IsOptional()
    instagram: string;

    @IsOptional()
    linkedin: string;

    @IsOptional()
    snapchat: string;

    @IsOptional()
    youtube: string;

    @IsOptional()
    logo: string;

    @IsOptional()
    logo_key: string;

    @IsOptional()
    phone: string;

    @IsOptional()
    email: string;

    @IsOptional()
    whatsapp: string;

    @IsOptional()
    copyright_en: string;

    @IsOptional()
    copyright_ar: string;

    @IsOptional()
    location: string;

    @IsOptional()
    views: string;
    
		@IsOptional()
		@IsFile()
		@MaxFileSize(5e6)
		@HasMimeType(imageMimeTypes)
		file: MemoryStoredFile;
}