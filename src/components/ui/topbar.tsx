import { useEffect, useState } from "react";
import { fetchWithAuth } from "@/app/api/api";

export default function TopBar({textColor}:{textColor:string}){

    const [firstName, setFirstName] = useState("");

    const getUserFirstName = async() =>{
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
                setFirstName(data.firstName.split(" ")[0]);
            }
            else {
                console.log("Something went wrong while selecting data from db");
            }

        } catch (error) {
            console.log("error");
        
        }
    }

    useEffect(()=>{
        getUserFirstName();
    },[]);

    return (
        <div className="flex py-2 px-[100px] justify-between items-center">
            <div>
                
            </div>
            <div className={`space-x-[12px] font-bold text-${textColor}`}>
                <a className={`border-r-[1px] px-[12px] border-${textColor}`}>Help</a>

                { firstName === "" ? (
                    <a href="/register">Join Us!</a>
                ) : (
                    <a href="/panel">Hi, {firstName}</a>
                )
                }
                
            </div>
        </div>
    );
}