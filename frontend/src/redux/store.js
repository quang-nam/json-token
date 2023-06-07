// tookit co the truyen the truyen du lieu bat cu dau, de xai cac reducer
// tap hop all actions, pass all the reducer, include all the logic of the app
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from './authSlice'
import userReducer from './userSlice';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
  const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2
  }// cho cac reducer vao 
  const rootReducer= combineReducers({
    auth: authReducer,
    users: userReducer,
  })
  //persistReducer ( config, reducer)
  const persistedReducer = persistReducer(persistConfig, rootReducer)
  
    const store = configureStore(
      {reducer:persistedReducer});

   export let persistor = persistStore(store)
    export default store;

//  const store=  configureStore({
//   reducer:{
//     auth: authReducer, // logic login, log out 
//     users: userReducer
//   }
// })