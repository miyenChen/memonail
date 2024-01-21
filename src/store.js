import { configureStore } from '@reduxjs/toolkit';
import memosReducer from './features/memo/memosSlice';
import locationsReducer from './features/map/locationsSlice';
import mapsReducer from './features/map/mapsSlice';
import itineraryReducer from './features/itinerary/ItinerarySlice';

export default configureStore({
    reducer: {
        memos: memosReducer,
        locations: locationsReducer,
        maps: mapsReducer,
        itinerarys: itineraryReducer,
    },
});
