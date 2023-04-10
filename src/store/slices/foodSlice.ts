import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Categories, Category } from '../../types/Category';

interface FoodState {
  data: Categories[];
  foods: any;
  categories: Category[];
  isLoading: boolean;
}

const initialState: FoodState = {
  data: [],
  foods: [],
  categories: [{ id: '0', name: 'Все' }],
  isLoading: false,
};

export const searchFoods = createAsyncThunk('foods/searchFoods', async (name: string, thunkAPI) => {
  try {
    const response = await axios.get(
      `https://kvartirabar.uz/menu/${name.length ? name : ':search'}`
    );
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось загрузить блюды');
  }
});

export const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    setFoods: (state, action: PayloadAction<Categories[] | Categories>) => {
      state.foods = [];
      if (Array.isArray(action.payload)) {
        action.payload.map((item) => state.foods.push(...item.menu));
      } else {
        state.foods = [...action.payload.menu];
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchFoods.fulfilled, (state, action: PayloadAction<any>) => {
      state.foods = action.payload;
    });
  },
});

export const { setFoods } = foodSlice.actions;

export default foodSlice.reducer;
