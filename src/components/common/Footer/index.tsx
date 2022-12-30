import React from "react";
import { useNavigate } from "react-router-dom";

import { Home, Avatar, Reels, Search, Shop } from "../../ui/icon";
import { ROUTES } from "../../../route/path";

import styles from "./style.module.scss";

export default function Footer() {
  const navigate = useNavigate();

  const onClickMenu = (route: string) => {
    navigate(route);
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.body}>
        <div className={styles.icon} onClick={() => onClickMenu(ROUTES.main)}>
          <Home />
        </div>
        <div className={styles.icon}>
          <Search />
        </div>
        <div className={styles.icon}>
          <Reels />
        </div>
        <div className={styles.icon}>
          <Shop />
        </div>
        <div
          className={styles.icon}
          onClick={() => onClickMenu(ROUTES.profile)}
        >
          <Avatar />
        </div>
      </div>
    </footer>
  );
}
