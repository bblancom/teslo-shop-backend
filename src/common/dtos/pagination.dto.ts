import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export class PaginationDto {
    
    @ApiProperty({
        default: 10, description: 'Amount of items you want to display'
    })
    @IsOptional()
    @IsPositive()
    @Type(() => Number)
    limit?: number;

    @ApiProperty({
        default: 0, description: 'Amount of items you want to skip'
    })
    @IsOptional()
    @Type(() => Number)
    offset?: number;
}