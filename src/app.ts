import bodyParser = require('body-parser');
import * as cors from 'cors';
import * as express from 'express';
import routes from './routes';
const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(cors())
app.use(routes)
app.get('/status',(req,res)=>res.status(200).json({message:"OK"}))


export default app;
