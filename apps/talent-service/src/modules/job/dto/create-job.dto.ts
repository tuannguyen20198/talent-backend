import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
  } from 'class-validator';
  
  export class CreateJobDto {
    @IsNotEmpty()
    @IsNumber()
    recruiterId: number;
  
    @IsNotEmpty()
    @IsString()
    title: string;
  
    @IsOptional()
    @IsString()
    description?: string;
  
    @IsOptional()
    @IsString()
    company?: string;
  
    @IsOptional()
    @IsString()
    location?: string;
  
    @IsNotEmpty()
    @IsNumber()
    salaryMin: number;
  
    @IsNotEmpty()
    @IsNumber()
    salaryMax: number;
  
    @IsOptional()
    @IsString()
    benefits?: string;
  
    @IsOptional()
    @IsArray()
    skills?: string[];
  }