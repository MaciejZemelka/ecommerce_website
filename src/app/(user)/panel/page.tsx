"use client";

import Image from "next/image";

import { ChangeEvent, useEffect, useState } from "react";

import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from "@/app/store/slices/authSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import { create } from "domain";
//import UserAddresses from "@/app/components/(user)/addresses";
import AddressesArea from "@/app/components/(user)/addresses";
import { logout } from "@/app/store/slices/authSlice";
import { resourceUsage } from "process";



export default function Home() {
    const [updateButton, turnUpdateButton] = useState(0);
    const [Email, setEmail] = useState("");
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [PhoneNumber, setPhoneNumber] = useState("");
    const [DateOfBirth, setDateOfBirth] = useState("");
    const [CreatedDate, setCreatedDate] = useState("");
    const [Gender, setGender] = useState("");
    const [Addresses, setAddresses] = useState<UserAddressProps[]>([]);
    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
    const dispatch = useDispatch();
    const [User, setUser] = useState<UserProps>();

    const userData = async () => {

        const response = await fetch('https://localhost:7084/api/User/UserDetails', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken: localStorage.getItem("refreshToken") }),
        });

        if (!response.ok) {
            throw new Error("Error occurred while fetching user data");
        }

        const data = await response.json();
        setEmail(data.email);
        setCreatedDate(data.createdDate.split(" ")[0]);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setPhoneNumber(data.PhoneNumber);
        setDateOfBirth(data.DateOfBirth);
        setGender(data.gender);
    };
    const handleSelectAddress = (id: number) => {
        setSelectedAddressId(prevId => (prevId === id ? null : id));
    };

    const handleDeleteAddress = async () => {
        if (!selectedAddressId) {
            alert("No address selected.");
            return;
        }
        //dalej kod wpisz
    }
    const UserAddresses = async () => {

        const response = await fetch('https://localhost:7084/api/User/UserAddresses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken: localStorage.getItem("refreshToken") }),
        })

        if (!response.ok) {
         
            const errorResponse = await response.status;
            return errorResponse;
        }

        const data = await response.json();


        setAddresses(data.addresses);

    };

    const handleLogout = () => {
        dispatch(logout());
    }

    useEffect(() => {
        userData();
        UserAddresses();
    }, []);


    return (
        <main className="bg-[#FFF] w-full" id="bg_color">
            <div className="flex justify-center py-20 w-full">
                <div className="w-[50%] max-[900px]:w-[75%] max-[600px]:w-[90%]">
                    <form className="space-y-4 w-full" onChange={() => turnUpdateButton(1)}>
                        <div className=" grid grid-cols-2 gap-4 gap-y-4 w-full">
                            <div>
                                <label htmlFor="Email">Email:</label><br />
                                <input type="text" placeholder="Email" value={Email} onChange={(e) => setEmail(e.target.value)} className=" px-[20px] w-[100%] py-[10px] border-[1px] border-black bglogin rounded-[20px]" /><br />
                            </div>

                            <div>
                                <label htmlFor="Password">Password:</label><br />
                                <input type="password" placeholder="Password" value="*********" disabled className=" px-[20px] w-[100%]  py-[10px] border-[1px] border-black bglogin rounded-[20px]" /><br />
                            </div>

                            <div>
                                <label htmlFor="FirstName">First name:</label><br />
                                <input type="text" placeholder="First name" value={FirstName} onChange={(e) => setFirstName(e.target.value)} className=" px-[20px] w-[100%] py-[10px] border-[1px] border-black bglogin rounded-[20px]" /><br />

                            </div>

                            <div>
                                <label htmlFor="LastName">Last name:</label><br />
                                <input type="text" placeholder="Last name" value={LastName} onChange={(e) => setLastName(e.target.value)} className=" px-[20px] w-[100%] py-[10px] border-[1px] border-black bglogin rounded-[20px]" /><br />

                            </div>

                            <div>
                                <label htmlFor="PhoneNumber">Phone number:</label><br />
                                <input type="number" placeholder="Phone number" className=" px-[20px] py-[10px] w-[100%] border-[1px] border-black bglogin rounded-[20px]" /><br />

                            </div>

                            <div>
                                <label htmlFor="DateOfBirth">Date of birth:</label><br />
                                <input type="date" placeholder="Date of birth" className=" px-[20px] w-[100%] py-[10px] w-[100%] border-[1px] border-black bglogin rounded-[20px]" /><br />
                            </div>

                            <div>
                                <label htmlFor="Gender">Gender:</label><br />
                                <select
                                    value={Gender} onChange={(e) => setGender(e.target.value)} className=" px-[20px] w-[100%] py-[10px] border-[1px] border-black bglogin rounded-[20px]"
                                >
                                    <option value=" ">Not specified</option>
                                    <option value="woman">woman</option>
                                    <option value="man">man</option>
                                    <option value="other">other</option>


                                </select>

                            </div>

                            <div>
                                <label htmlFor="CreatedDate">Created date:</label><br />
                                <input type="text" placeholder="Created Date" value={CreatedDate} className=" px-[20px] w-[100%] py-[10px] border-[1px] border-black bglogin rounded-[20px]" disabled /><br />
                            </div>

                        </div>
                        {updateButton !== 0 ? (
                            <button className="px-[20px] w-full py-[10px] border-[1px] border-black text-white bg-[black] rounded-[20px]" type="submit">Update changes!</button>
                        ) : (
                            <button className="px-[20px] w-full py-[10px] border-[1px] border-black curson bg-[#AAA] rounded-[20px]" disabled>Update changes!</button>
                        )}
                    </form>
                    <div className="space-y-4 py-4">
                        <h1>Addresses:</h1>

                        <AddressesArea
                            addresses={Addresses}
                            selectedAddressId={selectedAddressId}
                            onSelectAddress={handleSelectAddress}
                        ></AddressesArea>

                        <button className="px-[20px] w-full py-[10px] border-[1px] border-black curson bg-black text-white rounded-[20px]" onClick={handleLogout}>LOG OUT!</button>
                    </div>
                </div>

            </div >

        </main >
    );
}
