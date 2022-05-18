import * as http from 'http';
import app from './app';
const PORT = 3339;

http.createServer(app).listen(PORT,()=>{
  console.log('Express server listen'+ PORT);
})