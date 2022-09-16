import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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

  // 查: 查全部
  findAll() {
    return this.coffees
  }

  // 查: 查一个
  findOne(id: string) {

    // throw "A random error"

    let coffee = this.coffees.find(item => item.id == +id)

    if(!coffee) {
      throw new NotFoundException(`Coffee #${id} not found`)
    }

    return coffee
  }

  // 增:
  create(createCoffeeDto: any) {
    this.coffees.push(createCoffeeDto)
    return this.coffees
  }

  // 改:
  update(id:string, createCoffeeDto:any) {

    // for(let i = 0; i < this.coffees.length; i++) {
    //   if(this.coffees[i].id == +id) {
    //     this.coffees[i] = createCoffeeDto

    //     return this.coffees
    //   }
    // }    

    return this.coffees.map(item => {
      if(item.id == +id) {
        return {...item, ...createCoffeeDto}
      }
    })
  }

  // 删除
  remove(id: string) {
    let index = this.coffees.findIndex(item => item.id == +id)

    if(index >= 0) {
      this.coffees.splice(index, 1)
    }

    return this.coffees
  }
}
