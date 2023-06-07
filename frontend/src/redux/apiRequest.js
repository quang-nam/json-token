import axios from 'axios';
import {loginFailed, loginStart, loginSuccess, logoutFailed, logOutStart, logOutSuccess, registerFailed, registerStart, registerSuccess} from './authSlice'
import { deleteUserFailed, deleteUserStart, deleteUserSuccess, getUsersFailed, getUsersStart, getUsersSuccess } from './userSlice';


// export const loginUser = async (user, dispatch, navigate)=>{
//     dispatch(loginStart());// gui loading đi 
//     try{
//         const res= await axios.post('/v1/auth/login',user);// post user vì chứa pass, username 
//         dispatch(loginSuccess(res.data));// thuc hien function, api gui ve 
//         navigate("/")// dieu huong function
//     }catch(err){
//         dispatch(loginFailed())
//     }
// };
// goi api
export const loginUser = async(user, dispatch,navigate)=>{
    dispatch(logOutStart());
    try {
        const res= await axios.post('v1/auth/login',user);
        dispatch(loginSuccess(res.data));
        navigate('/')
    } catch (error) {
        dispatch(loginFailed())
    }
}
export const registerUser= async(user, dispatch, navigate)=>{// function register with 3 parameters
    dispatch(registerStart());
    try{
         await axios.post("/v1/auth/register", user);
        dispatch(registerSuccess());
        navigate("/login");
    }catch(err){
        dispatch(registerFailed())
    }
};
// phai co token 
// header: accessToken, axios, dispatch chuyển đến 
export const getAllUsers= async(accessToken, dispatch,axiosJWT)=>{
    dispatch(getUsersStart());
    try{
        const res= await axiosJWT.get("/v1/user",{
            headers:{token:`Bearer ${accessToken}`}
        })
        dispatch(getUsersSuccess(res.data));// return the http response at the server we requested
    }catch(err){
        dispatch(getUsersFailed(err.response.data))
    }
};

// delete user : id 
  export const deleteUser= async(accessToken, dispatch,id,axiosJWT)=>{
    dispatch(deleteUserStart());
    try{
        const res= await axiosJWT.delete("/v1/user/"+id,{
         
            headers:{token:`Bearer ${accessToken}`}
        })
        dispatch(deleteUserSuccess(res.data));
    }catch(err){
        dispatch(deleteUserFailed(err.response.data)); // lay json err message
    }
  };

export const logOut=async(dispatch, id, navigate, token, axiosJWT)=>{
    dispatch(logOutStart())
    try {
        await axiosJWT.post('/v1/auth/logout',id,{
            headers:{token:`Bearer ${token}`}
        })
        dispatch(logOutSuccess())
        navigate('/login')
    } catch (error) {
        dispatch(logoutFailed())
    }
}
  