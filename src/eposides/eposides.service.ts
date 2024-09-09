import { Injectable } from '@nestjs/common';
import { Eposide } from './entities/eposide.entity';
import { CreateEposideDto } from './dto/create-eposide.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class EposidesService {
    private eposides: Eposide[] = [];

    async findAll(sort: 'asc' | 'desc' = 'asc') {
        const sortAsc = (a: Eposide, b: Eposide) => (a.name > b.name ? 1 : -1);
        const sortDesc = (a: Eposide, b: Eposide) => (a.name < b.name ? 1 : -1);

        return sort === 'asc' ? this.eposides.sort(sortAsc) : this.eposides.sort(sortDesc);
    }

    async findFeatured() {
        return this.eposides.filter(ep => ep.featured);
    }

    async findById(id: string) {
        return this.eposides.find(ep => ep.id == id);
    }

    async create(createEposideDto: CreateEposideDto) {
        const newEposide = { ...createEposideDto, id: randomUUID() };
        this.eposides.push(newEposide);

        return newEposide;
    }
}
