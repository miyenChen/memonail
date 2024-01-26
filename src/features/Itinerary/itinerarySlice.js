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
        deleteItinerary(state, action) {
            const newData = state.itinerarys.filter((itinerary) => itinerary.id !== action.payload);
            state.itinerarys = newData;
        },
        updateFavorite(state, action) {
            const { id, favorite } = action.payload;
            const newData = state.itinerarys.map((itinerary) =>
                itinerary.id === id ? { ...itinerary, favorite: favorite } : itinerary
            );
            return { ...state, itinerarys: newData };
        },
    },
});

export const { addItinerary, deleteItinerary, updateFavorite } = itinerarysSlice.actions;
export default itinerarysSlice.reducer;
