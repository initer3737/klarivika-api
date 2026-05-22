import { t_donation_data_member } from ".."


type t_country_name={
        [name:string]:{
            persons:{
                datas:t_donation_data_member[]
            }
        }
}


export {
    t_country_name
}