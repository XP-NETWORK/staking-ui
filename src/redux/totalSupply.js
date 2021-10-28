import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  collection: []
}

export const totalSupplay = createSlice({
    name: 'totalSupply',
    initialState,
    reducers: {
       updateCollection(state, action){
          state.collection = [...state.collection, action.payload]
       }
    },
  })


export const { 
  updateCollection
} = totalSupplay.actions

export default totalSupplay.reducer