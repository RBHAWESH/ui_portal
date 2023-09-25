let baseUrl = "http://localhost:8080/api/";
const utilutyapi = {  
  getItems: async (endPoint) => {
    try {
      const rawResponse = await fetch(baseUrl + endPoint, {
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
  saveItem: async function (item, endPoint) {
    try {
      const rawResponse = await fetch(baseUrl + endPoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          //   Authorization: Utilities.getAuthoriztion(),
        },
        body: JSON.stringify(item),
      });

      return await (rawResponse.ok ? rawResponse.text() : null);
    } catch (error) {
      return null;
    }
  },
  saveFormData: async function (item, endPoint) {
    try {
      const rawResponse = await fetch(baseUrl + endPoint, {
        method: "POST",
        headers: {
          "timeout": 0,
          "processData": false,
          "mimeType": "multipart/form-data",
          "contentType": false,
          "data": item
          //   Authorization: Utilities.getAuthoriztion(),
        },
        body: item,
      });

      return await (rawResponse.ok ? rawResponse.text() : null);
    } catch (error) {
      return null;
    }
  },
  updateItem: async function (item, endPoint) {
    try {
      const rawResponse = await fetch(baseUrl + endPoint, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          //   Authorization: Utilities.getAuthoriztion(),
        },
        body: JSON.stringify(item),
      });

      return await (rawResponse.ok ? rawResponse.text() : null);
    } catch (error) {
      return null;
    }
  },
};

export default utilutyapi;
