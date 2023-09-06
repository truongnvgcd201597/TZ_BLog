import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post } from 'types/type'

export const blogApi = createApi({
  reducerPath: 'blogAPI', // Field name in redux state
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  endpoints: (builder) => ({
    getPost: builder.query<Post[], void>({
      query: () => 'posts'
    })
  })
})

export const { useGetPostQuery } = blogApi
