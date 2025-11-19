'use client'

import Link from "next/link";
import { useRef, useState } from "react";
import HideEyeIcon from "../../../../public/svgs/hideEyeIcon";
import ShowEyeIcon from "../../../../public/svgs/showEyeIcon";
import { app, auth, db } from "../../../../config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import axios from "axios";

const API_KEY = 'q9Tf0J_GJQaZ9-4BO0X8bb-qtCY'
const CLOUD_NAME = 'dugxuuj5w';
const UPLOAD_PRESET = 'profile';
const API_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`;

export default function SignUpPage() {
    const [showPass, setShowPass] = useState(false)
    const [userData, setUserData] = useState({
        fullName: "",
        email: "",
        gender: "",
        dateOfBirth: "",
        password: "",

    })
    const [emptyInputs, setEmptyInputs] = useState(false)
    const [file, setFile] = useState(null);


    const fileInputRef = useRef(null);
    const submitForm = async () => {

        if (!userData.fullName || !userData.email || !userData.password || !userData.gender || !userData.dateOfBirth || !file) {
            setEmptyInputs(true);
            return;
        }
        const profileImageUrl = await imageUploading();
        setEmptyInputs(false)
        createUserWithEmailAndPassword(auth, userData.email, userData.password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log("User Auth me Save Hogia he", user)
                imageUploading
                addUserToDb(user.uid).then(() => {
                    setUserData({
                        fullName: "",
                        email: "",
                        password: "",
                        dateOfBirth: "",
                        gender: ""
                    })
                    setFile(null)
                    fileInputRef.current.value = null;
                })
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                toast.error(errorCode)
                const errorMessage = error.message;
                // ..
            });
    }


    const imageUploading = async () => {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', UPLOAD_PRESET)

        try {
            const response = await axios.post(API_URL, formData)
            console.log(response)
            return

        } catch (error) {
            console.log("clodinar image upload error", error)
        }

    }


    const addUserToDb = async (id) => {

        try {
            await setDoc(doc(db, "users", id), {
                name: userData.fullName,
                email: userData.email,
                gender: userData.gender,
                dateOfBirth: userData.dateOfBirth,
                id: id,

            })
            console.log('user db me save hogia he')

        } catch (error) {
            console.log("user db me save nahi howa", error)
        }
    }

    console.log(userData)

    function handlePass() {
        setShowPass(!showPass)
    }

    console.log(file)


    return (
        <>

            <div className="flex-1 flex flex-col justify-center w-[330px] sm:w-[384px] mx-auto">
                <div className="mb-5">
                    <h1 className="mt-8 mb-2 lg:text-3xl">Get started</h1>
                    <h2 className="text-sm text-foreground-light text-gray-300">Create a new account</h2>
                </div>
                <div className="flex flex-col gap-5">
                    <form id="sign-in-form" className="flex flex-col gap-0">
                        <div>
                            <div name="email" className="relative text-sm flex flex-col gap-2">
                                <div
                                    className="transition-all duration-500 ease-in-out flex flex-row gap-2 justify-between"

                                >
                                    <label
                                        className="text-sm text peer-disabled:cursor-not-allowed peer-disabled:opacity-70 transition-colors text-foreground flex gap-2 items-center break-all leading-normal"
                                        htmlFor="name"
                                    >
                                        <span>Full Name</span>
                                    </label>
                                </div>
                                <div
                                    className="transition-all duration-500 ease-in-out order-1 col-span-12"
                                >
                                    <div >
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            placeholder="Full Name"
                                            className={`flex w-full rounded-md border border-control read-only:border-button bg-foreground/[.026] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground-muted read-only:text-foreground-light focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-background-control focus-visible:ring-offset-1 focus-visible:ring-offset-foreground-muted disabled:cursor-not-allowed disabled:text-foreground-muted aria-[] aria-[invalid=true]:bg-destructive-200 aria-[invalid=true]:border-destructive-400 aria-[invalid=true]:focus:border-destructive aria-[invalid=true]:focus-visible:border-destructive text-sm leading-4 px-3 py-3 h-[34px] 
                                              ${emptyInputs && !userData.fullName ? "border-red-500 focus-visible:ring-red-500" : ""}`
                                            }
                                            value={userData.fullName}
                                            onChange={(event) => setUserData({ ...userData, fullName: event.target.value })}
                                        />
                                        <p className={`text-red-500 text-[10px] mt-0 transition-all duration-200 ${emptyInputs && !userData.fullName ? "opacity-100" : "opacity-0"
                                            }`}>
                                            Fill this field
                                        </p>
                                    </div>


                                </div>
                            </div>
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
                                    <div >
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="you@example.com"
                                            className={`flex w-full rounded-md border border-control read-only:border-button bg-foreground/[.026] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground-muted read-only:text-foreground-light focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-background-control focus-visible:ring-offset-1 focus-visible:ring-offset-foreground-muted disabled:cursor-not-allowed disabled:text-foreground-muted aria-[] aria-[invalid=true]:bg-destructive-200 aria-[invalid=true]:border-destructive-400 aria-[invalid=true]:focus:border-destructive aria-[invalid=true]:focus-visible:border-destructive text-sm leading-4 px-3 py-3 h-[34px] 
                                              ${emptyInputs && !userData.email ? "border-red-500 focus-visible:ring-red-500" : ""}`
                                            }
                                            value={userData.email}
                                            onChange={(event) => setUserData({ ...userData, email: event.target.value })}
                                        />
                                        <p
                                            className={`text-[10px] mt-1 transition-all duration-200 
                                                   ${emptyInputs && !userData.email
                                                    ? "text-red-500 opacity-100"
                                                    : userData.email && !userData.email.includes("@")
                                                        ? "text-yellow-400 opacity-100"
                                                        : "opacity-0"
                                                }
                                                 `}
                                        >
                                            {emptyInputs && !userData.email
                                                ? "Fill this field"
                                                : userData.email && !userData.email.includes("@")
                                                    ? "Enter a valid email (must contain @)"
                                                    : ""}
                                        </p>
                                    </div>
                                    <div className="mt-2" style={{ opacity: 1, transform: "none" }} />
                                </div>
                            </div>
                        </div>

                        <div className="flex w-full justify-between gap-[8px]">
                            <div name="email" className="relative text-sm flex w-full flex-col gap-2">
                                <div
                                    className="transition-all duration-500 ease-in-out flex flex-row gap-2 justify-between"
                                >
                                    <label
                                        className="text-sm text peer-disabled:cursor-not-allowed peer-disabled:opacity-70 transition-colors text-foreground flex gap-2 items-center break-all leading-normal"
                                        htmlFor="gender"
                                    >
                                        <span>Gender</span>
                                    </label>
                                </div>
                                <div
                                    className="transition-all duration-500 ease-in-out order-1 col-span-12"
                                >
                                    <div >
                                        <select
                                            id="gender"
                                            name="gender"
                                            className={`w-full cursor-pointer rounded-md border border-control bg-black text-sm leading-4 px-2 h-[34px]
                                                        placeholder:text-foreground-muted
                                                        focus-visible:outline-none focus-visible:ring-1
                                                        focus-visible:ring-background-control focus-visible:ring-offset-1 focus-visible:ring-offset-foreground-muted
                                                        disabled:cursor-not-allowed disabled:text-foreground-muted
                                                        aria-[] aria-[invalid=true]:bg-destructive-200 aria-[invalid=true]:border-destructive-400
                                                        aria-[invalid=true]:focus:border-destructive aria-[invalid=true]:focus-visible:border-destructive
                                                         ${emptyInputs && !userData.gender ? "border-red-500 focus-visible:ring-red-500" : ""}
                                                          `}
                                            value={userData.gender}
                                            onChange={(event) => setUserData({ ...userData, gender: event.target.value })}
                                        >
                                            <option value="" disabled>Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>

                                    </div>
                                    <p className={`text-red-500 text-[10px] mt-0 transition-all duration-200 ${emptyInputs && !userData.gender ? "opacity-100" : "opacity-0"
                                        }`}>
                                        Fill this field
                                    </p>


                                </div>
                            </div>

                            <div name="email" className="relative text-sm w-full flex flex-col gap-2">
                                <div
                                    className="transition-all duration-500 ease-in-out flex flex-row gap-2 justify-between"

                                >
                                    <label
                                        className="text-sm text peer-disabled:cursor-not-allowed peer-disabled:opacity-70 transition-colors text-foreground flex gap-2 items-center break-all leading-normal"
                                        htmlFor="date"
                                    >
                                        <span>Date of Birth</span>
                                    </label>
                                </div>
                                <div
                                    className="transition-all duration-500 ease-in-out order-1 col-span-12"
                                >
                                    <div  >
                                        <input
                                            type="date"
                                            id="date"
                                            name="date"
                                            className={` w-full cursor-pointer rounded-md border border-control read-only:border-button bg-foreground/[.026] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground-muted read-only:text-foreground-light focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-background-control focus-visible:ring-offset-1 focus-visible:ring-offset-foreground-muted disabled:cursor-not-allowed disabled:text-foreground-muted aria-[] aria-[invalid=true]:bg-destructive-200 aria-[invalid=true]:border-destructive-400 aria-[invalid=true]:focus:border-destructive aria-[invalid=true]:focus-visible:border-destructive text-sm leading-4 px-2 py-0 w-[176px] h-[34px] 
                                              ${emptyInputs && !userData.dateOfBirth ? "border-red-500 focus-visible:ring-red-500" : ""}`
                                            }
                                            value={userData.dateOfBirth}
                                            onChange={(event) => setUserData({ ...userData, dateOfBirth: event.target.value })}
                                        />

                                    </div>
                                    <p className={`text-red-500 text-[10px] mt-0 transition-all duration-200 ${emptyInputs && !userData.dateOfBirth ? "opacity-100" : "opacity-0"
                                        }`}>
                                        Fill this field
                                    </p>
                                </div>
                            </div>

                        </div>

                        <div name="email" className="relative text-sm flex flex-col gap-2">
                            <div
                                className="transition-all duration-500 ease-in-out flex flex-row gap-2 justify-between"

                            >
                                <label
                                    className="text-sm text peer-disabled:cursor-not-allowed peer-disabled:opacity-70 transition-colors text-foreground flex gap-2 items-center break-all leading-normal"
                                    htmlFor="profile"
                                >
                                    <span>Select Profile Picture</span>
                                </label>
                            </div>
                            <div
                                className="transition-all duration-500 ease-in-out order-1 col-span-12"
                            >
                                <div >
                                    <input
                                        type="file"
                                        id="profile"
                                        name="name"
                                        accept="image/png, image/jpg, image/jpeg"
                                        className={` cursor-pointer w-full rounded-md border border-control read-only:border-button bg-foreground/[.026] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground-muted read-only:text-foreground-light focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-background-control focus-visible:ring-offset-1 focus-visible:ring-offset-foreground-muted disabled:cursor-not-allowed disabled:text-foreground-muted aria-[] aria-[invalid=true]:bg-destructive-200 aria-[invalid=true]:border-destructive-400 aria-[invalid=true]:focus:border-destructive aria-[invalid=true]:focus-visible:border-destructive text-sm leading-4 px-3 py-1.5 h-[34px] 
                                              ${emptyInputs && !file ? "border-red-500 focus-visible:ring-red-500" : ""}`
                                        }

                                        ref={fileInputRef}
                                        onChange={(e) => setFile(e.target.files[0])}
                                    />

                                </div>

                                <div className="mt-2" style={{ opacity: 1, transform: "none" }} />
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
                                        <div className="" >
                                            <div
                                                className="relative"

                                            >
                                                <input
                                                    type={showPass ? "text" : "password"}
                                                    id="password"
                                                    name="password"
                                                    placeholder="••••••••"
                                                    className={`flex w-full rounded-md border border-control read-only:border-button bg-foreground/[.026] file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-foreground-muted read-only:text-foreground-light focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-background-control focus-visible:ring-offset-1 focus-visible:ring-offset-foreground-muted disabled:cursor-not-allowed disabled:text-foreground-muted aria-[] aria-[invalid=true]:bg-destructive-200 aria-[invalid=true]:border-destructive-400 aria-[invalid=true]:focus:border-destructive aria-[invalid=true]:focus-visible:border-destructive text-sm leading-4 px-3 py-3 h-[34px] 
                                                               ${emptyInputs && !userData.password ? "border-red-500 focus-visible:ring-red-500" : ""}`
                                                    }
                                                    value={userData.password}
                                                    onChange={(event) => setUserData({ ...userData, password: event.target.value })}
                                                />
                                                <p className={`text-[10px] mt-1 transition-all 
                                                          ${emptyInputs && !userData.password
                                                        ? "text-red-500 opacity-100"
                                                        : userData.password && userData.password.length < 9
                                                            ? "text-yellow-400 opacity-100"
                                                            : userData.password && userData.password.length >= 9
                                                                ? "text-green-500 opacity-100"
                                                                : "opacity-0"}
                                                                   `}>
                                                    {emptyInputs && !userData.password
                                                        ? "Fill this field"
                                                        : userData.password && userData.password.length < 9
                                                            ? "Choose a strong password (9+ chars)"
                                                            : userData.password && userData.password.length >= 9
                                                                ? "Strong Password"
                                                                : ""}
                                                </p>
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

                        </div>

                        <div
                            className="flex items-center relative"
                            data-sentry-component="LastSignInWrapper"
                            data-sentry-source-file="LastSignInWrapper.tsx"
                        >
                            <div className="w-full" onClick={submitForm}>

                                <button
                                    data-size="large"
                                    form="sign-in-form"
                                    type="button"
                                    data-sentry-element="Button"
                                    data-sentry-source-file="SignInForm.tsx"
                                    className="relative bg-[#006239]  border-emerald-400  mt-[15px] cursor-pointer space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all focus-visible:outline-4 focus-visible:outline-offset-1 border bg-brand-400 dark:bg-brand-500 hover:bg-brand/80 dark:hover:bg-brand/50 text-foreground border-brand-500/75 dark:border-brand/30 hover:border-brand-600 dark:hover:border-brand focus-visible:outline-brand-600 data-[state=open]:bg-brand-400/80 dark:data-[state=open]:bg-brand-500/80 data-[state=open]:outline-brand-600 w-full flex items-center justify-center text-base px-4 py-2 h-[42px]"
                                    fdprocessedid="z4m6j"
                                >
                                    {" "}
                                    <span className="truncate">Sign Up</span>{" "}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="self-center my-8 text-sm">
                    <div>
                        <span className="text-foreground-light text-gray-300">Have an account? </span>{" "}
                        <Link href="/login">
                            <u>
                                Sign In Now
                            </u>
                        </Link>

                    </div>
                </div>
            </div>
        </>
    )
}