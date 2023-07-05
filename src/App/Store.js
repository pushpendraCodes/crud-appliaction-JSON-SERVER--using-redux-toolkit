import { configureStore } from '@reduxjs/toolkit'
import UserSlice from '../Features/UserSlice'
export const store = configureStore({
  reducer: {app:UserSlice},
})