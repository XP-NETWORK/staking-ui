import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  collection: [],
  selectedNFT: '',
  loaded: 'false',
  arraAVG:[],
}

export const totalSupplay = createSlice({
    name: 'totalSupply',
    initialState,
    reducers: {
       updateCollection(state, action) {
        state.collection = [action.payload]
       },
       updateManyCollection(state, action) {
         state.collection = 
       [...new Map([...state.collection, ...action.payload].map(item =>[item['token'], item])).values()]
       .sort((a,b )=> parseInt(a.token) - parseInt(b.token))
       
      },
       updateSelected(state, action){
         state.selectedNFT = action.payload
       },
       updateSelectedNFTSTaker(state, action){
        state.selectedNFTStaker = action.payload
       },
       updateLoaded(state, action){
         state.loaded = action.payload
       },
       setAvgObj(state, action){
        state.arraAVG = [...state.arraAVG, action.payload]
       }
    },
})


export const { 
  setAvgObj,
  updateSelectedNFTSTaker,
  updateCollection,
  updateSelected,
  updateManyCollection,
  updateLoaded

} = totalSupplay.actions

export default totalSupplay.reducer