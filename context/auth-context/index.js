'use client'
import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../../config";
import { useRouter } from "next/navigation";


export const AuthContext = createContext()

function AuthProvider({ children }) {
    const [firebaseUser, setFirebaseUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter();
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                setFirebaseUser(user)
                console.log("This user is currently login", user)
                 router.push("/dashboard");
                // ...
            } else {
                setFirebaseUser(null)
            }
            setLoading(false)
        });
        return unSubscribe
    }, [])

    return (
        <AuthContext.Provider value={{ firebaseUser, loading }}>
            {children}
        </AuthContext.Provider>
    )

}

export { AuthProvider }