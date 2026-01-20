import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ValidateObjectIdPipe } from "src/modules/shared/infrastructure/pipes/validate-object-id.pipe";
import { UserRole } from "src/modules/users/domain/entities/user.entity";
import { Roles } from "src/modules/users/infrastructure/auth/decorators/roles.decorator";
import { JwtAuthGuard } from "src/modules/users/infrastructure/auth/guards/jwt-auth.guard";
import { RolesGuard } from "src/modules/users/infrastructure/auth/guards/roles.guard";
import { CreateProductUseCase } from "../../application/use-cases/create-product.use-case";
import { DeleteProductUseCase } from "../../application/use-cases/delete-product.use-case";
import { FindAllProductsUseCase } from '../../application/use-cases/find-all-products.use-case';
import { FindProductByIdUseCase } from '../../application/use-cases/find-product-by-id.use-case';
import { CreateProductDto } from "../http/create-product.dto";
import { PaginatedResult, PaginationQueryDto } from "../http/pagination.dto";
import { ProductResponseDto } from "../http/product-response.dto";
import { UpdateStockQueryDto } from "../http/update-stock.dto";
import { ProductMapper } from "../persistance/mappers/product.mapper";
import { UpdateStockUseCase } from './../../application/use-cases/update-stock.use-case';

@Controller('products')
export class ProductController {
    constructor(
        private readonly FindAllProductsUseCase: FindAllProductsUseCase,
        private readonly FindProductByIdUseCase: FindProductByIdUseCase,
        private readonly createProductUseCase: CreateProductUseCase,
        private readonly updateStockUseCase: UpdateStockUseCase,
        private readonly deleteProductUseCase: DeleteProductUseCase,
    ) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() query: PaginationQueryDto): Promise<PaginatedResult<ProductResponseDto>> {
        const { page, totalElements, totalPages, data } = await this.FindAllProductsUseCase.execute(query);

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
        const product = await this.FindProductByIdUseCase.execute(id)
        return ProductMapper.toPersistence(product);
    }

    @Post()
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() dto: CreateProductDto): Promise<ProductResponseDto> {
        const product = await this.createProductUseCase.execute(dto)
        return ProductMapper.toPersistence(product);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    async updateStock(@Query() dto: UpdateStockQueryDto): Promise<ProductResponseDto> {
        const product = await this.updateStockUseCase.execute(dto.id, dto.quantity);
        return ProductMapper.toPersistence(product);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id', ValidateObjectIdPipe) id: string): Promise<void> {
        return await this.deleteProductUseCase.execute(id);
    }
}