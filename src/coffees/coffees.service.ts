import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import {Coffee} from "./entities/coffees.entity"

@Injectable()
export class CoffeesService {
  private coffees:Coffee[] = [
    {
      id:1,
      name: "Shipwreck Roast",
      brand: "Buddy Brew",
      flavors: ["chocolate", "vanilla"]
    }
  ]

  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>
  ) {}

  // 查: 查全部
  findAll() {
    // 使用了提供的 find() 查找全部
    return this.coffeeRepository.find()
  }

  // 查: 查一个
  async findOne(id: number) {

    // 使用了提供的 findOne 方法 代替查找一个
    let coffee = await this.coffeeRepository.findOne({
      where: {
        id: +id
      }
    })

    if(!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`)
    }

    return coffee
  }

  // 增:
  create(createCoffeeDto: CreateCoffeeDto) {
    // 添加方法 我们要先创建一个 Coffee类的实例
    let coffee = this.coffeeRepository.create(createCoffeeDto)

    // 调用save()方法 将创建的 coffee 保存到数据库
    this.coffeeRepository.save(coffee)
  }

  // 改:
  async update(id:string, updateCoffeeDto:UpdateCoffeeDto) {

    // preload()根据传入的对象创建一个新的实体 preload会先查看数据库中是否存在实体 如果存在则返回相关数据 并将所有值替换为我们新传入的值 如果没有则返回 undefined
    let coffee = await this.coffeeRepository.preload({
      // 修改哪个数据
      id: +id,
      ...updateCoffeeDto
    })

    if(!coffee) {
      throw new NotFoundException(`coffee #${id} not found`)
    }

    return this.coffeeRepository.save(coffee)
  }

  // 删除
  async remove(id: string) {
      // 先调用类中方法 findOne 检索 coffee 是否存在 如果存在则从数据库中参数
    const coffee = await this.findOne(+id)
    
    return this.coffeeRepository.remove(coffee)
  }
}
