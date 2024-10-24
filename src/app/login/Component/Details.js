"use client";
import React from "react";
import style from "../Component/login.module.css";
import Image from "next/image";
import { LoginLogo } from "@/src/Utils/images";
import HeadingTextH1 from "@/src/Typography/text/HeadingTextH1";
import Lable from "@/src/Typography/text/Lable";
import Input from "@/src/Component/FormElement/Input";
import Button from "@/src/Component/FormElement/Button";
import InputPassword from "@/src/Component/FormElement/InputPassword";
import { Label } from "@/src/Component/FormElement/Lable";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import { useFormik } from "formik";
import ErrorText from "@/src/Typography/text/ErrorText";

const Details = () => {
  const route = useRouter();

  const DetailUserValidation = Yup.object({
    company_name: Yup.string().required("Please enter company name."),
    street_address: Yup.string().required("Please enter street address."),
    city: Yup.string().required("Please enter city."),
    zip_code: Yup.string().required("Please enter zip code."),
  });

  const DetailUserValidationValue = {
    company_name: "",
    street_address: "",
    city: "",
    zip_code: "",
  };
  const formik = useFormik({
    initialValues: DetailUserValidationValue,
    validationSchema: DetailUserValidation,
    onSubmit: async (values, action) => {
      console.log(values);

      const existingCompany =
        JSON.parse(localStorage.getItem("companyData")) || [];

      existingCompany.push(values);
      localStorage.setItem("companyData", JSON.stringify(existingCompany));

      action.resetForm();
      localStorage.setItem("accessToken", "tax")
      route.push("/dashboard");
    },
  });
  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    formik;

  const skipLogin = () => {
    localStorage.setItem("accessToken", "tax")
    route.push("/dashboard");
  };
  return (
    <>
      <div className={style.Loginwithmobilenumbermain}>
        <Image
          src={LoginLogo}
          className={style.Detaillogo}
          alt="logo"
          property="true"
        />
        <div className={style.DetailSubDiv}>
          <HeadingTextH1 text={"Organization details"} />
          <form onSubmit={handleSubmit}>
            <Label>Company Name</Label>
            <Input
              placeholder={"Enter your Company Name"}
              name={"company_name"}
              type={"text"}
              // disable={true}
              value={values.company_name}
              onChange={handleChange}
              onBlur={formik.handleBlur}
            />
            {errors.company_name && touched.company_name && (
              <ErrorText text={errors.company_name} />
            )}

            <Label>Street Address</Label>
            <Input
              placeholder={"Enter your Street Address"}
              name={"street_address"}
              type={"text"}
              // disable={true}
              value={values.street_address}
              onChange={handleChange}
              onBlur={formik.handleBlur}
            />
            {errors.street_address && touched.street_address && (
              <ErrorText text={errors.street_address} />
            )}
            <Label>City</Label>
            <Input
              placeholder={"Enter your City"}
              name={"city"}
              type={"text"}
              // disable={true}
              value={values.city}
              onChange={handleChange}
              onBlur={formik.handleBlur}
            />
            {errors.city && touched.city && <ErrorText text={errors.city} />}
            <Label>Zip code</Label>
            <Input
              placeholder={"Enter your Zip Code"}
              name={"zip_code"}
              type={"number"}
              // disable={true}
              value={values.zip_code}
              onChange={handleChange}
              onBlur={formik.handleBlur}
            />
            {errors.zip_code && touched.zip_code && (
              <ErrorText text={errors.zip_code} />
            )}
            <Button
              className={style.skipBtn}
              onClick={skipLogin}
              disabled={false}
              type={"button"}
              text={"Skip"}
            />
            <Button
              className={style.loginBtn}
              disabled={false}
              type={"submit"}
              text={"Continue"}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Details;
