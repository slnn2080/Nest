// 我们从 class-validator 导入 IsString 
import {IsString} from "class-validator"

export class CreateCoffeeDto {

  // 我们在 name 和 brand 属性上添加 @IsString 装饰器 表示该字段必须是 string 类型的

  @IsString()
  readonly name: string

  @IsString()
  readonly brand: string

  // each: true 表示期望的是一个字符串数组 我们需要这么设置
  // 如果你的字段是一个数组，并且你想对数组中的每个项执行验证，你必须指定一个特殊的each: true装饰器选项:

  // 它还有很多的其他很棒的选项 我嫩需要查看文档才能获取
  @IsString({each: true})
  readonly flavors: string[]
}




