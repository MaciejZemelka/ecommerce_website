"use client";

import Image from "next/image";

import { ChangeEvent, useState } from "react";

import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from "@/app/store/slices/authSlice";
import { AppDispatch, RootState } from "@/app/store/store";

export default function Home() {
    const [eyeicon, setEyeicon] = useState("/IMG/eyeicon.png");
    const [eyeiconstatus, seteyeiconstatus] = useState(0);
    const [inputType, setInputType] = useState("password");
    const [Username, setUsername] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [ConPassword, setConPassword] = useState("");
    const [PassisValid, setIsPassValid] = useState(0);
    const [registerError, setRegisterError] = useState("");
    const [EmailError, setEmailError] = useState(0);
    const [registerButtonColor, setRBC] = useState("bg-[#fFF]");

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

    const validateEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
        let newEmail = e.target.value
        let isValid = String(newEmail)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );

        const isEmailValidWarningText = document.querySelector("#ivemail");
        if (isValid || !newEmail) {
            setEmailError(0);
            if (!isEmailValidWarningText?.classList.contains("hidden"))
                isEmailValidWarningText?.classList.add("hidden");
        }
        else {
            setEmailError(1);
            isEmailValidWarningText?.classList.remove("hidden");
        }


        return isValid;
    };

    const currentTime = () => {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        let time = year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
        return time;
    }
    const register = async () => {

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

        if (EmailError == 1) {
            alert("Email is invalid")
        } else
            if (PassisValid == 0) {
                setRegisterError("PassNotValid")
                alert("Password does not meet the requirements");
            } else
                if (Password != ConPassword) {
                    setConPassword("");
                    setRegisterError("diffpass");
                }
                else {
                    setEmailError(0);
                    setRegisterError("");
                    register();
                }


    }

    const validatePassword = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
        const pass = e.target.value;
        let hidden = "hidden";
        const cls = [hidden];

        //v stands for Valid
        let vLenght = 0;
        let vULC = 0;
        let vNum = 0;
        let vSpecial = 0;

        document.querySelector("#PassLength")?.classList.remove(...cls);
        document.querySelector("#PassULC")?.classList.remove(...cls)
        document.querySelector("#PassNum")?.classList.remove(...cls)
        document.querySelector("#PassSpecial")?.classList.remove(...cls)

        if (pass.length >= 12) {
            document.querySelector("#PassLength")?.classList.add(hidden);
            vLenght = 1;
        }
        if (/[A-Z]/.test(pass) && /[a-z]/.test(pass)) {
            document.querySelector("#PassULC")?.classList.add(hidden);
            vULC = 1;
        }
        if (/\d/.test(pass)) {
            document.querySelector("#PassNum")?.classList.add(hidden);
            vNum = 1;
        }
        if (/[!@#$%^&*(),.?":{}|<>]/.test(pass)) {
            document.querySelector("#PassSpecial")?.classList.add(hidden);
            vSpecial = 1;
        }

        if (vLenght == 1 && vULC == 1 && vNum == 1 && vSpecial == 1) {
            document.querySelector("#passwordRequirements")?.classList.add("hidden");
            setIsPassValid(1);
        }
        else {
            document.querySelector("#passwordRequirements")?.classList.remove("hidden");
            setIsPassValid(0);
        }
    }




    return (
        <main className="bg-[#FFF] flex justify-center items-center" id="bg_color">

            <div className=" bg-white text-center pt-[40px] text-[24px] ">
                <form onSubmit={handleSubmit} className="space-y-[20px] " >
                    <p className="font-bold text-[30px]">Sign Up</p>
                    <input type="text" placeholder="username" className=" px-[20px] py-[10px] border-[1px] border-black bglogin rounded-[20px]" required onChange={(e) => setUsername(e.target.value)} /> <br />

                    <input type="email" placeholder="email" className=" px-[20px] py-[10px] border-[1px] border-black bglogin rounded-[20px]" required onChange={validateEmail} />
                    <br />
                    <p className="text-left text-[12px] font-bold px-[15%] text-[#F00] hidden" id="ivemail">Invalid email</p>

                    {/* {EmailError === 0 ?
                        (
                            <>
                            <input type="email" placeholder="email" className=" px-[20px] py-[10px] border-[1px] border-black bglogin rounded-[20px]" required onChange={(e) => setEmail(e.target.value)} />
                            <br/>
                            </>
                        )
                        :
                        (
                            < >
                                <input type="text" placeholder="email" className=" px-[20px] py-[10px] border-[1px] border-[#f00] bglogin rounded-[20px]" id="email" onFocus={() => { document.querySelector("#email")?.classList.replace("border-[#f00]", "border-black");  }} value={Email} required onChange={(e) => setEmail(e.target.value)} />
                                <p className="text-left text-[1px] font-bold px-[15%] text-[#F00]" id="ivemail">Invalid email</p>
                         
                            </>
                        )}
                */}


                    <input type={inputType} placeholder="password" id="password" className=" px-[20px] py-[10px] border-[1px] border-black bglogin rounded-[20px]" required onChange={validatePassword} />
                    <button className="absolute mx-2  " onClick={() => showPassword()} type="button">
                        <Image
                            src={eyeicon}
                            alt="eyeicon"
                            width={56}
                            height={56}
                            id="showpass"
                        />
                    </button>
                    <br />
                    <div className="text-[12px] text-left font-bold px-[15%] hidden text-[#f00]" id="passwordRequirements">
                        <p id="PassLength" className="">minimum length: 12</p>
                        <p id="PassULC">Upper and lowercase characters</p>
                        <p id="PassNum">Atleat one number</p>
                        <p id="PassSpecial">Atleat one special charackter  </p>
                    </div>



                    {registerError === "diffpass" ? (
                        <input type="password" placeholder="confirm password" id="confirm password" className=" px-[20px] py-[10px] border-[2px] border-[#f00] bglogin rounded-[20px]" required onChange={(e) => setConPassword(e.target.value)} />
                    ) : (
                        <input type="password" placeholder="confirm password" id="confirm password" className="px-[20px] py-[10px] border-[1px] border-black bglogin rounded-[20px]" required onChange={(e) => setConPassword(e.target.value)} />
                    )}

                    <div>
                        {registerError === "diffpass" ? (<p className="text-[16px] text-left  font-bold px-[15%] text-[#f00]">Password doesn't match</p>) : (<p></p>)}

                        {registerError === "Error" ? (<p className="text-[16px] text-left  font-bold px-[15%] text-[#f00]">Something went wrong, try again later.</p>) : (<p></p>)}
                    </div>
                    <div className="  w-[100%] px-[20%] items-center text-center" >
                        <button className="border-[1px] border-black py-[10px] px-[40px] " type="submit">
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
                        <button className=" border-[1px] border-black py-[10px] px-[40px] ">
                            Log In
                        </button>
                    </a>
                </div>
            </div>

        </main>
    );
}
