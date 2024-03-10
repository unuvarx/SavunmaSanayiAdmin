import React, { useState } from "react";
import styles from "./login.module.scss";
import { useRouter } from "next/router";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const changeUsername = (e) => {
    setUsername(e.target.value);
  };
  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const signIn = async () => {
    try {
      const response = await fetch("https://localhost:7136/api/Auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // ASP.NET API'nizin beklediği içerik türüne göre ayarlayın
        },
        body: new URLSearchParams({
          username: username,
          password: password,
        }),
        credentials: "include",
      });

      if (response.ok) {
        const token = await response.text();
        
        router.push("/")
      } else {
        console.error("Giriş Başarısız");
      }
    } catch (error) {
      console.error("Hata:", error);
    }
  };
  return (
    <>
      <div className={styles.registerContainer}>
        <div className={styles.register}>
          <div className={styles.inputsContainer}>
            <label htmlFor="">
              <span> Kullanıcı Adı </span>{" "}
              <input required onChange={changeUsername} type="text" />
            </label>{" "}
            <label htmlFor="">
              <span> Şifre </span>{" "}
              <input required onChange={changePassword} type="password" />
            </label>
            <button onClick={signIn}> Giriş Yap </button>
          </div>{" "}
        </div>{" "}
      </div>
    </>
  );
}
// try {
//   const user = {
//     username : username,
//     passwordHash: password,
//   };

//   try {
//     const response = await fetch(
//       "https://localhost:7136/api/Auth/login",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(user),
//         credentials: "include",
//       }
//     );
//     console.log(response);
//     if (!response.ok) {
//       console.log("hata");
//     }
//     else {
//       console.log("doğru")
//     }
//   } catch (error) {
//     console.log(error);
//   }
// } catch (error) {
// console.log(error);
// }
