"use client";
import React, { useState } from "react";
import style from "../Component/login.module.css";
import Image from "next/image";
import { LoginLogo } from "@/src/Utils/images";
import HeadingTextH1 from "@/src/Typography/text/HeadingTextH1";
import Input from "@/src/Component/FormElement/Input";
import Button from "@/src/Component/FormElement/Button";
import { Label } from "@/src/Component/FormElement/Lable";
import Resetpassword from "./Resetpassword";

const EnterPassword = () => {
    const [show, setShow] = useState(false)

    const handleSave = () => {
        setShow(true);
    };

    return (
        <>
            {show ? (<Resetpassword />
            ) : (
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
                        <Label>New Password</Label>
                        <Input
                            placeholder={"Enter new password"}
                            name={"Enterpassword"}
                            type={"text"}
                        />
                        <Label className={style.LabDiv}>Confirm New Password</Label>
                        <Input
                            placeholder={"Confirm new password"}
                            name={"Confirmpassword"}
                            type={"text"}
                        />

                        <Button
                            className={style.loginBtn}
                            onClick={() => handleSave()}
                            disabled={false}
                            type={"submit"}
                            text={"Save"}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default EnterPassword;
