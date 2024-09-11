import express, { response } from 'express'
import path from 'path'

interface Options {
  port:  number,
  public_path?: string,
}

export class Server {
  private app = express()

  private readonly port: number
  private readonly public_path: string

  constructor(options: Options) {
    const { port, public_path = 'public' } = options

    this.port = port
    this.public_path = public_path
  }

  async start() {

    //* Middlewares

    //* Public folder
    this.app.use(express.static(this.public_path))

    this.app.use('*', (request, response) => {
      const indexPath = path.join(__dirname + `../../../${this.public_path}/index.html`)
      response.sendFile(indexPath)
    })

    //este código eu o coloquei para provar o funcionamento da feature __dirname
    // this.app.get('*', (request, response) => {
    //   console.log(request.url)
    //   console.log('Dirname:   ', __dirname)
    //   const indexPath = path.join(__dirname + '../../../public/index.html')
    //   console.log('indexPath: ', indexPath)
    //   response.sendFile(indexPath)
    // })
    
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })
  } 
} 