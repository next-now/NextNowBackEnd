import {IsString, IsEmail, IsNumber, IsBoolean, Matches} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsString()
  public username: string;

  @IsBoolean()
  giverProfileActive: boolean;

  @IsBoolean()
  public hasCar: boolean;

  @IsString()
  public address: string;

  @IsString()
  @Matches(/\d\d:\d\d/)
  public availabilityStartTime: string;

  @IsString()
  @Matches(/\d\d:\d\d/)
  public availabilityEndTime: string;
}

export class CreatedUser {
  public id: Number;

  @IsEmail()
  public email: string;

  @IsString()
  public walletId: string;

  @IsString()
  public username: string;

  @IsNumber()
  public balance?: number;

  @IsBoolean()
  giverProfileActive: boolean;

  @IsBoolean()
  public hasCar: boolean;

  @IsString()
  public address?: string;

  @IsString()
  @Matches(/\d\d:\d\d/)
  public availabilityStartTime?: string;

  @IsString()
  @Matches(/\d\d:\d\d/)
  public availabilityEndTime?: string;
}
