import withAuth from "@/lib/withAuth";
import React from "react";
import styles from "@/pages/home/home.module.scss";
import Layout from "@/lib/layout";

const Home = () => {
  return (
    <Layout>
      <div className={styles.home}>
        <p>Admin sayfanıza hoşgeldiniz!</p>

        <span className={styles.title}>Dikkat</span>
        <div>
          <span>
            1 - Lütfen size verilen linki, kullanıcı adını ve şifreyi kimseyle
            paylaşmayın!
          </span>
          <span>
            2 - Soldaki Menu'den seçili yerlere gidebilir ve uygun formatta
            değişiklikleri yapabilirsiniz.
          </span>
          <span>
            3 - Herhangi bir problem anında benimle iletişime geçebilirsiniz.
          </span>
        </div>
        
      </div>
    </Layout>
  );
};

export default Home;
