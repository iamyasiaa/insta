import React, { ReactNode, useEffect } from "react";

import styles from "./style.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "@/route/path";
import Footer from "@common/Footer";

interface IBody {
  children: ReactNode;
}

export default function Body({ children }: IBody) {
  const navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    if (!localStorage.getItem("auth") && location.pathname !== ROUTES.main) {
      navigate(ROUTES.main);
    }

    if (location.pathname === ROUTES.main && localStorage.getItem("auth")) {
      navigate(ROUTES.lenta);
    }
  }, [location]);

  return (
    <div className={styles.body}>
      {children}
      {localStorage.getItem("auth") && <Footer />}
    </div>
  );
}
