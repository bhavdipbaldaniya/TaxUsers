"use client";
import React from "react";
import style from "../Component/login.module.css";
import Image from "next/image";
import { LoginLogo } from "@/src/Utils/images";
import HeadingTextH1 from "@/src/Typography/text/HeadingTextH1";
import Input from "@/src/Component/FormElement/Input";
import Button from "@/src/Component/FormElement/Button";
import { Label } from "@/src/Component/FormElement/Lable";
import { useRouter } from "next/navigation";

const Resetlink = () => {
    const route = useRouter()
    const SendLink = () => {
        route.push("/enterpassword")
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
                        Enter your email address to receive a reset link
                    </div>
                    <Label>Email Address</Label>
                    <Input
                        placeholder={"Enter your email address"}
                        name={"email"}
                        type={"text"}
                    // value={value}
                    // onChange={handleChange}
                    // onBlur={formik.handleBlur}
                    />

                    <Button
                        className={style.loginBtn}
                        onClick={() => SendLink()}
                        disabled={false}
                        type={"submit"}
                        text={"Send Link"}
                    />
                </div>
            </div>
        </>
    );
};

export default Resetlink;
