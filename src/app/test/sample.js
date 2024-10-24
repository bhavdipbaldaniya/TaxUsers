import React, { useState } from "react";
import styles from "./Data.module.css";
import {
  ic_Edit,
  ic_Editicon,
  ic_Excel,
  ic_Information,
} from "@/src/Utils/svg";
import Button from "@/src/Component/FormElement/Button";
import Back from "@/src/Component/Back/page";
import Buttonwthoutsvg from "@/src/Component/FormElement/Buttonwthoutsvg";
import userDetail from './userDetail.json'; // Import the JSON data

const Taxproforma = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingValues, setEditingValues] = useState(
    userDetail.data.map(item => ({
      ...item,
      isEditing: false,
      editedTotal: item.total,
      editedFederal: item.federal,
    }))
  );

  const handleEditClick = (index) => {
    setEditingValues(prev => 
      prev.map((item, i) => i === index ? { ...item, isEditing: true } : item)
    );
  };

  const handleSave = (index) => {
    setEditingValues(prev => 
      prev.map((item, i) => i === index ? { ...item, isEditing: false } : item)
    );
    // Add logic to save the value if needed
  };

  const handleChange = (index, field, value) => {
    setEditingValues(prev => 
      prev.map((item, i) => i === index ? { ...item, [field]: value } : item)
    );
  };

  return (
    <>
      <Back text={"Tax Pro Forma"} />
      <div className={styles.MainDivForTaxProForma}>
        <div className={styles.boxborder}>
          <nav className={styles.MainDivForMainHadingContent}>
            <div className={styles.MainDivForName}>
              <div className={styles.MainDivHading}>John And Jane</div>
              <div className={styles.TaxProFormaYere}>Tax Proforma 2023</div>
            </div>

            <div className={styles.MainDivForAllButton}>
              {isEditing ? (
                <div className={styles.MainDivForCancelSave}>
                  <Buttonwthoutsvg
                    className={styles.CancelBtn}
                    type={"submit"}
                    text={"Cancel"}
                    onClick={() => setIsEditing(false)}
                  />
                  <Buttonwthoutsvg
                    className={styles.SaveBtn}
                    type={"submit"}
                    text={"Save"}
                    onClick={() => setIsEditing(false)} // Implement save logic
                  />
                </div>
              ) : (
                <>
                  <div className={styles.MainDivForActualbutton}>
                    <div className={styles.ActualButton}>Actual</div>
                  </div>
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
                      type={"submit"}
                      svg={ic_Excel.icon()}
                      text={"Excel"}
                    />
                    <Button
                      className={styles.EditButton}
                      type={"submit"}
                      svg={ic_Edit.icon()}
                      text={"Edit"}
                      onClick={() => setIsEditing(true)}
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

              {editingValues.map((item, index) => (
                <div className={styles.row} key={index}>
                  <div className={styles.cell}>{item.category}</div>
                  {item.isEditing ? (
                    <>
                      <div className={styles.cell}>
                        <input
                          type="text"
                          value={item.editedTotal}
                          onChange={(e) => handleChange(index, 'editedTotal', e.target.value)}
                          onBlur={() => handleSave(index)}
                          autoFocus
                          className={styles.input}
                        />
                      </div>
                      <div className={styles.cell}>
                        <input
                          type="text"
                          value={item.editedFederal}
                          onChange={(e) => handleChange(index, 'editedFederal', e.target.value)}
                          onBlur={() => handleSave(index)}
                          className={styles.input}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={styles.cell} onClick={() => handleEditClick(index)}>
                        {item.editedTotal}
                        {isEditing && <div className={styles.Editcursorpointer}>{ic_Editicon.icon()}</div>}
                      </div>
                      <div className={styles.cell} onClick={() => handleEditClick(index)}>
                        {item.editedFederal}
                        {isEditing && <div className={styles.Editcursorpointer}>{ic_Editicon.icon()}</div>}
                      </div>
                    </>
                  )}
                  <div className={styles.cell}>
                    <div>{item.federal_wh}</div>
                    {isEditing && <div className={styles.Editcursorpointer}>{ic_Editicon.icon()}</div>}
                  </div>
                </div>
              ))}

            </div>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardtitle}>
            <b>Calculations</b>
          </div>
          <div className={styles.cardlist}>
            <div className={styles.cardlistitem}>Effective Tax Rate</div>
            <div className={styles.cardlistitem}>
              Social Security Taxability
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Taxproforma;
