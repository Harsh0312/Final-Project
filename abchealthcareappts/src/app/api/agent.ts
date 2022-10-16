import axios, { AxiosError, AxiosResponse } from 'axios';
import { Stats } from 'fs';
import { request } from 'http';
import { toast } from 'react-toastify';

axios.defaults.baseURL='http://localhost:5000/api/';

axios.defaults.withCredentials = true;

const sleep=()=> new Promise(resolve => setTimeout(resolve,1000))

const responseBody = (response:AxiosResponse) => response.data;

axios.interceptors.response.use(async response=>{
    await sleep();
    return response
},(error:AxiosError)=>{
    //const {data,status}=error.response!;
    // switch(status){
    //     case 400:
    //         toast.error(status);
    //         break
    //     case 401:
    //         toast.error(status);
    //         break
    //     case 500:
    //         toast.error(status);
    //         break
    //     default:
    //         break;
    // }
    console.log(error.response);
    return Promise.reject(error.response);
})

const requests ={
    get : (url:string)=> axios.get(url).then(responseBody),
    post : (url:string,body:{})=> axios.post(url,body).then(responseBody),
    put : (url:string,body:{})=> axios.put(url,body).then(responseBody),
    delete : (url:string)=> axios.delete(url).then(responseBody)

}

const Catalog = {
    list:()=>requests.get('medicines'),
    details:(idMed:number)=> requests.get(`medicines/${idMed}`)
}

const TestErrors = {
    get400Error: () => requests.get('buggy/bad-request'),
    get401Error: () => requests.get('buggy/unauthorised'),
    get404Error: () => requests.get('buggy/not-found'),
    get500Error: () => requests.get('buggy/server-error'),
    getValidationError: () => requests.get('buggy/validation-error'),
}
const Basket={
    get :() => requests.get('basket'),
    addItem : (medicineId:number , quantity=1) => requests.post(`basket?medicineId=${medicineId}&quantity=${quantity}`,{}),
    removeItem : (medicineId:number , quantity=1) => requests.delete(`basket?medicineId=${medicineId}&quantity=${quantity}`),

}

const Account={
    login:(values:any) =>requests.post('account/login',values),
    register:(values:any)=>requests.post('account/register',values),
    currentUser:()=>requests.get('account/currentUSer'),
}
const agent={
    Catalog,
    TestErrors,
    Basket,
    Account
}
export default agent;