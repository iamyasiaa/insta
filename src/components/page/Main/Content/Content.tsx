import React, { useEffect, useState } from "react";

import { Item } from "@components/index";
import { useAppSelector } from "@/store";

import styles from "./style.module.scss";
import { onValue, ref } from "firebase/database";
import { db } from "@/index";

export default function Content() {
  const [arrayNews, setArrayNews] = useState([]);

  useEffect(() => {
    onValue(ref(db), async (snapshot) => {
      const data = snapshot.val();
      setArrayNews(data.post);
    });
  }, []);
  return (
    <div className={styles.news}>
      {arrayNews.map((item: any) => (
        <Item
          id={item.id}
          key={item.id}
          avatar={item.userPhoto}
          photo={item.photo}
          like={item.like}
          name={item.name}
          location={item.location}
        />
      ))}
    </div>
  );
}
