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
       updateCollection(state, action) {
        state.collection = [action.payload]
       },
       updateManyCollection(state, action) {
         console.log("before",state.collection);
         debugger
         state.collection = 
       [...new Map([...state.collection, ...action.payload].map(item =>[item['token'], item])).values()]
       .sort((a,b )=> parseInt(a.token) - parseInt(b.token))
       console.log("after", state.collection);
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
  updateManyCollection,
  updateLoaded

} = totalSupplay.actions

export default totalSupplay.reducer