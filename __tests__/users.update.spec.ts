import axios from "axios";
import User from "modules/user/types/User";
import * as request from "supertest";
import app from "../src/app";

const userFake = {_id:"xpto",address:"xpto",name:"xpto",birthday:"xpto",phone_number:"999999",picture:"xpto"} as User
jest.mock('axios')

describe('users.update',()=>{

  beforeAll(async()=>{
    (axios.create as jest.Mock).mockResolvedValue({
      status:201,
    })

    await request(app).post('/api/v1/users').send({user:userFake})
  })
   it('should remove user',async()=>{

     (axios.put as jest.Mock).mockResolvedValue({
      status:204,
    })
    const dd = await request(app).put('/api/v1/users/').send({
      user:{...userFake,name:"Danilo Martins da Silva"} as User
    })
    expect(dd.status).toBe(201)
    const listResponse = await request(app).get('/api/v1/users/');
    expect(listResponse.body.length).toBeGreaterThan(0)
    expect(listResponse.body.find((item)=>item.name==="Danilo Martins da Silva")?.name).toBe("Danilo Martins da Silva")


  })
  it('should return status 404, when user non-exist',async()=>{
    const dd = await request(app).put('/api/v1/users/').send({
      user:{...userFake,_id:"7987798789"}
    });
    expect(dd.status).toBe(404)

  })
})
