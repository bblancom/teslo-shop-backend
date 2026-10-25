import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsIn, IsInt, IsNumber, IsOptional, IsPositive, IsString, MinLength } from "class-validator";

export class CreateProductDto {

    @ApiProperty({
        description: 'Product title (unique)',
        example: 'Teslo T-shirt',
        minLength: 1,
        nullable: false,
    })
    @IsString()
    @MinLength(1)
    title!: string;

    @ApiProperty({
        description: 'Product price',
        example: 29.99,
        type: Number,
        minimum: 0,
        nullable: false,
    })
    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;

    @ApiProperty({
        description: 'Detailed product description',
        example: 'Soft cotton T-shirt with a modern fit.',
        type: String,
        nullable: true,
        required: false,
    })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({
        description: 'Product URL-friendly slug for SEO',
        example: 'teslo-tshirt',
        minLength: 1,
        nullable: false,
    })
    @IsString()
    @IsOptional()
    slug?: string;

    @ApiProperty({
        description: 'Available stock quantity',
        example: 10,
        type: Number,
        minimum: 0,
        nullable: false,
    })
    @IsInt()
    @IsPositive()
    @IsOptional()
    stock?: number;

    @ApiProperty({
        description: 'Available sizes for the product',
        type: [String],
        example: ['S', 'M', 'L', 'XL'],
        isArray: true,
    })
    @IsString({ each: true })
    @IsArray()
    sizes!: string[];

    @ApiProperty({
        description: 'Target audience for the product',
        example: 'men',
        enum: ['men', 'women', 'kid', 'unisex'],
        nullable: false,
    })
    @IsIn(['men', 'women', 'kid', 'unisex'])
    gender!: string;

    @ApiProperty({
        description: 'Product tags used for categorization',
        type: [String],
        example: ['tshirt', 'summer'],
        isArray: true,
        required: false,
    })
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    tags!: string[];

    @ApiProperty({
        description: 'Product image URLs',
        type: [String],
        example: ['teslo-tshirt-1.jpg'],
        isArray: true,
        required: false,
    })
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    images!: string[];
}
