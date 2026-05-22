import { t_donation_controller_index_param } from "../t_donation_controller_index_param/t_donation_controller_index_param"

 type t_donation_controller_show_param=t_donation_controller_index_param&{
    id:string,
    country:string
 }

 export {
    t_donation_controller_show_param
 }