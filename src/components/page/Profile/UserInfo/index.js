import React, { useState } from "react";
import classNames from "classnames";

import img from "../../../../images/MainAvatar.png";
import cat1 from "../../../../images/cat1.jpg";
import cat2 from "../../../../images/cat2.jpg";
import cat3 from "../../../../images/cat3.jpg";
import cat4 from "../../../../images/cat4.jpg";
import cat5 from "../../../../images/cat5.jpg";
import cat6 from "../../../../images/cat6.jpg";

import styles from "./style.module.scss";
import { AddStory, Union, Grid } from "../../../ui/icon";

const photo = {
  mainPhoto: [cat1, cat2, cat3, cat4],
  friendsPhoto: [cat5, cat6],
};

export default function UserInfo() {
  const [tab, setTab] = useState("mainPhoto");
  const onClickTabs = (tabs) => {
    setTab(tabs);
  };
  return (
    <div className={styles.body}>
      <div className={styles.main}>
        <div className={styles.avatar}>
          <img src={img} />
        </div>
        <div className={styles.statistics}>
          <p className={styles.quantity}>0,000</p>
          <p className={styles.name}>Posts</p>
        </div>
        <div className={styles.statistics}>
          <p className={styles.quantity}>0,000</p>
          <p className={styles.name}>Followers</p>
        </div>
        <div className={styles.statistics}>
          <p className={styles.quantity}>0,000</p>
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
        <button className={styles.button}>Edit Profile</button>
      </div>
      <div className={styles.stories}>
        <AddStory className={styles.icon} />
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
          {photo[tab].map((item) => (
            <img src={item} className={styles.post} key={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
