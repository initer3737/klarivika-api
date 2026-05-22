import { t_data_profile } from "../t_data_profile/t_data_profile"
type t_data_country=t_data_profile&{
    country_name?:string,
}

export type t_donation_data_member={
    person:t_data_country
}