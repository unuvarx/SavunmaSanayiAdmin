import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const useFunctions = () => {
  return useContext(DataContext);
};

export const DataProvider = ({ children }) => {
  const [certificates, setCertificates] = useState([]);
  const [partners, setPartners] = useState([]);
  const [products, setProducts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [medias, setMedias] = useState([]);
  const [communications, setCommunications] = useState([]);
  const [isWarning, setIsWarning] = useState(false);
  const [location, setLocation] = useState({
    lat: 35.333,
    lng: 35.3434,
    title: "",
    title2: "",
  });
  const [notification, setNotification] = useState(0);

  const getCertificates = async () => {
    try {
      const response = await fetch("https://localhost:7136/api/Certificate", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",
      });
      const data = await response.json();

      setCertificates(data);
    } catch (error) {
      setIsWarning(true);
    }
  };
  const getPartners = async () => {
    try {
      const response = await fetch("https://localhost:7136/api/Partners", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",
      });
      const data = await response.json();

      setPartners(data);
    } catch (error) {
      setIsWarning(true);
    }
  };
  const deletePartners = async (id) => {
    try {
      const response = await fetch(
        `https://localhost:7136/api/Partners/deletePartner/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",
        }
      );
    } catch (error) {
      setIsWarning(true);
    }
  };

  const getCommunications = async () => {
    try {
      const response = await fetch(
        "https://localhost:7136/api/Communications",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",
        }
      );
      const data = await response.json();

      setLocation({
        lat: parseFloat(data[0]?.coordinateLant),
        lng: parseFloat(data[0]?.coordinateLng),
        title: data[0]?.title,
        title2: data[0]?.adress,
      });

      setCommunications(data);
    } catch (error) {
      setIsWarning(true);
    }
  };

  const getProducts = async () => {
    try {
      const response = await fetch(
        "https://localhost:7136/api/Product/getProducts",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",
        }
      );
      const data = await response.json();

      setProducts(data);
    } catch (error) {
      setIsWarning(true);
    }
  };

  const deleteProducts = async (id) => {
    try {
      const response = await fetch(
        `https://localhost:7136/api/Product/deleteProduct/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",
        }
      );
    } catch (error) {
      setIsWarning(true);
    }
  };

  const deleteCertificate = async (id) => {
    try {
      const response = await fetch(
        `https://localhost:7136/api/Certificate/deleteCertificate/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
    } catch (error) {
      setIsWarning(true);
    }
  };
  const deleteCommunication = async (id) => {
    try {
      const response = await fetch(
        ` https://localhost:7136/api/Communications/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
    } catch (error) {
      setIsWarning(true);
    }
  };

  const getMedias = async () => {
    try {
      const response = await fetch("https://localhost:7136/api/Media", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",
      });
      const data = await response.json();

      setMedias(data);
    } catch (error) {
      setIsWarning(true);
    }
  };

  const deleteMedia = async (id) => {
    try {
      const response = await fetch(
        ` https://localhost:7136/api/Media/deleteMedia/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
    } catch (error) {
      setIsWarning(true);
    }
  };

  const getMessages = async () => {
    try {
      const response = await fetch("https://localhost:7136/api/Connections", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
  
      const data = await response.json();
      setMessages(data);
  
      let newNotificationCount = 0;
  
      data.forEach((item) => {
        if (item.isActive) {
          newNotificationCount++;
        }
      });
  
      setNotification(newNotificationCount);
    } catch (error) {
      setIsWarning(true);
    }
  };
  
  const deleteMessage = async (id) => {
    try {
      const response = await fetch(
        ` https://localhost:7136/api/Connections/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
    } catch (error) {
      setIsWarning(true);
    }
  };
  //   var ipAddress = HttpContext.Connection.RemoteIpAddress.ToString();

  // var existingConnection = await _context.Connections
  //     .FirstOrDefaultAsync(c => c.UserIPAddress == ipAddress && c.message == connections.message);

  // if (existingConnection != null)
  // {
  //     return BadRequest("Bu IP adresi ve mesajla zaten bir kayıt mevcut.");
  // }
  const editMessage = async (id, checkboxValue) => {
    try {
      const formData = new FormData();
      formData.append("isActive", checkboxValue);

      const response = await fetch(
        `https://localhost:7136/api/Connections/editConnection/${id}`,
        {
          method: "PUT",
          body: formData,
          credentials: "include",
        }
      );

      console.log("checkbox: ", checkboxValue);
      // Other operations here...
    } catch (error) {
      setIsWarning(true);
    }
  };

  return (
    <DataContext.Provider
      value={{
        isWarning,
        getCertificates,
        certificates,
        partners,
        getPartners,
        communications,
        getCommunications,
        location,
        getProducts,
        products,
        deleteProducts,
        deletePartners,
        deleteCertificate,
        deleteCommunication,
        deleteMedia,
        medias,
        getMedias,
        getMessages,
        messages,
        deleteMessage,
        notification,
        setNotification,
        editMessage,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
