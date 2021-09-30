import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    connected: false,
    duration: 3,
}

export const counterSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
      chengeStatus(state, action){
        state.connected = action.payload
      },
      changeDuraion(state, action){
        state.duration = action.payload 
      },
    },
  })

  // Action creators are generated for each case reducer function
export const { chengeStatus, changeDuraion } = counterSlice.actions

export default counterSlice.reducer