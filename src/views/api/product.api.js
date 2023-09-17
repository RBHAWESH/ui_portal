let baseUrl = "http://localhost:8080/api/";
const productapi = {
  saveProduct: async function (product) {
    try {
      const rawResponse = await fetch(baseUrl + "", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;UTF-8",
          //   Authorization: Utilities.getAuthoriztion(),
        },
        body: JSON.stringify(product),
      });

      return await (rawResponse.ok ? rawResponse.text() : null);
    } catch (error) {
      return null;
    }
  },
  getProduct: async (id) => {
    try {
      const rawResponse = await fetch(
        baseUrl + "" + id,
        {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json;UTF-8",
            // Authorization: Utilities.getAuthoriztion(),
          },
        }
      );

      return await (rawResponse.ok ? rawResponse.json() : null);
    } catch (error) {
      return null;
    }
  },
  getProducts: async () => {
    try {
      const rawResponse = await fetch(baseUrl + "products/all", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;UTF-8",
          //   Authorization: Utilities.getAuthoriztion(),
        },
      });

      return await (rawResponse.status === 200 ? rawResponse.json() : null);
    } catch (error) {
      alert("Error " + error);
      return null;
    }
  },
  getProductById: async (id) => {
    try {
      const rawResponse = await fetch(baseUrl + "product/" + id, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json;UTF-8",
          //   Authorization: Utilities.getAuthoriztion(),
        },
      });

      return await (rawResponse.status === 200 ? rawResponse.json() : null);
    } catch (error) {
      alert("Error " + error);
      return null;
    }
  },
};

export default productapi;
