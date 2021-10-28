import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    amount: '',
    duration: '',
    startDate: '',
    startTime: '',
    nftTokenId: '',
    nftTokenIndex: '',
    availableRewards: "",
    tokensArray: '',
    tokensAmount: '',
    agreement: true,
    tokensAmountFlag: false,
    withdrawed: false,
    index: 0,
    isUnlocked: false,
    image: []
}

export const stakeSlice = createSlice({
    name: 'stakeData',
    initialState,
    reducers: {
        updateAmount(state, action){
             state.amount = action.payload
        },
        updateWithdrawnAmount(state, action) {
            console.log(action.payload, '1kl31kll')
            state.rewardWithdrawn = action.payload
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
            state.nftTokenIndex = action.payload
        },
        updateTokensArray(state, action){
            state.tokensArray = action.payload
        },
        updateTokensAmount(state, action){
            state.tokensAmount = action.payload
        },
        updateTokensAmountFlag(state, action){
            state.tokensAmountFlag = action.payload
        },
        updateIndex(state, action){
            state.index = action.payload
        },
        updateWithdrawed(state, action){
            state.withdrawed = action.payload
        },
        updateIsUnlocked(state, action){
            state.isUnlocked = action.payload
        },
        updateImage(state, action){

            state.image = [...new Map([...state.image, action.payload].map(item =>[item['token'], item])).values()]
        }
    },
  })


export const { 
    updateAmount,
    updateDuration,
    updateStartDate,
    updateStartTime,
    updateNftTokenId,
    updateAvailableRewards,
    updateNftTokenIndex,
    updateTokensArray,
    updateTokensAmount,
    updateIndex,
    updateWithdrawed,
    updateIsUnlocked,
    updateWithdrawnAmount,
    updateImage
} = stakeSlice.actions

export default stakeSlice.reducer