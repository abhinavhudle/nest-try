import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
    private cats:string[] = []

    create(cat: string) {
        this.cats.push(cat)
    }

    update(i: number, cat: string) {
        this.cats[i] = cat
    }

    delete(i: number) {
        this.cats = this.cats.filter((ele,index)=>{
            return i != index
        })
    }

    read(){
        return this.cats
    }
}
