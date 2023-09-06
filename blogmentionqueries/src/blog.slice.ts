import { createSlice } from '@reduxjs/toolkit'

interface blogState {
  postId: string
}

const initialState: blogState = {
  postId: ''
}
const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {}
})

const blogReducer = blogSlice.reducer
export default blogReducer
