import React from "react";

import styles from "./style.module.scss";

import {
  Avatar,
  More,
  Bookmark,
  Share,
  Comment,
  Heart,
} from "@ui/icon";
import photo1 from "@img/photo1.png";

export default function Item() {
  return (
    <div className={styles.item}>
      <div className={styles.header}>
        <div className={styles.user}>
          <Avatar />
          <p className={styles.name}>Ruffles</p>
        </div>
        <div className={styles.moreIcon}>
          <More />
        </div>
      </div>
      <div className={styles.photo}>
        <img src={photo1} />
      </div>
      <div className={styles.navigation}>
        <div className={styles.iconBlock}>
          <Heart className={styles.icon} />
          <Comment className={styles.icon} />
          <Share className={styles.icon} />
        </div>
        <div className={styles.select}>
          <div className={styles.activeItem}></div>
          <div className={styles.selectItem}></div>
          <div className={styles.selectItem}></div>
        </div>
        <div className={styles.bookmark}>
          <Bookmark className={styles.icon} />
        </div>
      </div>
      <div className={styles.description}>
        <p className={styles.likes}>100 Likes</p>
        <p className={styles.text}>
          {" "}
          <span className={styles.username}>username</span> Lorem ipsum dolor
          sit amet, consectetur adipiscing elit, sed do elusmod tempor
          incididunt... <span className={styles.more}>more</span>
        </p>
        <div className={styles.comments}>
          <Avatar className={styles.userAvatar} />
          <input className={styles.commentText} placeholder="Add comment..." />
        </div>
      </div>
    </div>
  );
}
