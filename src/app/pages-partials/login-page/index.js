'use client'
import Link from "next/link"
import { use, useState } from "react"
import HideEyeIcon from "../../../../public/svgs/hideEyeIcon"
import ShowEyeIcon from "../../../../public/svgs/showEyeIcon"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "../../../../config"
import toast from "react-hot-toast"
// import { collection, getDocs } from "firebase/firestore"


export default function LoginPage() {
    const [showPass, setShowPass] = useState(false)
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })
    const [emptyInputs, setEmptyInputs] = useState(false)
    const [showError, setShowError] = useState(false)


    console.log(loginData)

    const userSignIn = () => {
        if (!loginData.email || !loginData.password) {
            setEmptyInputs(true);
            return
        }
        signInWithEmailAndPassword(auth, loginData.email, loginData.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user, "User Sign ho chuka he")
                setLoginData({
                    email: "",
                    password: ""
                })
                setShowError(false)
                setEmptyInputs(false)
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                toast.error(errorCode)
                setShowError(true)
                const errorMessage = error.message;
            });

    }

    // const getAllUsers = async () => {
    //     const querySnapshot = await getDocs(collection(db, "users"));
    //     querySnapshot.forEach((doc) => {
    //         console.log(doc.data());
    //     });
    // }

    // getAllUsers()



    const handlePass = () => {
        setShowPass(!showPass)
    }






    return (
        <>

            <div className="flex justify-end pt-5 pr-5">
                {/* <ThemeBtn onClick={handleTheme} text={theme} /> */}
            </div>
            <div className="flex-1 flex flex-col justify-center w-[330px] sm:w-[384px] mx-auto">
                <div className="mb-10">
                    <h1 className="mt-8 mb-2 lg:text-3xl">Welcome back</h1>
                    <h2 className="text-sm text-gray-300 text-foreground-light">Sign in to your account</h2>
                </div>
                <div className="flex flex-col gap-5">
                    <form id="sign-in-form" className="flex flex-col gap-1">
                        <div>
                            <div name="email" className="relative text-sm flex flex-col gap-2">
                                <div
                                    className="transition-all duration-500 ease-in-out flex flex-row gap-2 justify-between"

                                >
                                    <label
                                        className="text-sm text peer-disabled:cursor-not-allowed peer-disabled:opacity-70 transition-colors text-foreground flex gap-2 items-center break-all leading-normal"
                                        htmlFor="email"
                                    >
                                        <span>Email</span>
                                    </label>
                                </div>
                                <div
                                    className="transition-all duration-500 ease-in-out order-1 col-span-12"

                                >
                                    <div className="" >
                                        <input
                                            type="email"
                                            id="email"
                                            autoComplete="email"
                                            name="email"
                                            placeholder="you@example.com"
                                            className={`flex w-full rounded-md border border-control read-only:border-button bg-foreground/[.026] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground-muted read-only:text-foreground-light focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-background-control focus-visible:ring-offset-1 focus-visible:ring-offset-foreground-muted disabled:cursor-not-allowed disabled:text-foreground-muted aria-[] aria-[invalid=true]:bg-destructive-200 aria-[invalid=true]:border-destructive-400 aria-[invalid=true]:focus:border-destructive aria-[invalid=true]:focus-visible:border-destructive text-sm leading-4 px-3 py-3 h-[34px] 
                                              ${emptyInputs && !loginData.email ? "border-red-500 focus-visible:ring-red-500" : ""}`
                                            }
                                            value={loginData.email}
                                            onChange={(event) => { setLoginData({ ...loginData, email: event.target.value }) }}
                                        />
                                        <p className={`text-red-500 text-[10px] mt-0 transition-all duration-200 ${emptyInputs && !loginData.email ? "opacity-100" : "opacity-0"
                                            }`}>
                                            Fill this field
                                        </p>
                                    </div>
                                    <div className="mt-2" style={{ opacity: 1, transform: "none" }} />
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div>
                                <div name="password" className="relative text-sm flex flex-col gap-2">
                                    <div
                                        className="transition-all duration-500 ease-in-out flex flex-row gap-2 justify-between"

                                    >
                                        <label
                                            className="text-sm text peer-disabled:cursor-not-allowed peer-disabled:opacity-70 transition-colors text-foreground flex gap-2 items-center break-all leading-normal"
                                            htmlFor="password"
                                        >
                                            <span>Password</span>
                                        </label>
                                    </div>
                                    <div
                                        className="transition-all duration-500 ease-in-out order-1 col-span-12"

                                    >
                                        <div className="" data-formlayout-id="nonBoxInputContainer">
                                            <div
                                                className="relative"
                                                id=":r1:-form-item"

                                            >
                                                <input
                                                    type={showPass ? "text" : "password"}
                                                    id="password"
                                                    autoComplete="current-password"
                                                    name="password"
                                                    placeholder="••••••••"
                                                    className={`flex w-full rounded-md border border-control read-only:border-button bg-foreground/[.026] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground-muted read-only:text-foreground-light focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-background-control focus-visible:ring-offset-1 focus-visible:ring-offset-foreground-muted disabled:cursor-not-allowed disabled:text-foreground-muted aria-[] aria-[invalid=true]:bg-destructive-200 aria-[invalid=true]:border-destructive-400 aria-[invalid=true]:focus:border-destructive aria-[invalid=true]:focus-visible:border-destructive text-sm leading-4 px-3 py-3 h-[34px] 
                                                        ${emptyInputs && !loginData.password ? "border-red-500 focus-visible:ring-red-500" : ""}`
                                                    }

                                                    value={loginData.password}
                                                    onChange={(event) => { setLoginData({ ...loginData, password: event.target.value }) }}
                                                />
                                                <p className={`text-red-500 text-[10px] mt-0 transition-all duration-200 ${emptyInputs && !loginData.password ? "opacity-100" : "opacity-0"
                                                    }`}>
                                                    Fill this field
                                                </p>
                                                {showError === true ? <p className="text-red-600 text-[10px]">Invalid credentials</p> : ""}
                                                <button
                                                    type="button"
                                                    title="Show password"

                                                    className="justify-center cursor-pointer inline-flex items-center space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border text-foreground bg-alternative dark:bg-muted hover:bg-selection border-strong hover:border-stronger focus-visible:outline-brand-600 data-[state=open]:bg-selection data-[state=open]:outline-brand-600 data-[state=open]:border-button-hover text-xs py-1 h-[26px] absolute right-1 top-1 px-1.5"

                                                    onClick={handlePass}
                                                >
                                                    <div className="[&_svg]:h-[14px] [&_svg]:w-[14px] text-foreground-lighter">
                                                        {showPass ? <HideEyeIcon /> : <ShowEyeIcon />}
                                                    </div>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="mt-2" style={{ opacity: 1, transform: "none" }} />
                                    </div>
                                </div>
                            </div>
                            <a
                                className="absolute top-0 right-0 text-sm text-foreground-lighter"

                            >
                                Forgot Password?
                            </a>

                        </div>

                        <div
                            className="flex items-center relative"

                        >
                            <div className="w-full" onClick={userSignIn} >
                                <button
                                    type="button"

                                    className="relative bg-[#006239] border-emerald-400 cursor-pointer space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border bg-brand-400 dark:bg-brand-500 hover:bg-brand/80 dark:hover:bg-brand/50 text-foreground border-brand-500/75 dark:border-brand/30 hover:border-brand-600 dark:hover:border-brand focus-visible:outline-brand-600 data-[state=open]:bg-brand-400/80 dark:data-[state=open]:bg-brand-500/80 data-[state=open]:outline-brand-600 w-full flex items-center justify-center text-base px-4 py-2 h-[42px]"
                                    
                                >
                                    {" "}
                                    <span className="truncate">Sign In</span>{" "}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="self-center my-8 text-sm">
                    <div>
                        <span className="text-foreground-light text-gray-300">Don't have an account?</span>{" "}
                        <Link href="/signup">
                            <u>
                                Sign Up Now
                            </u>
                        </Link>

                    </div>
                </div>
            </div>
        </>
    )
}