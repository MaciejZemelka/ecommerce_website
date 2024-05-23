"use client";

import Image from "next/image";
import Header from "./components/header";
import {useState} from "react";
import "./globals.css";

export default function Home() {
  const [ShoeImage, SetShoeImage] = useState("/IMG/bluebut.png");
  const [animation, SetAnimation] = useState("");

  const changeImg = (id:Number)=>{
    let element = document.querySelector("#shoediv");
   
    
    switch(id){
      case 0:
        
        SetShoeImage("/IMG/bluebut.png");
        element?.classList.add("shoeAnimation");
        setTimeout(()=>element?.classList.remove("shoeAnimation"),2000)
        break;
      case 1:
        element?.classList.remove("shoeAnimation")
        SetShoeImage("/IMG/redbut.png");
        element?.classList.add("shoeAnimation");
        setTimeout(()=>element?.classList.remove("shoeAnimation"),2000)
        break;
    }
    
  }
  return (
    <main className="bg-[#00f] overflow-hidden ">
      <Header />
      <div className="h-[833px] flex justify-center pt-[150px] text-[24px]">
        <div className="">
          <div className="absolute left-[100px] top-[360px] text-white font-bold">
            <a>Jordan 1 | MID</a><br />
            <a>Relase date: 2021</a><br />
            <a>Price: 200$</a>
            <div className="grid grid-cols-4 pt-[40px]  gap-4">
              <div className="p-3 border-[1px] border-white flex justify-center">
                <a >8</a>
              </div>
              <div className="p-3 border-[1px] border-white flex justify-center">
                <a >8.5</a>
              </div>
              <div className="p-3 border-[1px] border-white flex justify-center">
                <a >9</a>
              </div>
              <div className="p-3 border-[1px] border-white flex justify-center">
                <a >9.5</a>
              </div>
              <div className="p-3 border-[1px] border-white flex justify-center">
                <a >10</a>
              </div>
              <div className="p-3 border-[1px] border-white flex justify-center">
                <a >10.5</a>
              </div>
              <div className="p-3 border-[1px] border-white flex justify-center">
                <a >11</a>
              </div>
              <div className="p-3 border-[1px] border-white flex justify-center">
                <a >11.5</a>
              </div>
              <div className="p-3 border-[1px] border-white flex justify-center">
                <a >12</a>
              </div>
              <div className="p-3 border-[1px] border-white flex justify-center">
                <a >12.5</a>
              </div>
            </div>
            <div className="flex pt-[40px] gap-x-5">
              <div className="w-[70px] h-[70px] rounded-[360px] bg-[#00f] border-[3px] border-white cursor-pointer" onClick={()=>changeImg(0)}></div>
              <div className="w-[70px] h-[70px] rounded-[360px] bg-[#f0f] border-[3px] border-white cursor-pointer" onClick={()=>changeImg(1)}></div>
              <div className="w-[70px] h-[70px] rounded-[360px] bg-[#f00] border-[3px] border-white"></div>
              <div className="w-[70px] h-[70px] rounded-[360px] bg-[#0f0] border-[3px] border-white"></div>
              
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="z-10 absolute  text-white text-[340px] font-bold tracking-wide">
              <a className="">NIKE</a>
            </div>
            <div className="z-20 absolute left-[-190px] w-[600px] h-[7000px] " id="shoediv">
              <Image
                src={ShoeImage}
                alt="but"
                width={400}
                height={500}
                id="but"
              />
            </div>
          </div>
          <div className="absolute right-[100px]">
            <a>RIGHT</a>
          </div>
        </div>
      </div>
      <div className="flex justify-between">


      </div>
    </main>
  );
}
