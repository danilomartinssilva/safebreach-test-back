import axios from "axios";
import User from "modules/user/types/User";
import * as request from "supertest";
import app from "../src/app";

const userFake = {_id:"xpto",address:"xpto",name:"xpto",birthday:"xpto",phone_number:"999999",picture:"xpto"} as User
jest.mock('axios')

describe('users.destroy',()=>{

  beforeAll(async()=>{
    //jest.setTimeout(5000);
    (axios.create as jest.Mock).mockResolvedValue({
      status:201,

    })

    await request(app).post('/api/v1/users').send({user:userFake})
  })
  it('should remove user',async()=>{

     (axios.delete as jest.Mock).mockResolvedValue({
      status:204,
    })
    const dd = await request(app).delete('/api/v1/users/'+userFake._id);
    expect(dd.status).toBe(204)
    const listResponse = await request(app).get('/api/v1/users/');
    expect(listResponse.body[listResponse.body.length]).toBeUndefined()

  })
  it('should return status 404, when user non-exist',async()=>{
    const dd = await request(app).delete('/api/v1/users/'+123);
    expect(dd.status).toBe(404);
  })
})
