import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreatePatientDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsNumber()
  age: number;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsString()
  @IsNotEmpty()
  contactDetails: string;

  @IsOptional()
  @IsString()
  healthInfo?: string;
}