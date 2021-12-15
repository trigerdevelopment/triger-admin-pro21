import { createAction, props } from "@ngrx/store";
import { Pageable } from "src/app/models/customer";

export const loadWhareHouseMov = createAction(
  '[Whare House Filter Component] Load Movements Whare House',
  props<{query:any}>()
);

export const loadWhareHouseSuccess = createAction(
  '[WhareHouse Effects] Load WhareHouse Success',
  props<{ data: Pageable }>()
);
