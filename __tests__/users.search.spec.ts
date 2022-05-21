import axios from "axios";
import User from "modules/user/types/User";
import * as request from "supertest";
import app from "../src/app";

const userFake = {_id:"fd231ew456fa156er4",address:"Rua Sebastiao Ferreira de Souza",name:"Danilo Martins",birthday:"1990-07-22",phone_number:"(064) 992413149",picture:"xpt.jpg"} as User
jest.mock('axios')

describe('user.search',()=>{

  beforeAll(async()=>{
    (axios.create as jest.Mock).mockResolvedValue({
      status:201,
    })

    await request(app).post('/api/v1/users').send({user:userFake})
  })
   it('should return user',async()=>{
      const query = {name:["Dan"],phone:["064"],birthday:["31"]}
      const listResponse = await request(app).post(`/api/v1/users/search`)
      .send({data:query})

      expect(listResponse.status).toBe(200)
      expect(listResponse.body.length).toBe(1)
      expect(listResponse.body[0].name).toBe(userFake.name)

  })
   it('should return status 404 when not exist user',async()=>{
      const query = {name:["Xpto"],phone:["064"],birthday:["31"]}
      const listResponse = await request(app).post(`/api/v1/users/search`)
      .send({data:query})
      expect(listResponse.body.length).toBe(0)
  })
})
