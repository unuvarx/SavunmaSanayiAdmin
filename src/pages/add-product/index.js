import Layout from "@/lib/layout";
import React, { useState } from "react";

import styles from "@/pages/add-product/add-product.module.scss";
import TinyMCEEditor from "@/components/editor";

export default function AddProduct() {
  const [file, setFile] = useState(null);
  const [productTitle, setProductTitle] = useState("");
  const [productText, setProductText] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productSpecifications, setProductSpecifications] = useState("");
  const [productTechnicalSpecifications, setProductTechnicalSpecifications] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const logValues = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("productTitle", productTitle);
    formData.append("productText", productText);
    formData.append("productDescription", productDescription);
    formData.append("productSpecifications", productSpecifications);
    formData.append("productTechnicalSpecifications", productTechnicalSpecifications);

    try {
      const response = await fetch("https://localhost:7136/api/Product/uploadProduct", {
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
        <h3>Ürün Ekle</h3>
        <div className={styles.inp}>
          <label htmlFor="">Görsel</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div className={styles.inp}>
          <label htmlFor="">Başlık</label>
          <input type="text" onChange={(e) => setProductTitle(e.target.value)} />
        </div>
        <div className={styles.inp}>
          <label htmlFor="">Kısa özet</label>
          <input type="text" onChange={(e) => setProductText(e.target.value)} />
        </div>
        <div className={styles.tiny}>
          <label htmlFor="">Açıklama</label>
          <TinyMCEEditor
            value={productDescription}
            onChange={(content) => setProductDescription(content)}
          />
        </div>
        <div className={styles.tiny}>
          <label htmlFor="">Özellikler</label>
          <TinyMCEEditor
            value={productSpecifications}
            onChange={(content) => setProductSpecifications(content)}
          />
        </div>
        <div className={styles.tiny}>
          <label htmlFor="">Teknik Özellikler</label>
          <TinyMCEEditor
            value={productTechnicalSpecifications}
            onChange={(content) => setProductTechnicalSpecifications(content)}
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
