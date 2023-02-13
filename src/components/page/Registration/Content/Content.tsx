import React, { ChangeEvent, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set, onValue, remove } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

import { Ilogo } from "@ui/icon";
import { Input } from "@ui/index";
import { MyContext } from "@context/AuthContext";
import { ROUTES } from "@/route/path";

import styles from "./style.module.scss";
import img from "@img/MainAvatar.png";
import { db } from "@/index";
import { toBase64 } from "@/utils/functionHelper";

interface IUseState {
  email: string;
  password: string;
  repeatPassword: string;
  name: string;
  photo?: string;
  file?: File;
}

export default function Content() {
  const [users, setUsers] = useState(undefined);
  const context = useContext(MyContext);
  const navigation = useNavigate();
  const [form, setForm] = useState<IUseState>({
    email: "",
    password: "",
    repeatPassword: "",
    name: "",
  });

  const onClickAuth = () => {
    navigation(ROUTES.main);
  };

  const onClickButton = async () => {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, form.email, form.password).catch(
      (er) => {
        console.error(er);
        return;
      }
    );

    if (form.file) {
      if (users) {
        set(ref(db, "user"), [
          ...users,
          {
            id: uuidv4(),
            photo: await toBase64(form.file),
            email: form.email,
            name: form.name,
            followers: [],
            following: [],
          },
        ]);
      } else {
        set(ref(db, "user"), [
          {
            id: uuidv4(),
            photo: await toBase64(form.file),
            email: form.email,
            name: form.name,
            followers: [],
            following: [],
          },
        ]);
      }
    }

    if (context.signIn) {
      await context.signIn(form.email, form.password);
    }
  };

  const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;

    setForm(Object.assign({}, form, { [name]: value }));
  };

  const onSelectFile = async (ev: ChangeEvent<HTMLInputElement>) => {
    if (!ev.target.files) {
      return;
    }

    setForm(
      Object.assign({}, form, {
        file: ev.target.files[0],
        photo: URL.createObjectURL(ev.target.files[0]),
      })
    );
  };
  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      setUsers(snapshot.val().user);
    });
  }, [form]);

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
          <Input
            value={form.repeatPassword}
            name="repeatPassword"
            lable="Повторите пароль"
            placeholder="Введите пароль"
            password
            onChange={onChange}
          />
          <Input
            value={form.name}
            name="name"
            lable="Имя пользователя"
            placeholder="Введите имя"
            onChange={onChange}
          />
          <div>
            {form.photo ? (
              <div>
                <img src={form.photo} className={styles.photo} />
              </div>
            ) : (
              <div>
                <input
                  id="select"
                  className={styles.inputPhoto}
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={onSelectFile}
                />
                <label htmlFor={"select"} className={styles.labelPhoto}>
                  Загрузить главное фото
                </label>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={onClickButton}
          className={styles.button}
          disabled={
            !form.password ||
            !form.email ||
            form.password !== form.repeatPassword ||
            !form.photo ||
            !form.name
          }
        >
          Создать аккаунт
        </button>
        <div className={styles.registration} onClick={onClickAuth}>
          Войти
        </div>
      </div>
    </div>
  );
}
