import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Header,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { DataService } from './data.service';
import { CreateDatumDto } from './dto/create-datum.dto';
//import { UpdateDatumDto } from './dto/update-datum.dto';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cashe-Control', 'none')
  create(@Body() createDatumDto: CreateDatumDto) {
    return this.dataService.create(createDatumDto);
  }
  @Get()
  findAll() {
    return this.dataService.getAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dataService.getById(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dataService.remove(id);
  }
}
