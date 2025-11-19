'use client'

import ThreeDotLoader from "@/app/pages-partials/loader";
import { useContext, useEffect } from "react";

const { AuthContext } = require("../../../../context/auth-context");
const { useRouter } = require("next/navigation");

function ProtectedRoute({ children }) {
    const { firebaseUser, loading } = useContext(AuthContext)
    const { uid } = firebaseUser || {}
    const router = useRouter()

    useEffect(() => {
        if (!loading && !uid) {
            return router.push('/login')
        }

    }, [uid, loading, router])

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <ThreeDotLoader />
        </div>
    }

    return uid ? <>{children}</> : router.push('/login')

}

export default ProtectedRoute