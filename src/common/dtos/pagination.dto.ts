import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export class PaginationDto {

    @ApiProperty({
        default: 10,
        description: 'Amount of items you want to display',
        example: 10,
        type: Number,
        minimum: 1,
        required: false,
    })
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    limit?: number;

    @ApiProperty({
        default: 0,
        description: 'Amount of items you want to skip',
        example: 0,
        type: Number,
        minimum: 0,
        required: false,
    })
    @IsOptional()
    @Type(() => Number)
    offset?: number;
}