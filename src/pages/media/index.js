import Layout from "@/lib/layout";
import React, { useEffect } from "react";
import styles from "@/pages/media/media.module.scss";
import { useFunctions } from "@/lib/contextApi";
import { useRouter } from "next/router";
import withAuth from "@/lib/withAuth";

 function Media() {
  const { deleteMedia, medias, getMedias } = useFunctions();

  const router = useRouter();
  useEffect(() => {
    getMedias();
  }, []);

  const handleDelete = (id) => {
    try {
      deleteMedia(id);
      getMedias();
      window.location.reload();
    } catch (error) {}
  };
  const handleEdit = (id) => {
    router.push({
      pathname: "/edit-media",
      query: { mediaId: id },
    });
  };
  return (
    <Layout>
      <div className={styles.products}> <h3>Basında Biz</h3>
        <button
          onClick={() => router.push("/add-media")}
          className={`btn btn-success ${styles.addBtn}`}
        >
          Haber Ekle
        </button>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col"> Haber </th>
              <th scope="col"> Başlık </th>
              <th scope="col"> Aksiyon </th>
            </tr>
          </thead>
          <tbody>
            {medias?.map((item, index) => (
              <tr key={index}>
                <td>
                  {" "}
                  <img
                    src={`data:image/jpeg;base64,${item.mediaImg}`}
                    alt=""
                  />{" "}
                </td>
                <td> {item.mediaTitle} </td>
                <td>
                  {" "}
                  <button
                    onClick={() => handleEdit(item.mediaId)}
                    className={`btn btn-info ${styles.editBtn}`}
                  >
                    Düzenle
                  </button>{" "}
                  <button
                    onClick={() => {
                      handleDelete(item.mediaId);
                    }}
                    className={`btn btn-danger ${styles.deleteBtn}`}
                  >
                    Sil
                  </button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
}
export default withAuth(Media);