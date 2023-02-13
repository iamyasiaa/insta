import React, { ChangeEvent, ReactNode, useState } from "react";
import classNames from "classnames";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./style.module.scss";

import { Avatar, More, Bookmark, Share, Comment, Heart } from "@ui/icon";
import { getArrayFavorites, newsActions, getArrayComments } from "@/ducks/news";
import { useAppDispatch, useAppSelector } from "@/store";
import { Modal, Input } from "@ui/index";

interface IItem {
  avatar: string;
  photo: string;
  like: number;
  id: string;
  location?: string;
  name?: string;
  comment: string;
}

export default function Item({
  avatar,
  photo,
  like,
  id,
  location,
  name,
  comment,
}: IItem) {
  const arrayComments = useAppSelector(getArrayComments);
  const arrayFavorite = useAppSelector(getArrayFavorites);
  const dispatch = useAppDispatch();
  const [activeModal, setActiveModal] = useState(false);
  const [comments, setComment] = useState("");

  const notificationLikes = () => toast("Кому-то понравилась ваша фотография!");
  const notificationComments = () =>
    toast("Кому-то понравилась ваша фотография!");
  const createComments = () => {
    if (!comments) {
      alert("Введите комментарий");
    } else {
      dispatch(newsActions.addNewComments(comments));
      setComment("");
      setActiveModal(false);
      notificationComments();
    }
  };

  const handleChangeComment = (ev: ChangeEvent<HTMLInputElement>) => {
    const { value } = ev.target;
    setComment(value);
  };

  const onCloseModal = () => {
    setActiveModal(false);
  };
  const onOpenModal = () => {
    setActiveModal(true);
  };

  const onClickComments = () => {
    onOpenModal();
  };

  const onClickItem = () => {
    if (arrayFavorite.find((item) => item === id)) {
      dispatch(newsActions.remoteArrayFavourites(id));
    } else {
      dispatch(newsActions.addedArrayFavourites(id));
      notificationLikes();
    }
  };

  return (
    <div className={styles.item}>
      <div className={styles.header}>
        <div className={styles.user}>
          <img className={styles.avatar} src={avatar} />
          <p className={styles.name}>{name}</p>
        </div>
        <p className={styles.location}>{location}</p>
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
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Comment className={styles.icon} onClick={onClickComments} />
          <div className={styles.transparent}>
            <Modal active={activeModal} onClose={onCloseModal}>
              <div>
                <Input
                  placeholder="Введите комментарий"
                  value={comments}
                  onChange={handleChangeComment}
                />
              </div>
              <div>
                <button
                  className={styles.commetnButton}
                  onClick={createComments}
                >
                  Оставить комментарий
                </button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
      <div className={styles.description}>
        <p className={styles.likes}>{like} Likes</p>
        <p className={styles.commentsText}>{arrayComments}</p>
      </div>
    </div>
  );
}
