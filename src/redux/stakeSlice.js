import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    amount: '',
    duration: '',
    startDate: '',
    startTime: ''
}

export const stakeSlice = createSlice({
    name: 'stakeData',
    initialState,
    reducers: {
        updateAmount(state, action){
             state.amount = action.payload
        },
        updateDuration(state, action){
             state.duration = action.payload
        },
        updateStartDate(state, action){
            state.startDate = action.payload
        },
        updateStartTime(state, action){
            state.startTime = action.payload
        }
    },
  })


export const { 
    updateAmount,
    updateDuration,
    updateStartDate,
    updateStartTime
} = stakeSlice.actions

export default stakeSlice.reducer