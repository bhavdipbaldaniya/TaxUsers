"use client";
import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import Back from "@/src/Component/Back/page";
import style from "./AddHousehold.module.css";
import { Label } from "@/src/Component/FormElement/Lable";
import Dropdown from "@/src/Component/FormElement/Dropdown";
import ErrorText from "@/src/Typography/text/ErrorText";
import Input from "@/src/Component/FormElement/Input";
import Button from "@/src/Component/FormElement/Button";
import HeadingTextH1 from "@/src/Typography/text/HeadingTextH1";
import ToggleOption from "@/src/Component/FormElement/ToggleOption";

function AddHousehold() {
  const route = useRouter();

  const currentYear = new Date().getFullYear();
  const yearOptions = Array.from(new Array(50), (val, index) => ({
    name: (currentYear - index).toString(),
    value: currentYear - index,
  }));
  const genderArr = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];
  const blindnessStatus = [
    { label: "Yes", value: true },
    { label: "No", value: false },
  ];
  const residentState = [
    { value: "Alabama", name: "Alabama" },
    { value: "Alaska", name: "Alaska" },
    { value: "Arizona", name: "Arizona" },
    { value: "Arkansas", name: "Arkansas" },
    { value: "California", name: "California" },
    { value: "Colorado", name: "Colorado" },
    { value: "Connecticut", name: "Connecticut" },
    { value: "Delaware", name: "Delaware" },
    { value: "Florida", name: "Florida" },
    { value: "Georgia", name: "Georgia" },
    { value: "Hawaii", name: "Hawaii" },
    { value: "Idaho", name: "Idaho" },
  ];
  const maritalStatus = [
    { value: "Single", name: "Single" },
    { value: "Married", name: "Married" },
  ];
  const taxFillingStatus = [
    { value: "Single", name: "Single" },
    { value: "Married Filling Jointly", name: "Married Filling Jointly" },
    { value: "Married Filling Separately", name: "Married Filling Separately" },
    { value: "Head Of Household", name: "Head Of Household" },
  ];
  const ClientProfileInitialValues = {
    year: 0,
    household_name: "",
    first_name: "",
    last_name: "",
    date_of_brith: "",
    gender: "male",
    resident_state: "",
    marital_status: "",
    tax_filling_status: "",
    blindness_status: false,
    spouse_fname: "",
    spouse_lname: "",
    spouse_dob: "",
    spouse_gender: "female",
    spouse_blindness_status: false,
  };

  const ClientProfileValidation = Yup.object({
    year: Yup.number()
      .min(1900, "Year must be later than 1900.")
      .required("Please select a year."),
    household_name: Yup.string().required("Please enter Household name."),
    first_name: Yup.string().required("Please enter first name."),
    last_name: Yup.string().required("Please enter last name."),
    date_of_brith: Yup.string().required("Please enter date of birth."),
    gender: Yup.string().required("Please select a gender."),
    resident_state: Yup.string().required("Please select a resident state."),
    marital_status: Yup.string().required("Please select a marital status."),
    tax_filling_status: Yup.string().required(
      "Please select a tax filling status."
    ),
    spouse_fname: Yup.string().when("marital_status", {
      is: "Married",
      then: () => Yup.string().required("Please enter spouse's first name."),
      otherwise: () => Yup.string(),
    }),
    spouse_lname: Yup.string().when("marital_status", {
      is: "Married",
      then: () => Yup.string().required("Please enter spouse's last name."),
      otherwise: () => Yup.string(),
    }),
    spouse_dob: Yup.string().when("marital_status", {
      is: "Married",
      then: () => Yup.string().required("Please enter spouse's date of birth."),
      otherwise: () => Yup.string(),
    }),
    spouse_gender: Yup.string().when("marital_status", {
      is: "Married",
      then: () => Yup.string().required("Please select spouse's gender."),
      otherwise: () => Yup.string(),
    }),
    spouse_blindness_status: Yup.boolean(),
  });

  const formik = useFormik({
    initialValues: ClientProfileInitialValues,
    validationSchema: ClientProfileValidation,
    onSubmit: async (values, action) => {
      console.log(values);
      action.resetForm();
      // route.push("/");
    },
  });

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setFieldValue,
  } = formik;

  const handleBackClick = () => {
    route.push("/dashboard");
  };

  const renderInput = (label, name, placeholder, type) => (
    <>
      <Label>{label}</Label>
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        value={values[name]}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errors[name] && touched[name] && <ErrorText text={errors[name]} />}
    </>
  );

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Back onClick={handleBackClick} text={"Add Profile"} />
        <div className={style.SelectDiv}>
          <div className={style.SelectSubDiv}>
            <div>
              <Label>Select Year</Label>
              <Dropdown
                data={yearOptions}
                value={values.year}
                setValue={(value) => setFieldValue("year", Number(value))}
                className="year-dropdown"
                disable={false}
                searchable={true}
              />
              {errors.year && touched.year && <ErrorText text={errors.year} />}
            </div>
            <div>
              {renderInput(
                "Add Household name",
                "household_name",
                "Enter household name",
                "text"
              )}
            </div>
          </div>
        </div>

        <div className={style.BasicInformationDiv}>
          <div className={style.BasinInfoDiv}>
            <HeadingTextH1 text={"Basic Information"} />
          </div>
          <div className={style.MainInfoDiv}>
            <div className={style.BasicInformationSubDivBase}>
              <div className={style.BasicInformationSubDivChildren}>
                {renderInput(
                  "First name",
                  "first_name",
                  "Enter first name",
                  "text"
                )}
              </div>
              <div className={style.BasicInformationSubDivChildren}>
                {renderInput(
                  "last name",
                  "last_name",
                  "Enter last name",
                  "text"
                )}
              </div>
              <div className={style.BasicInformationSubDivChildren}>
                {renderInput(
                  "Date of Birth",
                  "date_of_brith",
                  "Enter dob",
                  "date"
                )}
              </div>
              <div className={style.BasicInformationSubDivChildren1}>
                <Label for={"gender"}>Gender</Label>
                <ToggleOption
                  name={"gender"}
                  options={genderArr}
                  defaultOption={values.gender}
                  onChange={(value) => setFieldValue("gender", value)}
                />
                {errors.gender && touched.gender && (
                  <ErrorText text={errors.gender} />
                )}
              </div>
            </div>
            <div className={style.BasicInformationSubDiv}>
              <div className={style.BasicInformationSubDivChildren}>
                <Label>Resident State</Label>
                <Dropdown
                  data={residentState}
                  value={values.resident_state}
                  setValue={(value) => setFieldValue("resident_state", value)}
                  className={style.DropDownValiueStatus}
                  disable={false}
                  searchable={true}
                />
                {errors.resident_state && touched.resident_state && (
                  <ErrorText text={errors.resident_state} />
                )}
              </div>
              <div className={style.BasicInformationSubDivChildren}>
                <Label>Marital Status</Label>
                <Dropdown
                  data={maritalStatus}
                  value={values.marital_status}
                  setValue={(value) => setFieldValue("marital_status", value)}
                  className={style.DropDownValiueStatus}
                  disable={false}
                  searchable={true}
                />
                {errors.marital_status && touched.marital_status && (
                  <ErrorText text={errors.marital_status} />
                )}
              </div>
              <div className={style.BasicInformationSubDivChildren}>
                <Label>Tax Filling Status</Label>
                <Dropdown
                  data={taxFillingStatus}
                  value={values.tax_filling_status}
                  setValue={(value) =>
                    setFieldValue("tax_filling_status", value)
                  }
                  className={style.DropDownValiueStatus}
                  disable={false}
                  searchable={true}
                />
                {errors.tax_filling_status && touched.tax_filling_status && (
                  <ErrorText text={errors.tax_filling_status} />
                )}
              </div>

              <div className={style.BasicInformationSubDivChildren1}>
                <Label for={"blindness_status"}>Blindness Status</Label>
                <ToggleOption
                  name={"blindness_status"}
                  options={blindnessStatus}
                  defaultOption={values.blindness_status}
                  onChange={(value) => setFieldValue("blindness_status", value)}
                />
                {errors.blindness_status && touched.blindness_status && (
                  <ErrorText text={errors.blindness_status} />
                )}
              </div>
            </div>
            {values.marital_status === "Married" && (
              <>
                <div className={style.BasicInformationSubDivSpouse}>
                  <div className={style.BasicInformationSubDivChildren}>
                    {renderInput(
                      "Spouse First Name",
                      "spouse_fname",
                      "Enter spouse first name",
                      "text"
                    )}
                  </div>
                  <div className={style.BasicInformationSubDivChildren}>
                    {renderInput(
                      "Spouse Last Name",
                      "spouse_lname",
                      "Enter spouse last name",
                      "text"
                    )}
                  </div>
                  <div className={style.BasicInformationSubDivChildren}>
                    {renderInput(
                      "Spouse Date of Birth",
                      "spouse_dob",
                      "Enter spouse date of birth",
                      "date"
                    )}
                  </div>
                  <div className={style.BasicInformationSubDivChildren1}>
                    <Label for={"spouse_gender"}>Spouse Gender</Label>
                    <ToggleOption
                      name={"spouse_gender"}
                      options={genderArr}
                      defaultOption={values.spouse_gender}
                      onChange={(value) =>
                        setFieldValue("spouse_gender", value)
                      }
                    />
                    {errors.spouse_gender && touched.spouse_gender && (
                      <ErrorText text={errors.spouse_gender} />
                    )}
                  </div>
                </div>
                <div className={style.BasicInformationSubDivBorder}>
                  <div className={style.BasicInformationSubDivChildrene}>
                    <Label for={"spouse_blindness_status"}>
                      Spouse Blindness Status
                    </Label>
                    <ToggleOption
                      name={"spouse_blindness_status"}
                      options={blindnessStatus}
                      defaultOption={values.spouse_blindness_status}
                      onChange={(value) =>
                        setFieldValue("spouse_blindness_status", value)
                      }
                    />
                    {errors.spouse_blindness_status &&
                      touched.spouse_blindness_status && (
                        <ErrorText text={errors.spouse_blindness_status} />
                      )}
                  </div>
                </div>
              </>
            )}

            <div className={style.DependentMainDiv}>
              <div className={style.BasicInformationSubDivChildrene}>
                <Label for={"spouse_blindness_status"}>
                  Do you have any dependents?
                </Label>
                <ToggleOption
                className={style.DependentToggle}
                  name={"spouse_blindness_status"}
                  options={blindnessStatus}
                  defaultOption={values.spouse_blindness_status}
                  onChange={(value) =>
                    setFieldValue("spouse_blindness_status", value)
                  }
                />
                {errors.spouse_blindness_status &&
                  touched.spouse_blindness_status && (
                    <ErrorText text={errors.spouse_blindness_status} />
                  )}
              </div>
            </div>
          </div>
        </div>

        <div className={style.CreatButtonMainDiv}>
          <Button type={"submit"} text={"Create"} />
        </div>
      </form>
    </>
  );
}

export default AddHousehold;
