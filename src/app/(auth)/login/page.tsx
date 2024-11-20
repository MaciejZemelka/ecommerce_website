"use client";

import Image from "next/image";
import { useState, useEffect, use} from "react";


import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from "@/app/store/slices/authSlice";
import { AppDispatch, RootState } from "@/app/store/store";


export default function Login() {
  const [eyeicon, setEyeicon] = useState("/IMG/eyeicon.png");
  const [eyeiconstatus, seteyeiconstatus] = useState(0);
  const [inputType, setInputType] = useState("password");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>(); 
  const { user, loading, error } = useSelector((state: RootState) => state.auth);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [LogError, setLogError] = useState("");
  //showPassword is function which is displaying or hiding the password for user.
  //if statement checks which state is now by checing eyeiconstatus then it changes this status, then image for it and input type of password field.
  const showPassword = () => {
    if (eyeiconstatus == 0) {
      seteyeiconstatus(1);
      setEyeicon("/IMG/noeyeicon.png");
      setInputType("text");

    }
    else {
      seteyeiconstatus(0);
      setEyeicon("/IMG/eyeicon.png");
      setInputType("password");
    }
  }

  //function post is creating request to backend with method post, content type of app/json and json text which have Email and Password typed by user. 
  //then when request has been created it is trying to fetch it and then depends of message from backend the user is logged or email/password is wrong.
  //if there is error with request then it will be displayed in console log. 



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);  
    try {
      await dispatch(loginUser({ Email, Password }));
      window.location.href = "/";
    } catch (error) {
      console.error('Login error:', error);
    }
    
    
  };

  //Use effect to see when loading is changed to false and if credentials are wrong then user will see proper alert. 
  useEffect(() => {
    if (!loading && formSubmitted) {
      if (error) {
        setLogError(error);
      }
      setFormSubmitted(false); 
    }
  }, [loading, error, formSubmitted]);

  return (
    <main className="bg-[#af0] h-[900px] overflow-hidden flex justify-center" id="bg_color">
      <div className="flex jusitfy-center items-center ">
        <div className=" h-[520px] bg-white text-center pt-[40px] text-[24px]">
          <p className="font-bold text-[30px]">Log In</p>
          <form onSubmit={handleSubmit} className="space-y-2">
            <input type="text" placeholder="email" className="w-[60%] px-[6px] py-[8px] border-[1px] border-black bglogin" onChange={(e) => setEmail(e.target.value)} />
            <input type={inputType} placeholder="password" id="password" className="w-[60%] py-[8px] px-[6px] border-[1px] border-black bglogin" onChange={(e) => setPassword(e.target.value)}></input>
            <button className="absolute mx-2  border-[1px] border-black bglogin" type="button" onClick={() => showPassword()}>
              <Image
                src={eyeicon}
                alt="eyeicon"
                width={52}
                height={52}
                id="showpass"
              />
            </button>
            <div className="">
              {LogError==="Wrong Email" ? (<p className="text-[15px] text-[#f00] text-left w-[80%] px-[20%]">Email doesn't match with any user</p>) : (<p></p>)}
              {LogError==="Wrong Password" ? (<p className="text-[15px] text-[#f00] text-left w-[80%] px-[20%]">Wrong password</p>) : (<p></p>)}
            </div>
            <div className="text-left w-[80%] px-[20%]">
              <a href="password" className="text-[15px] text-[#00f]">Forgot password?</a>
            </div>
            <div className="flex  w-[100%] px-[20%] items-center" >
              <div className="w-[50%] flex justify-between pr-[30px] ">
                <input type="checkbox" className="w-[15px] h-[15px] mt-[10px] bglogin" />
                <p className="text-[20px]">remember me</p>
              </div>
              <button className="w-[50%] border-[1px] border-black px-[10px] bglogin" type="submit">
                Log In
              </button>
              {loading && <span>Loading...</span>}
            </div>
          </form>
          <div className="py-[20px]">
            <hr className="border-[1px] border-[#AAA] w-[70%] mx-[15%] "></hr>
          </div>
          <div className="space-y-[10px] ">
            <p className="text-[22px] mb-[20px]">You don't have account? Make one!</p>
            <a href="/register">
              <button className="w-[50%] border-[1px] border-black px-[10px] bglogin">
                Sign Up
              </button>
            </a>
          </div>
        </div>
      </div>
    </main >
  );
}
