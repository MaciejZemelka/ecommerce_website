"use client";

import Image from "next/image";

import { useState } from "react";
import "../globals.css";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../store/slices/authSlice';
import { AppDispatch, RootState } from '../store/store';

export default function Home() {
    const [eyeicon, setEyeicon] = useState("/IMG/eyeicon.png");
    const [eyeiconstatus, seteyeiconstatus] = useState(0);
    const [inputType, setInputType] = useState("password");
    const [Username, setUsername] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [ConPassword, setConPassword] = useState("");
    const [registerError, setRegisterError] = useState("");
    const [EmailError, setEmailError] = useState(0);
    const dispatch = useDispatch<AppDispatch>(); 
     const { user, loading, error } = useSelector((state: RootState) => state.auth);

    const showPassword = () => {
        const element = document.querySelector("#password") as HTMLInputElement;
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

    const validateEmail = (Email: string) => {
        return String(Email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    
    const currentTime = () =>{
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate();
        let hour = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        let time=year+"-"+month+"-"+day+" "+hour+":"+minutes+":"+seconds;
        return time;
    }
    const register = async () => {
           
            setEmailError(0);
            const response = await fetch('https://localhost:7084/api/Registration/registration', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: 0,
                    Username: Username,
                    Email: Email,
                    Password: Password,
                    Permission: "user",
                    CreatedDate: currentTime()
                }),
            });
            
            const data = await response.text();
            if (data === "Error") {
                setRegisterError("Error")
            }
            else if (data === "Data inserted") {
                dispatch(loginUser({ Email, Password }))
                window.location.href = "/";
            }
    }


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setEmailError(0);
        if (!validateEmail(Email)) {
            setEmailError(1);
        }
        else  if (Password != ConPassword) {
            setRegisterError("diffpass");
        }
        else {
            setRegisterError("");
            register();
        }

    }

    return (
        <main className="bg-[#af0] h-[900px] overflow-hidden flex justify-center" id="bg_color">
            <div className="flex jusitfy-center items-center ">
                <div className=" h-[650px] bg-white text-center pt-[40px] text-[24px]">
                    <form onSubmit={handleSubmit} className="space-y-[10px]">
                        <p className="font-bold text-[30px]">Sign Up</p>
                        <input type="text" placeholder="username" className="w-[60%] px-[6px] py-[8px] border-[1px] border-black bglogin" required onChange={(e) => setUsername(e.target.value)} /><br />
                        <input type="text" placeholder="email" className="w-[60%] px-[6px] py-[8px] border-[1px] border-black bglogin" required onChange={(e) => setEmail(e.target.value)}  />
                        <input type={inputType} placeholder="password" id="password" className="w-[60%] py-[8px] px-[6px] border-[1px] border-black bglogin" required onChange={(e) => setPassword(e.target.value)} />
                        <button className="absolute mx-2  border-[1px] border-black bglogin" onClick={() => showPassword()} type="button">
                            <Image
                                src={eyeicon}
                                alt="eyeicon"
                                width={52}
                                height={52}
                                id="showpass"
                            />
                        </button><br />
                        <input type="password" placeholder="confirm password" id="confirm password" className="w-[60%] py-[8px] px-[6px] border-[1px] border-black bglogin" required onChange={(e) => setConPassword(e.target.value)} />
                        <div>
                            {registerError === "diffpass" ? (<p className="text-[15px] text-[#f00] text-left w-[80%] px-[20%]">Password doesn't match</p>) : (<p></p>)}
                            {EmailError === 1 ? (<p className="text-[15px] text-[#f00] text-left w-[80%] px-[20%]">It is not an email!</p>) : (<p></p>)}
                            {registerError === "Error" ? (<p className="text-[15px] text-[#f00] text-left w-[80%] px-[20%]">Something went wrong, try again later.</p>) : (<p></p>)}
                        </div>
                        <div className="  w-[100%] px-[20%] items-center text-center" >
                            <button className="w-[50%] border-[1px] border-black px-[10px] bglogin" type="submit">
                                Sign up
                            </button>
                        </div>
                    </form>
                    <div className="py-[20px]">
                        <hr className="border-[1px] border-[#AAA] w-[70%] mx-[15%] "></hr>
                    </div>
                    <div className="space-y-[20px]">
                        <p className="text-[22px] mb-[20px]">You already have account? Log in!</p>
                        <a href="login">
                            <button className="w-[50%] border-[1px] border-black px-[10px] bglogin">
                                Log In
                            </button>
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
