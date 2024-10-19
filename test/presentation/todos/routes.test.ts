import request from 'supertest'
import { testServer } from '../../test-server';
import { prisma } from '../../../src/data/postgres';


describe('Test in route.ts file', () => {

  beforeAll( async () => {
    await testServer.start();
  } );

  afterAll(() => {
    testServer.close();
  } );

  beforeEach( async () => {
    await prisma.todo.deleteMany();
  } );

  const todo1 = {text: 'Olá mundo 1'}
  const todo2 = {text: 'Olá mundo 2'}

  test('should return TODOS api/todos', async () => {

    await prisma.todo.createMany({
      data: [todo1, todo2]
    })
    
    const { body } = await request(testServer.app)
      .get('/api/todos')
      .expect(200)

    expect(body).toBeInstanceOf(Array)
    expect(body.length).toBe(2)
    expect(body[0].text).toBe(todo1.text)
    expect(body[1].text).toBe(todo2.text)

    // console.log(body)
  });

  test('should return a TODO api/todos/:id', async () => {
    
    const todo = await prisma.todo.create({data: todo1})

    const { body } = await request(testServer.app)
      .get(`/api/todos/${todo.id}`)
      .expect(200)

    expect(body).toEqual({
      id: todo.id,
      text: todo.text,
      completedAt: todo.completedAt
    })
  });

  test('should return a 404 NotFound api/todos/:id', async () => {

    const todoId = 999

    const { body } = await request(testServer.app)
      .get(`/api/todos/${todoId}`)
      .expect(400)

    expect(body).toEqual({"error": "Todo with id 999 not found"})
    // console.log(body)
  });

  test('should create a new todo api/todos', async () => {
    
    const { body } = await request(testServer.app)
      .post('/api/todos')
      .send(todo1)
      .expect(201)

    expect(body).toEqual({
      id: expect.any(Number),
      text: todo1.text,
      completedAt: null
    })
  });

  test('should return an error if text is not present api/todos', async () => {
    
    const { body } = await request(testServer.app)
      .post('/api/todos')
      .send({})
      .expect(400)

    expect(body).toEqual({ error: 'Text property is required' })
  });
  test('should return an error if text is empty api/todos', async () => {
    
    const { body } = await request(testServer.app)
      .post('/api/todos')
      .send({text: ''})
      .expect(400)

    expect(body).toEqual({ error: 'Text property is required' })
  });

  test('should return an updated todo api/todos/:id', async () => {
    
    const todo = await prisma.todo.create({data: todo1})

    const { body } = await request(testServer.app)
      .put(`/api/todos/${todo.id}`)
      .send({text: 'Olá mundo updated', completedAt: '2024-10-17'})
      .expect(200)

    expect(body).toEqual({
      id: expect.any(Number),
      text: 'Olá mundo updated',
      completedAt: '2024-10-17T00:00:00.000Z'
    })
  });

  //TODO: Realizar as opreções com erros personalizados
  test('should return 404 if TODO not found', async () => {

    const todoId = 999   
    const { body } = await request(testServer.app)
      .put(`/api/todos/${todoId}`)
      .send({text: 'Hola mundo UPDATE 2', completedAt: '2024-10-18'})
      .expect(400)

    expect(body).toEqual({ error: 'Todo with id 999 not found' })
  });

  test('should return an updated TODO only the data api/todos/:id', async () => {

    const todo = await prisma.todo.create({data: todo1})
    
    const { body } = await request(testServer.app)
      .put(`/api/todos/${todo.id}`)
      .send({completedAt: '2024-10-19'})
      .expect(200)

    expect(body).toEqual({
      id: expect.any(Number),
      text: todo1.text,
      completedAt: '2024-10-19T00:00:00.000Z'
    })
  });

  
  //este es el teste que está fallando
  test('should delete a TODO api/todos/:id', async () => {
    
    const todo = await prisma.todo.create({data: todo1})

    const { body } = await request(testServer.app)
      .delete(`/api/todos/${todo.id}`)
      .expect(200);

    
    console.log(body)
  });

})  