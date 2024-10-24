import React from "react";
import HeadingTextH1 from "@/src/Typography/text/HeadingTextH1";
import style from "./Data.module.css";
import { ic_CrossBtn } from "@/src/Utils/svg";

const Modeltaxbrackets = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={style.ModalMainDiv}>
      <div className={style.ModelContain}>
        <div className={style.CancellBtn}>
          <span onClick={onClose}>{ic_CrossBtn.icon()}</span>
        </div>
        <div className={style.HeaderContentDiv}>
          <div className={style.Modelheader}>
            <HeadingTextH1 text={" Tax Brackets "} />
          </div>
        </div>
        <div className={style.OverflowScorle}>{children}</div>
      </div>
    </div>
  );
};

export default Modeltaxbrackets;
