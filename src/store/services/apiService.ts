import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Food } from '../../types/Food';
import { setFoods } from '../slices/foodSlice';

export const apiService = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  tagTypes: ['Categories'],
  endpoints: (builder) => ({
    getAllCategories: builder.query<any, null>({
      query: () => '/categories',
      providesTags: ['Categories'],
    }),
    getFoodsByCategoryId: builder.query<Food[], string>({
      query: (categoryId) => ({
        url: `/foods`,
        method: 'GET',
        params: { categoryId },
        async onQueryStarted(_: any, { dispatch }: any) {
          dispatch(setFoods(''));
        },
      }),
      providesTags: ['Categories'],
    }),
    search: builder.query<any, string>({
      query: (name) => ({ url: 'foods', method: 'GET', params: { name } }),
      providesTags: ['Categories'],
    }),
  }),
});

export const { useGetAllCategoriesQuery, useGetFoodsByCategoryIdQuery } = apiService;
