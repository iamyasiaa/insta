import React, { ReactNode, useState, useEffect } from "react";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { onValue, ref } from "firebase/database";
import { db } from "@/index";
import { v4 as uuidv4 } from "uuid";

import styles from "./style.module.scss";

import { getArrayFavorites, newsActions } from "@/ducks/news";
import { useAppDispatch, useAppSelector } from "@/store";
import { ROUTES } from "@/route/path";
import { getUser } from "@/ducks/user";
import { UserInfo } from "@/components/page/AnotherUser";

interface IItemUser {
  avatar: string;
  name?: string;
}

export default function ItemUser({ avatar, name }: IItemUser) {
  const [arrayUser, setArrayUser] = useState([]);
  const [arrayFollowig, setArrayFollowing] = useState([]);
  const arrayFavorite = useAppSelector(getArrayFavorites);
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  // const onClickUser = () => {
  //   if (arrayFollowig.find((item) => item === id)) {
  //     dispatch(newsActions.addedArrayFollowig(id));
  //   } else {
  //     dispatch(newsActions.addedArrayFollowig(id));
  //   }
  // };

  useEffect(() => {
    onValue(ref(db), async (snapshot) => {
      const data = snapshot.val();
      setArrayUser(data.user);
    });
  }, []);

  useEffect(() => {
    onValue(ref(db), async (snapshot) => {
      const data = snapshot.val();
      setArrayUser(data.users.following);
      getUser(data.user);
    });
  }, []);

  const onClickFollowing = () => {};

  const onClickItem = () => {
    navigation(ROUTES.anotheUser);
  };

  return (
    <div className={styles.item}>
      <div className={styles.header}>
        <div className={styles.user}>
          <img className={styles.avatar} src={avatar} />
          <p className={styles.name}>{name}</p>
          <button className={styles.button} onClick={onClickItem}>
            Перейти
          </button>
        </div>
      </div>
    </div>
  );
}
