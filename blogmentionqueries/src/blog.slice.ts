import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface blogState {
  postId: string
}

const initialState: blogState = {
  postId: ''
}
const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    startEditPost: (state, action: PayloadAction<string>) => {
      state.postId = action.payload
    },
    cancelEditPost: (state) => {
      state.postId = ''
    }
  }
})

export const { startEditPost, cancelEditPost } = blogSlice.actions
const blogReducer = blogSlice.reducer
export default blogReducer
