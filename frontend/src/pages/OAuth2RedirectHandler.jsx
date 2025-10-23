
import { useLocation ,useNavigate } from "react-router-dom";
import { useEffect } from "react";
import api from "../api";
import { useDispatch } from "react-redux";
import { login } from "../storages/userSlice";
function OAuth2RedirectHandler() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch= useDispatch();
  useEffect(() =>{
    const param = new URLSearchParams(location.search)
    const token = param.get("token")
    console.log("token" + token)
    const fetchLogin = async ()=>{
      try {
        const response = await api.post("/auth/login/google",{
          token
        })
        localStorage.setItem("token",response.data.result.accessToken);
            dispatch(login({
                    avatar:response.data.result.avatar,
                    firstName:response.data.result.firstName,
                    lastName:response.data.result.lastName,
                    roles:response.data.result.roles,
                    userId:response.data.result.userId
                  }))
            
        
        navigate("/")
        }catch(error){ 
          console.log(error)
          navigate("/login")
        }
    } 
    if(token){
    fetchLogin();
    }else{
      navigate("/login");
    }
  },[location])

 

  return <div>Đang đăng nhập...</div>;
}

export default OAuth2RedirectHandler;
