import axios from 'axios'

import { User } from '../types/user'

export class UserService {

  static async getByEmailAndPassword(email: string, password: string) {
    const url = `http://localhost:3001/users?email=${email}&password=${password}`
    const user = await axios.get<User[]>(url)
    return user.data[0]
  }

}