import { Controller, Get, Post, Redirect, Req, Res } from '@nestjs/common';
import { Request, response } from 'express';
import { CatsService } from './cats.service';

@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) {}

    @Get()
    findAll():string {
        return `
        <a href='/'>Home</a>
        <a href='/cats/display'>Display</a>
        <form action='/cats/create' method='post'>
            <input type='text' name='cats_name'>
        </form>
        `
    }

    @Get('/display')
    response(): string {
        let resp = "<form action='/cats/actions' method='post'>"
        let cats = this.catsService.read()

        for (let index = 0; index < cats.length; index++) {
            const element = cats[index];
            resp += (element+" "+`<button name="cat_delete" type="submit" value="${index}">Delete</button>`+
            `<input name="cat_update" type="text"><button name='cat_index' type="submit" value="${index}">Update</button>`+"<hr>")
        }
        resp += '</form>'

        return resp
    }

    @Post('/actions')
    @Redirect('/cats',301)
    response3(@Req() reqs: Request){
        if(reqs.body.cat_delete !== undefined){
            this.catsService.delete(parseInt(reqs.body.cat_delete))
        }
        else if(reqs.body.cat_update !== undefined){
            this.catsService.update(parseInt(reqs.body.cat_index),reqs.body.cat_update)
        }
    }

    @Post('/create')
    @Redirect('/cats',301)
    response2(@Req() reqs: Request) {
        this.catsService.create(reqs.body.cats_name)
    }
}
