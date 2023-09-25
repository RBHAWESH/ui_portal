import utilutyapi from "./utility.api";
let baseUrl = "http://localhost:8080/api/";
const productapi = {
  saveProduct: async function (product) {
    return await utilutyapi.saveItem(product, "product")
  },
  removeProduct: async function (imageid, productid) {
    const image = {
      id: imageid,
      productid: productid
    }
    return await utilutyapi.saveItem(image, "product/images/remove")
  },
  updateProductImage: async function (imageid, productid, display_order) {
    const image = {
      id: imageid,
      productid: productid,
      display_order: display_order
    }
    return await utilutyapi.updateItem(image, "product/images")
  },
  uploadProductImages: async function (imagesData, productid) {
    let formData = new FormData();
    imagesData = imagesData.filter(i => i.id === 0);
    imagesData.forEach((item, index) => {
      let fileName = item.productid + "_" + (index + 1) + "_" + item.display_order + "_" + (item.isprimary ? 1 : 0) + "_img.png";
      item.data = new File([item.data], fileName, { type: "image/png;image/jpeg" });
      formData.append("file", item.data);
      formData.append("productid", productid);
    });
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
  getProductImages: async (id) => {
    return await utilutyapi.getItems("product/images/" + id);
  },
};

export default productapi;
