import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dataType: 'new',
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
        updateItinerary(state, action) {
            const { id = action.payload.id } = action.payload;
            const newData = state.itinerarys.map((itinerary) =>
                itinerary.id === id ? { ...itinerary, ...action.payload } : itinerary
            );
            return { ...state, itinerarys: newData };
        },
        updateFavorite(state, action) {
            const { id, favorite } = action.payload;
            const newData = state.itinerarys.map((itinerary) =>
                itinerary.id === id ? { ...itinerary, favorite: favorite } : itinerary
            );
            return { ...state, itinerarys: newData };
        },
        updateDataType(state, action) {
            if (action.payload === 'new' || action.payload === 'already') {
                state.dataType = action.payload;
            } else {
                throw new Error('updateDataType 請傳入 new / already');
            }
        },
    },
});

export const { addItinerary, deleteItinerary, updateItinerary, updateFavorite, updateDataType } =
    itinerarysSlice.actions;
export default itinerarysSlice.reducer;
