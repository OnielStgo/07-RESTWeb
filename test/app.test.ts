import { envs } from '../src/config/envs';
import { Server } from './../src/presentation/server'

jest.mock('./../src/presentation/server')

describe('Test in App file', () => {

  test('should call Sever with arguments and start', async () => {
    
    await import('./../src/app')

    expect(Server).toHaveBeenCalledTimes(1)
    expect(Server).toHaveBeenCalledWith({
      port: envs.PORT,
      public_path: envs.PUBLIC_PATH,
      routes: expect.any(Function),
    })

    expect(Server.prototype.start).toHaveReturnedWith()
  }); 
})