import React, { useMemo } from "react";

import { Item } from "@components/index";
import { useAppSelector } from "@/store";
import { getArrayNews, getArrayFavorites } from "@/ducks/news";

import styles from "./style.module.scss";

export default function Content() {
  const arrayNews = useAppSelector(getArrayNews);
  const arrayFavoriteId = useAppSelector(getArrayFavorites);

  const arrayFavorite = useMemo(() => {
    return arrayNews.filter((item) => arrayFavoriteId.includes(item.id));
  }, [arrayFavoriteId]);

  return (
    <div className={styles.news}>
      {arrayFavorite.map((item) => (
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
