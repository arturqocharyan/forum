import { Component } from '@angular/core';

import {TodoService} from './shared/todo.service';
import { Todo } from './shared/todo.model';
import { todos } from './shared/todo.data';



@Component({
  selector: 'my-app',
  templateUrl: './app/app.component.html',
  styleUrls: ['./app/app.component.css','./css/app.css'],
  providers: [TodoService],

  
})
export class AppComponent { 
    title:string;
    menus:string[];
    constructor(private todoService: TodoService){
        this.title= 'Hello Word!!!';
        this.menus = ['Home','About','News','Photo'];
        
    }
    
}
