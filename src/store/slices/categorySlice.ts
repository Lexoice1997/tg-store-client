import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CategoryState {
  categoryId: string;
  categoryName: string;
}

const initialState: CategoryState = {
  categoryId: '',
  categoryName: 'Все',
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<string>) => {
      state.categoryId = action.payload;
    },
    setCategoryName: (state, action: PayloadAction<string>) => {
      state.categoryName = action.payload;
    },
  },
});

export const { setCategoryId, setCategoryName } = categorySlice.actions;

export default categorySlice.reducer;
