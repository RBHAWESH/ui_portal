import utilutyapi from "./utility.api";
// let baseUrl = "http://localhost:8080/api/";
const authapi = {
    login: async function (user) {
        return await utilutyapi.saveItem(user, "v1/user/login")
      }
}
export default authapi;