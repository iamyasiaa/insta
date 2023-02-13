import React, { ChangeEvent, useState, useEffect } from "react";
import classNames from "classnames";
import Stories from "react-insta-stories";
import { ref, onValue, set, remove } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

import img from "@img/MainAvatar.png";
import { db } from "@/index";
import { Modal } from "@ui/index";
import { AddStory, Union, Grid } from "@ui/icon";
import { useAppDispatch, useAppSelector } from "@/store";
import { toBase64 } from "@/utils/functionHelper";
import { Remote } from "@ui/icon";
import { getUser, userSlice } from "@/ducks/user";

import styles from "./style.module.scss";

interface IUserInfo {
  // id: string;
  // name: string;
  // following: number;
  // followers: number;
  photo: {
    mainPhoto: IStories[];
    friendsPhoto: IStories[];
  };
}

interface IStories {
  photo: string;
  id: string;
}

export default function UserInfo({ photo }: IUserInfo) {
  const user = useAppSelector(getUser);
  const [tab, setTab] = useState<"mainPhoto" | "friendsPhoto">("mainPhoto");

  const onClickTabs = (tabs: "mainPhoto" | "friendsPhoto") => {
    setTab(tabs);
  };
  return (
    <div className={styles.body}>
      <div className={styles.main}>
        <div className={styles.avatar}>
          <img
            src={user.photo}
            className={classNames(
              styles.photo,
              user.photo.length && styles.activePhoto
            )}
          />
        </div>
        <div className={styles.statistics}>
          <p className={styles.quantity}>{photo.mainPhoto.length}</p>
          <p className={styles.name}>Posts</p>
        </div>
        <div className={styles.statistics}>
          <p className={styles.quantity}>0</p>
          <p className={styles.name}>Followers</p>
        </div>
        <div className={styles.statistics}>
          <p className={styles.quantity}>0</p>
          <p className={styles.name}>Following</p>
        </div>
      </div>
      <div className={styles.discription}>
        <p className={styles.username}>Username</p>
        <p className={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt{" "}
          <span className={styles.link}>#hashtag</span>
        </p>
        <p className={styles.link}>Link goes here</p>
        <button className={styles.button}>Подписаться</button>
      </div>
      <div className={styles.stories}>
        <label htmlFor={"selectStories"}></label>
      </div>
      <div className={styles.photo}>
        <div className={styles.tabs}>
          <div
            className={classNames(
              styles.tab,
              tab === "mainPhoto" && styles.active
            )}
            onClick={() => onClickTabs("mainPhoto")}
          >
            <Grid />
          </div>
          <div
            className={classNames(
              styles.tab,
              tab === "friendsPhoto" && styles.active
            )}
            onClick={() => onClickTabs("friendsPhoto")}
          >
            <Union />
          </div>
        </div>
        <div className={styles.contentTabs}>
          {photo?.[tab]?.map((item) => (
            <div className={styles.post} key={item.id}>
              <img src={item.photo} className={styles.postPhoto} />
              <div className={styles.iconPost}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
