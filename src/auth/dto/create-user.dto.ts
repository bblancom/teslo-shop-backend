import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @ApiProperty({
        description: 'User email address',
        example: 'john@example.com',
        uniqueItems: true,
        format: 'email',
    })
    @IsString()
    @IsEmail()
    email!: string;

    @ApiProperty({
        description: 'Password with at least one uppercase letter, one lowercase letter, and one number or symbol',
        example: 'StrongPass123',
        minLength: 6,
        maxLength: 50,
        type: String,
    })
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password!: string;

    @ApiProperty({
        description: 'User full name',
        example: 'John Doe',
        minLength: 1,
    })
    @IsString()
    @MinLength(1)
    fullName!: string;
}