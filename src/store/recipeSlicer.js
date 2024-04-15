import { createSlice } from '@reduxjs/toolkit'
import { AddictedTransform, MlToGr, GrToMl } from '../Utils/Helpers'

export const recipeSlice = createSlice({
    name: 'recipe',
    initialState: {
        ml: 100,
        ves: 100,
        kakao: 50,
        maslo: 25,
        pudra: 25
    },
    reducers: {
      setMl: (state, action) => {
        state.ml = action.payload
        state.ves = MlToGr(state.ml)

      },
      setVes: (state, action) => {
        state.ves = action.payload
        state.ml = GrToMl(state.ves)
      },
      setKakao: (state, action) => {
        const transformedIngrs = AddictedTransform(action.payload, state.maslo, state.pudra)
        state.kakao = transformedIngrs[0]
        state.maslo = transformedIngrs[1]
        state.pudra = transformedIngrs[2]
      },
      setMaslo: (state, action) => {
        const transformedIngrs = AddictedTransform(action.payload, state.kakao, state.pudra)
        state.kakao = transformedIngrs[1]
        state.maslo = transformedIngrs[0]
        state.pudra = transformedIngrs[2]
      },
      setPudra: (state, action) => {
        const transformedIngrs = AddictedTransform(action.payload, state.maslo, state.kakao)
        state.kakao = transformedIngrs[2]
        state.maslo = transformedIngrs[1]
        state.pudra = transformedIngrs[0]
      },
    }
  })
  
  export const { setMl, setVes, setKakao, setMaslo, setPudra } = recipeSlice.actions
  
  export default recipeSlice.reducer