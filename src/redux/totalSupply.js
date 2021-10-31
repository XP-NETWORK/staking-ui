import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  collection: [],
  selectedNFT: '',
  params: ''
}

export const totalSupplay = createSlice({
    name: 'totalSupply',
    initialState,
    reducers: {
       updateCollection(state, action){
          state.collection = [...state.collection, action.payload]
       },
       updateSelected(state, action){
         state.selectedNFT = action.payload
       },
       updateParams(state, action){
         state.params = action.payload
       }
    },
  })


export const { 
  updateCollection,
  updateSelected,
  updateParams
} = totalSupplay.actions

export default totalSupplay.reducer