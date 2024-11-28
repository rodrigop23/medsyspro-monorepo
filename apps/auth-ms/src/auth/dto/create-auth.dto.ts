import {
  IsDate,
  IsEmail,
  IsEnum,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { DocumentTypeList, GenderList } from '../enum/user.enum';

export class CreateAuthDto {
  @IsString()
  name: string;

  @IsString()
  firstSurname: string;

  @IsString()
  secondSurname: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;

  @IsEnum(GenderList, {
    message: `Valid gender values are ${GenderList}`,
  })
  gender: string;

  @IsDate()
  birthdate: Date;

  @IsEnum(DocumentTypeList, {
    message: `Valid document type values are ${DocumentTypeList}`,
  })
  documentType: string;

  @IsString()
  documentNumber: string;

  @IsString()
  phone: string;
}
