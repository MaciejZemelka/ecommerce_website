"use client";

import Image from "next/image";

import { ChangeEvent, useEffect, useState } from "react";

import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from "@/app/store/slices/authSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import { create } from "domain";

export default function AddressesArea({ addresses, selectedAddressId, onSelectAddress }: UserAddressProps & { selectedAddressId: number | null, onSelectAddress: (id: number) => void }) {

    return (

        <div className="grid grid-cols-2 gap-4">
                {addresses && addresses.length > 0 ? (
                    addresses.map((addresses, index) => (
                        <div key={index}  className="border-[1px] w-full rounded-[20px] border-black text-left text-justify p-[10px]">
                            <p>{addresses.streetName} {addresses.houseNumber} 
                            {addresses.apartmentNumber ? (
                                <span>/ {addresses.apartmentNumber}</span>
                            ):(
                                <></>
                            )}
                            </p>
                            <p>{addresses.postalCode} {addresses.city}</p>
                            
                            <p>{addresses.country}</p>
                            <hr />
                        </div>
                    ))
                ) : (
                    <></>
                )}
                {addresses && addresses.length < 2 ? (
                    <div className="w-full">
                        <button type="button" className="border-[1px] w-full h-full rounded-[20px] border-black text-left text-center p-[10px]">ADD NEW ADDRESS</button>
                    </div>
                ) : (
                    <></>
                )}
         
        </div>
    );
}
