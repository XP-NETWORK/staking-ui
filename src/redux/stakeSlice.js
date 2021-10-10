import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    amount: '',
    duration: '',
    startDate: '',
    startTime: '',
    nftTokenId: '',
    nftTokenIndex: '',
    availableRewards: "",
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
        },
        updateNftTokenId(state, action){
            state.nftTokenId = action.payload
        },
        updateAvailableRewards(state, action){
            state.availableRewards = action.payload
        },
        updateNftTokenIndex(state, action){
            state.nftTokenIndex = parseInt(action.payload)
        },
    },
  })


export const { 
    updateAmount,
    updateDuration,
    updateStartDate,
    updateStartTime,
    updateNftTokenId,
    updateAvailableRewards,
    updateNftTokenIndex
} = stakeSlice.actions

export default stakeSlice.reducer