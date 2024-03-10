import React, { useEffect, useRef } from "react";

import styles from "@/components/productCard/productCard.module.scss";



export default function ProductCard({
  imageUrl,
  imageIsRight,
  title,
  description,
}) {
  

  return (
    <div className={styles.productCard} >
      <img
        src={imageUrl}
        alt=""
        style={imageIsRight ? { order: 2 } : { order: 1 }}
      />
      <div style={imageIsRight ? { order: 1 } : { order: 2 }}>
        <span className={styles.title}>{title}</span>
        <span className={styles.desc}>{description}</span>
        <button>Ürün Detay</button>
      </div>
    </div>
  );
}
