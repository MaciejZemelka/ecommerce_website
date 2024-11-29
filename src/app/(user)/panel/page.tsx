"use client";

import Image from "next/image";

import { ChangeEvent, useEffect, useState } from "react";

import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from "@/app/store/slices/authSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import { create } from "domain";
//import UserAddresses from "@/app/components/(user)/addresses";
import AddressesArea from "@/components/(user)/addresses";
import { logout } from "@/app/store/slices/authSlice";
import { resourceUsage } from "process";
import { fetchWithAuth } from "@/app/api/api";
import { current } from "@reduxjs/toolkit";



export default function Home() {
    const [updateButton, turnUpdateButton] = useState(0);
    const [Email, setEmail] = useState("");
    const [FirstName, setFirstName] = useState("");
    const [LastName, setLastName] = useState("");
    const [PhoneNumber, setPhoneNumber] = useState<number | null>(null);
    const [DateOfBirth, setDateOfBirth] = useState("");
    const [CreatedDate, setCreatedDate] = useState("");
    const [Gender, setGender] = useState("");
    const [Addresses, setAddresses] = useState<UserAddressProps[]>([]);
    const [selectedAddressId, setSelectedAddressId] = useState<number | null>(null);
    const dispatch = useDispatch();
    const [User, setUser] = useState<UserProps>();


    const userData = async () => {
        const url = 'https://localhost:7084/api/User/UserDetails';
        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const response = await fetchWithAuth(url, options);

            if (response.ok) {
                const data = await response.json();
                setEmail(data.email);
                setCreatedDate(data.createdDate.split(" ")[0]);
                setFirstName(data.firstName.split(" ")[0]);
                setLastName(data.lastName.split(" ")[0]);
                setPhoneNumber(Number(data.phoneNumber));
                setDateOfBirth(data.dateOfBirth);
                setGender(data.gender.split(" ")[0]);
            }
            else {
                console.log("Something went wrong while selecting data from db");
            }

        } catch (error) {
            console.log("error");
        }



    };
    const handleSelectAddress = (id: number) => {
        setSelectedAddressId(prevId => (prevId === id ? null : id));
    };


    const userDetailsUpdate = async () => {
        const url = "https://localhost:7084/api/User/UpdateUserDetails";
        const options: RequestInit = {
            method: 'POST',
            body: JSON.stringify({
                first_name: FirstName,
                last_name: LastName,
                PhoneNumber: PhoneNumber,
                date_of_birth: DateOfBirth.toString(),
                gender: Gender
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const respone = await fetchWithAuth(url, options);
            if (respone.ok) {
                console.log("Data updated");
                window.location.href = ('/panel');
            }
            else {
                console.log("Something went wrong while updating");
            }
        } catch (error) {
            console.log(error);
        }

    }

    const UserAddresses = async () => {
        const url = "https://localhost:7084/api/User/UserAddresses";
        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        try {
            const response = await fetchWithAuth(url, options);
            if (response.ok) {
                const data = await response.json();
                console.log('Data selected');
                setAddresses(data.addresses);
            }
            else {
                console.log('Something went wrong while selecting from db')
            }
        } catch (error) {
            console.log(error);
        }


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
                                <input type="text" placeholder="Email" value={Email} disabled className=" px-[20px] w-[100%] py-[10px] border-[1px] border-black bglogin rounded-[20px]" /><br />
                            </div>

                            <div>
                                <label htmlFor="Password">Password:</label><br />
                                <input type="password" placeholder="Password" value="*********" disabled className=" px-[20px] w-[100%]  py-[10px] border-[1px] border-black bglogin rounded-[20px]" /><br />
                            </div>

                            <div>
                                <label htmlFor="FirstName">First name:</label><br />
                                <input type="text" placeholder="First name" value={FirstName || ""} onChange={(e) => setFirstName(e.target.value)} className=" px-[20px] w-[100%] py-[10px] border-[1px] border-black bglogin rounded-[20px]" /><br />

                            </div>

                            <div>
                                <label htmlFor="LastName">Last name:</label><br />
                                <input type="text" placeholder="Last name" value={LastName || ""} onChange={(e) => setLastName(e.target.value)} className=" px-[20px] w-[100%] py-[10px] border-[1px] border-black bglogin rounded-[20px]" /><br />

                            </div>

                            <div>
                                <label htmlFor="PhoneNumber">Phone number:</label><br />
                                <input type="number" placeholder="Phone number" value={PhoneNumber || ""} onChange={(e) => setPhoneNumber(Number(e.target.value))} className=" px-[20px] py-[10px] w-[100%] border-[1px] border-black bglogin rounded-[20px]" /><br />

                            </div>

                            <div>
                                <label htmlFor="DateOfBirth">Date of birth:</label><br />
                                <input type="date" placeholder="Date of birth" value={DateOfBirth || ""} onChange={(e) => setDateOfBirth(e.target.value)} className=" px-[20px] w-[100%] py-[10px] w-[100%] border-[1px] border-black bglogin rounded-[20px]" /><br />
                            </div>

                            <div>
                                <label htmlFor="Gender">Gender:</label><br />
                                <select
                                    value={Gender || ''}
                                    onChange={(e) => setGender(e.target.value)}
                                    className=" px-[20px] w-[100%] py-[10px] border-[1px] border-black bglogin rounded-[20px]"
                                >
                                    <option value="" disabled>Select gender</option>
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
                            <button className="px-[20px] w-full py-[10px] border-[1px] border-black text-white bg-[black] rounded-[20px]" onClick={() => userDetailsUpdate()}>Update changes!</button>
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
