import path from "node:path"
import { envs } from "./config/envs"
import { AppRoutes } from "./presentation/routes"
import { Server } from "./presentation/server"

(() => {
  main()
})()

function main () {
  const server = new Server({
    port: envs.PORT,
    public_path: envs.PUBLIC_PAHT,
    routes: AppRoutes.routes,
  })
  server.start()
}