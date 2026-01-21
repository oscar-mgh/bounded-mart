import { Type } from 'class-transformer';
import { IsMongoId, IsNumber, Min } from 'class-validator';

export class UpdateStockQueryDto {
    @IsMongoId()
    id: string;

    @Type(() => Number)
    @IsNumber()
    @Min(1)
    quantity: number;
}