import { createReducer, on } from "@ngrx/store";
import { Pageable } from "src/app/models/customer";
import * as ProductionActions from "../actions/production.actions";

export const ProductionFeatureKey = 'Production';

export interface ProductionIdState {
  productionId: any
}

export interface ProductionState {
   id:number,
   pageable:Pageable,
   Production:any,
   query:string,
   url:string,
   loadingProduction:boolean


}

export const ProductionIdInitialState:ProductionIdState = {
  productionId: null
}

export const initialState: ProductionState = {
id:null,
 pageable: {
 content: null,
totalElements:null,
totalPages: null,
number: null,
first: null,
last: null,
size:null,
numberOfElements: null,
pageNo: null
  },
  Production:null,
url:null,
query:null,
loadingProduction:null,
};

export const reducer = createReducer(
  initialState,

  on(ProductionActions.loadProduction, (state, action) =>({
    ...state,
    query: action.query
  })),
  on(ProductionActions.loadProductionById, (state, action) =>({
    ...state,
    id: action.id
  })),
  on(ProductionActions.loadProductionByIdSuccess, (state, action) =>({
    ...state,
    Production: action.production
  })),
  on(ProductionActions.createProduction, (state, action) =>({
    ...state,
    Production: action.production
  })),
  on(ProductionActions.addProduction, (state, action) =>({
    ...state,
    url: action.url
  })),
  on(ProductionActions.isLoadProduction, (state, action) =>({
    ...state,
    loadingProduction: action.loadingProduction
  })),

  on(ProductionActions.loadProductionSuccess, (state, action) =>
  ({...state,
  pageable: action.data,
  // page: action.data,
  })),
  on(ProductionActions.createProductionSuccess, (state, action) =>
  ({...state,
  production: action.production,
  // page: action.data,
  })),

  on(ProductionActions.loadProductionFailure, (state, action) => (
    {...state,
    error: action.error})),
  on(ProductionActions.deleteProduction, (state, action) =>({
      ...state,
      id: action.id
    })),
  on(ProductionActions.deleteProductionSuccess, (state, action) =>
    ({...state,
    // query: action.query

    })),
  on(ProductionActions.deleteProductionFailure, (state, action) => {
    return{...state,
     error: action.error

    }}),
);

