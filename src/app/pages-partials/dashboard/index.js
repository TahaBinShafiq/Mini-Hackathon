'use client'
import { getAuth, signOut } from "firebase/auth";
import toast from "react-hot-toast";


export default function DashboardPage() {

    const logOutfunc = () => {

        const auth = getAuth();
        signOut(auth).then(() => {
            // Sign-out successful.
            toast.success('Log Out Successfully!');
        }).catch((error) => {
            // An error happened.
        });
    }
    return (
        <>
            <div className="flex justify-between p-2">
                <h1 className="text-4xl">Dashboard Page</h1>
                <button className="border p-3 cursor-pointer rounded-[5px]" onClick={logOutfunc}>Log Out</button>
            </div>
        </>
    )
}