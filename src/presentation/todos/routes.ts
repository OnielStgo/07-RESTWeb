import { Router } from "express"
import { TodosController } from "./controller"
import { TodoDatasourceImple } from "../../infrastructure/datasource/todo.datasource.impl"
import { TodoRepositoryImpl } from "../../infrastructure/repositories/todo.repository.impl"

export class TodoRoutes {

  static get routes(): Router {

    const router = Router()

    const datasource = new TodoDatasourceImple()
    const todoRepository = new TodoRepositoryImpl(datasource)

    const todoController = new TodosController(todoRepository)

    router.get('/',  todoController.getTodos)
    router.get('/:id', todoController.getTodoById)
    router.post('/', todoController.createTodo)
    router.put('/:id', todoController.upDateTodo)
    router.delete('/:id', todoController.deleteTodo)

    return router
  }  
}