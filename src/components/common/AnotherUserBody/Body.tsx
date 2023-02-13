import React, { ReactNode, useContext } from "react";

import styles from "./style.module.scss";
import { Footer } from "@components/index";
import { MyContext } from "@context/AuthContext";

interface IBody {
  children: ReactNode;
}

export default function Body({ children }: IBody) {
  const context = useContext(MyContext);

  return (
    <div className={styles.body}>
      {children}
      {context.isAuth && <Footer />}
    </div>
  );
}
