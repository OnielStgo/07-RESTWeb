import { prisma } from "../../data/postgres";
import { CreateTodoDto, TodoDatasource, TodoEntity, UpdateTodoDto } from "../../domain";


export class TodoDatasourceImple implements TodoDatasource {

  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const todo = await prisma.todo.create({
      data: createTodoDto
    })

    return TodoEntity.fromObject(todo)
  }

  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany()

    return todos.map(todo => TodoEntity.fromObject(todo))
  }

  async getById(id: number): Promise<TodoEntity> {
    const todo = await prisma.todo.findFirst({
      where: {id: id}
    })

    if(!todo) throw `Todo with id ${id} not found`
    return TodoEntity.fromObject(todo)
  }

  async update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    await this.getById(updateTodoDto.id)

    const updateTodo = await prisma.todo.update({
      where: {id: updateTodoDto.id},
      data: updateTodoDto.values
    })

    return TodoEntity.fromObject(updateTodo)
  }

  async delete(id: number): Promise<TodoEntity> {
    await this.getById(id)

    const deleted = prisma.todo.delete({
      where: {id: id}
    })

    return TodoEntity.fromObject(deleted)
  }

}