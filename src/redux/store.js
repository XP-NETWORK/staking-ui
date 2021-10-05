import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './counterSlice'
import stakeSlice from './stakeSlice'


export const store = configureStore({
    reducer: {
      data: counterSlice,
      stakeData: stakeSlice
    },
  })