import React, { ChangeEvent } from "react";

import { Add, Burger, Dropdown } from "@ui/icon";

import styles from "./style.module.scss";
import { useAppSelector } from "@/store";
import { getUser } from "@/ducks/user";

interface IHeader {
  onSelectFile: (ev: ChangeEvent<HTMLInputElement>) => void;
}

export default function Header({ onSelectFile }: IHeader) {
  const user = useAppSelector(getUser);

  return (
    <header className={styles.header}>
      <div className={styles.body}>
        <div className={styles.username}>
          <p className={styles.text}>{user.name}</p>
          <Dropdown />
        </div>
        <div className={styles.add}>
          <input
            id="selectHeader"
            className={styles.input}
            type="file"
            accept="image/png, image/jpeg"
            onChange={onSelectFile}
          />
          <label htmlFor={"selectHeader"} className={styles.label}>
            <Add className={styles.icon} />
          </label>
          <Burger className={styles.icon} />
        </div>
      </div>
    </header>
  );
}
