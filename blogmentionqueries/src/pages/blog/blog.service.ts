import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Post } from 'types/type'
import { CustomError } from 'utils/helper'

export const blogApi = createApi({
  reducerPath: 'blogAPI', // Field name in redux state
  tagTypes: ['Posts'],
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  endpoints: (builder) => ({
    getPost: builder.query<Post[], void>({
      query: () => 'posts',
      providesTags(result) {
        if (result) {
          const final = [
            ...result.map(({ id }) => ({ type: 'Posts' as const, id })),
            { type: 'Posts' as const, id: 'LIST' }
          ]
          return final
        }
        const final = [{ type: 'Posts' as const, id: 'LIST' }]
        return final
      }
    }),
    addPost: builder.mutation<Post, Omit<Post, 'id'>>({
      query(body) {
        try {
          return {
            url: 'posts',
            method: 'POST',
            body
          }
        } catch (error: any) {
          throw new CustomError(error.message)
        }
      },
      invalidatesTags: (result, error, body) => [{ type: 'Posts', id: 'LIST' }]
    }),
    getPosts: builder.query<Post, string>({
      query: (id) => `posts/${id}`
    }),
    updatePost: builder.mutation<Post, { id: string; body: Post }>({
      query(data) {
        return {
          url: `posts/${data.id}`,
          method: 'PUT',
          body: data.body
        }
      },
      invalidatesTags: (result, error, data) => (error ? [] : [{ type: 'Posts', id: data.id }])
    }),
    deletePost: builder.mutation<{}, string>({
      query(id) {
        return {
          url: `posts/${id}`,
          method: 'DELETE'
        }
      },
      // Trong trường hợp này thì getPosts sẽ chạy lại
      invalidatesTags: (result, error, id) => [{ type: 'Posts', id }]
    })
  })
})

export const { useGetPostQuery, useAddPostMutation, useGetPostsQuery, useUpdatePostMutation, useDeletePostMutation } =
  blogApi
