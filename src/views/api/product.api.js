import utilutyapi from "./utility.api";
let baseUrl = "http://localhost:8080/api/";
const productapi = {
  saveProduct: async function (product) {
    return await utilutyapi.saveItem(product, "product")
  },
  uploadProductImages: async function (imagesData) {
    let formData = new FormData()
    imagesData.forEach((item, index) => {
      let fileName = item.productid + "_" + (index + 1) + "_" + item.order + "_" + (item.isprimary ? 1 : 0) + "_img.png";     
      item.data = new File([item.data], fileName, { type: "image/png" });
      formData.append("file", item.data);

    });
    //formData.append("imageData", JSON.stringify(imagesData));
    //console.log("formData", formData);
    return await utilutyapi.saveFormData(formData, "product/upload")
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
    return await utilutyapi.getItems("products/all");
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
