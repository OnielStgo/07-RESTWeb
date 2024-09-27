import { Request, Response } from "express"
import { prisma } from "../../data/postgres"
import { CreateTodoDto } from "../../domain/dtos"

export class TodosController {
  //DI
  constructor (){}

  public getTodos = async (request: Request, response: Response) => {
    const todos = await prisma.todo.findMany()
    return response.json(todos)
  }

  public getTodoById = async (request: Request, response: Response) => {

    const id = +request.params.id
    if (isNaN(id)) return response.status(400).json({error: 'Id argument is not a number'})

    const todo = await prisma.todo.findFirst({
      where: { id: id }
    });

    (todo)
    ? response.json(todo)
    : response.status(404).json({error: `Todo with id ${id} not found`})
  }

  public createTodo = async (request: Request, response: Response) => {

    const [error, createTodoDto] = CreateTodoDto.create(request.body);
    if(error) return response.status(400).json({error});

    // const { text } = request.body
    // if(!text) return response.status(400).json({error: "Text property is required"})

    const todo = await prisma.todo.create({
      data: createTodoDto
    });
  
    return response.json(todo)
  }

  public upDateTodo = async (request: Request, response: Response) => {
    const id = +request.params.id
    if (isNaN(id)) return response.status(400).json({error: 'Id argument is not a number'})

    const todo = await prisma.todo.findFirst({
      where: { id: id }
    })
    if (!todo) return response.status(404).json({error: `Todo with id ${id} is not found`})

    const { text, completedAt } = request.body

    todo.text = text;

    const updateTodo = await prisma.todo.update({
      where: {id: id},
      data: {
        text: text,
        completedAt: (completedAt) ? new Date(completedAt) :  null,
      }
    })

    response.json(updateTodo)
  }

  public deleteTodo = async (request: Request, response: Response) => {
    const id = +request.params.id
    if(isNaN(id)) return response.status(400).json({error: "Id argument is not a number"})

    const todo = await prisma.todo.findFirst({
      where: { id: id }
    })

    if(!todo) return response.status(404).json({error: `Todo with id ${id} is not found`})
    
    const deleted = await prisma.todo.delete({
      where: { id: id }
    });

    (deleted)
      ? response.json(deleted)
      : response.status(400).json({error: `Todo with id ${id} is not found`})

    // return response.json({ todo, deleted })    
  }
}