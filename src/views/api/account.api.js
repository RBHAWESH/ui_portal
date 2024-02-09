import utilutyapi from "./utility.api";
const accountapi = {
    getAllOrders: async () => {
        return await utilutyapi.getItems("orders");
  },
  getOrdersByDateRange: async (dateRangeObject) => {
    return await utilutyapi.getItemsByDateRange("orders", dateRangeObject);
  },
  getInvoiceDetails: async () => {
    return await utilutyapi.getInvoice("orders");
  },
}
export default accountapi;
