import axios from "axios";
import User from "modules/user/types/User";
import * as request from "supertest";
import app from "../src/app";

const userFake = {_id:"xpto",address:"xpto",name:"xpto",birthday:"xpto",phone_number:"999999",picture:"xpto"} as User
jest.mock('axios')

describe('user.findby',()=>{

  beforeAll(async()=>{
    (axios.create as jest.Mock).mockResolvedValue({
      status:201,
    })

    await request(app).post('/api/v1/users').send({user:userFake})
  })
   it('should return user',async()=>{
      const listResponse = await request(app).get(`/api/v1/users/${userFake._id}`);
      expect(listResponse.body.name).toBeTruthy()
      expect(listResponse.body.name).toBe(userFake.name)

  })
   it('should return status 404 when not exist user',async()=>{
      const listResponse = await request(app).get(`/api/v1/users/123456`);
      expect(listResponse.status).toBe(404)
  })
})
