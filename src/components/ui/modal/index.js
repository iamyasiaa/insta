import React, { useEffect } from "react";

import { Close } from "../icon/";

import styles from "./style.module.scss";

export default function Modal(props) {
  const { active, children, onClose } = props;

  const onClickBody = (ev) => {
    ev.stopPropagation();
  };

  useEffect(() => {
    if (active) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [active]);

  return (
    <>
      {active && (
        <div className={styles.modal} onClick={onClose}>
          <div>
            <div className={styles.body} onClick={onClickBody}>
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
