/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '@/lib/types/user';

// user id 5 example
// {
//   id: 5,
//   name: 'Chelsey Dietrich',
//   username: 'Kamren',
//   email: 'Lucio_Hettinger@annie.ca',
//   address: {
//     street: 'Skiles Walks',
//     suite: 'Suite 351',
//     city: 'Roscoeview',
//     zipcode: '33263',
//     geo: { lat: '-31.8129', lng: '62.5342' }
//   },
//   phone: '(254)954-1289',
//   website: 'demarco.info',
//   company: {
//     name: 'Keebler LLC',
//     catchPhrase: 'User-centric fault-tolerant solution',
//     bs: 'revolutionize end-to-end systems'
//   }
// }

export function deserializeUser(data: any): User {
  return {
    id: data.id,
    fullName: data.name,
    email: data.email,
    fullAddress: `${data.address.street}, ${data.address.city}, ${data.address.zipcode}`,
  };
}

export function serializeUser(user: User): any {
  return {
    id: user.id,
    name: user.fullName,
    email: user.email,
    address: {
      street: user.address?.street,
      city: user.address?.city,
      zipcode: user.address?.zipcode,
    }
  };
}