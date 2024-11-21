"use client";

import Image from "next/image";

import { ChangeEvent, useEffect, useState } from "react";

import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from "@/app/store/slices/authSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import { create } from "domain";

export default function Home() {
    const [Email, setEmail] = useState("");
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [PhoneNumber, setPhoneNumber] = useState("");
    const [DateOfBirth, setDateOfBirth] = useState("");
    const [CreatedDate, setCreatedDate] = useState("");
    const [Gender, setGender] = useState("");


    const userData = async () => {

        const response = await fetch('https://localhost:7084/api/User/UserDetails', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken: localStorage.getItem("refreshToken") }),
        });

        if (!response.ok) {
            alert("Error accoured");
        }

        const data = await response.json();

        setEmail(data.email);
        setCreatedDate(data.createdDate.split(" ")[0]);


    }
    useEffect(() => {
        userData();
    }), [];

    return (
        <main className="bg-[#FFF]" id="bg_color">
            <div className="flex justify-center p-20">
                <form className="space-y-4">
                    <div className=" grid grid-cols-2 gap-4 gap-y-4">
                        <div>
                            <label htmlFor="Email">Email:</label><br />
                            <input type="text" placeholder="username" value={Email} className=" px-[20px] py-[10px] border-[1px] border-black bglogin rounded-[20px]" /><br />
                        </div>

                        <div>
                            <label htmlFor="Password">Password:</label><br />
                            <input type="text" placeholder="username" className=" px-[20px] py-[10px] border-[1px] border-black bglogin rounded-[20px]" /><br />
                        </div>

                        <div>
                            <label htmlFor="PhoneNumber">First name:</label><br />
                            <input type="text" placeholder="username" className=" px-[20px] py-[10px] border-[1px] border-black bglogin rounded-[20px]" /><br />

                        </div>

                        <div>
                            <label htmlFor="PhoneNumber">Last name:</label><br />
                            <input type="text" placeholder="username" className=" px-[20px] py-[10px] border-[1px] border-black bglogin rounded-[20px]" /><br />

                        </div>

                        <div>
                            <label htmlFor="PhoneNumber">Phone number:</label><br />
                            <input type="text" placeholder="username" className=" px-[20px] py-[10px] border-[1px] border-black bglogin rounded-[20px]" /><br />

                        </div>

                        <div>
                            <label htmlFor="DateOfBirth">Date of birth:</label><br />
                            <input type="text" placeholder="username" className=" px-[20px] py-[10px] border-[1px] border-black bglogin rounded-[20px]" /><br />
                        </div>

                        <div>
                            <label htmlFor="Gender">Gender:</label><br />
                            <input type="text" placeholder="username" className=" px-[20px] py-[10px] border-[1px] border-black bglogin rounded-[20px]" /><br />
                        </div>

                        <div>
                            <label htmlFor="CreatedDate">Created date:</label><br />
                            <input type="text" placeholder="username" value={CreatedDate} className=" px-[20px] py-[10px] border-[1px] border-black bglogin rounded-[20px]" disabled /><br />
                        </div>

                    </div>
                    <h1>Localization:</h1>
                    <div className=" grid grid-cols-2 gap-4 gap-y-4">
                        <div>
                            <label htmlFor="Country">Country:</label><br />
                            <input type="text" placeholder="username" className=" px-[20px] py-[10px] border-[1px] border-black bglogin rounded-[20px]" /><br />
                        </div>
                        <div>
                            <label htmlFor="City">City:</label><br />
                            <input type="text" placeholder="username" className=" px-[20px] py-[10px] border-[1px] border-black bglogin rounded-[20px]" /><br />
                        </div>
                        <div>
                            <label htmlFor="PostalCode">Postal code:</label><br />
                            <input type="text" placeholder="username" className=" px-[20px] py-[10px] border-[1px] border-black bglogin rounded-[20px]" /><br />
                        </div>
                        <div>
                            <label htmlFor="StreetName">Street name:</label><br />
                            <input type="text" placeholder="username" className=" px-[20px] py-[10px] border-[1px] border-black bglogin rounded-[20px]" /><br />
                        </div>

                        <div>
                            <label htmlFor="HouseNumber">House number:</label><br />
                            <input type="text" placeholder="username" className=" px-[20px] py-[10px] border-[1px] border-black bglogin rounded-[20px]" /><br />
                        </div>
                        <div>
                            <label htmlFor="ApartmentNumber">Apartment nubmer:</label><br />
                            <input type="text" placeholder="username" className=" px-[20px] py-[10px] border-[1px] border-black bglogin rounded-[20px]" /><br />
                        </div>

                    </div>
                </form>
            </div>

        </main>
    );
}
