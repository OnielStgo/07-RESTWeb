import { Request, Response } from "express"

const todos = [
  {id: 1, text: 'Buy Milk', createdAt: new Date()},
  {id: 2, text: 'Buy Bread', createdAt: null},
  {id: 3, text: 'Buy Butter', createdAt: new Date()}
]

export class TodosController {
  //DI
  constructor (){}

  public getTodos = (request: Request, response: Response) => {
    return response.json(todos)
  }

  public getTodoById = (request: Request, response: Response) => {

    const id = +request.params.id
    if (isNaN(id)) return response.status(400).json({error: 'Id argument is not a number'})

    const todo = todos.find(todo => todo.id === id);

    (todo)
    ? response.json(todo)
    : response.status(404).json({error: `Todo with id ${id} not found`})
  }

  public createTodo = (request: Request, response: Response) => {

    const { text } = request.body
    if(!text) return response.status(400).json({error: "Text property is required"})

    const newTodo = {
      id: todos.length + 1,
      text: text,
      createdAt: null
    }

    todos.push(newTodo)

    return response.json(newTodo)
  }

  public upDateTodo = (request: Request, response: Response) => {
    const id = +request.params.id
    if (isNaN(id)) return response.status(400).json({error: 'Id argument is not a number'})

    const todo = todos.find(todo => todo.id === id)
    if (!todo) return response.status(404).json({error: `Todo with id ${id} is not found`})

    const { text, createdAt } = request.body

    todo.text = text;

    (createdAt === 'null')
      ? todo.createdAt = null
      : todo.createdAt = new Date( createdAt || todo.createdAt)

    response.json(todo)
  }

  public deleteTodo = (request: Request, response: Response) => {
    const id = +request.params.id
    if(isNaN(id)) return response.status(400).json({error: "Id argument is not a number"})

    const todo = todos.find(todo => todo.id === id)
    if(!todo) return response.status(404).json({error: `Todo with id ${id} is not found`})

    todos.splice(todos.indexOf(todo), 1)
    return response.json(todo)
    
  }
}