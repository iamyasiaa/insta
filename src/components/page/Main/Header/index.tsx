import React from "react";

import { Ilogo, Heart, Messenger, Add } from "../../../ui/icon";

import styles from "./style.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.body}>
        <div className={styles.logo}>
          <Ilogo />
        </div>
        <div className={styles.menu}>
          <Add className={styles.icon} />
          <Heart className={styles.icon} />
          <Messenger className={styles.icon} />
        </div>
      </div>
    </header>
  );
}
