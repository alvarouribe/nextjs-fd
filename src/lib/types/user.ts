export interface User {
  id: string;
  fullName: string;
  email: string;
  address?: {
    street: string;
    city: string;
    zipcode: string;
  }
  fullAddress?: string;
}