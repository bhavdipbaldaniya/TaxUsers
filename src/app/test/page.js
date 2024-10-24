import React from "react";
import style from "./test.module.css";
function page() {
  return (
    <>
      <div className={style.dashBoardMain}>
        <div className={style.innerDiv}>
          <div className={style.upperDiv}>
            <div className={style.svgSubDiv}>
              <span className={style.svgDiv}>SVG</span>
              <span>Total Revenue</span>
            </div>
            <div className={style.indicator}>
              <span>12$</span>
              <span> ``</span>
            </div>
          </div>
          <div className={style.belowDiv}>
            <div className={style.priceDiv}>$21,600</div>
            <div className={style.textDiv}>inlast Month</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default page;

