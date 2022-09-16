import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    // 开启白名单功能
    whitelist: true,
    // 开启非白名单属性将停止请求自动抛出错误
    forbidNonWhitelisted: true,

    // 将 请求体的载荷类型为DTO的实例
    transform:true
  }))
  await app.listen(3000);
}
bootstrap();
