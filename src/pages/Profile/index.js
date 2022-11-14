import React, { useState } from "react";

import Header from "../../components/page/Profile/Header";
import UserInfo from "../../components/page/Profile/UserInfo";
import cat1 from "../../images/cat1.jpg";
import cat2 from "../../images/cat2.jpg";
import cat3 from "../../images/cat3.jpg";
import cat4 from "../../images/cat4.jpg";
import cat5 from "../../images/cat5.jpg";
import cat6 from "../../images/cat6.jpg";

export default function Profile() {
  const [photo, setPhoto] = useState({
    mainPhoto: [cat1, cat2, cat3, cat4],
    friendsPhoto: [cat5, cat6],
  });

  const onSelectFile = (ev) => {
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
