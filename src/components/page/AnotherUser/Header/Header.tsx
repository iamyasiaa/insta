import React, { ChangeEvent } from "react";

import { Add, Burger, Dropdown } from "@ui/icon";

import styles from "./style.module.scss";
import { useAppSelector } from "@/store";
import { getUser } from "@/ducks/user";

export default function Header() {
  const user = useAppSelector(getUser);

  return (
    <header className={styles.header}>
      <div className={styles.body}>
        <div className={styles.username}>
          <p className={styles.text}>{user.name}</p>
        </div>
        <div className={styles.add}></div>
      </div>
    </header>
  );
}
