import { CreateTodoDto, TodoDatasource, TodoEntity, TodoRepository, UpdateTodoDto } from "../../domain";


export class TodoRepositoryImpl implements TodoRepository{

  constructor(
    private readonly datasource: TodoDatasource
  ){}

  create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    return this.datasource.create(createTodoDto)
  }

  getAll(): Promise<TodoEntity[]> {
    return this.datasource.getAll()
  }

  getById(id: number): Promise<TodoEntity> {
    return this.datasource.getById(id)
  }

  update(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    return this.datasource.update(updateTodoDto)
  }

  delete(id: number): Promise<TodoEntity> {
    return this.datasource.delete(id)
  }  

}