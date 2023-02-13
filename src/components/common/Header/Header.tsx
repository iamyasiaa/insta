import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useLocation } from "react-router-dom";

import { Ilogo, Heart, Messenger, Add } from "@ui/icon";
import { ROUTES } from "@/route/path";

import styles from "./style.module.scss";
import classNames from "classnames";

const arrayMenu = [
  { icon: <Add />, puth: ROUTES.news, id: uuidv4() },
  { icon: <Heart />, puth: ROUTES.favourites, id: uuidv4() },
  { icon: <Messenger />, puth: ROUTES.news, id: uuidv4() },
];

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const onClickMenu = (path: string) => {
    navigate(path);
  };

  return (
    <header className={styles.header}>
      <div className={styles.body}>
        <div className={styles.logo}>
          <Ilogo />
        </div>
        <div className={styles.menu}>
          {arrayMenu?.map((item) => (
            <div
              key={item.id}
              className={classNames(
                styles.icon,
                location.pathname === item.puth && styles.activeIcon
              )}
              onClick={() => onClickMenu(item.puth)}
            >
              {item.icon}
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
