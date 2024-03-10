import Layout from "@/lib/layout";
import React, { useState, useEffect } from "react";
import styles from "@/pages/edit-media/edit-media.module.scss";
import TinyMCEEditor from "@/components/editor";
import { useRouter } from "next/router";

export default function EditMedia() {
  const [file, setFile] = useState(null);
  const [mediaTitle, setMediaTitle] = useState("");
  const [mediaDescription, setMediaDescription] = useState("");
  
  const router = useRouter();
  const { mediaId } = router.query;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `https://localhost:7136/api/Media/getMedia/${mediaId}`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        if (response.ok) {
          const mediaDetails = await response.json();
          setMediaTitle(mediaDetails.mediaTitle);
          setMediaDescription(mediaDetails.mediaDescription);
         
          
        } else {
          console.error("Error fetching product details");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (mediaId) {
      fetchProductDetails();
    }
  }, [mediaId]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const logValues = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("mediaTitle", mediaTitle);
    formData.append("mediaDescription", mediaDescription);
    

    try {
      const response = await fetch(
        `https://localhost:7136/api/Media/editMedia/${mediaId}`,
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
        <h3>Haberi Düzenle</h3>
        <div className={styles.inp}>
          <label htmlFor="">Görsel</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div className={styles.inp}>
          <label htmlFor="">Başlık</label>
          <input
            type="text"
            value={mediaTitle}
            onChange={(e) => setMediaTitle(e.target.value)}
          />
        </div>
        
        <div className={styles.tiny}>
          <label htmlFor="">Açıklama</label>
          <TinyMCEEditor
            value={mediaDescription}
            onChange={(content) => setMediaDescription(content)}
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
