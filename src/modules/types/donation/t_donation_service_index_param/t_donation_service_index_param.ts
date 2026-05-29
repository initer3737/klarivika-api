import { t_donation_data_global } from ".."


type t_donation_service_index_param={
    datas:t_donation_data_global|[],//{[key:string]:any},
    success:boolean,
    message:string,
    status:number|unknown
}

export {
    t_donation_service_index_param
}