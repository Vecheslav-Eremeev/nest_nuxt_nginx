import { Injectable } from '@nestjs/common';
import { CreateDatumDto } from './dto/create-datum.dto';
import { log } from 'console';

@Injectable()
export class DataService {
  private datas: any[] = [];
  getAll() {
    return this.datas;
  }

  getById(id: string) {
    return this.datas.find((p) => p.id === id);
  }
  create(datumDto: CreateDatumDto) {
    this.datas.push({
      ...datumDto,
      id: Date.now().toString(),
    });
  }

  remove(id: string) {
    const index = this.datas.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.datas.splice(index, 1);
    }
  }
}
