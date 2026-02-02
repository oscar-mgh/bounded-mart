import { IsArray, IsBoolean, IsOptional, IsString } from 'class-validator';

export class CriteriaQueryDto {
  @IsArray()
  @IsOptional()
  ids?: string[];

  @IsArray()
  @IsOptional()
  skus?: string[];

  @IsString()
  @IsOptional()
  category?: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
