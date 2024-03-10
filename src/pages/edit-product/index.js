import Layout from "@/lib/layout";
import React, { useState, useEffect } from "react";
import styles from "@/pages/edit-product/edit-product.module.scss";
import TinyMCEEditor from "@/components/editor";
import { useRouter } from "next/router";
import withAuth from "@/lib/withAuth";

 function EditProduct() {
  const [file, setFile] = useState(null);
  const [productTitle, setProductTitle] = useState("");
  const [productText, setProductText] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productSpecifications, setProductSpecifications] = useState("");
  const [productTechnicalSpecifications, setProductTechnicalSpecifications] =
    useState("");

  const router = useRouter();
  const { productId } = router.query;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `https://localhost:7136/api/Product/getProductById/${productId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          const productDetails = await response.json();

         
          setProductTitle(productDetails.productTitle);
          setProductText(productDetails.productText);
          setProductDescription(productDetails.productDescription);
          setProductSpecifications(productDetails.productSpecifications);
          setProductTechnicalSpecifications(
            productDetails.productTechnicalSpecifications
          );
        } else {
          console.error("Error fetching product details");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]);

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
    formData.append(
      "productTechnicalSpecifications",
      productTechnicalSpecifications
    );

    try {
      const response = await fetch(
        `https://localhost:7136/api/Product/editProduct/${productId}`,
        {
          method: "PUT",
          body: formData,
          credentials: "include",
        }
      );

      if (response.ok) {
        console.log("Product edited successfully");
      } else {
        console.error("Edit failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Layout>
      <div className={styles.editProduct}>
        <h3>Ürünü Düzenle</h3>
        <div className={styles.inp}>
          <label htmlFor="">Görsel</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div className={styles.inp}>
          <label htmlFor="">Başlık</label>
          <input
            type="text"
            value={productTitle}
            onChange={(e) => setProductTitle(e.target.value)}
          />
        </div>
        <div className={styles.inp}>
          <label htmlFor="">Kısa özet</label>
          <input
            type="text"
            value={productText}
            onChange={(e) => setProductText(e.target.value)}
          />
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
          className={`btn btn-success ${styles.editProductBtn}`}
          onClick={logValues}
        >
          Güncelle
        </button>
      </div>
    </Layout>
  );
}
export default withAuth(EditProduct);