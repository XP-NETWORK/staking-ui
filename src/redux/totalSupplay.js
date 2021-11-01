import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  collection: [],
  selectedNFT: '',
  loaded: 'false'
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
       updateLoaded(state, action){
         state.loaded = action.payload
       }
    },
  })


export const { 
  updateCollection,
  updateSelected,
  updateLoaded

} = totalSupplay.actions

export default totalSupplay.reducer