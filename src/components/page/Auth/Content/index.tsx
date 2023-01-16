import React, { ChangeEvent, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Ilogo } from "@/components/ui/icon";
import Input from "@ui/input";
import { ROUTES } from "@/route/path";
import { MyContext } from "../../../../route/index";

import styles from "./style.module.scss";

export default function Content() {
  const navigate = useNavigate();
  const context = useContext(MyContext);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onClickButton = () => {
    if (context.newState) {
      context.newState({
        login: form.email,
        password: form.password,
        isAuth: true,
      });
      setTimeout(() => {
        navigate(ROUTES.lenta);
      }, 1500);
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
      </div>
    </div>
  );
}
