import axios from 'axios'

import { User } from '../types/user'

export class UserService {

  static async getAll() {
    const users = await axios.get<User[]>('http://localhost:3001/users')
    return users.data
  }

}