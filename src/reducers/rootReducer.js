import { createSlice } from '@reduxjs/toolkit'

export const rootReducer = createSlice({
  name: 'rootReducer',

  initialState: {
    originalData: [],
    currentData: [],
    selectedFilters: {},
    ratingsHistogramData: [],
    datesHistogramData: [],
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
    setRatingsHistogramData: (state, action) => {
      state.ratingsHistogramData = action.payload;
    },
    setDatesHistogramData: (state, action) => {
      state.datesHistogramData = action.payload;
    },
  },
})

// Action creators are generated for each case reducer function
export const { 
  setCurrentData, 
  setOriginalData,
  setSelectedFilters,
  setRatingsHistogramData,
  setDatesHistogramData,
} = rootReducer.actions

export default rootReducer.reducer