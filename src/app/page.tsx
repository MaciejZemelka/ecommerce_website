"use client";

import Image from "next/image";
import Header from "./components/header";
import { useState } from "react";
import "./globals.css";

export default function Home() {
  const [ShoeImage, SetShoeImage] = useState("/IMG/bluebut.png");
  const [animation, SetAnimation] = useState("");

  const changeImg = (id: Number) => {
    let element = document.querySelector("#shoediv");
    let bgelement = document.querySelector("#bg_color");
    bgelement?.classList.forEach(className => {
      if (className.startsWith('bg')) {
        bgelement.classList.remove(className);
      }
    });
    document.querySelector("#blue")?.classList.remove("border-[3px]");
    document.querySelector("#red")?.classList.remove("border-[3px]");
    document.querySelector("#purple")?.classList.remove("border-[3px]");
    document.querySelector("#green")?.classList.remove("border-[3px]");
    switch (id) {
      case 0:
        element?.classList.remove("shoeAnimation");
        bgelement?.classList.add("bgblue");
        SetShoeImage("/IMG/bluebut.png");
        setTimeout(() => element?.classList.add("shoeAnimation"), 1);
        document.querySelector("#blue")?.classList.add("border-[3px]");
        
        break;
      case 1:
        element?.classList.remove("shoeAnimation")
        bgelement?.classList.add("bgpurple");
        SetShoeImage("/IMG/purplebut.png");
        setTimeout(() => element?.classList.add("shoeAnimation"), 1);
        document.querySelector("#purple")?.classList.add("border-[3px]");
        break;
      case 2:
        element?.classList.remove("shoeAnimation")
        bgelement?.classList.add("bgred");
        SetShoeImage("/IMG/redbut.png");
        setTimeout(() => element?.classList.add("shoeAnimation"), 1);
        document.querySelector("#red")?.classList.add("border-[3px]");
        break;
      case 3:
        element?.classList.remove("shoeAnimation")
        bgelement?.classList.add("bggreen");
        SetShoeImage("/IMG/greenbut.png");
        setTimeout(() => element?.classList.add("shoeAnimation"), 1);
        document.querySelector("#green")?.classList.add("border-[3px]");

        break;
    }

  }
  return (
    <main className="bgblue overflow-hidden " id="bg_color">
      <Header />
      <div className="h-[833px] flex justify-center pt-[150px] text-[24px]">
        <div className="">
          <div className="absolute left-[100px] top-[290px] text-white font-bold">
            <div className="gap-y-[100px]">
              <a className="text-[40px] text-bold ">Jordan 1 | MID</a><br /><br />
              <a className=""><span className="text-[36px] text-bold">Relase date</span> <br />
                <span className="text-[20px]">2021-09-18</span></a><br /><br />
              <a><span className="text-[36px] text-bold">Price</span> <br />
                <span className="text-[20px]">200$</span></a><br />
            </div>
            <div className="grid grid-cols-5   pt-[40px]  gap-4">
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
            <div className="pt-[10px]">
              <a className="text-[36px] text-bold"> Select Color</a>
            </div>
            <div className="flex pt-[10px] gap-x-5">
              <div className="w-[50px] h-[50px] rounded-[360px] bg-[#00f] border-[3px] cursor-pointer" id="blue" onClick={() => changeImg(0)}></div>
              <div className="w-[50px] h-[50px] rounded-[360px] bg-[#f0f] cursor-pointer" id="purple" onClick={() => changeImg(1)}></div>
              <div className="w-[50px] h-[50px] rounded-[360px] bg-[#f00] " id="red" onClick={() => changeImg(2)}></div>
              <div className="w-[50px] h-[50px] rounded-[360px] bg-[#0f0] " id="green" onClick={() => changeImg(3  )}></div>
            </div>
          </div>
          <div className="relative flex justify-center ">
            <div className="z-10 absolute top-[-200px] text-white text-[500px] font-bold tracking-wide">
              <a className="pt-narrow-bold tracking-tighter">NIKE</a>
            </div>
            <div className="z-20 absolute left-[-240px] w-[600px] top-[-100px] " id="shoediv">
              <Image
                src={ShoeImage}
                alt="but"
                width={500}
                height={400}
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
