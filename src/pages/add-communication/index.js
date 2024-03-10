import Layout from "@/lib/layout";
import React, { useState } from "react";
import styles from "@/pages/add-communication/add-communication.module.scss";
import withAuth from "@/lib/withAuth";

const  AddCommunication = () => {
  const [adress, setAdress] = useState("");
  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [activeTime, setActiveTime] = useState("");
  const [coordinateLant, setCoordinateLant] = useState("");
  const [coordinateLng, setCoordinateLng] = useState("");

  const logValues = async () => {
    const data = {
      adress,
      title,
      phone,
      email,
      activeTimes: activeTime,
      coordinateLant,
      coordinateLng,
    };

    try {
      const response = await fetch(
        "https://localhost:7136/api/Communications",
        {
          method: "POST",
          body: JSON.stringify(data),
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Communication added successfully");
      } else {
        console.error("Upload failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlePhoneChange = (e) => {
    const regex = /^[0-9+ ]*$/;
    const inputValue = e.target.value;
    if (regex.test(inputValue)) {
      setPhone(inputValue);
    }
  };

  return (
    <Layout>
      <div className={styles.addProduct}>
        <h3> İletişim Bilgisi Ekle </h3>
        <div className={styles.inp}>
          <label htmlFor=""> Adres </label>
          <input
            maxLength={100}
            type="text"
            onChange={(e) => setAdress(e.target.value)}
          />
        </div>
        <div className={styles.inp}>
          <label htmlFor=""> Harita Başlığı(Ör: Atü) </label>
          <input
            maxLength={10}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.inp}>
          <label htmlFor=""> Telefon </label>
          <input type="text" onChange={handlePhoneChange} value={phone} />
        </div>
        <div className={styles.inp}>
          <label htmlFor=""> Mail </label>
          <input type="text" onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={styles.inp}>
          <label htmlFor=""> Aktif Zamanlar </label>
          <input type="text" onChange={(e) => setActiveTime(e.target.value)} />
        </div>
        <div className={styles.inp}>
          <label htmlFor=""> Kordinat Lant(Ör: 39.907069577163206) </label>
          <input
            type="text"
            onChange={(e) => setCoordinateLant(e.target.value)}
          />
        </div>
        <div className={styles.inp}>
          <label htmlFor=""> Kordinat Lng(Ör: 39.907069577163206) </label>
          <input
            type="text"
            onChange={(e) => setCoordinateLng(e.target.value)}
          />
        </div>
        <button
          className={`btn btn-success ${styles.addProduct}`}
          onClick={logValues}
        >
          Gönder
        </button>
      </div>
    </Layout>
  );
}
export default withAuth(AddCommunication);