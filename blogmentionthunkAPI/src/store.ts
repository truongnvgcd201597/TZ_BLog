import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import blogSlice from 'blog.slice'

export const store = configureStore({
  reducer: {
    blog: blogSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()
