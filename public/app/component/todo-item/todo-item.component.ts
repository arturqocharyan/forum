import { Component,Input,Output,EventEmitter  } from '@angular/core';
import { Todo } from '../../shared/todo.model';
@Component({
    selector:'todo-item',
    templateUrl: './app/component/todo-item/todo-item.component.html',
    styleUrls: ['./app/app.component.css','./css/app.css'],
    
})

export class TodoItemComponent{
    @Input() todo:string;
    @Output() deleted = new EventEmitter();
    toggleDone(){
        this.todo.done = !this.todo.done;
    }
    delete(){
        this.deleted.emit(this.todo);
    }
}