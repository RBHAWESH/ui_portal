import utilutyapi from "./utility.api";
const accountapi = {
    getAllOrders: async () => {
        return await utilutyapi.getItems("orders");
  },
  getInvoiceDetails: async () => {
    return await utilutyapi.getInvoice("orders");
  },
}
export default accountapi;
