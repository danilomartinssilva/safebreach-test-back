
import { Request, Response } from 'express';
import { data } from '../../../data/users';
export default class UsersController{
  public async index(request:Request,response:Response):Promise<Response>{
    
    return response.json(data);
  }
}


