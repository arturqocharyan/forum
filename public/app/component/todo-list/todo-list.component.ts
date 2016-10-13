import { Component,Input,OnInit  } from '@angular/core';


import { ITodo,Todo } from '../../shared/todo.model';
import {TodoService} from '../../shared/todo.service';
@Component({
    selector:'todo-list',
    templateUrl: './app/component/todo-list/todo-list.component.html',
    styleUrls: ['./app/app.component.css','./css/app.css'],
    
    
})

export class TodoListComponent implements OnInit{ 
    todos:ITodo[];
    constructor(private todoService: TodoService){
        this.todos = [];
    }
    ngOnInit(){
        this.todoService.getTodos().then(todos =>this.todos = todos);
    }
    get sortedTodos():ITodo[]{
        return this.todos.map(todo => todo)
        .sort((a  , b)=>{
            if(a.title > b.title) return 1;
            else if(a.title < b.title) return -1;
            else return 0
        })
        .sort((a  , b )=>{
            if(a.done && !b.done) return 1;
            else if(!a.done && b.done) return -1;
            else return 0
        })
    }
    deleteToDo(todo:ITodo){
         this.todoService.deleteTodo(todo);
    }
}
