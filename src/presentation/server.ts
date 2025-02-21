import express, { response, Router } from 'express'
import path from 'path'

interface Options {
  port:  number,
  public_path?: string,
  routes: Router,
}

export class Server {
  public app = express()

  private serverListen?: any
  private readonly port: number
  private readonly public_path: string
  private readonly routes: Router

  constructor(options: Options) {
    const { port, public_path = 'public', routes } = options

    this.port = port
    this.public_path = public_path
    this.routes = routes
  }

  async start() {

    //* Middlewares
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true}))

    //* Public folder
    this.app.use(express.static(this.public_path))

    //* Routes
    this.app.use(this.routes)

    this.app.get('*', (request, response) => {
      const indexPath = path.join(__dirname + `../../../${this.public_path}/index.html`)
      response.sendFile(indexPath)
    })
    
    this.serverListen = this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`)
    })
  }

  public close() {
    this.serverListen?.close()
  }
} 