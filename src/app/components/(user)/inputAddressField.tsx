"use client";

import { fetchWithAuth } from "@/app/api/api";
import * as Popover from "@radix-ui/react-popover";
import { TIMEOUT } from "dns";
import { ACTION_REFRESH } from "next/dist/client/components/router-reducer/router-reducer-types";
import { useState } from "react";

export default function InputAddressField({ address, type }: AddressInputFieldProps) {
  const [id] = useState(address?.id)
  const [newStreet, setNewStreet] = useState(address?.streetName)
  const [newHouseNumber, setNewHouseNumber] = useState(address?.houseNumber)
  const [newApartmentNumber, setApartmentNumber] = useState(address?.apartmentNumber)
  const [newCity, setNewCity] = useState(address?.city)
  const [newPostalCode, setNewPostalCode] = useState(address?.postalCode)
  const [newCountry, setNewCountry] = useState(address?.country)

  const deleteAddress = async () => {
    const url = 'https://localhost:7084/api/User/DeleteAddress';

    const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify({
        addressId: id
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };


    try {
      const response = await fetchWithAuth(url, options);

      if (response.ok) {
        const responseData = await response.text;
        console.log('Address deleted', responseData);
        window.location.href = "/panel";
      } else {
        console.error('Something went wrong while deleting address', response.status);
      }
    } catch (error) {
        console.error(error);
    }
  }

  const updateAddress = async () => {
  const url = 'https://localhost:7084/api/User/UpdateAddress';

  const options: RequestInit = {
    method: 'POST',
    body: JSON.stringify({
      addressId: id,
      country: newCountry,
      city: newCity,
      streetName: newStreet,
      houseNumber: newHouseNumber,
      apartmentNumber: newApartmentNumber,
      postalCode: newPostalCode
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const response = await fetchWithAuth(url, options);

    if (response.ok) {
      const responseData = await response.text;
      console.log('Address updated', responseData);
      window.location.href = "/panel";
    } else {
      console.error('Something went wrong while updating', response.status);
    }
  } catch (error) {
    console.error(error);
  }

  }
  const addNewAddress = async () => {
    const url = 'https://localhost:7084/api/User/AddNewAddress';

    const options: RequestInit = {
      method: 'POST',
      body: JSON.stringify({
        country: newCountry,
        city: newCity,
        streetName: newStreet,
        houseNumber: newHouseNumber,
        apartmentNumber: newApartmentNumber,
        postalCode: newPostalCode
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    try {
      const response = await fetchWithAuth(url, options);

      if (response.ok) {
        const responseData = await response.text;
        console.log('Adres dodany pomyślnie', responseData);
        window.location.href = "/panel";
      } else {
        console.error('Błąd podczas dodawania adresu', response.status);
      }
    } catch (error) {
      console.error('Wystąpił błąd podczas wysyłania żądania:', error);
    }
  };

  return (
    <Popover.Root>
      <Popover.Trigger >
        <p>#</p>
      </Popover.Trigger>

      <Popover.Content >
        <div className='px-4 py-2 bg-white border-[3px] border-black rounded-[20px] w-[72%] ml-[4px] '>
          <div className='text-center py-2'>
            <span className='font-bold'>Address {id} </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col">
              <label className='font-medium'>Country:</label>
              <input
                type='text'
                value={newCountry || ""}
                onChange={(e) => setNewCountry(e.target.value)}
                required
                className='min-w-[50px]  mt-1 pl-3 py-1 border-gray-300 border-2 rounded-[7px]'
              />
            </div>
            <div className='flex flex-col'>
              <label className='font-medium'>City:</label>
              <input
                type='text'
                value={newCity || ""}
                onChange={(e) => setNewCity(e.target.value)}
                required
                className='min-w-[50px]  mt-1 pl-3 py-1 border-gray-300 border-2 rounded-[7px]'
              />
            </div>
            <div className='flex flex-col'>
              <label className='font-medium'>Postal Code:</label>
              <input
                type='text'
                value={newPostalCode || ""}
                onChange={(e) => setNewPostalCode(e.target.value)}
                required
                className='min-w-[50px]  mt-1 pl-3 py-1 border-gray-300 border-2 rounded-[7px]'
              />
            </div>

            <div className='flex flex-col'>
              <label className='font-medium '>Street:</label>
              <input
                type='text'
                value={newStreet || ""}
                onChange={(e) => setNewStreet(e.target.value)}
                required
                className='min-w-[50px] mt-1 pl-3 py-1 border-gray-300 border-2 rounded-[7px]'
              />

            </div>

            <div className="flex flex-col">
              <label className='font-medium'>House Number:</label>
              <input
                type='text'
                value={newHouseNumber || ""}
                onChange={(e) => setNewHouseNumber(e.target.value)}
                required
                className='min-w-[50px] mt-1 pl-3 py-1 border-gray-300 border-2 rounded-[7px]'
              />
            </div>

            <div className="flex flex-col">
              <label className='font-medium'>Apartment Number:</label>
              <input
                type='text'
                value={newApartmentNumber || ""}
                onChange={(e) => setApartmentNumber(e.target.value)}
                className='min-w-[50px] mt-1 pl-3 py-1 border-gray-300 border-2 rounded-[7px]'
              />
            </div>

          </div>
          <div className='grid grid-cols-2 gap-x-2 mt-2 '>
            <button className='py-2 bg-black text-white w-full rounded-[10px] ' onClick={() => { type === "edit" ? updateAddress() : addNewAddress() }}>
              Apply
            </button>
            <button className='py-2 bg-black text-white w-full rounded-[10px]' onClick={() => deleteAddress()}>
              Delete
            </button>
          </div>
        </div>
      </Popover.Content>

    </Popover.Root>
  )
}
