import { IsString, IsEmail } from 'class-validator';

export class CreateInitiativeDto {
  @IsString()
  public category: string;

  @IsString()
  public description: string;
}
