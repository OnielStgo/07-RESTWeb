import { Request, Response } from "express"
import { prisma } from "../../data/postgres"
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos"
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo } from "../../domain"

export class TodosController {
  //DI
  constructor (
    private readonly todoRepository: TodoRepository
  ){}

  public getTodos = (request: Request, response: Response) => {
    new GetTodos(this.todoRepository)
      .execute()
      .then(todos => response.json(todos))
      .catch(error => response.status(400).json({error}))
  }

  public getTodoById = (request: Request, response: Response) => {
      const id = +request.params.id

      new GetTodo(this.todoRepository)
        .execute(id)
        .then(todo => response.json(todo))
        .catch(error => response.status(400).json({error}))
  }

  public createTodo = (request: Request, response: Response) => {

    const [error, createTodoDto] = CreateTodoDto.create(request.body);
    if(error) return response.status(400).json({error});

      new CreateTodo(this.todoRepository)
        .execute(createTodoDto!)
        .then(todo => response.status(201).json(todo))
        .catch(error => response.status(400).json({error}))
      
  }

  public upDateTodo = (request: Request, response: Response) => {
    const id = +request.params.id
    const [error, updateTodoDto] = UpdateTodoDto.create({...request.body, id})
    if(error) return response.status(400).json({error})

    new UpdateTodo(this.todoRepository)
      .execute(updateTodoDto!)
      .then(todo => response.json(todo))
      .catch(error => response.status(400).json({error}))
  }

  public deleteTodo = (request: Request, response: Response) => {
    const id = +request.params.id
   
    new DeleteTodo(this.todoRepository)
      .execute(id)
      .then(todo => response.json(todo))
      .catch(error => response.status(400))
  }
}