import Layout from "@/lib/layout";
import React, { useState } from "react";

import styles from "@/pages/add-product/add-product.module.scss";
import TinyMCEEditor from "@/components/editor";

export default function AddPartner() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const logValues = async () => {
    const formData = new FormData();
    formData.append("file", file);
   

    try {
      const response = await fetch("https://localhost:7136/api/Partners/uploadPartner", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        console.log("Product uploaded successfully");
      } else {
        console.error("Upload failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Layout>
      <div className={styles.addProduct}>
        <h3>Partner Ekle</h3>
        <div className={styles.inp}>
          <label htmlFor="">Görsel</label>
          <input type="file" onChange={handleFileChange} />
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
