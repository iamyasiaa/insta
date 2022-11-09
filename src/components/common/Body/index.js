import React from "react";

import styles from "./style.module.scss";

export default function Body({ children }) {
  return <div className={styles.body}>{children}</div>;
}
