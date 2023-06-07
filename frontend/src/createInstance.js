import axios from 'axios';
import jwt_decode from 'jwt-decode';

// const refreshToken = async()=>{
//     try{
//         const res= await axios.post("/v1/auth/refreshToken",{
//             // có cookie có thể gắn vào 
//             withCredentials:true,
//         })
//         return res.data;// refresh token mới và access token mới 
//     }catch(err){
//         console.log(err)
//     }
//   }
const refreshToken = async()=>{
  try {
    const res= await axios.post("/v1/auth/refreshToken",{
      withCredentials:true,
    })
    return res.data;
  } catch (error) {
    console.log(error)
  }
}
  // viết token cho back end, kiểm tra xem token còn hạn không 
export const createAxios= (user,dispatch, stateSuccess)=>{
    // const newInstance= axios.create();// create new instance of axios with a custom config
    // newInstance.interceptors.request.use(
    //     async(config)=>{
    //       // check token xem con han ko 
    //       let date= new Date()
    //       const decodedToken = jwt_decode(user?.accessToken);// take time tu accessToken
    //       if(decodedToken.exp < date.getTime()/1000){// exp /1000 
    //           const data= await refreshToken();
    //           const refreshUser={
    //             ...user,// giu lai nhung cai cu
    //             accessToken: data.accessToken,// data return access token va refreshToken
    //             // refreshToken nam trong cookie roi 
    //           };
    //           dispatch(stateSuccess(refreshUser));
    //           config.headers['token']= "Bearer"+ data.accessToken;// bo headers cua accessToken
    //       }
    //           return config;
    //     }, // neu nhu bi loi 
    //     (err)=>{
    //       return Promise.reject(err);
    //     }
    //   )
    //   return newInstance;
    const newInstance = axios.create();
    newInstance.interceptors.request.use(
      async(config)=>{
        // check date
        let date = new Date();
        const decodedToken= jwt_decode(user?.accessToken);
        if(decodedToken.exp <date.getTime()/1000){
          const newFreshToken = new refreshToken();// contain new access token 
          const newToken ={
            ...user,
            accessToken: newFreshToken.accessToken
          };
          dispatch(stateSuccess(newToken));
          config.headers['token']= "Bearer"+ newFreshToken.accessToken;
          
        }
        return config;
      }, (err)=>{
        return Promise.reject(err)
      }
    )
}