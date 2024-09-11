
import fs from 'node:fs'
import path from 'node:path';
import http from 'http'

const server = http.createServer((request, response) => {

  //enviar uma mensagem para qualquer solicitação
  // console.log(request.url)
  // response.write('Olá mundo')
  // response.end()


  //enviar uma página html para qualquer solicitação
  // console.log(request.url)
  // response.writeHead(200, {'Content-Type': 'text/html'})
  // response.write(`<h1>Você entrou no ${request.url}</h1>`)
  // response.end()


  //enviar uma pagina html para qualquer solicitação
  // const data = {name: 'João', age: 30}
  // console.log(request.url)
  // response.writeHead(200, {'Content-Type': 'application/json'})
  // response.write(JSON.stringify(data))
  // response.end()



  //enviar uma página html para a solicitação de uma url especifica
  // if (request.url === '/') {
  //   console.log(request.url)
  //   const htmlFile = fs.readFileSync('./src/public/index.html', 'utf-8')
  //   response.writeHead(200, {'Content-Type': 'text/html'})
  //   response.write(htmlFile)
  //   response.end()
  // } else {
  //   console.log(request.url)
  //   response.writeHead(404, {'Content-Type': 'text/html'})
  //   response.end()
  // }




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

    // if (request.url === '/src/public/favicon.ico') {
    //   response.writeHead(204);  // 204 No Content - o navegador não exibirá erros
    //   response.end();
    //   return;
    // }
    

      const responseContent = fs.readFileSync(`./src/public${request.url}`, 'utf-8')
      response.write(responseContent)
      response.end()

      response.writeHead(404, {'Content-Type': 'text/html'})
      response.end()
    






    // if (request.url === '/') {
    //   console.log(request.url);
    //   const htmlFile = fs.readFileSync('./src/public/index.html', 'utf-8');
    //   response.writeHead(200, {'Content-Type': 'text/html'});
    //   response.write(htmlFile);
    //   response.end();
    //   return;
    // }
  
    // // Adicionando tratamento para favicon.ico
    // if (request.url === '/favicon.ico') {
    //   response.writeHead(204);  // 204 No Content
    //   response.end();
    //   return;
    // }
  
    // // Determinando o caminho completo do arquivo solicitado
    // const filePath = path.join(__dirname, 'src', 'public', request.url);
  
    // // Definindo o Content-Type correto com base na extensão do arquivo
    // if (request.url?.endsWith('.css')) {
    //   response.writeHead(200, {'Content-Type': 'text/css'});
    // } else if (request.url?.endsWith('.js')) {
    //   response.writeHead(200, {'Content-Type': 'application/javascript'});
    // }
  
    // try {
    //   // Tentando ler o arquivo
    //   const responseContent = fs.readFileSync(filePath, 'utf-8');
    //   response.write(responseContent);
    // } catch (error) {
    //   // Em caso de erro, retornamos 404
    //   response.writeHead(404, {'Content-Type': 'text/plain'});
    //   response.write('File not found');
    // }
  
    // response.end();







    // if (request.url === '/') {
    //   console.log(request.url);
    //   const htmlFile = fs.readFileSync(path.resolve('./src/public/index.html'), 'utf-8');
    //   response.writeHead(200, {'Content-Type': 'text/html'});
    //   response.write(htmlFile);
    //   response.end();
    //   return;
    // }
  
    // // Tratamento específico para favicon.ico
    // if (request.url === '/favicon.ico') {
    //   response.writeHead(204);
    //   response.end();
    //   return;
    // }
  
    // // Usando caminho absoluto
    // const filePath = path.resolve(`./src/public${request.url}`);
  
    // // Definindo o Content-Type correto
    // if (request.url?.endsWith('.css')) {
    //   response.writeHead(200, {'Content-Type': 'text/css'});
    // } else if (request.url?.endsWith('.js')) {
    //   response.writeHead(200, {'Content-Type': 'application/javascript'});
    // }
  
    // try {
    //   // Tentativa de leitura do arquivo
    //   const responseContent = fs.readFileSync(filePath, 'utf-8');
    //   response.write(responseContent);
    // } catch (error) {
    //   // Em caso de erro, enviar 404
    //   console.error(`Erro ao ler o arquivo: ${filePath}`);
    //   console.error(error);
    //   response.writeHead(404, {'Content-Type': 'text/plain'});
    //   response.write('File not found');
    // }
  
    // response.end();




  //  console.log(`Request URL: ${request.url}`);

  // if (request.url === '/') {
  //   console.log('Serving index.html');
  //   const htmlFile = fs.readFileSync(path.resolve('./src/public/index.html'), 'utf-8');
  //   response.writeHead(200, {'Content-Type': 'text/html'});
  //   response.write(htmlFile);
  //   response.end();
  //   return;
  // }

  // if (request.url === '/favicon.ico') {
  //   console.log('Favicon requested, returning 204 No Content');
  //   response.writeHead(204);
  //   response.end();
  //   return;
  // }

  // const filePath = path.resolve(`./src/public${request.url}`);
  // console.log(`Attempting to serve file: ${filePath}`);

  // if (request.url?.endsWith('.css')) {
  //   response.writeHead(200, {'Content-Type': 'text/css'});
  // } else if (request.url?.endsWith('.js')) {
  //   response.writeHead(200, {'Content-Type': 'application/javascript'});
  // }

  // try {
  //   const responseContent = fs.readFileSync(filePath, 'utf-8');
  //   response.write(responseContent);
  // } catch (error) {
  //   console.error(`File not found: ${filePath}`);
  //   console.error(error);
  //   response.writeHead(404, {'Content-Type': 'text/plain'});
  //   response.write('File not found');
  // }

  // response.end();
  
})


server.listen(8080, () => {
  console.log('Server running on port 8080')
})