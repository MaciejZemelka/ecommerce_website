'use client'

import Image from "next/image";
import React, { useState, useEffect } from "react";

import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/authSlice';
export default function Header({bg_color, nav_textColor} : {bg_color:string, nav_textColor:string}) {

  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const [DMP, setDMP] = useState(0); //DMP - display man products
  const [DWP, setDWP] = useState(0); //DMP - display woman products

  const displayManProds = () => {
    if (DWP == 1) hideWomanProds();
    const element = document.querySelector("#mp");
    element?.classList.remove("prodNavAnimation");
    element?.classList.remove("hidden");
    element?.classList.add("prodNavAnimation")
    document.querySelector("#man")?.classList.add("underline");
    setDMP(1);
    setDWP(0);
  }
  const hideManProds = () => {
    const element = document.querySelector("#mp");
    element?.classList.remove("prodNavAnimation");
    element?.classList.add("hidden");
    document.querySelector("#man")?.classList.remove("underline");
    setDMP(0);
  }

  const displayWomanProds = () => {
    if (DMP == 1) hideManProds();
    const element = document.querySelector("#wp");
    element?.classList.remove("prodNavAnimation");
    element?.classList.remove("hidden");
    element?.classList.add("prodNavAnimation")
    document.querySelector("#woman")?.classList.add("underline");
    setDWP(1);
    setDMP(0);
  }
  const hideWomanProds = () => {
    const element = document.querySelector("#wp");
    element?.classList.remove("prodNavAnimation");
    element?.classList.add("hidden");
    document.querySelector("#woman")?.classList.remove("underline");
    setDWP(0);
  }

  return (

    <div className={`flex justify-center  pt-[20px] pb-[20px] ${bg_color} text-black`} >
      <div className="flex justify-center px-[100px]  w-[100%] z-[60]  ">
        <div className="flex justify-between w-full  items-center">
          <div>
            <Image
              src={"/IMG/NikeLogo.png"}
              alt="nikelogo"
              width={120}
              height={100}
            />
          </div>
          <div className={`space-x-[40px] text-[22px] pt-narrow-bold  font-bold z-30 ${nav_textColor}`}>

            <a href="/">Get Started!</a>
            <a onMouseEnter={() => displayManProds()} id="man">Man</a>
            <a onMouseEnter={() => displayWomanProds()} id="woman">Woman</a>
            <a href="/">Kids</a>
            <a href="/">Sale</a>
            {isClient && (user ? (
              <div>
                <p>Witaj, {user}!</p>
                <button onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <p></p>
            ))}

          </div>
          <div className="flex gap-x-2">
            <a href="/login">
              <Image
                src={"/IMG/user.png"}
                alt="logreg"
                width={40}
                height={40}

              />
            </a>
            <Image
              src={"/IMG/sci.png"}
              alt="ShoppingCart"
              width={40}
              height={40}
              className=""
            />
          </div>
        </div>
      </div>
      <div className="bg-white w-[100%] h-[300px] absolute z-50 top-[85px] opacity-[95%] p-[30px] hidden" id="mp" onMouseOver={() => displayManProds()} onMouseOut={() => hideManProds()} >
        <div className="flex justify-center gap-[7%]  ">
          <div className="space-y-[10px]">
            <h2 className="font-bold">Shoes</h2>
            <p>All shoes</p>
            <p>Lifestyle</p>
            <p>Football</p>
            <p>Training</p>
            <p>Basketball</p>
          </div>
          <div className="space-y-[10px]">
            <h2 className="font-bold">Clothing</h2>
            <p>All cloths</p>
            <p>Tops & T-shirts</p>
            <p>Shorts</p>
            <p>Hoddies</p>
            <p>Trousers</p>
          </div>
          <div className="space-y-[10px]">
            <h2 className="font-bold">Sports</h2>
            <p>All sports</p>
            <p>Football</p>
            <p>Basketball</p>
            <p>Gym</p>
            <p>Volleyball</p>
          </div>
          <div className="space-y-[10px]">
            <h2 className="font-bold">Accesories</h2>
            <p>All accesories</p>
            <p>Backpacks</p>
            <p>Bags</p>
            <p>Balls</p>
            <p>Rubers</p>
          </div>
        </div>
      </div>
      <div className="bg-white w-[100%] h-[300px] absolute z-50 top-[85px] opacity-[95%] p-[30px] hidden" id="wp" onMouseOver={() => displayWomanProds()} onMouseOut={() => hideWomanProds()} >
        <div className="flex justify-center gap-[7%]  ">
          <div className="space-y-[10px]">
            <h2 className="font-bold">Shoes</h2>
            <p>All shoes</p>
            <p>Lifestyle</p>
            <p>Football</p>
            <p>Training</p>
            <p>Basketball</p>
          </div>
          <div className="space-y-[10px]">
            <h2 className="font-bold">Clothing</h2>
            <p>All cloths</p>
            <p>Tops & T-shirts</p>
            <p>Shorts</p>
            <p>Hoddies</p>
            <p>Trousers</p>
          </div>
          <div className="space-y-[10px]">
            <h2 className="font-bold">Sports</h2>
            <p>All sports</p>
            <p>Football</p>
            <p>Basketball</p>
            <p>Gym</p>
            <p>Volleyball</p>
          </div>
          <div className="space-y-[10px]">
            <h2 className="font-bold">Accesories</h2>
            <p>All accesories</p>
            <p>Backpacks</p>
            <p>Bags</p>
            <p>Balls</p>
            <p>Rubers</p>
          </div>
        </div>
      </div>
    </div>

  );

}
