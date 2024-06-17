import { Response } from 'express';
import { ApiResponse } from '../utility/apiResponse';
import { find } from 'lodash';
import { io } from '../service/socketio.service';

export type Todo = {
  id: number;
  val: string;
  isDone: boolean;
};

type SSEClient = {
  id: string,
  res: Response
}

export class TodoController {
  todo: Todo[];
  private sseClients: SSEClient[];

  constructor() {
    this.todo = [];
    this.sseClients = [];
  }

  updateSSEClients() {
    this.sseClients.forEach(client => client.res.write(`data: ${JSON.stringify(this.todo)}\n\n`));
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

      this.updateSSEClients();

      // Publish Socket Event (todo-created)
      io.emit('todo-created', newTodo);

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

  async getTodoListLongPoll(req, res) {
    try {
      setTimeout(() => {
        const apiResp = ApiResponse.success(this.todo, 200, "Todo List");
        res.status(apiResp.status).json(apiResp);
      }, 5000);
    } catch (error) {
      const apiResp = ApiResponse.error(error);
      res.status(apiResp.status).json(apiResp);
    }
  }

  async getTodoListSSE(req, res) {
    try {
      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
      });

      res.write(`data: ${JSON.stringify(this.todo)}\n\n`, (err) => {
        if (err) {
          console.log("Error writing to stream");
          console.log(err)
        }
      })

      const clientId = `client_${new Date().getTime()}`;

      const newClient = {
        id: clientId,
        res: res
      }

      this.sseClients.push(newClient);

      req.on("end", () => {
        console.log("Connection ended");
      })

      req.on("close", () => {
        console.log("Closed connection for the client", clientId);
        this.sseClients = this.sseClients.filter((client) => client.id !== clientId)

        console.log(this.sseClients);
      })

    } catch (error) {
      const apiResp = ApiResponse.error(error);
      res.status(apiResp.status).json(apiResp);
    }
  }

  async updateTodo(req, res) {
    try {
      const { todo_id } = req.params;
      const { val, isDone } = req.body;

      const searchResult = find(this.todo, { 'id': parseInt(todo_id) });

      if (searchResult) {
        this.todo = [...this.todo.filter((todo) => todo.id !== parseInt(todo_id)), { id: searchResult.id, val: val, isDone: isDone }];
      }

      const apiResp = ApiResponse.success(this.todo, 200, "Todo List");
      res.status(apiResp.status).json(apiResp);
    } catch (error) {
      const apiResp = ApiResponse.error(error);
      res.status(apiResp.status).json(apiResp);
    }
  }

  async deleteTodo(req, res) {
    try {
      const { todo_id } = req.params;

      this.todo = [...this.todo.filter((todo) => todo.id !== parseInt(todo_id))];

      const apiResp = ApiResponse.success(this.todo, 200, "Todo removed from list");
      res.status(apiResp.status).json(apiResp);
    } catch (error) {
      const apiResp = ApiResponse.error(error);
      res.status(apiResp.status).json(apiResp);
    }
  }
}
