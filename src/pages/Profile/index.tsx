import React, { useState, ChangeEvent } from "react";

import Header from "@page/Profile/Header";
import UserInfo from "@page/Profile/UserInfo";
import cat1 from "@img/cat1.jpg";
import cat2 from "@img/cat2.jpg";
import cat3 from "@img/cat3.jpg";
import cat4 from "@img/cat4.jpg";
import cat5 from "@img/cat5.jpg";
import cat6 from "@img/cat6.jpg";

interface IState {
  mainPhoto: string[];
  friendsPhoto: string[];
}

export default function Profile() {
  const [photo, setPhoto] = useState<IState>({
    mainPhoto: [cat1, cat2, cat3, cat4],
    friendsPhoto: [cat5, cat6],
  });

  const onSelectFile = (ev: ChangeEvent<HTMLInputElement>) => {
    if (!ev.target.files) {
      return;
    }

    setPhoto(
      Object.assign({}, photo, {
        mainPhoto: [
          ...photo.mainPhoto,
          URL.createObjectURL(ev.target.files[0]),
        ],
      })
    );
  };

  return (
    <div>
      <Header onSelectFile={onSelectFile} />
      <UserInfo photo={photo} />
    </div>
  );
}
