import {authSlice, createSlice} from '@reduxjs/toolkit';
const authSlice = createSlice({
    name:"auth",
    initialState:{
        login:{// hien thi ten tren web site 
            currentUser: null,// from backend to fetching the current user
            isFetching: false,
            error: false
        },
        register:{
            isFetching: false,
            error: false,
            success: false
        },
        logout:{
            isFetching:false,
            error: false
        }

    },
    reducers:{
        loginStart:(state)=>{
            state.login.isFetching= true;
        },
        loginSuccess: (state, action)=>{
            state.login.isFetching= false,
            state.login.error= false;
            state.login.currentUser= action.payload;
        },
        loginFailed:(state)=>{
            state.login.isFetching= false;
            state.login.error= false;
        },
        registerStart:(state)=>{
            state.register.isFetching= true;
        },
        registerSuccess:(state)=>{
            state.register.isFetching= false;
            state.register.error= false;
            state.register.success= true;
        },
        registerFailed:(state)=>{
            state.register.isFetching= false;
            state.register.error= true;
            state.register.success= false;
        },
        logoutSuccess:(state)=>{
            state.logout.error= false;
            state.logout.isFetching= false;
            state.login.currentUser= null;
        },
        logoutStart: (state)=>{
            state.logout.isFetching= true;
            state.logout.error= false;
        },
        logoutFailed: (state)=>{
            state.logout.isFetching= false;
            state.logout.error= false;
        }
    }
})
export const {
    loginStart,
    loginFailed,
    loginSuccess,
    registerFailed,
    registerStart,
    registerSuccess,
    logoutFailed,
    logoutStart,
    logoutSuccess
}= authSlice.actions;
export default authSlice.reducer;