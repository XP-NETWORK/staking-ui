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
    stakeInfo: '',
    chainId: '',
    aproveLoader: false,
    lockLoader: false,
    picPositionX: 0,
    provider: ''
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
      updateStakeInfo(state, action){
        state.stakeInfo = action.payload
      },
      updateChainId(state, action){
        state.chainId = action.payload
      },
      updateAproveButtonsLoader(state, action){
        state.aproveLoader = action.payload
      },
      updateAproveLockLoader(state, action){
        state.lockLoader = action.payload
      },
      goForth(state, action){
        state.picPositionX = state.picPositionX - (292 * (action.payload ? action.payload : 1))
      },
      goBack(state, action){
        state.picPositionX = state.picPositionX + (292 * (action.payload ? action.payload : 1))
      },
      chengePositionX(state, action){
        state.picPositionX = action.payload
      },
      setProvide(state, action){
        state.provider = action.payload
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
  updateStakeInfo,
  updateChainId,
  updateAproveButtonsLoader,
  updateAproveLockLoader,
  goForth,
  goBack,
  chengePositionX,
  setProvide
} = counterSlice.actions

export default counterSlice.reducer