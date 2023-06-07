import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAxios } from "../../createInstance";
import { getAllUsers, deleteUser } from "../../redux/apiRequest";
import { loginSuccess } from "../../redux/authSlice";
import "./home.css";


const HomePage = () => {
  // lay token 
  const user = useSelector((state)=> state.auth.login?.currentUser)// ? ko co ke no, chua login thu currentUser BANG NULL 
  // user từ backend đã có accesstoken nên chỉ cần user.accesstoken 
  const dispatch = useDispatch();
    const message = useSelector((state)=> state.users?.msg)
  const userList= useSelector(state=> state.users.users?.allusers)
  
  const navigate = useNavigate()
  let axiosJWT= createAxios(user, dispatch, loginSuccess)// login success take new data from user 
  //DUMMY DATA
  // const userData = [
  //   {
  //     username: "anhduy1202",
  //   },
  //   {
  //     username: "kelly1234",
  //   },
  //   {
  //     username: "danny5678",
  //   },
  //   {
  //     username: "kenny1122",
  //   },
  //   {
  //     username: "jack1234",
  //   },
  //   {
  //     username: "loi1202",
  //   },
  //   {
  //     username: "nhinhi2009",
  //   },
  //   {
  //     username: "kellynguyen1122",
  //   },
    
  // ];

  // ? optional chaining: khi null no ko render ra
  // ternary operator: if true else ...
  const handleDelete=(id)=>{
      console.log(id)
      deleteUser(user?.accessToken, dispatch,id,axiosJWT)
  }
 
  // interceptors trc khi send request thi no se check xem nhung ji trong use con han ko
  
  useEffect(()=>{
    if(!user){
      navigate("/login")
    } if(user?.accessToken){
      getAllUsers(user?.accessToken, dispatch, axiosJWT);
    }
  },[]);
  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-role">
        {`Your role: ${user?.admin ? 'Admin' : 'User'}`}
      </div>
      <div className="home-userlist">
        {userList?.map((user) => {
          return (
            <div className="user-container" key={user._id}>
              <div className="home-user">{user.username}</div>
              <div className="delete-user" 
                onClick={()=>handleDelete(user._id)}
              > Delete </div>
            </div>
          );
        })}
      </div>
      <div className="errorMsg">
      {message}
      </div>
    </main>
  );
};

export default HomePage;
