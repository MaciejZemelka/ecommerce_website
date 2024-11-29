"use client";

import Image from "next/image";

import { ChangeEvent, useEffect, useState } from "react";

import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from "@/app/store/slices/authSlice";
import { AppDispatch, RootState } from "@/app/store/store";
import { create } from "domain";
import InputAddressField from "./inputAddressField";

export default function AddressesArea({ addresses, selectedAddressId, onSelectAddress }: UserAddressProps & { selectedAddressId: number | null, onSelectAddress: (id: number) => void }) {
    return (

        <div className="grid grid-cols-2 gap-4">

            {addresses && addresses.length > 0 ? (
                addresses.map((addresses, index) => (
                    <div key={index}
                        onClick={() => onSelectAddress(index!)}
                        className={`border-[2px] w-full rounded-[20px] border-grey text-left text-justify p-[10px] ${selectedAddressId === index ? ' border-black bg-gray-100 ' : ' '}`}
                    >


                        <p>{addresses.streetName} {addresses.houseNumber}
                            {addresses.apartmentNumber ? (
                                <span>/ {addresses.apartmentNumber}</span>
                            ) : (
                                <></>
                            )}
                        </p>
                        <p>{addresses.postalCode} {addresses.city}</p>
                        <p>{addresses.country}
                            <InputAddressField
                                address={addresses}
                                type={"edit"}
                            />
                        </p>




                    </div>
                ))
            ) : (
                <></>
            )
            }
            {
                !addresses || addresses.length < 2 ? (
                    <div className="w-full">
                        <div className="border-[1px] w-full h-full rounded-[20px] border-black text-left text-center p-[10px]">
                            <p>ADD NEW ADDRESS</p>
                            <InputAddressField
                                address={null}
                                type={"add"}
                            />
                        </div>
                    </div>
                ) : (
                    <></>
                )
            }

        </div >
    );
}
