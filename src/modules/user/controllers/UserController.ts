
import { Request, Response } from 'express';
import { data } from '../../../data/users';
import { getAgeByBday } from '../../../utils/helpers';
import IUserQuery from '../types/IUserQuery';
import User from '../types/User';
export default class UsersController{
  public async index(request:Request,response:Response):Promise<Response>{

    return response.json(data);
  }
  public async search(request:Request,response:Response):Promise<Response>{
    const query = request.body.data as IUserQuery
      const filterData = data.filter((item)=>{
        return query.name.some((n)=>item.name.toLocaleLowerCase().includes(n.toLocaleLowerCase()))
        && (!query.birthday.length ? true : query.birthday.some((bh)=>getAgeByBday(item.birthday)===parseInt(bh)))
         && (!query.phone.length ? true : query.phone.some((ph)=>item.phone_number.includes(ph)))
      })
      if(!query.name.length){
        return response.json(data)
      }
      return response.json(filterData);
  }
  public async findById(request:Request,response:Response):Promise<Response>{

    const {userId} = request.params;
      const filterData = data.find((user)=>user._id===userId)
      if(!filterData){
        return response.status(404).json({message:"Nenhum registro foi encontrado"})
      }
      return response.json(filterData);
  }

  public async destroyUser(request:Request,response:Response):Promise<Response>{

     const {userId} = request.params
     const idSearched = data.findIndex((item)=>item._id===userId);

     if((idSearched)!==-1){
       data.splice(idSearched,1)
        return response.status(204).send()
     }
    return response.status(404).json({message:"Usuário não encontrado"}).status(404);
  }

  public async createUser(request:Request,response:Response):Promise<Response>{
    const user = request.body.user as User
    data.push(user)
    return response.status(201).send()
  }

  public async updateUser(request:Request,response:Response):Promise<Response>{

    const  user = request.body.data as User

    const search = data.find((item)=>item._id===user._id)


    if(!search?._id){
      return response.status(404).json({message:"Usuário não encontrado"})
    }

    data.map((item)=>{
      if(item._id===user._id){
        Object.assign(item,user)
      }
      return item
    })

    return response.status(201).json(data.find((item)=>item._id===user._id))
  }
}


