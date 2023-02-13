import React, { useState, ChangeEvent, useEffect } from "react";
import { ref, set, onValue, remove } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

import { Header, UserInfo } from "@componentsPage/AnotherUser/index";
import cat5 from "@img/cat5.jpg";
import cat6 from "@img/cat6.jpg";
import { useAppSelector } from "@/store";
import { getUser } from "@/ducks/user";

interface IState {
  key: any;
  avatar: any;
  name?: any;
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
    key: "",
    avatar: user.photo,
    name: user.name,
    mainPhoto: [],
    friendsPhoto: [
      { photo: cat5, id: uuidv4() },
      { photo: cat6, id: uuidv4() },
    ],
  });

  return (
    <div>
      <Header />
      <UserInfo photo={photo} />
    </div>
  );
}
