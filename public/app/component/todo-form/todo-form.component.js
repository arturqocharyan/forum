"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var todo_model_1 = require('../../shared/todo.model');
var todo_service_1 = require('../../shared/todo.service');
var TodoFormComponent = (function () {
    //@Output() added = new EventEmitter();
    function TodoFormComponent(todoService) {
        this.todoService = todoService;
    }
    TodoFormComponent.prototype.add = function (title) {
        if (title) {
            var todo = new todo_model_1.Todo(title);
            this.todoService.addTodo(todo);
        }
    };
    TodoFormComponent = __decorate([
        core_1.Component({
            selector: 'todo-form',
            templateUrl: './app/component/todo-form/todo-form.component.html',
            styleUrls: ['./app/app.component.css', './css/app.css'],
        }), 
        __metadata('design:paramtypes', [todo_service_1.TodoService])
    ], TodoFormComponent);
    return TodoFormComponent;
}());
exports.TodoFormComponent = TodoFormComponent;
//# sourceMappingURL=todo-form.component.js.map