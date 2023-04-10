import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Food {
  id: string;
  name: string;
  price: string;
}

interface FoodOrder {
  food: Food;
  count: number;
}

interface OrderState {
  order: FoodOrder[];
}

const initialState: OrderState = {
  order: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    incrementOrder: (state, action: PayloadAction<FoodOrder>) => {
      const alreadyAdded = state.order.find((item) => action.payload.food.id === item.food.id);
      if (alreadyAdded) {
        state.order.forEach((item) => {
          if (item.food.id === action.payload.food.id) {
            item.count += action.payload.count;
          }
        });
      } else {
        state.order?.push(action.payload);
      }
    },
    decrementOrder: (state, action: PayloadAction<FoodOrder>) => {
      state.order.forEach((item) => {
        if (item.food.id === action.payload.food.id) {
          item.count -= action.payload.count;
        }
      });
    },
  },
});

export const { incrementOrder, decrementOrder } = orderSlice.actions;

export default orderSlice.reducer;
