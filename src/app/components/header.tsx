import Image from "next/image";
import React, {useState} from "react";

export default function Header() {
  const [DMP, setDMP] = useState(0); //DMP - display man products


  const displayManProds = () =>{
     const element = document.querySelector("#mp");
     element?.classList.remove("hidden");
  }
  const hideManProds = () =>{
    const element = document.querySelector("#mp");
    element?.classList.add("hidden");
 }

  return (
    <div className="flex justify-center" >
      <div className="flex justify-center w-[1600px] pt-10">
        <div className="flex justify-between w-full  text-white items-center">
          <div>
            <Image
              src={"/IMG/NikeLogo.png"}
              alt="nikelogo"
              width={120}
              height={100}
            />
          </div>
          <div className="space-x-[40px] text-[22px] pt-narrow-bold  font-bold z-30">
 
            <a href="/">Get Started!</a>
            <a  onMouseOver={()=>displayManProds()} onMouseOut={()=>hideManProds()}>Man</a>
            <a href="/products">Woman</a>
            <a href="/">Kids</a>
            <a href="/">Sale</a>
          </div>
          <div className="flex gap-x-2">
            <Image
              src={"/IMG/user.png"}
              alt="logreg"
              width={40}
              height={40}
              
            />
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
      <div className="bg-white w-[100%] h-[400px] fixed z-50 top-[100px] opacity-[95%] p-5 hidden" id="mp" onMouseOver={()=>displayManProds()} >
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
