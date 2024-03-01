import { User } from '@/bertie/identity/enterprise/entities/user'

export abstract class UsersRepository {
  abstract findByEmail(email: string): Promise<User | null>
  abstract create(user: User): Promise<void>
}
