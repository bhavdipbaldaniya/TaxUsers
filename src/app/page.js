"use client";
import React, { useEffect, useState } from "react";

import TextArea from "../Component/FormElement/TextArea";
import Dropdown from "../Component/FormElement/Dropdown";
import GeneralIncome from "../Component/Profile/GeneralIncome";
import Button from "../Component/FormElement/Button";
const page = () => {
  const [selectedOptions, setSelectedOptions] = useState("");

  const multuselectstatush = [
    { value: 1, name: "Available" },
    { value: 2, name: "Funded" },
    { value: 3, name: "Exited" },
  ]


  const [value, setValue] = useState(150000);
  const [tax, setTax] = useState(0);

  const BRACKET1_LIMIT = 12400;
  const BRACKET2_LIMIT = 49200;
  const BRACKET3_LIMIT = 101600;
  const BRACKET4_LIMIT = 174400;

  const BRACKET1_RATE = 0.1;  // 10% for 0 - 12,400
  const BRACKET2_RATE = 0.12; // 12% for 12,400 - 49,200
  const BRACKET3_RATE = 0.22; // 22% for 49,200 - 101,600
  const BRACKET4_RATE = 0.24; // 24% for 101,600 - 174,400

  useEffect(() => {
    calculateTax(value);
  }, [value]);


  // const calculateTax = (amount) => {
  //   let totalTax = 0;
  //   let remainingAmount = amount;

  //   // First bracket calculation: 0 to BRACKET1_LIMIT -> BRACKET1_RATE (10%)
  //   if (remainingAmount > BRACKET1_LIMIT) {
  //     totalTax += BRACKET1_LIMIT * BRACKET1_RATE;
  //     remainingAmount -= BRACKET1_LIMIT;
  //   } else {
  //     totalTax += remainingAmount * BRACKET1_RATE;
  //     remainingAmount = 0;
  //   }

  //   // Second bracket calculation: BRACKET1_LIMIT to BRACKET2_LIMIT -> BRACKET2_RATE (12%)
  //   if (remainingAmount > BRACKET2_LIMIT - BRACKET1_LIMIT) {
  //     totalTax += (BRACKET2_LIMIT - BRACKET1_LIMIT) * BRACKET2_RATE;
  //     remainingAmount -= (BRACKET2_LIMIT - BRACKET1_LIMIT);
  //   } else if (remainingAmount > 0) {
  //     totalTax += remainingAmount * BRACKET2_RATE;
  //     remainingAmount = 0;
  //   }

  //   // Third bracket calculation: BRACKET2_LIMIT to BRACKET3_LIMIT -> BRACKET3_RATE (22%)
  //   if (remainingAmount > BRACKET3_LIMIT - BRACKET2_LIMIT) {
  //     totalTax += (BRACKET3_LIMIT - BRACKET2_LIMIT) * BRACKET3_RATE;
  //     remainingAmount -= (BRACKET3_LIMIT - BRACKET2_LIMIT);
  //   } else if (remainingAmount > 0) {
  //     totalTax += remainingAmount * BRACKET3_RATE;
  //     remainingAmount = 0;
  //   }

  //   // Fourth bracket calculation: BRACKET3_LIMIT to BRACKET4_LIMIT -> BRACKET4_RATE (24%)
  //   if (remainingAmount > BRACKET4_LIMIT - BRACKET3_LIMIT) {
  //     totalTax += (BRACKET4_LIMIT - BRACKET3_LIMIT) * BRACKET4_RATE;
  //     remainingAmount -= (BRACKET4_LIMIT - BRACKET3_LIMIT);
  //   } else if (remainingAmount > 0) {
  //     totalTax += remainingAmount * BRACKET4_RATE;
  //     remainingAmount = 0;
  //   }

  //   // Log and set the total tax calculated
  //   console.log("Total Tax: ", totalTax);
  //   setTax(totalTax);
  // };

  const calculateTax = (amount) => {
    let totalTax = 0;
    let remainingAmount = amount;

    // First bracket calculation: 0 to BRACKET1_LIMIT -> BRACKET1_RATE (10%)
    if (remainingAmount > BRACKET1_LIMIT) {
      const taxForBracket1 = BRACKET1_LIMIT * BRACKET1_RATE;
      totalTax += taxForBracket1;
      remainingAmount -= BRACKET1_LIMIT;
      console.log(`Tax at 10%: ${taxForBracket1}`);
    } else {
      const taxForBracket1 = remainingAmount * BRACKET1_RATE;
      totalTax += taxForBracket1;
      console.log(`Tax at 10%: ${taxForBracket1}`);
      remainingAmount = 0;
    }

    // Second bracket calculation: BRACKET1_LIMIT to BRACKET2_LIMIT -> BRACKET2_RATE (12%)
    if (remainingAmount > BRACKET2_LIMIT - BRACKET1_LIMIT) {
      const taxForBracket2 = (BRACKET2_LIMIT - BRACKET1_LIMIT) * BRACKET2_RATE;
      totalTax += taxForBracket2;
      remainingAmount -= (BRACKET2_LIMIT - BRACKET1_LIMIT);
      console.log(`Tax at 12%: ${taxForBracket2}`);
    } else if (remainingAmount > 0) {
      const taxForBracket2 = remainingAmount * BRACKET2_RATE;
      totalTax += taxForBracket2;
      console.log(`Tax at 12%: ${taxForBracket2}`);
      remainingAmount = 0;
    }

    // Third bracket calculation: BRACKET2_LIMIT to BRACKET3_LIMIT -> BRACKET3_RATE (22%)
    if (remainingAmount > BRACKET3_LIMIT - BRACKET2_LIMIT) {
      const taxForBracket3 = (BRACKET3_LIMIT - BRACKET2_LIMIT) * BRACKET3_RATE;
      totalTax += taxForBracket3;
      remainingAmount -= (BRACKET3_LIMIT - BRACKET2_LIMIT);
      console.log(`Tax at 22%: ${taxForBracket3}`);
    } else if (remainingAmount > 0) {
      const taxForBracket3 = remainingAmount * BRACKET3_RATE;
      totalTax += taxForBracket3;
      console.log(`Tax at 22%: ${taxForBracket3}`);
      remainingAmount = 0;
    }

    // Fourth bracket calculation: BRACKET3_LIMIT to BRACKET4_LIMIT -> BRACKET4_RATE (24%)
    if (remainingAmount > BRACKET4_LIMIT - BRACKET3_LIMIT) {
      const taxForBracket4 = (BRACKET4_LIMIT - BRACKET3_LIMIT) * BRACKET4_RATE;
      console.log('sdfsfsdgftdfgdfgdgdgdg',remainingAmount);
      
      totalTax += taxForBracket4;
      remainingAmount -= (BRACKET4_LIMIT - BRACKET3_LIMIT);
      console.log(`Tax at 24%: ${taxForBracket4}`);
    } else if (remainingAmount > 0) {
      const taxForBracket4 = remainingAmount * BRACKET4_RATE;
      totalTax += taxForBracket4;
      console.log(`Tax at 24%: ${taxForBracket4}`);
      remainingAmount = 0;
    }

    // Log the total tax calculated
    console.log("Total Tax: ", totalTax);
    setTax(totalTax);
  };
  return (
    <>
      Main page


      <div>
        <h1>Tax Calculator</h1>
        <p>Income: {value}</p>
        <p>Tax: {tax}</p>
      </div>


      {/* <TextArea placeholder={"Desceiption"} />
      <Dropdown
        value={selectedOptions}
        setValue={setSelectedOptions}
        data={multuselectstatush}
        // searchable={true}
      /> */}

      {/* <GeneralIncome multuselectstatush={multuselectstatush} /> */}




    </>
  );
};

export default page;
