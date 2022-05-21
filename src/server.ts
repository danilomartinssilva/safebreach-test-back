import 'dotenv/config';
import * as http from 'http';
import app from './app';

const PORT = process.env.PORT || "3338";

http.createServer(app).listen(PORT,()=>{
  console.log('Express server listen: '+PORT);
})
