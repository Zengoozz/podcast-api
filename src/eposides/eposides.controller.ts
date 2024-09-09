import { Body, Controller, DefaultValuePipe, Get, NotFoundException, Param, ParseIntPipe, Post, Query, UseGuards, ValidationPipe } from '@nestjs/common';
import { EposidesService } from './eposides.service';
import { CreateEposideDto } from './dto/create-eposide.dto';
import { IsPositivePipe } from './pipes/is-positive/is-positive.pipe';
import { ApiKeyGuard } from 'src/guards/api-key/api-key.guard';

@Controller('eposides')
export class EposidesController {
    constructor(private eposidesService: EposidesService) { }

    @Get()
    findAll(
        @Query('limit', new DefaultValuePipe(100), ParseIntPipe, IsPositivePipe) limit: number,
        @Query('sort') sort: 'asc' | 'desc' = 'desc') {
        console.log(sort);
        return this.eposidesService.findAll(sort);
    }

    @Get('featured')
    findFeatured() {
        return this.eposidesService.findFeatured();
    }

    @Get(':id')
    async findById(@Param() id: string) {
        console.log(id);
        const eposide = await this.eposidesService.findById(id);

        if (!eposide)
            throw new NotFoundException('Eposide not found!');

        return eposide;
    } 
    
    @UseGuards(ApiKeyGuard)
    @Post()
    create(@Body(ValidationPipe) input: CreateEposideDto) {
        return this.eposidesService.create(input);
    }
}
