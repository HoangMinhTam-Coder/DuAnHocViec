import { createAction, props } from "@ngrx/store";
import { cart, product } from "../model/data_type";
import { Cart } from "./cart.reducer";

// Function basic
export const addProductToCart = createAction('[Add] Product ToCart', props<{product: product}>());
export const addProductSucess = createAction('[Add] Product', props<{product:product, userId:string}>());

export const removeProductToCart = createAction('[Remove] Product ToCart', props<{product:product}>());
export const removeProductSucess = createAction('[Remove] Product', props<{product:product ,userId:string}>());

export const clearCart = createAction('[Clear] Cart', props<{id:number}>());
export const clearCartSuccess = createAction('[Clear] Cart Success');


export const removeProductById = createAction('[RemoveID] Product', props<{product:product}>());
export const removeProductByIdSucess = createAction('[RemoveID] Product Success', props<{product:product ,userId:string}>());

export const GetCartInit = createAction('[Get] Cart Init', props<{id: string}>());
export const GetCartInitSuccess = createAction('[Get] Cart Init Success', props<{cart: Cart[]}>());
// Function check
