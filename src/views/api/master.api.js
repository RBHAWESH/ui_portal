import utilutyapi from "./utility.api";
// let baseUrl = "http://localhost:8080/api/";
const masterapi = {

  getPublishedCategories: async () => {
    return await utilutyapi.getItems("categories/published/all");    
  },
  getPublishedBrands: async () => {
    return await utilutyapi.getItems("brand/published/all");
  },
  getProductTypes: async () => {
    return await utilutyapi.getItems("producttype/all");
  },
  getProductTemplate: async () => {
    return await utilutyapi.getItems("producttemplate/all");
  },
  getProductTaxCategory: async () => {
    return await utilutyapi.getItems("producttaxcategory/all");
  },
  getVendors: async () => {
    return await utilutyapi.getItems("vendor/all");
  },
  getCustomerRoles: async () => {
    return await utilutyapi.getItems("customerrole/all");
  },
  getDeliveryDates: async () => {
    return await utilutyapi.getItems("deliverydate/all");
  },
  getStores: async () => {
    return await utilutyapi.getItems("stores/all");
  },
};

export default masterapi;
