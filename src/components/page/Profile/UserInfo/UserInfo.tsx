import React, { ChangeEvent, useState } from "react";
import classNames from "classnames";
import Stories from "react-insta-stories";

import img from "@img/MainAvatar.png";
import { Modal } from "@ui/index";
import { AddStory, Union, Grid } from "@ui/icon";

import styles from "./style.module.scss";

interface IUserInfo {
  photo: {
    mainPhoto: string[];
    friendsPhoto: string[];
  };
}

export default function UserInfo({ photo }: IUserInfo) {
  const [activeModal, setActiveModal] = useState(false);
  const [tab, setTab] = useState<"mainPhoto" | "friendsPhoto">("mainPhoto");
  const [currentPhoto, setCurrentPhoto] = useState<any>([]);
  const [stories, setStories] = useState<string[]>([]);

  const onClickTabs = (tabs: "mainPhoto" | "friendsPhoto") => {
    setTab(tabs);
  };

  const onCloseModal = () => {
    setActiveModal(false);
  };

  const onSelectFileStories = (ev: ChangeEvent<HTMLInputElement>) => {
    if (!ev.target.files) {
      return;
    }

    setStories([...stories, URL.createObjectURL(ev.target.files[0])]);
  };

  const onSelectFile = (ev: ChangeEvent<HTMLInputElement>) => {
    if (!ev.target.files) {
      return;
    }

    setCurrentPhoto([
      ...currentPhoto,
      {
        url: URL.createObjectURL(ev.target.files[0]),
        seeMoreCollapsed: () => {
          return (
            <div>
              <input
                id="select"
                className={styles.input}
                type="file"
                accept="image/png, image/jpeg"
                onChange={onSelectFile}
              />
              <label htmlFor={"select"} className={styles.labelStory}>
                Add new story
              </label>
            </div>
          );
        },
        seeMore: ({ close }: any) => {
          return <div onClick={close}></div>;
        },
      },
    ]);

    setActiveModal(false);
  };

  const onClickLabel = () => {
    if (currentPhoto.length) {
      setActiveModal(true);
    }
  };

  return (
    <div className={styles.body}>
      <div className={styles.main}>
        <div className={styles.avatar}>
          <input
            id="select"
            className={styles.input}
            type="file"
            accept="image/png, image/jpeg"
            onChange={onSelectFile}
          />
          <label
            htmlFor={currentPhoto.length ? "" : "select"}
            className={styles.label}
            onClick={onClickLabel}
          >
            <img
              src={img}
              className={classNames(
                styles.photo,
                currentPhoto.length && styles.activePhoto
              )}
            />
          </label>
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
        {stories?.map((item, index) => (
          <div key={item} className={styles.storiesBlock}>
            <img src={item} className={styles.storiesPhoto} />
            <span className={styles.storiesText}>Stories {index + 1}</span>
          </div>
        ))}
        <input
          id="selectStories"
          className={styles.input}
          type="file"
          accept="image/png, image/jpeg"
          onChange={onSelectFileStories}
        />
        <label htmlFor={"selectStories"}>
          <AddStory className={styles.icon} />
        </label>
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
          {photo?.[tab]?.map((item: string) => (
            <img src={item} className={styles.post} key={item} />
          ))}
        </div>
      </div>
      {
        <Modal active={activeModal} onClose={onCloseModal}>
          <Stories
            onAllStoriesEnd={onCloseModal}
            stories={currentPhoto}
            width="300px"
            height="600px"
            preventDefault
            keyboardNavigation
          />
        </Modal>
      }
    </div>
  );
}
