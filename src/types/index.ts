export type Category={
  id: string
  name: string
}

export type Product = {
  id: string
  name: string
  categoryId: number
  image:string
  price: number

}

export type User={
  firstName:string,
  lastName:string,
  email:string,
  Id:string,
  phoneNumber:number,
  role:string,
}
export const ROLE ={
  Admin:"Admin",
  customer:"Customer"
}as const

export type DecodedUser={
  aud:string
  emiladdress:string
  exp:number
  iss: string
  name:string
  nameidentifier:string
  role: keyof typeof ROLE
}