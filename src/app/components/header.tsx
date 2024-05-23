import Image from "next/image";

export default function Header() {
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
          <div className="space-x-[40px] text-[17px]">
            <a href="/">Get Started!</a>
            <a href="/">Sales</a>
            <a href="/products">Products</a>
            <a href="/">FAQ</a>
            <a href="/">About Us</a>
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
    </div>
  );
}
