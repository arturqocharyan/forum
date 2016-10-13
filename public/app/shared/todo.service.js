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
var core_1 = require("@angular/core");
var todo_data_1 = require("./todo.data");
var TodoService = (function () {
    function TodoService() {
    }
    TodoService.prototype.getTodos = function () {
        return new Promise(function (resolve) { return setTimeout(function () { return resolve(todo_data_1.todos); }, 1000); });
    };
    TodoService.prototype.deleteTodo = function (todo) {
        var index = todo_data_1.todos.indexOf(todo);
        if (index > -1) {
            todo_data_1.todos.splice(index, 1);
        }
    };
    TodoService.prototype.addTodo = function (todo) {
        todo_data_1.todos.push(todo);
    };
    TodoService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], TodoService);
    return TodoService;
}());
exports.TodoService = TodoService;
//# sourceMappingURL=todo.service.js.map