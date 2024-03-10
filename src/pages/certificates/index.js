import Layout from "@/lib/layout";
import React, { useEffect } from "react";
import styles from "@/pages/certificates/certificates.module.scss";
import ProductCard from "@/components/productCard";

import { useFunctions } from "@/lib/contextApi";
import { useRouter } from "next/router";

export default function Certificates() {
  const {
   
    certificates,
    getCertificates,
    deleteCertificates,
  } = useFunctions();

  const router = useRouter();
  useEffect(() => {
    getCertificates();
  }, []);

  const handleDelete = (id) => {
    try {
      deleteCertificates(id);
      getCertificates();
      window.location.reload();
    } catch (error) {}
  };

  return (
    <Layout>
      <div className={styles.products}>
        <h3>Sertifikalar</h3>
        <button
          onClick={() => router.push("/add-certificate")}
          className={`btn btn-success ${styles.addBtn}`}
        >
          Sertifika Ekle
        </button>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col"> Sertifika </th>

              <th scope="col"> Adı </th>
              <th scope="col"> Aksiyon </th>
            </tr>
          </thead>
          <tbody>
            {certificates?.map((item, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={`data:image/jpeg;base64,${item.imageData}`}
                    alt=""
                  />
                </td>
                <td> {item.certificateName} </td>

                <td>
                  <button
                    onClick={() => {
                      handleDelete(item.certificateId);
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
