import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    dataType: 'new',
    itinerarys: [
        {
            id: 'f2935a47-e3d7-433b-9c5d-308efe081436',
            status: 'Todo',
            title: '台北兩日遊',
            dateCreated: '2024/2/2',
            startDate: '2024/2/14',
            endDate: '2024/2/15',
            totalDays: 2,
            schedules: [
                {
                    cardID: '852b7173-b6cf-483e-9df9-0501ac780f90',
                    day: 0,
                    time: '無',
                    locInfo: {
                        id: '456',
                        name: '擎天崗',
                        position: [21, 30],
                        address: '',
                        rating: 4,
                        tags: ['未分類'],
                        content: '擎天崗',
                        memosID: ['123'],
                    },
                },

                {
                    cardID: 'f406f441-1cbf-40ed-8f12-8f8a57084ac3',
                    day: 1,
                    time: '無',
                    locInfo: {
                        id: '123',
                        name: '台北',
                        position: [20, 50],
                        address: '',
                        rating: 2,
                        tags: ['coffee'],
                        content: '#coffee 台北',
                        memosID: ['456', '123'],
                    },
                },
            ],
            favorite: true,
        },
    ],
};

export const itinerarysSlice = createSlice({
    name: 'itinerarys',
    initialState,
    reducers: {
        addItinerary(state, action) {
            state.itinerarys.push(action.payload);
            console.log(state.itinerarys);
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
