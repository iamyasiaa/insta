import React, { ChangeEvent, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Ilogo } from "@ui/icon";
import { Input } from "@ui/index";
import { MyContext } from "@context/AuthContext";

import styles from "./style.module.scss";
import { ROUTES } from "@/route/path";

export default function Content() {
  const context = useContext(MyContext);
  const navigation = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onClickRegistration = () => {
    navigation(ROUTES.registration);
  };

  const onClickButton = () => {
    if (context.signIn) {
      context.signIn(form.email, form.password);
    }
  };

  const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;

    setForm(Object.assign({}, form, { [name]: value }));
  };

  return (
    <div className={styles.body}>
      <div className={styles.content}>
        <div className={styles.logo}>
          <Ilogo />
        </div>
        <div className={styles.inputs}>
          <Input
            value={form.email}
            name="email"
            lable="Email"
            placeholder="Введите email"
            onChange={onChange}
          />
          <Input
            value={form.password}
            name="password"
            lable="Пароль"
            placeholder="Введите пароль"
            password
            onChange={onChange}
          />
        </div>
        <button
          onClick={onClickButton}
          className={styles.button}
          disabled={!form.password || !form.email}
        >
          Войти
        </button>
        <div className={styles.registration} onClick={onClickRegistration}>
          Регистрация
        </div>
      </div>
    </div>
  );
}
