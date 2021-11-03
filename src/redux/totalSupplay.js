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
        //   const isInCollection = state.collection.filter(n => n.token == action.payload.token)[0]
        //   if(!isInCollection)
        //  state.collection = [...state.collection, action.payload].sort((a,b )=> parseInt(a.token) - parseInt(b.token))
        state.collection = action.payload
       },
       updateManyCollection(state, action) {
        // console.log(action.payload, 'sakdldsalkadsklkdsal')
       state.collection = 
       [...new Map([...state.collection, ...action.payload].map(item =>[item['token'], item])).values()]
       .sort((a,b )=> parseInt(a.token) - parseInt(b.token))
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