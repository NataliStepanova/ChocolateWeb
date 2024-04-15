import { configureStore } from '@reduxjs/toolkit'
import recipeSlicer from './recipeSlicer'

export default configureStore({
  reducer: {
    recipe: recipeSlicer
  }
})