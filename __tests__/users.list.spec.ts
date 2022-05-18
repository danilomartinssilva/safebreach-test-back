import axios from "axios";
import * as request from "supertest";
import app from "../src/app";
import { data as UserData } from '../src/data/users';




const mockUsers = UserData
jest.mock('axios')

describe('users.list',()=>{

  beforeAll(async()=>{
    jest.setTimeout(3000);
  })
  it('should list users',async()=>{
    (axios.get as jest.Mock).mockResolvedValue({
      status:200,
      data:JSON.stringify(mockUsers)
    })
    const listResponse = await request(app).get('/api/v1/users');
    expect(listResponse.status).toBe(200)
    expect(listResponse.body[0]._id).toBeTruthy()
    expect(listResponse.body.length).toBeGreaterThan(0)
  })
  it('should remove user',async()=>{
    (axios.get as jest.Mock).mockResolvedValue({
      status:200,
      data:JSON.stringify(mockUsers)
    })
    const listResponse = await request(app).get('/api/v1/users');
    expect(listResponse.status).toBe(200)
    expect(listResponse.body[0]._id).toBeTruthy()
    expect(listResponse.body.length).toBeGreaterThan(0)
  })
})
