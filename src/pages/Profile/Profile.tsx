import React, { useState, ChangeEvent, useEffect } from "react";
import { ref, set, onValue, remove } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

import { db } from "@/index";
import { toBase64 } from "@/utils/functionHelper";
import { Header, UserInfo } from "@componentsPage/Profile/index";
import cat5 from "@img/cat5.jpg";
import cat6 from "@img/cat6.jpg";

interface IState {
  mainPhoto: {
    photo: string;
    id: string;
  }[];
  friendsPhoto: {
    photo: string;
    id: string;
  }[];
}

export default function Profile() {
  const [photo, setPhoto] = useState<IState>({
    mainPhoto: [],
    friendsPhoto: [
      { photo: cat5, id: uuidv4() },
      { photo: cat6, id: uuidv4() },
    ],
  });

  const onSelectFile = async (ev: ChangeEvent<HTMLInputElement>) => {
    if (!ev.target.files) {
      return;
    }

    const id = `post-${uuidv4()}`;

    set(ref(db, id), {
      photo: await toBase64(ev.target.files[0]),
      token: localStorage.getItem("token"),
      type: "post",
      id,
    });

    setPhoto(
      Object.assign({}, photo, {
        mainPhoto: [
          ...photo.mainPhoto,
          { photo: URL.createObjectURL(ev.target.files[0]), id },
        ],
      })
    );
  };

  const onClickRemote = (id: string) => {
    remove(ref(db, id));
    setPhoto(
      Object.assign({}, photo, {
        mainPhoto: photo.mainPhoto.filter((item) => item.id !== id),
      })
    );
  };

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      if (data !== null) {
        const array = Object.values(data).filter(
          (item: any) =>
            item?.type === "post" &&
            item?.token === localStorage.getItem("token")
        );

        setPhoto(
          Object.assign({}, photo, {
            mainPhoto: array.map((item: any) => {
              return {
                photo: item.photo,
                id: item.id,
              };
            }),
          })
        );
      }
    });
  }, []);

  return (
    <div>
      <Header onSelectFile={onSelectFile} />
      <UserInfo photo={photo} onClickRemote={onClickRemote} />
    </div>
  );
}
