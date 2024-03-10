import React, { useEffect } from "react";
import { useFunctions } from "@/lib/contextApi";
import styles from "@/components/navbar/navbar.module.scss";

export default function Navbar() {
  const { notification, getMessages } = useFunctions();

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <div className={styles.navbarContainer}>
      <span className={styles.title}>admin</span>
      <div>
        <a href="/home">Anasayfa</a>
      </div>
      <div>
        <a href="/products">Ürünler</a>
      </div>

      <div>
        <a href="/partners">Partnerler</a>
      </div>
      <div>
        <a href="/certificates">Sertifikalar</a>
      </div>
      <div>
        <a href="/communications">İletişim Bilgileri</a>
      </div>
      <div>
        <a href="/media">Basında Biz</a>
      </div>
      <div>
        <a href="/messages">
          Mesaj Gönderenler{" "}
          {notification >= 1 ? <span>{notification}</span> : <></>}{" "}
        </a>
      </div>
    </div>
  );
}
