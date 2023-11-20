import { configureStore } from '@reduxjs/toolkit'
import root from '../Redux/Reducer/index';
export default configureStore({
    reducer: root,
})