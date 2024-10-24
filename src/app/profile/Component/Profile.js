"use client";
import React, { useState } from "react";
import style from "./Profile.module.css";
import { ic_Edit_Profile } from "@/src/Utils/svg";
import Back from "@/src/Component/Back/page";
import { ProfileImage } from "@/src/Utils/images";
import Image from "next/image";
import { Label } from "@/src/Component/FormElement/Lable";
import Input from "@/src/Component/FormElement/Input";
import InputPassword from "@/src/Component/FormElement/InputPassword";
import TextArea from "@/src/Component/FormElement/TextArea";
import Button from "@/src/Component/FormElement/Button";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import ErrorText from "@/src/Typography/text/ErrorText";

const Profile = () => {
  const route = useRouter();
  const [photo, setPhoto] = useState(null);

  const ProfileInitialValues = {
    first_name: "",
    email: "",
    password: "",
    password: "",
    company: "",
    address: "",
  };

  const ProfileValidation = Yup.object({
    first_name: Yup.string().required("Please enter first name."),
    email: Yup.string()
      .email("Please enter valid email.")
      .required("Please enter email."),
    password: Yup.string().required("Please enter password."),
    company: Yup.string().required("Please enter company name."),
    address: Yup.string().required("Please enter address."),
  });
  const formik = useFormik({
    initialValues: ProfileInitialValues,
    validationSchema: ProfileValidation,
    onSubmit: async (values, action) => {
      console.log(values);
      action.resetForm();
      route.push("/");
    },
  });
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    formik;

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    formik.setFieldValue("photo", file);
  };

  return (
    <>
      <Back text={"Edit Profile"} />
      <div className={style.ProfilePicMainDiv}>
        <form onSubmit={handleSubmit}>
          <div className={style.MainDivForBtn}>
            <div className={style.ProfilePicSubDiv}>
              <Image
                src={ProfileImage}
                className={style.profilephoto}
                alt="profilepic"
                property="true"
                width={100}
                height={100}
              />
              <label htmlFor="fileUplod">
                <input
                  type="file"
                  id="fileUplod"
                  className="d-none"
                  onChange={handleFileUpload}
                />
                <div className={style.EditIcon}>{ic_Edit_Profile.icon()}</div>
              </label>
            </div>
          </div>
          <div className={style.InputMainDiv}>
            <div className={style.MainDivForInput}>
              <div className={style.SubDivForInput}>
                <Label for={"first_name"}>First name</Label>
                <Input
                  placeholder={"Enter first name"}
                  name={"first_name"}
                  disable={false}
                  value={values.first_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />

                {errors.first_name && touched.first_name && (
                  <ErrorText text={errors.first_name} />
                )}
              </div>

              <div className={style.SubDivForInput}>
                <Label for={"email"}>Email</Label>
                <Input
                  placeholder={"Enter email"}
                  name={"email"}
                  disable={false}
                  value={values?.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email && (
                  <ErrorText text={errors.email} />
                )}
              </div>
            </div>
            <div className={style.MainDivForInput}>
              <div className={style.SubDivForInput}>
                <Label for={"password"}>Password</Label>
                <InputPassword
                  placeholder={"Enter password"}
                  name={"password"}
                  type={"password"}
                  disable={false}
                  value={values?.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.password && touched.password && (
                  <ErrorText text={errors.password} />
                )}
              </div>
              <div className={style.SubDivForInput}>
                <Label for={"company"}>Company</Label>
                <Input
                  placeholder={"Enter password"}
                  name={"company"}
                  type={"text"}
                  disable={false}
                  value={values?.company}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.company && touched.company && (
                  <ErrorText text={errors.company} />
                )}
              </div>
            </div>
            <div className={style.MainDivForInput}>
              <div className={style.SubDivForInput}>
                <Label for={"address"}>Address</Label>
                <TextArea
                  placeholder={"Enter address"}
                  name={"address"}

                  type={"text"}   

                  disable={false}
                  value={values?.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.address && touched.address && (
                  <ErrorText text={errors.address} />
                )}
              </div>
            </div>
            <div className={style.SaveBtn}>
              <Button type={"submit"} text={"Save"} />
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Profile;
