"use client";
import Back from "@/src/Component/Back/page";
import React, { useState } from "react";
import style from "./UserProfile.module.css";
import { Label } from "@/src/Component/FormElement/Lable";
import Input from "@/src/Component/FormElement/Input";
import HeadingTextH1 from "@/src/Typography/text/HeadingTextH1";
import ToggleOption from "@/src/Component/FormElement/ToggleOption";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import ErrorText from "@/src/Typography/text/ErrorText";
import Button from "@/src/Component/FormElement/Button";
import Dropdown from "@/src/Component/FormElement/Dropdown";
import GeneralIncome from "@/src/Component/Profile/GeneralIncome";
import InvestmentIncome from "@/src/Component/Profile/InvestmentIncome";
import NameFontBodyBook from "@/src/Typography/text/NameFontBodyBook";
import InputNum from "@/src/Component/FormElement/InputNum";

function UserProfile() {
  const route = useRouter();

  const [isDeductionEnabled, setDeductionEnabled] = useState(false);
  const [activeMaritalStatus, setActiveMaritalStatus] = useState();
  const [activeResidentState, setActiveResidentState] = useState();
  const [activeTaxStatus, setActiveTaxStatus] = useState("Single");
  const [namevalues, setNamevalues] = useState({ first_name: "" });
  const [Spousenamevalues, setSpouseNamevalues] = useState({
    spouse_fname: "",
  });

  const [monthlyBenefit1, setMonthlyBenefit1] = useState("");
  const [monthlyBenefit2, setMonthlyBenefit2] = useState("");

  const handleBenefitChange1 = (value) => {
    const parsedValue = parseFloat(value) || 0;
    setMonthlyBenefit1(parsedValue);
  };

  const handleBenefitChange2 = (value) => {
    const parsedValue = parseFloat(value) || 0;
    setMonthlyBenefit2(parsedValue);
  };

  const total = monthlyBenefit1 + monthlyBenefit2 || 0;

  const options = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];
  const Deduction = [
    { label: "Standard Deduction", value: "yes" },
    { label: "Itemized Deduction", value: "no" },
  ];
  const Gender = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];
  const BusinessStatus = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];
  const BusinessStatus1 = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];

  const multuselectstatush = [
    { value: 1, name: "Salary Income" },
    { value: 2, name: "Wages Income" },
    { value: 3, name: "Bonuses Income" },
    { value: 4, name: "Commission Income" },
    { value: 5, name: "Freelance Income" },
  ];
  const InvestmentIncomeValue = [
    { value: 1, name: "Dividends Income" },
    { value: 2, name: "Interest Income" },
    { value: 3, name: "Rental Income" },
    { value: 4, name: "Royalties Income" },
    { value: 5, name: "Capital Gains Income" },
  ];
  const IncomeFrequency = [
    { value: 1, name: "Monthly" },
    { value: 2, name: "Yearly" },
  ];

  const maritalStatus = [
    { value: "Single", name: "Single" },
    { value: "Married", name: "Married" },
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

  const taxFillingStatus = [
    { value: "Single", name: "Single" },
    { value: "Married Filling Jointly", name: "Married Filling Jointly" },
    { value: "Married Filling Seprately", name: "Married Filling Seprately" },
    { value: "Head Of Household", name: "Head Of Household" },
  ];
  const ClientProfileInitialValues = {
    household_name: "",
    first_name: "",
    last_name: "",
    dob: "",
    dob1: "",
    spouse_dob: "",
    email: "",
    gender: "",
    resident_state: "",
    marital_status: "",
    spouse_fname: "",
    spouse_lname: "",
    blindness_status: "",
    spouse_gender: "",
    spouse_blindness_status: "",
    incomes: [{ amount: "", income_desc: "", value: "" }],
    deduction: "no",
    federalDeduction: "",
    taxEligibleDeduction: "",
    monthlyBenefit1: "",
    startAge1: "",
    retireAge1: "",
    monthlyBenefit2: "",
    startAge2: "",
    retireAge2: "",
  };

  const ClientProfileValidation = Yup.object({
    household_name: Yup.string().required("Please enter  Household name."),
    first_name: Yup.string().required("Please enter first name."),
    last_name: Yup.string().required("Please enter last name."),
    dob: Yup.string().required("Date of birth is required"),
    dob1: Yup.string().required("Date of birth is required"),
    spouse_dob: Yup.string().required("Date of birth is required"),
    resident_state: Yup.string().required("Resident state is required"),
    marital_status: Yup.string().required("Select marital status"),
    spouse_fname: Yup.string().required("Please enter spouse first name"),
    spouse_lname: Yup.string().required("Please enter spouse last name"),
    incomes: Yup.array().of(
      Yup.object().shape({
        amount: Yup.string().required("Enter amount."),
        income_desc: Yup.string().required("Enter income description."),
        value: Yup.string().required("Enter value."),
      })
    ),
    deduction: Yup.string().required("Select deduction"),
    federalDeduction: Yup.string().test(
      "required-if-deduction-yes",
      "Enter federal deduction",
      function (value) {
        return this.parent.deduction === "no" ? !!value : true;
      }
    ),

    taxEligibleDeduction: Yup.string().test(
      "required-if-deduction-yes",
      "Enter tax eligible deduction",
      function (value) {
        return this.parent.deduction === "no" ? !!value : true;
      }
    ),
    monthlyBenefit1: Yup.string().required("Enter monthly benefit."),
    startAge1: Yup.string().required("Enter start age."),
    retireAge1: Yup.string().required("Enter retirement age."),
    // monthlyBenefit2: Yup.string().required("Enter monthly benefit."),
    // startAge2: Yup.string().required("Enter start age."),
    // retireAge2: Yup.string().required("Enter retirement age."),

    monthlyBenefit2: Yup.string().when("marital_status", {
      is: "Married",
      then: Yup.string().required("Enter spouse's monthly benefit."),
    }),
    startAge2: Yup.string().when("marital_status", {
      is: "Married",
      then: Yup.string().required("Enter spouse's start age."),
    }),
    retireAge2: Yup.string().when("marital_status", {
      is: "Married",
      then: Yup.string().required("Enter spouse's retirement age."),
    }),
  });
  const formik = useFormik({
    initialValues: ClientProfileInitialValues,
    validationSchema: ClientProfileValidation,
    onSubmit: async (values, action) => {
      console.log(values);
      action.resetForm();
      route.push("/");
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
  console.log(errors);

  const handleToggleChange = (selectedValue) => {
    setDeductionEnabled(selectedValue === "yes");
  };

  const handleToggleChange1 = (selectedValue) => {
    console.log("Selected option:", selectedValue);
  };
  const handleBackClick = () => {
    route.push("/dashboard");
  };
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const yearOptions = Array.from(new Array(50), (val, index) => ({
    name: (currentYear - index).toString(),
    value: currentYear - index,
  }));

  const handleChangeName = (e) => {
    setNamevalues({ ...values, [e.target.name]: e.target.value });
  };
  const handleChangeSpouseName = (e) => {
    setSpouseNamevalues({ ...values, [e.target.name]: e.target.value });
  };

  const handleBlurName = (e) => {};

  const handleChangeMaritalStatus = (value) => {
    setActiveMaritalStatus(value);
    if (value === "Single") {
      formik.setValues({
        ...formik.values,
        spouse_fname: "",
        spouse_lname: "",
        spouse_dob: "",
        spouse_gender: "",
        spouse_blindness_status: "",
      });
      setSpouseNamevalues({ spouse_fname: "" });
    }
  };

  const renderGeneralIncomeComponents = () => {
    switch (activeTaxStatus) {
      case "Single":
      case "Head Of Household":
        return (
          <GeneralIncome
            multuselectstatush={multuselectstatush}
            TotalIncome={"Total income"}
            price={"$ 30,480.00"}
            name={namevalues.first_name}
            totalInconeLine={`Total Income`}
            IncomePrice={"$ 15,420.00"}
            heading={"General Information"}
          />
        );
      case "Married Filling Jointly":
        return (
          <>
            <GeneralIncome
              className={style.BorderNone}
              multuselectstatush={multuselectstatush}
              TotalIncome={"Total income"}
              price={"$ 30,480.00"}
              name={namevalues.first_name}
              totalInconeLine={`${namevalues.first_name} Total Income`}
              IncomePrice={"$ 15,420.00"}
              heading={"General Information"}
            />
            <GeneralIncome
              className={style.BorderNone}
              multuselectstatush={multuselectstatush}
              name={Spousenamevalues.spouse_fname}
              totalInconeLine={`${Spousenamevalues.spouse_fname} Total Income`}
              IncomePrice={"$ 15,420.00"}
            />
            <GeneralIncome
              multuselectstatush={multuselectstatush}
              name={"Joint Income"}
              totalInconeLine={"Joint Income"}
              IncomePrice={"$ 15,420.00"}
            />
          </>
        );
      case "Married Filling Seprately":
        return (
          <>
            <GeneralIncome
              className={style.BorderNone}
              multuselectstatush={multuselectstatush}
              TotalIncome={"Total income"}
              price={"$ 30,480.00"}
              name={namevalues.first_name}
              totalInconeLine={`${namevalues.first_name} Total Income`}
              IncomePrice={"$ 15,420.00"}
              heading={"General Information"}
            />
            <GeneralIncome
              multuselectstatush={multuselectstatush}
              name={Spousenamevalues.spouse_fname}
              totalInconeLine={`${Spousenamevalues.spouse_fname} Total Income`}
              IncomePrice={"$ 15,420.00"}
            />
          </>
        );
      default:
        return null;
    }
  };

  const renderInvestmentIncome = () => {
    switch (activeTaxStatus) {
      case "Single":
      case "Head Of Household":
        return (
          <InvestmentIncome
            heading={"Investment Income"}
            multuselectstatush={InvestmentIncomeValue}
            multuselectstatushFre={IncomeFrequency}
            TotalIncome={"Total Invesment Income"}
            price={"$30,480.00"}
            name={namevalues.first_name}
            totalInconeLine={`${namevalues.first_name} Total Income`}
            IncomePrice={"$15,420.00"}
          />
        );
      case "Married Filling Jointly":
        return (
          <>
            <InvestmentIncome
              className={style.BorderNone}
              heading={"Investment Income"}
              multuselectstatush={InvestmentIncomeValue}
              multuselectstatushFre={IncomeFrequency}
              TotalIncome={"Total Invesment Income"}
              price={"$30,480.00"}
              name={namevalues.first_name}
              totalInconeLine={`${namevalues.first_name} Total Income`}
              IncomePrice={"$15,420.00"}
            />
            <InvestmentIncome
              className={style.BorderNone}
              multuselectstatush={InvestmentIncomeValue}
              multuselectstatushFre={IncomeFrequency}
              name={Spousenamevalues.spouse_fname}
              totalInconeLine={`${Spousenamevalues.spouse_fname} Total Income`}
              IncomePrice={"$ 15,420.00"}
            />
            <InvestmentIncome
              multuselectstatush={InvestmentIncomeValue}
              multuselectstatushFre={IncomeFrequency}
              name={"Joint Income"}
              totalInconeLine={"Joint Income"}
              IncomePrice={"$ 15,420.00"}
            />
          </>
        );
      case "Married Filling Seprately":
        return (
          <>
            <InvestmentIncome
              className={style.BorderNone}
              heading={"Investment Income"}
              multuselectstatush={InvestmentIncomeValue}
              multuselectstatushFre={IncomeFrequency}
              TotalIncome={"Total Invesment Income"}
              price={"$30,480.00"}
              name={namevalues.first_name}
              totalInconeLine={`${namevalues.first_name} Total Income`}
              IncomePrice={"$15,420.00"}
            />
            <InvestmentIncome
              multuselectstatush={InvestmentIncomeValue}
              multuselectstatushFre={IncomeFrequency}
              name={Spousenamevalues.spouse_fname}
              totalInconeLine={`${Spousenamevalues.spouse_fname} Total Income`}
              IncomePrice={"$ 15,420.00"}
            />
          </>
        );
      default:
        return null;
    }
  };

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
                value={selectedYear}
                setValue={setSelectedYear}
                className="year-dropdown"
                disable={false}
                searchable={true}
              />
            </div>
            <div>
              <Label>Add Household name</Label>
              <Input
                placeholder={"Enter household name"}
                name={"household_name"}
                type={"text"}
                value={values.household_name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.household_name && touched.household_name && (
                <ErrorText text={errors.household_name} />
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
                <Label for={"first_name"}>First name</Label>
                <Input
                  placeholder={"Enter first name"}
                  name={"first_name"}
                  type={"text"}
                  value={namevalues.first_name}
                  onChange={handleChangeName}
                  // onBlur={handleBlur}
                />
                {errors.first_name && touched.first_name && (
                  <ErrorText text={errors.first_name} />
                )}
              </div>
              <div className={style.BasicInformationSubDivChildren}>
                <Label for={"last_name"}>last name</Label>
                <Input
                  placeholder={"Enter last name"}
                  name={"last_name"}
                  type={"text"}
                  value={values.last_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.last_name && touched.last_name && (
                  <ErrorText text={errors.last_name} />
                )}
              </div>
              <div className={style.BasicInformationSubDivChildren}>
                <Label for={"dob"}>Date of Birth</Label>
                <Input
                  placeholder={"Enter household name"}
                  name={"dob"}
                  type={"date"}
                  value={values.dob}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.dob && touched.dob && <ErrorText text={errors.dob} />}
              </div>
              <div className={style.BasicInformationSubDivChildren1}>
                <Label for={"gender"}>Gender</Label>
                <ToggleOption
                  options={options}
                  defaultOption="male"
                  onChange={handleToggleChange}
                  name={"gender"}
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
                  value={activeResidentState}
                  setValue={setActiveResidentState}
                  className={style.DropDownValiueStatus}
                  disable={false}
                />
                {errors.resident_state && touched.resident_state && (
                  <ErrorText text={errors.resident_state} />
                )}
              </div>
              <div className={style.BasicInformationSubDivChildren}>
                <Label>Marital Status</Label>
                <Dropdown
                  data={maritalStatus}
                  value={activeMaritalStatus}
                  setValue={handleChangeMaritalStatus}
                  className={style.DropDownValiueStatus}
                  disable={false}
                />
                {errors.marital_status && touched.marital_status && (
                  <ErrorText text={errors.marital_status} />
                )}
              </div>
              <div className={style.BasicInformationSubDivChildren}>
                <Label>Tax Filling Status</Label>
                <Dropdown
                  data={taxFillingStatus}
                  value={activeTaxStatus}
                  setValue={setActiveTaxStatus}
                  className={style.DropDownValiueStatus}
                  disable={false}
                />
              </div>

              <div className={style.BasicInformationSubDivChildren1}>
                <Label for={"blindness_status"}>Blindness Status</Label>
                <ToggleOption
                  options={BusinessStatus}
                  defaultOption="no"
                  onChange={handleToggleChange1}
                  name={"blindness_status"}
                />
                {errors.blindness_status && touched.blindness_status && (
                  <ErrorText text={errors.blindness_status} />
                )}
              </div>
            </div>
            {activeMaritalStatus === "Married" && (
              <>
                <div className={style.BasicInformationSubDivSpouse}>
                  <div className={style.BasicInformationSubDivChildren}>
                    <Label for={"spouse_fname"}>Spouse’s first name</Label>
                    <Input
                      placeholder={"Enter spouse’s first name"}
                      name={"spouse_fname"}
                      type={"text"}
                      // disable={true}
                      //   value={values.spouse_fname}
                      value={values.spouse_fname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.spouse_fname && touched.spouse_fname && (
                      <ErrorText text={errors.spouse_fname} />
                    )}
                  </div>
                  <div className={style.BasicInformationSubDivChildren}>
                    <Label for={"spouse_lname"}>Spouse’s last name</Label>
                    <Input
                      placeholder={"Enter spouse’s last name"}
                      name={"spouse_lname"}
                      type={"text"}
                      // disable={true}
                      value={values.spouse_lname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.spouse_lname && touched.spouse_lname && (
                      <ErrorText text={errors.spouse_lname} />
                    )}
                  </div>
                  <div className={style.BasicInformationSubDivChildren}>
                    <Label for={"spouse_dob"}>Date of Birth</Label>
                    <Input
                      placeholder={"Enter household name"}
                      name={"spouse_dob"}
                      type={"date"}
                      // disable={true}
                      value={values.spouse_dob}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.spouse_dob && touched.spouse_dob && (
                      <ErrorText text={errors.spouse_dob} />
                    )}
                  </div>
                  <div className={style.BasicInformationSubDivChildren1}>
                    <Label for={"spouse_gender"}>Gender</Label>
                    <ToggleOption
                      options={Gender}
                      defaultOption="female"
                      onChange={handleToggleChange1}
                      name={"spouse_gender"}
                    />
                    {errors.spouse_gender && touched.spouse_gender && (
                      <ErrorText text={errors.spouse_gender} />
                    )}
                  </div>
                </div>

                <div className={style.BasicInformationSubDiv}>
                  <div className={style.BasicInformationSubDivChildrene}>
                    <Label for={"spouse_blindness_status"}>
                      Blindness Status
                    </Label>
                    <ToggleOption
                      options={BusinessStatus1}
                      defaultOption="yes"
                      onChange={handleToggleChange1}
                      name={"spouse_blindness_status"}
                    />
                    {errors.spouse_blindness_status &&
                      touched.spouse_blindness_status && (
                        <ErrorText text={errors.spouse_blindness_status} />
                      )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className={style.BasicInformationDivTax}>
          <div className={style.BasinInfoDiv}>
            <HeadingTextH1 text={"Tax Filing Information"} />
          </div>
          <div className={style.BasicInformationSubDivBaseDeduction}>
            <div>
              <Label>Select Deduction</Label>
              <ToggleOption
                className={style.BadioButtonDeduction}
                options={Deduction}
                defaultOption="no"
                onChange={(value) => {
                  setFieldValue("deduction", value);
                  handleToggleChange(value);
                }}
                name={"deduction"}
              />
              {errors.deduction && touched.deduction && (
                <ErrorText text={errors.deduction} />
              )}
            </div>
            <div>
              <Label>Federal Deduction:</Label>
              <Input
                placeholder={"Enter fedaral deduction"}
                name={"federalDeduction"}
                type={"text"}
                disabled={isDeductionEnabled}
                value={values.federalDeduction}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.federalDeduction && touched.federalDeduction && (
                <ErrorText text={errors.federalDeduction} />
              )}
            </div>
            <div>
              <Label>Tax Eligible dependent Deduction:</Label>
              <Input
                placeholder={"Enter tax eligible deduction"}
                name={"taxEligibleDeduction"}
                type={"text"}
                disabled={isDeductionEnabled}
                value={values.taxEligibleDeduction}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {errors.taxEligibleDeduction && touched.taxEligibleDeduction && (
                <ErrorText text={errors.taxEligibleDeduction} />
              )}
            </div>
          </div>
        </div>

        {renderGeneralIncomeComponents()}
        {renderInvestmentIncome()}

        <div className={style.BasicInformationDiv}>
          <div className={style.BasinInfoDiv}>
            <HeadingTextH1 text={"Social Security Income"} />
          </div>
          <div className={style.MainInfoDiv}>
            <div className={style.TotalIncomeMainDiv}>
              <div className={style.TotalIncomeSubDiv}>Taxable Benefit:</div>
              <div className={style.TotalIncomePriceDiv}>${total}</div>
            </div>

            <div className={style.MainDivForFooterSection}>
              <div className={style.NameDiv}>{namevalues.first_name}</div>

              <div className={style.SubMainDivForFooterSction}>
                <div className={style.MainDivForamount}>
                  <div>
                    <Label>Monthly Social Security Benefit</Label>
                    <InputNum
                      placeholder={"$0"}
                      name={"monthlyBenefit1"}
                      type={"text"}
                      disable={false}
                      // value={monthlyBenefit1}
                      // setValue={handleBenefitChange1}

                      value={values.monthlyBenefit1}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.monthlyBenefit1 && touched.monthlyBenefit1 && (
                      <ErrorText text={errors.monthlyBenefit1} />
                    )}
                  </div>
                  <NameFontBodyBook
                    className={style.Estimateamount}
                    text={"Estimate amount"}
                  />
                </div>
                <div className={style.MainDivForamount}>
                  <div>
                    <Label>Start social security at age</Label>
                    <InputNum
                      placeholder={"66"}
                      name={"startAge1"}
                      // type={"text"}
                      // disable={false}
                      value={values.startAge1}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.startAge1 && touched.startAge1 && (
                      <ErrorText text={errors.startAge1} />
                    )}
                  </div>
                  <NameFontBodyBook
                    className={style.Estimateamount}
                    text={"(62-70)"}
                  />
                </div>
                <div className={style.MainDivForamount}>
                  <div>
                    <Label>Retire at age</Label>
                    <InputNum
                      placeholder={"66"}
                      name={"retireAge1"}
                      type={"text"}
                      disable={false}
                      value={values.retireAge1}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    {errors.retireAge1 && touched.retireAge1 && (
                      <ErrorText text={errors.retireAge1} />
                    )}
                  </div>
                  <NameFontBodyBook
                    className={style.Estimateamount}
                    text={"(year 2025)"}
                  />
                </div>
              </div>
            </div>
            {activeMaritalStatus === "Married" && (
              <div className={style.MainDivForFooterSection}>
                <div className={style.NameDiv}>
                  {Spousenamevalues.spouse_fname}
                </div>

                <div className={style.SubMainDivForFooterSction}>
                  <div className={style.MainDivForamount}>
                    <div>
                      <Label>Monthly Social Security Benefit</Label>
                      <InputNum
                        placeholder={"$0"}
                        name={"monthlyBenefit2"}
                        type={"text"}
                        disable={false}
                        value={values.monthlyBenefit2}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.monthlyBenefit2 && touched.monthlyBenefit2 && (
                        <ErrorText text={errors.monthlyBenefit2} />
                      )}
                    </div>
                    <NameFontBodyBook
                      className={style.Estimateamount}
                      text={"Estimate amount"}
                    />
                  </div>
                  <div className={style.MainDivForamount}>
                    <div>
                      <Label>Start social security at age</Label>
                      <InputNum
                        placeholder={"66"}
                        name={"startAge2"}
                        type={"text"}
                        disable={false}
                        value={values.startAge2}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.startAge2 && touched.startAge2 && (
                        <ErrorText text={errors.startAge2} />
                      )}
                    </div>
                    <NameFontBodyBook
                      className={style.Estimateamount}
                      text={"(62-70)"}
                    />
                  </div>
                  <div className={style.MainDivForamount}>
                    <div>
                      <Label>Retire at age</Label>
                      <InputNum
                        placeholder={"66"}
                        name={"retireAge2"}
                        type={"text"}
                        disable={false}
                        value={values.retireAge2}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.retireAge2 && touched.retireAge2 && (
                        <ErrorText text={errors.retireAge2} />
                      )}
                    </div>
                    <NameFontBodyBook
                      className={style.Estimateamount}
                      text={"(year 2025)"}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className={style.CreatButtonMainDiv}>
          <Button type={"submit"} text={"Create"} />
        </div>
      </form>
    </>
  );
}

export default UserProfile;
