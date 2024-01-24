import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    itinerarys: [],
};

export const itinerarysSlice = createSlice({
    name: 'itinerarys',
    initialState,
    reducers: {
        addItinerary(state, action) {
            state.itinerarys.push(action.payload);
        },
    },
});

export const { addItinerary, test } = itinerarysSlice.actions;
export default itinerarysSlice.reducer;
