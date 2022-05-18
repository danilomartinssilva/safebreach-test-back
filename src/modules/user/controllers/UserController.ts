
import { Request, Response } from 'express';
import { data } from '../../../data/users';
import User from '../types/User';
export default class UsersController{
  public async index(request:Request,response:Response):Promise<Response>{

    return response.json(data);
  }

  public async destroyUser(request:Request,response:Response):Promise<Response>{

     const {userId} = request.params
     const idSearched = data.findIndex((item)=>item._id===userId);
     if((idSearched)!==-1){
        data.splice(idSearched)
        return response.status(204).send();
     }
    return response.status(404).json({message:"Usuário não encontrado"}).status(404);
  }

  public async createUser(request:Request,response:Response):Promise<Response>{
    const user = request.body.user as User
    data.push(user)
    return response.status(201).send()
  }
  public async updateUser(request:Request,response:Response):Promise<Response>{
    const user = request.body.user as User
    const search = data.find((item)=>item._id===user._id)
    console.log('search',search)

    if(!search?._id){
      return response.status(404).json({message:"Usuário não encontrado"})
    }

    data.map((item)=>{
      if(item._id===user._id){
        Object.assign(item,user)
      }
      return item
    })

    return response.status(201).send(data.find((item)=>item._id===user._id))
  }
}


