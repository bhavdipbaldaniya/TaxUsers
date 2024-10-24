"use client";
import React from "react";
import style from "../Component/login.module.css";
import Image from "next/image";
import { LoginLogo } from "@/src/Utils/images";
import HeadingTextH1 from "@/src/Typography/text/HeadingTextH1";
import Button from "@/src/Component/FormElement/Button";
import { useRouter } from "next/navigation";

const Resetpassword = () => {
    const route = useRouter()

    const BackToLogin = () => {
        route.push("/login")
    }

    return (
        <>
            <div className={style.Loginwithmobilenumbermain}>
                <Image
                    src={LoginLogo}
                    className={style.logo}
                    alt="logo"
                    property="true"
                />
                <div className={style.Loginwithmobilenumbercontentsubmain}>
                    <HeadingTextH1 text={"Reset Password"} />
                    <div className={style.EnterReceiveLinkText}>
                        Please check your email for instructions to reset your password
                    </div>
                    <Button
                        onClick={() => BackToLogin()}
                        disabled={false}
                        type={"submit"}
                        text={"Back to Log in Page"}
                    />
                    <div className={style.outerDivText}>
                        Didn’t receive an email? {' '}
                        <span
                            className={style.signUpText}
                            onClick={() => route.push("/register")}
                        >
                            Sign up
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Resetpassword;
