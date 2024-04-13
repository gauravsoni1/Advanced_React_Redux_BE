import { ApiResponse } from '../utility/apiResponse';
import { find } from 'lodash';

export type Todo = {
  id: number;
  val: string;
  isDone: boolean;
};

export class TodoController {
  todo: Todo[];

  constructor() {
    this.todo = [];
  }

  async createTodo(req, res) {
    try {
      const { val } = req.body;

      const todoID = new Date().getTime();

      const newTodo = {
        id: todoID,
        val,
        isDone: false
      };

      this.todo.push(newTodo);

      const apiResp = ApiResponse.success(newTodo, 201, "");
      res.status(apiResp.status).json(apiResp);
    } catch (error) {
      const apiResp = ApiResponse.error(error);
      res.status(apiResp.status).json(apiResp);
    }
  }

  async getTodoById(req, res) {

    try {
      const { todo_id } = req.params;
      const searchResult = find(this.todo, { 'id': parseInt(todo_id) });

      const apiResp = ApiResponse.success(searchResult, 200, "");
      res.status(apiResp.status).json(apiResp);

    } catch (error) {
      const apiResp = ApiResponse.error(error);
      res.status(apiResp.status).json(apiResp);
    }
  }

  async getTodoList(req, res) {
    try {
      const apiResp = ApiResponse.success(this.todo, 200, "Todo List");
      res.status(apiResp.status).json(apiResp);
    } catch (error) {
      const apiResp = ApiResponse.error(error);
      res.status(apiResp.status).json(apiResp);
    }
  }
}
