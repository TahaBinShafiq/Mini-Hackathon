'use client'
import UserProfileDropdown from "@/components/ui/user-profile-dropdown";
import { getAuth, signOut } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import ThreeDotLoader from "../loader";


export default function DashboardPage() {

    const[loading , setLoading] = useState(false)
    const logOutfunc = () => {
        setLoading(true)
        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            toast.success('Log Out Successfully!');
            setLoading(false)
        }).catch((error) => {
            // An error happened.
            setLoading(false)
        });
    }
    return (
        <>{loading === false ?  <div className="flex justify-between p-2">
                <h1 className="text-4xl">Dashboard Page</h1>
                <UserProfileDropdown logOut={logOutfunc}/>
            </div> : <><div className="flex justify-center items-center h-screen"><ThreeDotLoader/></div></>}
        </>
    )
}