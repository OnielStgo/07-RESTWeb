
import fs from 'node:fs'
import http2 from 'http2'

const server = http2.createSecureServer({
  key: fs.readFileSync('./keys/server.key'),
  cert: fs.readFileSync('./keys/server.crt'),
}, (request, response) => {

  //enviar uma página html para a solicitação de uma url especifica
  if (request.url === '/') {
    console.log(request.url)
    const htmlFile = fs.readFileSync('./src/public/index.html', 'utf-8')
    response.writeHead(200, {'Content-Type': 'text/html'})
    response.write(htmlFile)
    response.end()
    return
  } 
  
  if (request.url?.endsWith('.css')) {
    response.writeHead(200, {'Content-Type': 'text/css'})
  } else if (request.url?.endsWith('.js')) {
    response.writeHead(200, {'Content-Type': 'application/javascript'})
  }
  
  const responseContent = fs.readFileSync(`./src/public${request.url}`, 'utf-8')
  response.write(responseContent)
  response.end()
  
})

server.listen(8080, () => {
  console.log('Server running on port 8080')
})