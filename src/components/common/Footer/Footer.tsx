import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { Home, Avatar, Reels, Search, Shop } from "@ui/icon";
import { ROUTES } from "@/route/path";

import styles from "./style.module.scss";
import { useAppSelector } from "@/store";
import { getUser } from "@/ducks/user";

interface IArrayMenu {
  id: string;
  url: string;
  svg: ReactNode;
}

const arrayMenu: IArrayMenu[] = [
  { id: uuidv4(), url: ROUTES.news, svg: <Home /> },
  { id: uuidv4(), url: ROUTES.news, svg: <Search /> },
  { id: uuidv4(), url: ROUTES.news, svg: <Reels /> },
  { id: uuidv4(), url: ROUTES.news, svg: <Shop /> },
];

export default function Footer() {
  const user = useAppSelector(getUser);
  const navigate = useNavigate();

  const onClickMenu = (route: string) => {
    navigate(route);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.body}>
        {arrayMenu?.map((item) => (
          <div
            key={item.id}
            className={styles.icon}
            onClick={() => onClickMenu(item.url)}
          >
            {item.svg}
          </div>
        ))}
        <div
          className={styles.icon}
          onClick={() => onClickMenu(ROUTES.profile)}
        >
          <img className={styles.photo} src={user.photo} />
        </div>
      </div>
    </footer>
  );
}
