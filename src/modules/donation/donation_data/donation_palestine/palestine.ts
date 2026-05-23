import { t_donation_data_member,t_donation_country_name } from "../../../types";
import { donation_palestine_data_citizen } from "./donation_palestine_data_citizen";

const country_id:string="palestine"
const formated_data:t_donation_data_member[]=donation_palestine_data_citizen.map((val,id)=>({...{id:id,...val}}))

const data_country:t_donation_country_name={
    [country_id]:{
        persons:{
            datas:formated_data
        }
    }
}
const palestine:t_donation_country_name=data_country


export {
    palestine
}

//todo bikin fitur global search
//todo format api agar bagus di service
//todo callback di service dan controller untuk menentukkan angka response dari api