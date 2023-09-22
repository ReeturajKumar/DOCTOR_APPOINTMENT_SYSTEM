import {configureStore} from '@reduxjs/toolkit';
import { alertSlice } from './alertSlic';

export default configureStore ({
    reducer: {
        alerts:alertSlice.reducer
    },
});