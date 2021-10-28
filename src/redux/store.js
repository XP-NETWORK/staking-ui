import { configureStore } from '@reduxjs/toolkit'
import counterSlice from './counterSlice'
import stakeSlice from './stakeSlice'
import totalSupply from './totalSupply'


export const store = configureStore({
    reducer: {
      data: counterSlice,
      stakeData: stakeSlice,
      totalSupply
    },
  })