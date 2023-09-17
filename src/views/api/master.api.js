let baseUrl = "http://localhost:8080/api/";
const masterapi = {
  
  getPublishedCategories: async () => {
    try {
      const rawResponse = await fetch(baseUrl + "categories/published/all", {
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
  getPublishedBrands: async () => {
    try {
      const rawResponse = await fetch(baseUrl + "brand/published/all", {
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

export default masterapi;
