import React, { ReactNode } from "react";
import classNames from "classnames";

import styles from "./style.module.scss";

import { Avatar, More, Bookmark, Share, Comment, Heart } from "@ui/icon";
import { getArrayFavorites, newsActions } from "@/ducks/news";
import { useAppDispatch, useAppSelector } from "@/store";

interface IItem {
  avatar: ReactNode;
  photo: string;
  like: number;
  id: string;
}

export default function Item({ avatar, photo, like, id }: IItem) {
  const arrayFavorite = useAppSelector(getArrayFavorites);
  const dispatch = useAppDispatch();

  const onClickItem = () => {
    if (arrayFavorite.find((item) => item === id)) {
      dispatch(newsActions.remoteArrayFavourites(id));
    } else {
      dispatch(newsActions.addedArrayFavourites(id));
    }
  };

  return (
    <div className={styles.item}>
      <div className={styles.header}>
        <div className={styles.user}>
          {avatar}
          <p className={styles.name}>Ruffles</p>
        </div>
        <div className={styles.moreIcon}>
          <More />
        </div>
      </div>
      <div className={styles.photo}>
        <img src={photo} />
      </div>
      <div className={styles.navigation}>
        <div className={styles.iconBlock}>
          <Heart
            onClick={onClickItem}
            className={classNames(
              styles.icon,
              arrayFavorite.find((item) => item === id) && styles.activeIcon
            )}
          />
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
        <p className={styles.likes}>{like} Likes</p>
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
