import { post_request, get_request } from "./Requests";

const Test = async () => {
    const data = await get_request({ target: "/movies.json/" });
    return data
}
const Login = async (body) => {
    const data = await post_request({ target: "/api/Account/Login", body: body });
    return data
}
const ProductList = async () => {
    const data = await get_request({ target: "api/Product/GetDropdown/1" });
    return data
}
const CustomerReg = async (body) => {
    const data = await post_request({ target: "/api/Customer/CreateCustomerAndProduct", body: body });
    return data
}

const customer_list = async (body) => {
    const data = await post_request({ target: "/api/Customer/GetCustomersBySaleMan", body: body });
    return data
}
const save_Delivery = async(body)=>{
    const data = await post_request({ target: "/api/Sale/CustomerSale", body: body });
    return data
}

const sale_List = async(body)=>{
    const data = await post_request({ target: "/api/Sale/GetCustomerSale", body: body });
    return data
}
const save_Packging = async(body)=>{
    const data = await post_request({ target: "/api/Product/CreatePacking", body: body });
    return data
}


const List_Packging = async(body)=>{
    const data = await post_request({ target: "/api/Product/GetPacking", body: body });
    return data
}

const Report = async(body)=>{
    const data = await post_request({ target: "/api/Sale/GetReportData", body: body });
    return data
}



export { Test, Login, ProductList, CustomerReg, customer_list,save_Delivery,save_Packging , List_Packging,Report,sale_List}