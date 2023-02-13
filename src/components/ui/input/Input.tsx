import React, { ChangeEvent } from "react";

import styles from "./style.module.scss";

interface IInput {
  lable?: string;
  placeholder?: string;
  password?: boolean;
  onChange?: (ev: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  value?: string;
}

export default function Input({
  lable,
  placeholder,
  password,
  onChange,
  name,
  value,
}: IInput) {
  return (
    <div className={styles.bodyInput}>
      <span className={styles.lable}>{lable}</span>
      <input
        value={value}
        name={name}
        onChange={onChange}
        className={styles.input}
        placeholder={placeholder}
        type={password ? "password" : ""}
      />
    </div>
  );
}
