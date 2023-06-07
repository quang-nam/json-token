import {createSlice} from '@reduxjs/toolkit'
const userSlice = createSlice({
    name:'users',
    initialState:{
        users:{
            allusers: null,
            isFetching: false,
            error: false
        },
        msg:""
    },
    reducers:{
        getUsersStart: (state)=>{
            state.users.isFetching= true;
        },
        getUsersSuccess: (state, action)=>{
            state.users.allusers= action.payload;
            state.users.isFetching= false;
            state.users.error= false;
        },
        getUsersFailed:(state)=>{
            state.users.isFetching= false;
            state.users.error= true;
        },
        deleteUserStart: (state)=>{
            state.users.isFetching= true;
    },
        deleteUserSuccess: (state,action)=>{
            state.users.isFetching= false;
            state.msg= action.payload
        },
        deleteUserFailed: (state,action)=>{
            state.users.isFetching=false;
            state.users.error= true;
            state.msg= action.payload
        }
    }    
})
export const{
    getUsersFailed,
    getUsersStart,
    getUsersSuccess,
    deleteUserStart,
    deleteUserSuccess,
    deleteUserFailed
}= userSlice.actions;// all actions 
export default userSlice.reducer;