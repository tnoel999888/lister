import { createSlice } from '@reduxjs/toolkit'

export const rootReducer = createSlice({
  name: 'rootReducer',

  initialState: {
    originalData: [],
    currentData: [],
    selectedFilters: {},
    histogramData: [],
  },
  
  reducers: {
    setCurrentData: (state, action) => {
      state.currentData = action.payload;
    },
    setOriginalData: (state, action) => {
      state.originalData = action.payload;
    },
    setSelectedFilters: (state, action) => {
      state.selectedFilters = action.payload;
    },
    setHistogramData: (state, action) => {
      state.histogramData = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { 
  setCurrentData, 
  setOriginalData,
  setSelectedFilters,
  setHistogramData,
} = rootReducer.actions

export default rootReducer.reducer