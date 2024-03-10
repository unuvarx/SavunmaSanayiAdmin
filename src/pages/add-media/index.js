import Layout from "@/lib/layout";
import React, { useState } from "react";

import styles from "@/pages/add-media/add-media.module.scss";
import TinyMCEEditor from "@/components/editor";
import withAuth from "@/lib/withAuth";

const AddMedia = () => {
  const [file, setFile] = useState(null);
  const [mediaTitle, setMediaTitle] = useState("");

  const [mediaDescription, setMediaDescription] = useState("");

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
        "https://localhost:7136/api/Media/uploadMedia",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      if (response.ok) {
        console.log("Media uploaded successfully");
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
        <h3> Haber Ekle </h3>{" "}
        <div className={styles.inp}>
          <label htmlFor=""> Görsel </label>{" "}
          <input type="file" onChange={handleFileChange} />{" "}
        </div>{" "}
        <div className={styles.inp}>
          <label htmlFor=""> Başlık </label>{" "}
          <input type="text" onChange={(e) => setMediaTitle(e.target.value)} />{" "}
        </div>
        <div className={styles.tiny}>
          <label htmlFor=""> Açıklama </label>{" "}
          <TinyMCEEditor
            value={mediaDescription}
            onChange={(content) => setMediaDescription(content)}
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
export default withAuth(AddMedia)