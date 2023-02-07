import { Cart } from "../state/cart.reducer";

// Đăng ký tài khoản interface
export interface signUp {
  Email: string;
  Name: string;
  Password: string;
  Address: string;
  Avt:string
  SDT:string
  Role:string
}

// Đăng nhập
export interface login {
  email: string;
  password: string;
}

// Sản phẩm
export interface product{
  name:string,
  price:number,
  category:string,
  color:string,
  image:string,
  image1:string,
  image2:string,
  size: string,
  sale: boolean | number,
  price_sale: number,
  description:string,
  id:number,
}

export interface cartGroup {
  cart: Cart,
  count: number
}

export interface cart{
  id?:number,
  userId:number
  productId:number
}

export interface priceSummary{
  price:number,
  discount:number,
  tax:number,
  delivery:number,
  total:number
}

export interface order {
  sdt:string,
  diaChi:string,
  userId:string,
  time?: Date,
  id?:number
}

export interface order_detail{
  OrderId: number
  IdProduct: number
  quantity: number
}

export interface history_detail {
  idOrder?: number,
  quantity: number,
  products: product
}

export interface inproduct {
  ProductId: number,
  quantity: number,
}
