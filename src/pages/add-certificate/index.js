import Layout from "@/lib/layout";
import React, { useState } from "react";
import styles from "@/pages/add-certificate/add-certificate.module.scss";
import withAuth from "@/lib/withAuth";





const  AddCertificate = () => {
  const [file, setFile] = useState(null);
  const [certificateName, setCertificateName] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const logValues = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("certificateName", certificateName);



    try {
      const response = await fetch(
        "https://localhost:7136/api/Certificate/uploadCertificate",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

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
        <h3> Ürün Ekle </h3>{" "}
        <div className={styles.inp}>
          <label htmlFor=""> Görsel </label>{" "}
          <input type="file" onChange={handleFileChange} />{" "}
        </div>{" "}
        <div className={styles.inp}>
          <label htmlFor=""> Sertifika Adı</label>{" "}
          <input
            type="text"
            onChange={(e) => setCertificateName(e.target.value)}
          />{" "}
        </div>
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
export default withAuth(AddCertificate);
