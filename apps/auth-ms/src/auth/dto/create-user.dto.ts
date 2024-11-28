import { IsEmail, IsEnum, IsString, IsStrongPassword } from 'class-validator';
import { DocumentTypeList, GenderList } from '../enum/user.enum';
import { DocumentType, Gender } from '@repo/user-db-prisma';

export class CreateUserDto {
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
    message: `Valid gender values are ${Object.values(GenderList).join(', ')}`,
  })
  gender: Gender;

  @IsString()
  birthdate: string;

  @IsEnum(DocumentTypeList, {
    message: `Valid document type values are ${Object.values(
      DocumentTypeList,
    ).join(', ')}`,
  })
  documentType: DocumentType;

  @IsString()
  documentNumber: string;

  @IsString()
  phone: string;
}
