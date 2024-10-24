import React, { useEffect, useState } from "react";
import { Label } from "../FormElement/Lable";
import Dropdown from "../FormElement/Dropdown";
import Input from "../FormElement/Input";
import ToggleSwitch from "../FormElement/ToggleSwitch";
import ToggleOption from "../FormElement/ToggleOption";
import Button from "../FormElement/Button";
import style from "./General.module.css";
import HeadingTextH1 from "@/src/Typography/text/HeadingTextH1";
const GeneralIncome = ({ multuselectstatush, TotalIncome, price, name, totalInconeLine, IncomePrice, heading, className }) => {
  const [incomeEntries, setIncomeEntries] = useState([
    {
      income: "",
      amount: "",
      income_desc: "",
      fed_taxable: false,
      fed_wh: "",
      total_value: "",
    },
  ]);
  const [totalIncome, setTotalIncome] = useState(0);                                                              


  const options = [
    { label: "Yes", value: "yes" },
    { label: "No", value: "no" },
  ];

  const handleAddIncome = () => {
    setIncomeEntries([
      ...incomeEntries,
      {
        income: "",
        amount: "",
        income_desc: "",
        fed_taxable: false,
        fed_wh: "",
        total_value: "",
      },
    ]);
  };

  const handleIncomeChange = (index, field, value) => {
    const updatedEntries = [...incomeEntries];
    updatedEntries[index][field] = value;
    setIncomeEntries(updatedEntries);
  };

  const handleToggleSwitchChange = (index, value) => {
    const updatedEntries = [...incomeEntries];
    updatedEntries[index].fed_taxable = value;
    setIncomeEntries(updatedEntries);
  };



  useEffect(() => {
    const total = incomeEntries.reduce((sum, entry) => {
      const amount = parseFloat(entry.amount) || 0;
      return sum + amount;
    }, 0);
    setTotalIncome(total);
  }, [incomeEntries]);
  return (
    <>
      <div className={`${style.BasicInformationDiv} ${className}`}>
        <div className={style.BasinInfoDiv}>
          <HeadingTextH1 text={heading} />
        </div>
        <div className={style.MainInfoDiv}>
          <div className={style.TotalIncomeMainDiv}>
            <div className={style.TotalIncomeSubDiv}>{TotalIncome}</div>
            <div className={style.TotalIncomePriceDiv}>{price}</div>
          </div>
          <div className={style.GeneralIncomeHeadingDiv}>
            <div className={style.NameDiv}>{name}</div>
            {/* <div className={style.IncomeDiv}>
              {totalInconeLine} :{" "}
              <span className={style.TotalIncomeSubPriceDiv}>{IncomePrice}</span>
            </div> */}
            <div className={style.IncomeDiv}>
              {totalInconeLine} :{" "}
              <span className={style.TotalIncomeSubPriceDiv}>${totalIncome}</span>
            </div>
          </div>
          <div className={style.GeneralInfoBorder}>
            {incomeEntries.map((entry, index) => (
              <div
                key={index}
                className={style.BasicInformationSubDivBaseGeneralIncome}
              >
                <div>
                  <Label for={"income"}>Select Income</Label>
                  <Dropdown
                    value={entry.income}
                    setValue={(value) =>
                      handleIncomeChange(index, "income", value)
                    }
                    data={multuselectstatush}
                  />
                </div>

                <div>
                  <Label for={"amount"}>Amount</Label>
                  <Input
                    placeholder={"Enter amount"}
                    name={`amount-${index}`}
                    type={"text"}
                    value={entry.amount}
                    onChange={(e) =>
                      handleIncomeChange(index, "amount", e.target.value)
                    }
                  />
                </div>

                <div>
                  <Label for={"income_desc"}>Income Description</Label>
                  <Input
                    placeholder={"Enter income description"}
                    name={`income_desc-${index}`}
                    type={"text"}
                    value={entry.income_desc}
                    onChange={(e) =>
                      handleIncomeChange(index, "income_desc", e.target.value)
                    }
                  />
                </div>

                <div>
                  <Label for={"fed_taxable"}>Fed Taxable Income</Label>
                  <ToggleSwitch
                    onChange={(value) => handleToggleSwitchChange(index, value)}
                    checked={entry.fed_taxable}
                  />
                </div>

                <div>
                  <Label for={"fed_wh"}>Fed w/h</Label>
                  <ToggleOption
                    options={options}
                    defaultOption={entry.fed_wh}
                    onChange={(value) =>
                      handleIncomeChange(index, "fed_wh", value)
                    }
                    name={`fed_wh-${index}`}
                  />
                </div>

                <div>
                  <Label for={"total_value"}>Total Value</Label>
                  <Input
                    placeholder={"Enter total value"}
                    name={`total_value-${index}`}
                    type={"text"}
                    value={entry.total_value}
                    onChange={(e) =>
                      handleIncomeChange(index, "total_value", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
            <Button
              className={style.AddIncomeBtm}
              type={"button"}
              text={"+ Add Income"}
              onClick={handleAddIncome}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default GeneralIncome;




