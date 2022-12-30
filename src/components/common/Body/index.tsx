import React, { ReactNode } from "react";

import styles from "./style.module.scss";

interface IBody {
  children: ReactNode;
}

export default function Body({ children }: IBody) {
  return <div className={styles.body}>{children}</div>;
}
