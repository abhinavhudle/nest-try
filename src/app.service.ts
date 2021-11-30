import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `
    <h1>${new Date()}</h1><hr>
    <a href='/cats'>cats</a>
    `;
  }
}
