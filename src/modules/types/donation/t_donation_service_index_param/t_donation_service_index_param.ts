import { t_donation_data_global } from ".."


type t_donation_service_index_param={
    model:t_donation_data_global|[],//{[key:string]:any},
    success:boolean,
    message:string,
    status:number
}

export {
    t_donation_service_index_param
}