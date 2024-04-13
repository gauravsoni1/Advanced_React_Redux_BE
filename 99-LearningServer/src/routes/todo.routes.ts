import * as express from 'express';
import { TodoController } from '../controller/todo.controller';

export class TodoRoutes {
  private router = express.Router();

  public get routes() {
    const todoController = new TodoController();

    this.router.post('/', todoController.createTodo.bind(todoController));
    this.router.get('/list', todoController.getTodoList.bind(todoController));
    this.router.get('/:todo_id', todoController.getTodoById.bind(todoController));

    return this.router;
  }
}
