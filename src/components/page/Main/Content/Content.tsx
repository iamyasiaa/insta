import React from "react";

import { Item } from "@components/index";
import { useAppSelector } from "@/store";
import { getArrayNews } from "@/ducks/news";

import styles from "./style.module.scss";

export default function Content() {
  const arrayNews = useAppSelector(getArrayNews);

  return (
    <div className={styles.news}>
      {arrayNews.map((item) => (
        <Item
          id={item.id}
          key={item.id}
          avatar={item.avatar}
          photo={item.photo}
          like={item.like}
        />
      ))}
    </div>
  );
}
