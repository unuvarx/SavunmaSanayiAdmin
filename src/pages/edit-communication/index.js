import Layout from "@/lib/layout";
import React, { useState, useEffect } from "react";
import styles from "@/pages/add-certificate/add-certificate.module.scss";
import { useRouter } from "next/router";
export default function EditCommunication() {
  const [adress, setAdress] = useState("");
  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [activeTime, setActiveTime] = useState("");
  const [coordinateLant, setCoordinateLant] = useState("");
  const [coordinateLng, setCoordinateLng] = useState("");

  const router = useRouter();
  const { communicationId } = router.query;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `https://localhost:7136/api/Communications/${communicationId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          const coDetails = await response.json();
          setAdress(coDetails.adress);
          setTitle(coDetails.title);
          setPhone(coDetails.phone);
          setEmail(coDetails.email);
          setActiveTime(coDetails.activeTimes);
          setCoordinateLant(coDetails.coordinateLant);
          setCoordinateLng(coDetails.coordinateLng);
        } else {
          console.error("Error fetching product details");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (communicationId) {
      fetchProductDetails();
    }
  }, [communicationId]);
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
        `https://localhost:7136/api/Communications/${router.query.communicationId}`,
        {
          method: "PUT", 
          body: JSON.stringify(data),
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log("Communication updated successfully");
      } else {
        console.error("Update failed");
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
        <h3> İletişim Bilgisini Düzenle </h3>{" "}
        <div className={styles.inp}>
          <label htmlFor=""> Adres </label>{" "}
          <input
            maxLength={100}
            type="text"
            onChange={(e) => setAdress(e.target.value)}
            value={adress}
          />{" "}
        </div>{" "}
        <div className={styles.inp}>
          <label htmlFor=""> Harita Başlığı(Ör: Atü) </label>{" "}
          <input
            maxLength={10}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />{" "}
        </div>{" "}
        <div className={styles.inp}>
          <label htmlFor=""> Telefon </label>{" "}
          <input value={phone} type="text" onChange={handlePhoneChange} />{" "}
        </div>{" "}
        <div className={styles.inp}>
          <label htmlFor=""> Mail </label>{" "}
          <input
            value={email}
            type="text"
            onChange={(e) => setEmail(e.target.value)}
          />{" "}
        </div>{" "}
        <div className={styles.inp}>
          <label htmlFor=""> Aktif Zamanlar </label>{" "}
          <input
            value={activeTime}
            type="text"
            onChange={(e) => setActiveTime(e.target.value)}
          />{" "}
        </div>{" "}
        <div className={styles.inp}>
          <label htmlFor=""> Kordinat Lant(Ör: 39.907069577163206) </label>{" "}
          <input
            value={coordinateLant}
            type="text"
            onChange={(e) => setCoordinateLant(e.target.value)}
          />{" "}
        </div>{" "}
        <div className={styles.inp}>
          <label htmlFor=""> Kordinat Lng(Ör: 39.907069577163206) </label>{" "}
          <input
            value={coordinateLng}
            type="text"
            onChange={(e) => setCoordinateLng(e.target.value)}
          />{" "}
        </div>{" "}
        <button
          className={`btn btn-success ${styles.addProduct}`}
          onClick={logValues}
        >
          Gönder{" "}
        </button>{" "}
      </div>{" "}
    </Layout>
  );
}
