import Layout from "@/lib/layout";
import React, { useEffect } from "react";
import styles from "@/pages/products/products.module.scss";
import ProductCard from "@/components/productCard";

import { useFunctions } from "@/lib/contextApi";
import { useRouter } from "next/router";

export default function Products() {
  const { products, getProducts, deleteProducts } = useFunctions();

  const router = useRouter();
  useEffect(() => {
    getProducts();
  }, []);

  const handleDelete = (id) => {
    try {
      deleteProducts(id);
      getProducts();
      window.location.reload();
    } catch (error) {}
  };
  const handleEdit = (id) => {
    router.push({
      pathname: "/edit-product",
      query: { productId: id },
    });
  };
  return (
    <Layout>
      <div className={styles.products}> <h3>Ürünler</h3>
        <button
          onClick={() => router.push("/add-product")}
          className={`btn btn-success ${styles.addBtn}`}
        >
          Ürün Ekle
        </button>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col"> Ürün </th>
              <th scope="col"> Başlık </th>
              <th scope="col"> Aksiyon </th>
            </tr>
          </thead>
          <tbody>
            {products?.map((item, index) => (
              <tr key={index}>
                <td>
                  {" "}
                  <img
                    src={`data:image/jpeg;base64,${item.productImg}`}
                    alt=""
                  />{" "}
                </td>
                <td> {item.productTitle} </td>
                <td>
                  {" "}
                  <button
                    onClick={() => handleEdit(item.productId)}
                    className={`btn btn-info ${styles.editBtn}`}
                  >
                    Düzenle
                  </button>{" "}
                  <button
                    onClick={() => {
                      handleDelete(item.productId);
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
