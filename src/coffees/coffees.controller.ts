import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {

  // 在该控制器内 注入提供者(service)
  constructor(private readonly coffeessService: CoffeesService) {}

  @Get()
  findAll() {
    return this.coffeessService.findAll()
  }

  @Get(":id")
  findOne(@Param() params) {
    return this.coffeessService.findOne(params.id)
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    console.log(createCoffeeDto instanceof CreateCoffeeDto);
    
    return this.coffeessService.create(createCoffeeDto)
  }

  @Patch(":id")
  update(@Param() params: {id:string}, @Body() body: UpdateCoffeeDto) {
    return this.coffeessService.update(params.id, body)
  }

  @Delete(":id")
  delete(@Param() params: {id:string}) {
    return this.coffeessService.remove(params.id)
  }
}

