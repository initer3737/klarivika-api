import { t_donation_data_member } from "../../../types";
import { data_global } from "./data_global";

const country_id:string="palestine"

const palestine:t_donation_data_member[]=data_global.map(val=>({person:{...val.person,country_name:country_id}}))

export {
    palestine
}