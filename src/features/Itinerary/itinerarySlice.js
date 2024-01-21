import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    itinerarys: {
        status: 'todo',
        title: '我的標題',
        img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        dateCreated: '2000/01/01',
        dateStart: 'Start day',
        dateEnd: 'End day',
        timeline: [],
        favorite: 'false',
        shared: 'false',
        member: [],
    },
};
export const itinerarySlice = createSlice({ name: 'itinerarys', initialState, reducer: {} });

export const {} = itinerarySlice.actions;
export default itinerarySlice.reducer;
