import {IsArray, IsNumber, IsString} from 'class-validator';

export class CreateHelpRequestDto {

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  expirationDate: string;

  @IsNumber()
  durationInHours: number;

  @IsString()
  location?: string;

  @IsArray()
  categoriesIds: number[]
}
