import { Request, Response } from "express"
import { prisma } from "../../data/postgres"
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos"
import { TodoRepository } from "../../domain"

export class TodosController {
  //DI
  constructor (
    private readonly todoRepository: TodoRepository
  ){}

  public getTodos = async (request: Request, response: Response) => {
    const todos = await this.todoRepository.getAll()
    return response.json(todos)
  }

  public getTodoById = async (request: Request, response: Response) => {
      const id = +request.params.id

      try {
        const todo = await this.todoRepository.getById(id)
        response.json(todo)
      } catch (error) {
        response.status(400).json({error})
      }
  }

  public createTodo = async (request: Request, response: Response) => {

    const [error, createTodoDto] = CreateTodoDto.create(request.body);
    if(error) return response.status(400).json({error});

      const todo = await this.todoRepository.create(createTodoDto!)
      response.json(todo)
  }

  public upDateTodo = async (request: Request, response: Response) => {
    const id = +request.params.id
    const [error, updateTodoDto] = UpdateTodoDto.create({...request.body, id})
    if(error) return response.status(400).json({error})

    const updateTodo = await this.todoRepository.update(updateTodoDto!)
    response.json(updateTodo)
  }

  public deleteTodo = async (request: Request, response: Response) => {
    const id = +request.params.id
   
    const deletedTodo = await this.todoRepository.delete(id)
    response.json(deletedTodo)
  }
}