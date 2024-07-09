"use client";

import Image from "next/image";

import { useState } from "react";
import "../globals.css";

export default function Home() {
    const [eyeicon, setEyeicon] = useState("/IMG/eyeicon.png");
    const [eyeiconstatus, seteyeiconstatus] = useState(0);
    const [inputType, setInputType] = useState("password");

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
    return (
        <main className="bg-[#af0] h-[900px] overflow-hidden flex justify-center" id="bg_color">
            <div className="flex jusitfy-center items-center ">
                <div className=" h-[650px] bg-white text-center pt-[40px] text-[24px] space-y-[10px]">
                    <p className="font-bold text-[30px]">Sign Up</p>
                    <input type="text" placeholder="username" className="w-[60%] px-[6px] py-[8px] border-[1px] border-black bglogin" /><br />
                    <input type="text" placeholder="email" className="w-[60%] px-[6px] py-[8px] border-[1px] border-black bglogin" />
                    <input type={inputType} placeholder="password" id="password" className="w-[60%] py-[8px] px-[6px] border-[1px] border-black bglogin"></input>
                    <button className="absolute mx-2  border-[1px] border-black bglogin" onClick={() => showPassword()}>
                        <Image
                            src={eyeicon}
                            alt="eyeicon"
                            width={52}
                            height={52}
                            id="showpass"
                        />
                    </button><br />
                    <input type="password" placeholder="confirm password" id="confirm password" className="w-[60%] py-[8px] px-[6px] border-[1px] border-black bglogin"></input>
                    <div className="text-left w-[80%] px-[20%]">
                        <a href="password" className="text-[15px] text-[#00f]">Forgot password?</a>
                    </div>
                    <div className="flex  w-[100%] px-[20%] items-center" >
                        <div className="w-[50%] flex justify-between pr-[30px] ">
                            <input type="checkbox" className="w-[15px] h-[15px] mt-[10px] bglogin" />
                            <p className="text-[20px]">remember me</p>
                        </div>
                        <button className="w-[50%] border-[1px] border-black px-[10px] bglogin">
                            Log In
                        </button>
                    </div>
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
