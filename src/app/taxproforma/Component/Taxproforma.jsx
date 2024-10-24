import React, { useEffect, useState } from "react";
import styles from "./Data.module.css";
import XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  ic_Delete,
  ic_Edit,
  ic_Editicon,
  ic_Excel,
  ic_Information,
} from "@/src/Utils/svg";
import Button from "@/src/Component/FormElement/Button";
import Back from "@/src/Component/Back/page";
import Buttonwthoutsvg from "@/src/Component/FormElement/Buttonwthoutsvg";
import userDetail from "./userDetail.json";
import DraftModal from "@/src/Component/FormElement/DraftModal";
import Modeltaxbrackets from "./Modeltaxbrackets";
import { useRouter } from "next/navigation";
import { Label } from "@/src/Component/FormElement/Lable";
import Dropdown from "@/src/Component/FormElement/Dropdown";
import Modal from "@/src/Component/FormElement/Modal";

const Taxproforma = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("actual");
  const [drafts, setDrafts] = useState({});
  const [taxModal, setTaxModal] = useState(false);
  const [taxModalDelete, setTaxModalDelete] = useState(false);
  const router = useRouter();


  const [editingValues, setEditingValues] = useState(
    userDetail.data.map((item) => ({
      ...item,
      isEditingTotal: false,
      isEditingFederal: false,
      isEditingwithholding: false,
    }))
  );

  const totalSum = editingValues.reduce(
    (acc, item) => acc + parseFloat(item.total),
    // (acc, item) => acc + parseFloat(item.total.replace(/,/g, "")),
    0
  );
  console.log("heared147894656", totalSum)

  const federalSum = editingValues.reduce((acc, item) => {
    const federalValue =
      item.federal !== "-" ? parseFloat(item.federal) : 0;
    // item.federal !== "-" ? parseFloat(item.federal.replace(/,/g, "")) : 0;
    return acc + federalValue;
  }, 0);

  // const federalWH = editingValues.reduce(
  //   (acc, item) => acc + parseFloat(item.federal_wh.replace(/,/g, "")),
  //   0
  // );

  const federalWith = editingValues.reduce((acc, item) => {
    const federalValueWH =
      item.federal_wh !== "-" ? parseFloat(item.federal_wh.replace(/,/g, "")) : 0;
    return acc + federalValueWH;
  }, 0);
  const standardDeduction = 16850;
  const TaxableIncome = (federalSum - standardDeduction).toFixed(2);

  const [value, setValue] = useState(TaxableIncome);

  const [taxBracket1, setTaxBracket1] = useState(0);
  const [taxBracket2, setTaxBracket2] = useState(0);
  const [taxBracket3, setTaxBracket3] = useState(0);
  const [taxBracket4, setTaxBracket4] = useState(0);
  const [taxBracket5, setTaxBracket5] = useState(0);
  const [taxBracket6, setTaxBracket6] = useState(0);
  const [taxBracket7, setTaxBracket7] = useState(0);
  const [totalTax, setTotalTax] = useState(0);
  const [refund, setRefund] = useState(0);

  const [tax, setTax] = useState(0);

  const BRACKET1_LIMIT = 12400;
  const BRACKET2_LIMIT = 49200;
  const BRACKET3_LIMIT = 101600;
  const BRACKET4_LIMIT = 174400;
  const BRACKET5_LIMIT = 224800
  const BRACKET6_LIMIT = 600000

  const BRACKET1_RATE = 0.10;
  const BRACKET2_RATE = 0.12;
  const BRACKET3_RATE = 0.22;
  const BRACKET4_RATE = 0.24;
  const BRACKET5_RATE = 0.32
  const BRACKET6_RATE = 0.35
  const BRACKET7_RATE = 0.37



  useEffect(() => {
    calculateTax(value);
  }, [value]);


  const calculateTax = (amount) => {
    let totalTax = 0;
    let remainingAmount = amount;

    let taxForBracket1 = 0;
    if (remainingAmount > BRACKET1_LIMIT) {
      taxForBracket1 = BRACKET1_LIMIT * BRACKET1_RATE;
      remainingAmount -= BRACKET1_LIMIT;
    } else {
      taxForBracket1 = remainingAmount * BRACKET1_RATE;
      remainingAmount = 0;
    }
    // console.log(taxForBracket1)
    setTaxBracket1(taxForBracket1);
    totalTax += taxForBracket1;

    let taxForBracket2 = 0;
    if (remainingAmount > BRACKET2_LIMIT - BRACKET1_LIMIT) {
      taxForBracket2 = (BRACKET2_LIMIT - BRACKET1_LIMIT) * BRACKET2_RATE;
      remainingAmount -= BRACKET2_LIMIT - BRACKET1_LIMIT;
    } else if (remainingAmount > 0) {
      taxForBracket2 = remainingAmount * BRACKET2_RATE;
      remainingAmount = 0;
    }
    setTaxBracket2(taxForBracket2);
    totalTax += taxForBracket2;

    let taxForBracket3 = 0;
    if (remainingAmount > BRACKET3_LIMIT - BRACKET2_LIMIT) {
      taxForBracket3 = (BRACKET3_LIMIT - BRACKET2_LIMIT) * BRACKET3_RATE;
      remainingAmount -= BRACKET3_LIMIT - BRACKET2_LIMIT;
    } else if (remainingAmount > 0) {
      taxForBracket3 = remainingAmount * BRACKET3_RATE;
      remainingAmount = 0;
    }
    setTaxBracket3(taxForBracket3);
    totalTax += taxForBracket3;

    let taxForBracket4 = 0;
    if (remainingAmount > BRACKET4_LIMIT - BRACKET3_LIMIT) {
      taxForBracket4 = (BRACKET4_LIMIT - BRACKET3_LIMIT) * BRACKET4_RATE;
      remainingAmount -= BRACKET4_LIMIT - BRACKET3_LIMIT;
    } else if (remainingAmount > 0) {
      taxForBracket4 = remainingAmount * BRACKET4_RATE;
      remainingAmount = 0;
    }
    setTaxBracket4(taxForBracket4);
    totalTax += taxForBracket4;

    let taxForBracket5 = 0;
    if (remainingAmount > BRACKET5_LIMIT - BRACKET4_LIMIT) {
      taxForBracket5 = (BRACKET5_LIMIT - BRACKET4_LIMIT) * BRACKET5_RATE;
      remainingAmount -= BRACKET5_LIMIT - BRACKET4_LIMIT;
    } else if (remainingAmount > 0) {
      taxForBracket5 = remainingAmount * BRACKET5_RATE;
      remainingAmount = 0;
    }
    setTaxBracket5(taxForBracket5);
    totalTax += taxForBracket5;

    let taxForBracket6 = 0;
    if (remainingAmount > BRACKET6_LIMIT - BRACKET5_LIMIT) {
      taxForBracket6 = (BRACKET6_LIMIT - BRACKET5_LIMIT) * BRACKET6_RATE;
      remainingAmount -= BRACKET6_LIMIT - BRACKET5_LIMIT;
    } else if (remainingAmount > 0) {
      taxForBracket6 = remainingAmount * BRACKET6_RATE;
      remainingAmount = 0;
    }
    setTaxBracket6(taxForBracket6);
    totalTax += taxForBracket6;

    let taxForBracket7 = 0;
    if (remainingAmount > 0) {
      taxForBracket7 = remainingAmount * BRACKET7_RATE;
    }
    setTaxBracket7(taxForBracket7);
    totalTax += taxForBracket7;
    setTotalTax(totalTax);
  };


  const handleEditClick = (index, field) => {
    setEditingValues((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
            ...item,
            [`isEditing${field.charAt(0).toUpperCase() + field.slice(1)
              }`]: true,
          }
          : item
      )
    );
  };



  const handleSave = () => {
    if (activeTab === "actual") {
      setModalOpen(true);
    } else {
      handleSaveDraft(activeTab);
    }
  };

  const handleChange = (index, field, value) => {
    setEditingValues((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const getCurrentData = () => {
    if (activeTab === "actual") {
      return userDetail.data;
    }
    return drafts[activeTab] || editingValues;
  };




  const handleSaveDraft = (draftName) => {
    const updatedDraft = editingValues.map((item) => ({
      ...item,
      isEditingTotal: false,
      isEditingFederal: false,
      isEditingwithholding: false
    }));

    if (draftName === "actual") {
      const newDrafts = {
        ...drafts,
        [draftName]: updatedDraft,
      };
      setDrafts(newDrafts);
      setActiveTab(draftName);
    } else {
      const updatedDrafts = {
        ...drafts,
        [draftName]: updatedDraft,
      };
      setDrafts(updatedDrafts);
    }

    setModalOpen(false);
    setIsEditing(false);
  };




  const getDisplayData = () => {
    const currentData = getCurrentData();
    return isEditing
      ? editingValues.map((item) => ({
        ...item,
        isEditingTotal: item.isEditingTotal ?? false,
        isEditingFederal: item.isEditingFederal ?? false,
        isEditingwithholding: item.isEditingwithholding ?? false,
      }))
      : currentData;
  };
  const handleCloseModal = () => {
    setTaxModal(!taxModal);
  };

  const handleBackClick = () => {
    router.push("/dashboard");
  }


  const refundAmount = parseFloat(federalWith) - totalTax





  const handleDownloadExcel = () => {
    // Extract data to export
    const tableData = getDisplayData().map((item) => ({
      Category: item.category,
      Total: item.total,
      Federal: item.federal,
      FederalWH: item.federal_wh,
    }));

    const summaryData = [
      {
        Category: "Total",
        Total: totalSum,
        Federal: federalSum,
        FederalWH: federalWH, // or any other data for your totals row
      },
    ];

    // Combine tableData and summaryData
    const dataToExport = [...tableData, ...summaryData];

    // Create a worksheet
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);

    // Create a new workbook
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    // Export Excel file
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

    // Save the Excel file
    const fileName = "table_data.xlsx";
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, fileName);
  };






  const EffectiveTax = ((totalTax / TaxableIncome) * 100).toFixed(2)
  const [activeResidentState, setActiveResidentState] = useState();
  const residentState = [
    { value: "John And Jane", name: "John And Jane" },
    { value: "Steve And Bob", name: "Steve And Bob" }
  ]

  const [showTaxProforma, setShowTaxProforma] = useState(false);

  const handleNextClick = () => {
    if (activeResidentState) {
      setShowTaxProforma(true);
    } else {
      alert("Please select a client from the dropdown.");
    }
  };

  // Total
  const FredSocialSecurityTotal = userDetail.data.find((i) => i.category === "Fred Social Security").total ?? 0
  const SandySocialSecurityTotal = userDetail.data.find((i) => i.category === "Sandra Social Security").total ?? 0
  const TotalTotal = (FredSocialSecurityTotal + SandySocialSecurityTotal)

  // Federal
  const FredSocialSecurityfederal = userDetail.data.find((i) => i.category === "Fred Social Security").federal ?? 0
  const SandySocialSecurityfederal = userDetail.data.find((i) => i.category === "Sandra Social Security").federal ?? 0
  const totalFederal = (FredSocialSecurityfederal + SandySocialSecurityfederal)

  const SocialSecurityTaxability = ((totalFederal / TotalTotal * 100).toFixed(2))


  const handleCloseModalDelete = () => {
    setTaxModalDelete(!taxModalDelete);
  };
  const handleHouseholdDetailsDeleteClick = () => {
    setTaxModalDelete(!taxModalDelete);
  };

  const handleDelete = () => {
    if (activeTab !== "actual") {
      // Remove the draft by filtering it out from the drafts object
      const updatedDrafts = { ...drafts };
      delete updatedDrafts[activeTab];

      // Update the drafts state and switch back to the "actual" tab
      setDrafts(updatedDrafts);
      setActiveTab("actual");
      setTaxModalDelete(!taxModalDelete);

    }
  };


  const taxData = [
    {
      incomeRange: "$11,600 or less",
      taxedIncome: "$11,600.00",
      taxRate: "10%",
      taxAmount: "$1,160.00"
    },
    {
      incomeRange: "$11,601 to $47,000",
      taxedIncome: "$35,400.00",
      taxRate: "12%",
      taxAmount: "$4,248.00"
    },
    {
      incomeRange: "$47,001 to $102,000",
      taxedIncome: "$55,000.00",
      taxRate: "22%",
      taxAmount: "$12,100.00"
    },
    {
      incomeRange: "$102,001 to $165,000",
      taxedIncome: "$63,000.00",
      taxRate: "24%",
      taxAmount: "$15,120.00"
    },
    {
      incomeRange: "$165,001 to $210,000",
      taxedIncome: "$45,000.00",
      taxRate: "32%",
      taxAmount: "$14,400.00"
    },
    {
      incomeRange: "$210,001 to $300,000",
      taxedIncome: "$90,000.00",
      taxRate: "35%",
      taxAmount: "$31,500.00"
    },
    {
      incomeRange: "$300,001 or more",
      taxedIncome: "$150,000.00",
      taxRate: "37%",
      taxAmount: "$55,500.00"
    }
  ];
  // const totalTaxedIncome = taxData.reduce((acc, curr) => {
  //   // Remove any non-numeric characters (like commas and $ signs) and convert to a number
  //   const taxedIncome = parseFloat(curr.taxedIncome.replace(/[$,]/g, ''));
  //   return acc + taxedIncome;
  // }, 0);

  const taxBrackets = [
    taxBracket1,
    taxBracket2,
    taxBracket3,
    taxBracket4,
    taxBracket5,
    taxBracket6,
    taxBracket7
  ];

  const totalTaxBrackets = taxBrackets.reduce((acc, current) => acc + current, 0);
  return (
    <>

      {!showTaxProforma ? (
        <div className={styles.MainDivForEmptyProforma}>
          <Label className={styles.MainDivForEmptyProformaLabul}>select your Client</Label>
          <Dropdown
            data={residentState}
            value={activeResidentState}
            setValue={setActiveResidentState}
            className={styles.DropDownValiueStatus}
            disable={false}
          />
          <Button
            className={styles.NextEmptyButton}
            type={"button"}
            text={"Next"}
            onClick={handleNextClick}
          />
        </div>

      ) : (
        <>
          {taxModalDelete && <Modal Heading={'Are you sure you want to delete this pro forma'} Caption={'This action cannot be undone. Please confirm if you wish to proceed.'} isOpen={taxModalDelete} onClose={handleCloseModalDelete} onClick={handleDelete} />}

          <Modeltaxbrackets isOpen={taxModal} onClose={handleCloseModal} >
            <>
              <div className={styles.ActiveModalTab}>
                <div className={styles.HeadingSub}>Federal</div>
              </div>
              <div>
                <div className={styles.MainDivForModelBorder}>
                  <div className={styles.MainDivForModelHadings}>
                    <div className={styles.ModelHadingText}>Taxable Income Range</div>
                    <div className={styles.ModelHadingText}>Taxed Income</div>
                    <div className={styles.ModelHadingText}>Tax Rate</div>
                    <div className={styles.ModelHadingText}>Tax Amount</div>
                  </div>

                  {taxData.map((tax, index) => (
                    <div key={index} className={styles.MainDivForModelHadings}>
                      <div className={styles.ModelHadingTextValue}>{tax.incomeRange}</div>
                      <div className={styles.ModelHadingTextValue}>{tax.taxedIncome}</div>
                      <div className={styles.ModelHadingTextValue}>{tax.taxRate}</div>
                      <div className={styles.ModelHadingTextValue}>
                        {taxBrackets[index].toFixed(2)}
                      </div>
                    </div>
                  ))}
                  <div className={styles.MainDivForModelHadingsValues}>
                    <div className={styles.ModelHadingTextTotal}>$103,879.00 <span className={styles.LableTotalDivSub}>(Total Income)</span></div>
                    <div className={styles.ModelHadingTextTotal}>$88,071.00 <span className={styles.LableTotalDivSub}>(Remaining Taxable Amount)</span></div>
                    <div className={styles.ModelHadingTextTotal}>{EffectiveTax}% <span className={styles.LableTotalDivSub}>(Effective Tax Rate)</span></div>
                    <div className={styles.ModelHadingTextTotal}>${totalTaxBrackets.toFixed(2)} <span className={styles.LableTotalDivSub}>(Total Tax Amount)</span></div>
                  </div>
                </div>
              </div>
            </>
          </Modeltaxbrackets>

          <DraftModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            onSave={handleSaveDraft}
          />
          <Back onClick={handleBackClick} text={"Tax Pro Forma"} />
          <div className={styles.MainDivForTaxProForma}>
            <div className={styles.boxborder}>
              <nav className={styles.MainDivForMainHadingContent}>
                <div className={styles.MainDivForName}>
                  <div className={styles.MainDivHading}>Fred And Sandra</div>
                  <div className={styles.TaxProFormaYere}>Tax Proforma 2023</div>
                </div>

                <div className={styles.tabContainer}>
                  <div className={styles.MainDivForAllButton}>
                    {!isEditing && (
                      <div className={styles.MainDivForActualbutton}>
                        <div
                          className={
                            activeTab === "actual"
                              ? styles.ActualButton
                              : styles.NotActual
                          }
                          onClick={() => {
                            setActiveTab("actual");
                            setIsEditing(false);
                          }}
                        >
                          Actual
                        </div>

                        {Object.keys(drafts).map((draftName) => (
                          <div
                            className={
                              activeTab === draftName
                                ? styles.ActualButton
                                : styles.NotActual
                            }
                            onClick={() => {
                              setActiveTab(draftName);
                              setIsEditing(false);
                              setEditingValues(drafts[draftName]);
                            }}
                          >
                            {" "}
                            {draftName}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  {isEditing ? (
                    <div className={styles.MainDivForCancelSave}>
                      <Buttonwthoutsvg
                        className={styles.CancelBtn}
                        type={"submit"}
                        text={"Cancel"}
                        onClick={() => {
                          setIsEditing(false);
                          setEditingValues(getCurrentData());
                        }}
                      />
                      <Buttonwthoutsvg
                        className={styles.SaveBtn}
                        type={"submit"}
                        text={"Save"}
                        onClick={handleSave}
                      />
                    </div>
                  ) : (
                    <>
                      <div className={styles.MainDivForMaximizeTax}>
                        <span className={styles.MaximizeTaxDiv}>
                          Maximize Tax Brackets
                        </span>
                        <span className={styles.MaximizeTaxDivIcon}>
                          {ic_Information.icon()}
                        </span>
                      </div>
                      <div className={styles.MainDivForEditAndExcleBtn}>
                        <Button
                          className={styles.ExcleButton}
                          type={"button"}
                          svg={ic_Excel.icon()}
                          text={"Excel"}
                          onClick={handleDownloadExcel}
                        />
                        <Button
                          className={styles.EditButton}
                          type={"submit"}
                          svg={ic_Edit.icon()}
                          text={"Edit"}
                          onClick={() => {
                            setIsEditing(true);
                            setEditingValues(getCurrentData());
                          }}
                        />
                        <Button
                          className={activeTab === "actual" ? styles.DesebulDeleteBtn : styles.DeleteButton}
                          type={"submit"}
                          svg={ic_Delete.icon()}
                          text={"Delete"}
                          disabled={activeTab === "actual"}
                          onClick={() => handleHouseholdDetailsDeleteClick()}
                        />
                      </div>
                    </>
                  )}
                </div>
              </nav>

              <div className={styles.maintable}>
                <div className={styles.styledTable}>
                  <div className={styles.MainDivForSubHading}>
                    <div className={styles.cell}></div>
                    <div className={styles.cell}>Total</div>
                    <div className={styles.cell}>Federal</div>
                    <div className={styles.cell}>Federal W/H</div>
                  </div>
                  {getDisplayData().map((item, index) => (
                    <div className={styles.row} key={index}>
                      <div className={styles.cell}>{item.category}</div>

                      <div className={styles.cell}>
                        <div className={styles.cell1}>
                          {item.isEditingTotal ? (
                            <div className={styles.editableCell}>
                              <input
                                type="text"
                                value={item.total}
                                onChange={(e) =>
                                  handleChange(index, "total", e.target.value)
                                }
                                className={styles.input}
                              />
                            </div>
                          ) : (
                            <>
                              {item.total}
                              {isEditing && (
                                <div
                                  className={styles.Editcursorpointer}
                                  onClick={() => handleEditClick(index, "total")}
                                >
                                  {ic_Editicon.icon()}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>

                      <div className={styles.cell}>
                        <div className={styles.cell1}>
                          {item.isEditingFederal ? (
                            <div className={styles.editableCell}>
                              <input
                                type="text"
                                value={item.federal}
                                onChange={(e) =>
                                  handleChange(index, "federal", e.target.value)
                                }
                                className={styles.input}
                              />
                            </div>
                          ) : (
                            <>
                              {item.federal}
                              {isEditing && (
                                <div
                                  className={styles.Editcursorpointer}
                                  onClick={() => handleEditClick(index, "federal")}
                                >
                                  {ic_Editicon.icon()}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      </div>

                      <div className={styles.cell}>

                        <div className={styles.cell1}>
                          {item.isEditingwithholding ? (
                            <div className={styles.editableCell}>
                              <input
                                type="text"
                                value={item.federal_wh}
                                onChange={(e) =>
                                  handleChange(index, "federal_wh", e.target.value)
                                }
                                className={styles.input}
                              />
                            </div>
                          ) : (
                            <>
                              {item.federal_wh}
                              {isEditing && (
                                <div
                                  className={styles.Editcursorpointer}
                                  onClick={() => handleEditClick(index, "federal_wh")}
                                >
                                  {ic_Editicon.icon()}
                                </div>
                              )}
                            </>
                          )}
                        </div>
                        {/* <div className={styles.cell1}>{item.federal_wh}</div> */}
                      </div>
                    </div>
                  ))}

                  <div className={styles.row}>
                    <div className={styles.cell}>
                      <b>
                        Total{" "}
                        <button
                          className={styles.infoButton}
                          onClick={() => setTaxModal(true)}
                        >
                          Info <span className={styles.InfoAnimation}></span>
                        </button>
                      </b>
                      <div>Standard Deduction</div>
                      <div>Taxable Income</div>
                      <div>Tax Withhold</div>
                      {/* <div className={styles.AmountOwedRefund}>Amount Owed/(Refund)</div> */}
                    </div>
                    <div className={styles.cell}>
                      {/* <b>{totalSum}</b> */}
                      <div>-</div>
                      <div>-</div>
                      <div>-</div>
                      <div>-</div>
                    </div>
                    <div className={styles.cell}>
                      <b>{parseFloat(federalSum).toFixed(2)}</b>
                      <div>{parseFloat(standardDeduction)}</div>

                      <div>{TaxableIncome}</div>
                      <div>{parseFloat(federalWith).toFixed(2)}</div>

                    </div>
                    <div className={styles.cell}>-<div>-</div>
                      <div>-</div>
                      <div>-</div>
                    </div>

                  </div>
                  <div className={styles.FinullTaxTotalCss}>
                    <div className={styles.AmountOwedRefund}>Amount Owed/(Refund)</div>
                    <div className={styles.parantChildrendiv}>-</div>
                    <div className={styles.parantChildrendiv}>{parseFloat(refundAmount).toFixed(2)}</div>
                    <div className={styles.parantChildrendiv}>-</div>
                  </div>



                  {/*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ a bhavdip nu commit karelu che koiye kadhvu nay */}

                  <div className={styles.row}>
                    <div className={styles.cell}>
                      <b>Additional Income from IRAs</b>
                      <div className={styles.fedrelDiv}>
                        <div>Federal tax</div>
                        <div>10%</div>
                      </div>
                      <div className={styles.fedrelDiv}>
                        <div></div>
                        <div>12%</div>
                      </div>
                      <div className={styles.fedrelDiv}>
                        <div></div>
                        <div>22%</div>
                      </div>
                      <div className={styles.fedrelDiv}>
                        <div></div>
                        <div>24%</div>
                      </div>
                      <div className={styles.fedrelDiv}>
                        <div></div>
                        <div>32%</div>
                      </div>
                      <div className={styles.fedrelDiv}>
                        <div></div>
                        <div>35%</div>
                      </div>
                      <div className={styles.fedrelDiv}>
                        <div></div>
                        <div>37%</div>
                      </div>
                    </div>
                    <div className={styles.cell}></div>
                    <div className={styles.cell}>
                      <div>
                        <div className={styles.BlankTableContent}>.</div>
                        <div>{taxBracket1.toFixed(2)}</div>
                        <div>{taxBracket2.toFixed(2)}</div>
                        <div>{taxBracket3.toFixed(2)}</div>
                        <div>{taxBracket4.toFixed(2)}</div>
                        <div>{taxBracket5.toFixed(2)}</div>
                        <div>{taxBracket6.toFixed(2)}</div>
                        <div>{taxBracket7.toFixed(2)}</div>
                      </div>
                    </div>
                    <div className={styles.cell}></div>
                  </div>



                  <div className={styles.row}>
                    <div className={styles.cell}>
                      <b>Additional 12% Withdrawals</b>
                      <div>Sandra</div>
                      <div>Fred</div>
                    </div>
                    <div className={styles.cell}>
                      <div className={styles.BlankTableContent}>.</div>
                      <div>33,725.00</div>
                      <div>33,725.00</div>
                    </div>
                    <div className={styles.cell}></div>
                    <div className={styles.cell}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardtitle}>
                <b>Calculations</b>
              </div>
              <div className={styles.cardlist}>
                <div className={styles.cardlistitemEffectiv}>Effective Tax Rate <span>{EffectiveTax} %</span></div>
                <div className={styles.cardlistitemEffectiv}> Social Security Taxability <span>{SocialSecurityTaxability} %</span></div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Taxproforma;
