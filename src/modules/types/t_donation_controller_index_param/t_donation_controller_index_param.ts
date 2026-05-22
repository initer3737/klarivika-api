type t_status_number_param={
    status_number:number
}
type t_donation_controller_index_param={
    status:(({status_number}:t_status_number_param)=>void)
}


export {
    t_donation_controller_index_param
}