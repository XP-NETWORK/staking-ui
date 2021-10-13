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
    tokensAmountFlag: false,
    withdrawed: false,
    index: 0,
    nftLoaders: [],
    isUnlocked: false
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
        addLoader(state, action){
            state.nftLoaders = [...state.tftLoaders, action.payload]
        },
        updateLoader(state, action){
            // SOONE
        },
        updateIsUnlocked(state, action){
            state.isUnlocked = action.payload
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
    updateTokensAmountFlag,
    updateIndex,
    updateWithdrawed,
    addLoader,
    updateIsUnlocked
} = stakeSlice.actions

export default stakeSlice.reducer