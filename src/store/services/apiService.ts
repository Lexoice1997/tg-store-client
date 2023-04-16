import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Categories } from '../../types/Category';

export const apiService = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://kvartirabar.uz' }),
  tagTypes: ['Categories'],
  endpoints: (builder) => ({
    getAllCategories: builder.query<any, null>({
      query: () => '/category',
      providesTags: ['Categories'],
    }),
    getFoodsByCategoryId: builder.query<Categories[], string>({
      query: (categoryId) => ({
        url: `/category/${categoryId === '0' ? '' : categoryId}`,
        method: 'GET',
      }),
      providesTags: ['Categories'],
    }),
    search: builder.query<any, string>({
      query: (name) => ({ url: 'foods', method: 'GET', params: { name } }),
      providesTags: ['Categories'],
    }),
    postOrder: builder.mutation<any, any>({
      query: (credentials) => ({
        url: `/order`,
        method: 'POST',
        body: { ...credentials },
      }),
      invalidatesTags: ['Categories'],
    }),
  }),
});

export const { useGetAllCategoriesQuery, useGetFoodsByCategoryIdQuery, usePostOrderMutation } =
  apiService;
