import {Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn} from "typeorm"
import { Flavor } from "./flavor.entity"

@Entity()  // sql table == "coffee"
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  // 品牌
  @Column()
  brand: string

  // 风味
  @JoinTable()
  @ManyToMany(type => Flavor, (flavor) => flavor.coffees)
  flavors: string[]
}