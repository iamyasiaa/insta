import React, { useMemo } from "react";

import { Item } from "@components/index";
import { useAppSelector } from "@/store";
import { getArrayFavorites } from "@/ducks/news";

import styles from "./style.module.scss";

export default function Content() {
  const arrayFavoriteId = useAppSelector(getArrayFavorites);

  return (
    <div className={styles.news}>
      {[].map((item: any) => (
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
