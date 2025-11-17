'use client'

import Link from "next/link";
import { useState } from "react";
import HideEyeIcon from "../../../../public/svgs/hideEyeIcon";
import ShowEyeIcon from "../../../../public/svgs/showEyeIcon";
export default function SignUpPage() {
        const [showPass, setShowPass] = useState(false)
        const [userData, setUserData] = useState({
            fullName: "",
            email: "",
            password: ""
        })


        const submitForm = () => {
            if (!validate()) return;
            MySwal.fire({
                title: "Creating your account...",
                text: "Please wait a moment",
                allowOutsideClick: false,
                didOpen: () => {
                    MySwal.showLoading();
                },
            });
            createUserWithEmailAndPassword(auth, userData.email, userData.password)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    console.log("User Auth me Save Hogia he", user)
                    addUserToDb(user.uid).then(() => {
                        setUserData({
                            fullName: "",
                            email: "",
                            password: ""
                        })
                        MySwal.fire({
                            icon: "success",
                            title: "Account created successfully!",
                            text: "Welcome aboard 🎉",
                            confirmButtonColor: "#3085d6",
                        }).then(() => {
                            navigate('/dashboard')
                        })
                    })
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                });
        }


        const addUserToDb = async (id) => {
            await setDoc(doc(db, "users", id), {
                name: userData.fullName,
                email: userData.email,
                id: id
            })
        }


        console.log(userData)

        function handlePass() {
            setShowPass(!showPass)
        }

        const [errors, setErrors] = useState({});
        const validate = () => {
            let newErrors = {};
            if (!userData.fullName.trim()) newErrors.fullName = "Please fill this field";
            if (!userData.email.trim()) newErrors.email = "Please fill this field";
            if (!userData.password.trim()) newErrors.password = "Please fill this field";
            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        };
        return (
            <>

                <div className="flex-1 flex flex-col justify-center w-[330px] sm:w-[384px] mx-auto">
                    <div className="mb-10">
                        <h1 className="mt-8 mb-2 lg:text-3xl">Welcome back</h1>
                        <h2 className="text-sm text-foreground-light">Sign up to your account</h2>
                    </div>
                    <div className="flex flex-col gap-5">
                        <form id="sign-in-form" className="flex flex-col gap-4">
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
                                                className={`w-full px-3 py-2 rounded-md border ${errors.fullName
                                                    ? "border-red-500 focus:ring-red-400"
                                                    : "border-vlack focus:ring-black"
                                                    } focus:ring-2 outline-none focus:ring-offset-2`}
                                                value={userData.fullName}
                                                onChange={(event) => setUserData({ ...userData, fullName: event.target.value })}
                                            />
                                        </div>

                                        <div className="mt-2" style={{ opacity: 1, transform: "none" }} />
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
                                                autoComplete="email"
                                                name="email"
                                                placeholder="you@example.com"
                                                className={`w-full px-3 py-2 rounded-md border ${errors.email
                                                    ? "border-red-500 focus:ring-red-400"
                                                    : "border-vlack focus:ring-black"
                                                    } focus:ring-2 outline-none focus:ring-offset-2`}
                                                value={userData.email}
                                                onChange={(event) => setUserData({ ...userData, email: event.target.value })}
                                            />
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
                                            <div className="" >
                                                <div
                                                    className="relative"

                                                >
                                                    <input
                                                        type={showPass ? "text" : "password"}
                                                        id="password"
                                                        autoComplete="current-password"
                                                        name="password"
                                                        placeholder="••••••••"
                                                        className={`w-full px-3 py-2 rounded-md border ${errors.fullName
                                                            ? "border-red-500 focus:ring-red-400"
                                                            : "border-vlack focus:ring-black"
                                                            } focus:ring-2 outline-none focus:ring-offset-2`}
                                                        value={userData.password}
                                                        onChange={(event) => setUserData({ ...userData, password: event.target.value })}
                                                    />
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
                                    data-sentry-element="Link"
                                    data-sentry-source-file="SignInForm.tsx"
                                    href="/dashboard/forgot-password?returnTo=%2Forg"
                                >
                                    Forgot Password?
                                </a>
                            </div>

                            <div
                                className="flex items-center relative"
                                data-sentry-component="LastSignInWrapper"
                                data-sentry-source-file="LastSignInWrapper.tsx"
                            >
                                <div className="w-full">
                                    <button
                                        data-size="large"
                                        form="sign-in-form"
                                        type="button"
                                        data-sentry-element="Button"
                                        data-sentry-source-file="SignInForm.tsx"
                                        className="relative cursor-pointer space-x-2 text-center font-regular ease-out duration-200 rounded-md outline-none transition-all outline-0 focus-visible:outline-4 focus-visible:outline-offset-1 border bg-brand-400 dark:bg-brand-500 hover:bg-brand/80 dark:hover:bg-brand/50 text-foreground border-brand-500/75 dark:border-brand/30 hover:border-brand-600 dark:hover:border-brand focus-visible:outline-brand-600 data-[state=open]:bg-brand-400/80 dark:data-[state=open]:bg-brand-500/80 data-[state=open]:outline-brand-600 w-full flex items-center justify-center text-base px-4 py-2 h-[42px]"
                                        fdprocessedid="z4m6j"
                                        onClick={submitForm}
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
                            <span className="text-foreground-light">Already have an account?</span>{" "}
                           <Link href="/login">
                                <u>
                                    Login
                                </u>
                           </Link>
                         
                        </div>
                    </div>
                </div>
            </>
        )
    }