import React, { ReactNode, useContext, useEffect } from "react";

import styles from "./style.module.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "@/route/path";
import Footer from "@common/Footer";
import { MyContext } from "../../../route/index";

interface IBody {
  children: ReactNode;
}

export default function Body({ children }: IBody) {
  const navigate = useNavigate();
  let location = useLocation();
  const context = useContext(MyContext);

  useEffect(() => {
    if (!context.isAuth && location.pathname !== ROUTES.main) {
      navigate(ROUTES.main);
    }

    if (location.pathname === ROUTES.main && context.isAuth) {
      navigate(ROUTES.lenta);
    }
  }, [location]);

  return (
    <div className={styles.body}>
      {children}
      {context.isAuth && <Footer />}
    </div>
  );
}
