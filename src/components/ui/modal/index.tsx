import React, { ReactNode, useEffect, MouseEvent } from "react";

import styles from "./style.module.scss";

interface IModal {
  active: boolean;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ active, children, onClose }: IModal) {
  const onClickBody = (ev: MouseEvent<HTMLElement>) => {
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
