import Layout from "@/lib/layout";
import React, { useEffect } from "react";
import styles from "@/pages/partners/partners.module.scss";
import ProductCard from "@/components/productCard";

import { useFunctions } from "@/lib/contextApi";
import { useRouter } from "next/router";

export default function Partners() {
  const { deletePartners, partners, getPartners } =
    useFunctions();

  const router = useRouter();
  useEffect(() => {
    getPartners();
  }, []);





  const handleDelete = (id) => {
    try {
      deletePartners(id);
      getPartners();
      window.location.reload();
    } catch (error) {}
  };

  return (
    <Layout>
      <div className={styles.products}>
        
        <h3>Partnerler</h3>
        <button
          onClick={() => router.push("/add-partner")}
          className={`btn btn-success ${styles.addBtn}`}
        >
          Partner Ekle
        </button>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col"> Partner </th>

              <th scope="col"> İşlem </th>
            </tr>
          </thead>
          <tbody>
            {partners?.map((item, index) => (
              <tr key={index}>
                <td>
                  
                  <img
                    src={`data:image/jpeg;base64,${item.imageData}`}
                    alt=""
                  />
                </td>

                <td>
                  
                  
                  <button
                    onClick={() => {
                      handleDelete(item.partnerId);
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
