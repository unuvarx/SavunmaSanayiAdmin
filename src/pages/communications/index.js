import Layout from "@/lib/layout";
import React, { useEffect } from "react";
import styles from "@/pages/communications/communications.module.scss";
import ProductCard from "@/components/productCard";

import { useFunctions } from "@/lib/contextApi";
import { useRouter } from "next/router";

export default function Communications() {
  const {
    certificates,
    getCertificates,
    deleteCertificates,
    communications,
    getCommunications,
    deleteCommunication,
  } = useFunctions();

  const router = useRouter();
  useEffect(() => {
    getCommunications();
  }, []);

  const handleDelete = (id) => {
    try {
      deleteCommunication(id);
      getCommunications();
      window.location.reload();
    } catch (error) {}
  };

  const handleEdit = (id) => {
    router.push({
      pathname: "/edit-communication",
      query: { communicationId: id },
    });
  };

  return (
    <Layout>
      <div className={styles.products}>
        <h3>İletişim Bilgileri</h3>
        <button
          onClick={() => router.push("/add-communication")}
          className={`btn btn-success ${styles.addBtn}`}
        >
          İletişim Bilgisi Ekle
        </button>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col"> Adres </th>

              <th scope="col"> Harita Başlığı </th>
              <th scope="col"> Telefon </th>
              <th scope="col"> Mail </th>
              <th scope="col"> Aktif Zamanlar </th>
              <th scope="col"> Kordinat Lant </th>
              <th scope="col"> Kordinat Lng </th>
              <th scope="col"> Aksiyon </th>
            </tr>
          </thead>
          <tbody>
            {communications?.map((item, index) => (
              <tr key={index}>
                <td>{item.adress}</td>
                <td> {item.title} </td>
                <td> {item.phone} </td>
                <td> {item.email} </td>
                <td> {item.activeTimes} </td>
                <td> {item.coordinateLant} </td>
                <td> {item.coordinateLng} </td>

                <td>
                  <button
                    onClick={() => handleEdit(item.communicationId)}
                    className={`btn btn-info ${styles.editBtn}`}
                  >
                    Düzenle
                  </button>{" "}
                  <button
                    onClick={() => {
                      handleDelete(item.communicationId);
                    }}
                    className={`btn btn-danger ${styles.deleteBtn}`}
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
