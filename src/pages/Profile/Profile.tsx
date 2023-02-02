import React, { useState, ChangeEvent, useEffect } from "react";
import { ref, set, onValue, remove } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

import { db } from "@/index";
import { toBase64 } from "@/utils/functionHelper";
import { Header, UserInfo } from "@componentsPage/Profile/index";
import cat5 from "@img/cat5.jpg";
import cat6 from "@img/cat6.jpg";
import { useAppSelector } from "@/store";
import { getUser } from "@/ducks/user";

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
  const user = useAppSelector(getUser);
  const [photo, setPhoto] = useState<IState>({
    mainPhoto: [],
    friendsPhoto: [
      { photo: cat5, id: uuidv4() },
      { photo: cat6, id: uuidv4() },
    ],
  });

  const onSelectFile = async (ev: ChangeEvent<HTMLInputElement>) => {
    let _data: any;
    const id = uuidv4();
    if (!ev.target.files) {
      return;
    }

    onValue(ref(db), async (snapshot) => {
      _data = snapshot.val();
    });

    if (ev.target.files) {
      if (_data && _data?.post) {
        set(ref(db, "post"), [
          ..._data?.post,
          {
            userPhoto: user.photo,
            name: user.name,
            comments: [],
            like: 0,
            location: user.location,
            photo: await toBase64(ev.target.files[0]),
            email: localStorage.getItem("token"),
            id,
          },
        ]);
      } else {
        set(ref(db, "post"), [
          {
            userPhoto: user.photo,
            name: user.name,
            comments: [],
            like: 0,
            location: user.location,
            photo: await toBase64(ev.target.files[0]),
            email: localStorage.getItem("token"),
            id,
          },
        ]);
      }
    }

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
    let _data: any;

    onValue(ref(db), async (snapshot) => {
      _data = snapshot.val();
    });

    if (_data && _data?.post) {
      set(ref(db, "post"), [
        ..._data?.post.filter((item: any) => item.id !== id),
      ]);
    }

    setPhoto(
      Object.assign({}, photo, {
        mainPhoto: photo.mainPhoto.filter((item) => item.id !== id),
      })
    );
  };

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
      const data = snapshot.val();
      if (data && data?.post) {
        const arrayPost = data?.post.filter(
          (item: any) => item.email === localStorage.getItem("token")
        );
        setPhoto(Object.assign({}, photo, { mainPhoto: arrayPost }));
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
