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
  getCategories: async () => {
    return await utilutyapi.getItems("categories/published/all");
  },
  getAllCategories: async () => {
    return await utilutyapi.getItems("categories/all");
  },
  getBrands: async () => {
    return await utilutyapi.getItems("brand/published/all");
  },
  getAllBrands: async () => {
    return await utilutyapi.getItems("brand/all");
  },
  getCurrency: async () => {
    return await utilutyapi.getItems("currency/all");
  },
  saveBrand: async function (brand) {
    return await utilutyapi.saveItem(brand, "brand")
  },
  getBrandById: async (id) => {
    return await utilutyapi.getItems("brand/" + id);
  },
  getCurrencyById: async (id) => {
    return await utilutyapi.getItems("currency/" + id);
  },
  saveCurrency: async function (currency) {
    return await utilutyapi.saveItem(currency, "currency")
  },
  getCategoryById: async (id) => {
    return await utilutyapi.getItems("category/" + id);
  },
  saveCategory: async function (category) {
    return await utilutyapi.saveItem(category, "categories")
  },
  importBrand: async function (brands) {
    return await utilutyapi.saveItem(brands, "import/brand")
  },
};

export default masterapi;
