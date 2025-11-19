'use client'
import { useContext } from "react";
import { AuthContext } from "../../../../context/auth-context";
import { useRouter } from "next/navigation";

export default function PublicRoute({ children }) {
    const { firebaseUser, loading } = useContext(AuthContext)
    const { uid } = firebaseUser || {}

    const router = useRouter()
    return uid ? router.push('/dashboard') : <>{children}</>
}
