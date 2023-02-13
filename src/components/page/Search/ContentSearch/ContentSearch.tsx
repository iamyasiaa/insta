import React, { ChangeEvent, useState, useEffect } from "react";
import Fuse from "fuse.js";

import { Input } from "@ui/input";
import { Search } from "@ui/icon";
import { ItemUser } from "@components/index";

import styles from "./style.module.scss";
import { onValue, ref } from "firebase/database";
import { db } from "@/index";
import { useAppSelector } from "@/store";
import { getUser } from "@/ducks/user";

export default function ContentSearch() {
  const [arrayUser, setArrayUser] = useState([]);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState([]);
  const currentUser = useAppSelector(getUser);

  const onChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setSearch(value);
  };

  useEffect(() => {
    onValue(ref(db), async (snapshot) => {
      const data = snapshot.val();
      setArrayUser(data.user);
    });
  }, []);

  const onClickSearch = () => {
    if (search) {
      onValue(ref(db), async (snapshot) => {
        const data = snapshot.val();
        setUser(
          data.user.filter(
            (item: any) =>
              item.name === search && item.name !== currentUser.name
          ).length
            ? data.user.filter(
                (item: any) =>
                  item.name === search && item.name !== currentUser.name
              )
            : []
        );
      });
    }
  };
  console.log(user);

  return (
    <div>
      <div className={styles.search}>
        <div className={styles.searchInput}>
          <Input value={search} onChange={onChange} />
        </div>
        <button onClick={onClickSearch} className={styles.searchButton}>
          <Search />
        </button>
      </div>
      <div className={styles.itemUser}>
        {user.map((item: any) => (
          <ItemUser key={item.id} avatar={item.userPhoto} name={item.name} />
        ))}
      </div>
    </div>
  );
}
