import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface FoodState {
  foods: any;
}

const initialState: FoodState = {
  foods: null,
};

export const searchFoods = createAsyncThunk('foods/searchFoods', async (name: string, thunkAPI) => {
  try {
    const response = await axios.get(`http://localhost:5000/foods/search`, {
      params: { name },
    });
    return response.data;
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось загрузить блюды');
  }
});

export const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    setFoods: (state, action: PayloadAction<any>) => {
      state.foods = action.payload;
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
