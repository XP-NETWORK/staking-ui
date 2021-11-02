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
        const isInCollections = state.collection.map(n => n.token)
          const isInCollection = state.collection.filter(n => n.token == action.payload.token)[0]
          if(!isInCollection)
         state.collection = [...new Map([...state.collection, action.payload].map(item =>[item['token'], item])).values()].sort((a,b )=> parseInt(a.token) - parseInt(b.token))
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