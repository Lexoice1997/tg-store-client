import { combineReducers, configureStore } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { apiService } from './services/apiService';
import categoryReducer from './slices/categorySlice';
import foodReducer from './slices/foodSlice';
import orderReducer from './slices/orderSlice';

const rootReducer = combineReducers({
  category: categoryReducer,
  food: foodReducer,
  order: orderReducer,
  [apiService.reducerPath]: apiService.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiService.middleware),
    devTools: true,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
