import { Api } from "../";
import { t_response,t_DonationService_index_param } from "../types";
//? berperan sebagai view  
//? controller memanggil model untuk komunikasi ke database
//? service digunakkan untuk menampilkan api
//? controller memanggil model dan sekaligus view atau service
//? callback based untuk service dan controller
//? service memformat api lalu dimasukkan model di dalam argumen format api lalu di controller panggil model dan service model hanya passing data ke service

class DonationService{
    public Index({model,message,status,success}:t_DonationService_index_param):t_response{
        return Api.format({success,message,status,data:model})
    }
} 


export {
    DonationService
}