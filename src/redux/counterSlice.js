import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    connected: false,
    duration: 3,
    startDate: '',
    stakingAmount: 0,
    account: '',
    balance: 0,
    approved: false,
    allowence: '',
    agreement: false,
    currentPrice: '',
    tokenIDs:'',
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
      getActualTime(state, action){
        state.startDate = action.payload
      },
      changeStakingAmount(state, action){
        state.stakingAmount = action.payload
      },
      updateAccount(state, action){
        state.account = action.payload
      },
      updateBalance(state, action){
        state.balance = action.payload
      },
      updateApproved(state, action){
        state.approved = action.payload
      },
      updateAllowence(state, action){
        state.allowence = action.payload
      },
      updateAgreement(state){
        state.agreement = !state.agreement
      },
      updateCurrentPrice(state, action){
        state.currentPrice = action.payload
      },
      updateTokenIDs(state, action){
        state.tokenIDs = [...state.tokenIDs, action.payload]
      }
    },
  })


export const { 
  chengeStatus,
  changeDuraion,
  getActualTime,
  changeStakingAmount,
  updateAccount,
  updateBalance,
  updateApproved,
  updateAllowence,
  updateAgreement,
  updateCurrentPrice,
  updateTokenIDs
} = counterSlice.actions

export default counterSlice.reducer