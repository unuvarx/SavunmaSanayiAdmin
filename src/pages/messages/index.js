import Layout from "@/lib/layout";
import React, { useEffect, useState } from "react";
import styles from "@/pages/messages/messages.module.scss";

import { useFunctions } from "@/lib/contextApi";
import { useRouter } from "next/router";
import withAuth from "@/lib/withAuth";

function Messages() {
  const { messages, getMessages, deleteMessage, notification, editMessage } =
    useFunctions();

  const router = useRouter();
  useEffect(() => {
    getMessages();
  }, []);

  const handleDelete = (id) => {
    try {
      deleteMessage(id);
      getMessages();
      window.location.reload();
    } catch (error) {}
  };

  const changeIsActive = (id, isActive) => {
    const updatedIsActive = !isActive;
    editMessage(id, updatedIsActive);

    window.location.reload();
  };

  return (
    <Layout>
      <div className={styles.products}>
        <h3>Mesaj Gönderenler</h3>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col"> İsim Soyisim </th>
              <th scope="col"> Telefon </th>
              <th scope="col"> Mail </th>
              <th scope="col"> Konu </th>
              <th scope="col"> Mesaj </th>
              <th scope="col"> ip </th>
              <th scope="col"> Okundu </th>
              <th scope="col"> Sil </th>
            </tr>
          </thead>
          <tbody>
            {messages?.map((item, index) => (
              <tr key={index}>
                <td>{item.nameSurname}</td>
                <td> {item.phone} </td>
                <td> {item.email} </td>
                <td> {item.topic} </td>
                <td> {item.message}</td>
                <td> {item.userIPAddress} </td>
                <td>
                  {" "}
                  <input
                    type="checkbox"
                    checked={!item.isActive}
                    onChange={() =>
                      changeIsActive(item.connectionId, item.isActive)
                    }
                  />
                </td>

                <td>
                  <button
                    onClick={() => {
                      handleDelete(item.connectionId);
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
export default Messages;
