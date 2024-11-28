import {User} from './user.entity'
import {Mensaje } from './mensaje.entity'

export class Chat {
  constructor(
    public id: string,
    public patientId: string,
    public doctorId: string
  ) {}
}
