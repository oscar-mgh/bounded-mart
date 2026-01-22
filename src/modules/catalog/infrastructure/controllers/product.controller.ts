import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserRole } from 'src/modules/auth/domain/entities/user.entity';
import { Roles } from 'src/modules/auth/infrastructure/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/infrastructure/auth/guards/roles.guard';
import { ValidateObjectIdPipe } from 'src/modules/shared/infrastructure/pipes/validate-object-id.pipe';
import { ApplyDiscountUseCase } from '../../application/use-cases/apply-discount.use-case';
import { ApplyDiscountCommand } from '../../application/use-cases/commands/apply-discount.command';
import { CreateProductUseCase } from '../../application/use-cases/create-product.use-case';
import { DeleteProductUseCase } from '../../application/use-cases/delete-product.use-case';
import { FindAllProductsUseCase } from '../../application/use-cases/find-all-products.use-case';
import { FindProductByIdUseCase } from '../../application/use-cases/find-product-by-id.use-case';
import { FindProductBySkuUseCase } from '../../application/use-cases/find-product-by-sku.use-case';
import { ApplyDiscountResponseDto } from '../http/dtos/apply-discount-response.dto';
import { ApplyDiscountDto } from '../http/dtos/apply-discount.dto';
import { CreateProductDto } from '../http/dtos/create-product.dto';
import { PaginatedResult, PaginationQueryDto } from '../http/dtos/pagination.dto';
import { ProductResponseDto } from '../http/dtos/product-response.dto';
import { UpdateStockQueryDto } from '../http/dtos/update-stock.dto';
import { ProductMapper } from '../persistence/mappers/product.mapper';
import { UpdateStockUseCase } from './../../application/use-cases/update-stock.use-case';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductController {
  constructor(
    private readonly findAllProductsUseCase: FindAllProductsUseCase,
    private readonly findProductByIdUseCase: FindProductByIdUseCase,
    private readonly findProductBySkuUseCase: FindProductBySkuUseCase,
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly updateStockUseCase: UpdateStockUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
    private readonly applyDiscountUseCase: ApplyDiscountUseCase,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() query: PaginationQueryDto): Promise<PaginatedResult<ProductResponseDto>> {
    const { page, totalElements, totalPages, data } = await this.findAllProductsUseCase.execute(query);

    return {
      page,
      totalPages,
      totalElements,
      data: data.map((product) => ProductMapper.toResponse(product)),
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findById(@Param('id', ValidateObjectIdPipe) id: string): Promise<ProductResponseDto> {
    const product = await this.findProductByIdUseCase.execute({ id });
    return ProductMapper.toResponse(product);
  }

  @Get(':sku')
  @HttpCode(HttpStatus.OK)
  async findBySku(@Param('sku') sku: string): Promise<ProductResponseDto> {
    const product = await this.findProductBySkuUseCase.execute({ sku });
    return ProductMapper.toResponse(product);
  }

  @Post()
  @UseGuards(RolesGuard)
  @Roles(UserRole.SALES_ADMIN)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateProductDto): Promise<ProductResponseDto> {
    const product = await this.createProductUseCase.execute(dto);
    return ProductMapper.toResponse(product);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.SALES_ADMIN)
  @HttpCode(HttpStatus.OK)
  async updateStock(@Query() dto: UpdateStockQueryDto): Promise<ProductResponseDto> {
    const product = await this.updateStockUseCase.execute(dto);
    return ProductMapper.toResponse(product);
  }

  @Patch('apply-discount')
  @UseGuards(RolesGuard)
  @Roles(UserRole.SALES_ADMIN)
  @HttpCode(HttpStatus.OK)
  async applyDiscount(@Body() dto: ApplyDiscountDto): Promise<ApplyDiscountResponseDto> {
    const { ids, category, code, percentage, expirationDate } = dto;
    const command: ApplyDiscountCommand = {
      criteria: {
        ids,
        category,
      },
      discountData: {
        code,
        percentage,
        expirationDate: new Date(expirationDate),
      },
    };
    const affectedProducts = await this.applyDiscountUseCase.execute(command);
    const response: ApplyDiscountResponseDto = {
      message: 'Discount applied successfully to the selected products!',
      affectedProducts,
      timestamp: new Date().toISOString(),
    };
    return response;
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles(UserRole.SALES_ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ValidateObjectIdPipe) id: string): Promise<void> {
    return await this.deleteProductUseCase.execute({ id });
  }
}
