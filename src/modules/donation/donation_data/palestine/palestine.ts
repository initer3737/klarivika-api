import { t_donation_data_member,t_country_name } from "../../../types";
import { data_global } from "./data_global";

const country_id:string="palestine"
const formated_data:t_donation_data_member[]=data_global.map((val,id)=>({...{id:id,...val}}))

const data_country:t_country_name={
    [country_id]:{
        persons:{
            datas:formated_data
        }
    }
}
const palestine:t_country_name=data_country


export {
    palestine
}

//todo bikin fitur global search
//todo format api agar bagus di service
//todo callback di service dan controller untuk menentukkan angka response dari api