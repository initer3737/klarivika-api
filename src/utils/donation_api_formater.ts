import { e_status_code } from "../modules/enum"
import { t_api_format_param, t_donation_data_global, t_response,t_donation_api_reformat_param, t_donation_country_name,t_donation_data_member } from "../modules/types"


class Donation_api{
    constructor(){}

     static format({
        success,
        message,
        status,
        data
    }:t_api_format_param):t_response {
        return {
            success: success,
            message: message,
            status,
            data: data
        }
    }


static reformat_single_country({country,donation_data_profile}:t_donation_api_reformat_param):t_donation_data_global{
  return  {
      countries:{
        [country]:{
            persons:{
                datas:[
                    {...donation_data_profile}
                  ]
                }
            }
         }
        }
    }

static reformat_mass_country({country_Data}:{country_Data:t_donation_country_name}):t_donation_data_global{
  return  {
      countries:country_Data
    }
}

static group_by=({group_by,datas}:{group_by:keyof t_donation_data_member,datas:t_donation_data_member[]}):t_donation_country_name=>{
   const grouped_data=datas.reduce((acc,person,_)=>{
            const group_by_key=group_by
            // data_country.forEach(person=>{
                const country=person[group_by_key] as string
                //todo kalau group by key kosong
                if(!acc[country]){
                    acc[country]={
                        persons:{datas:[]}
                    }
                }
                acc[country].persons.datas.push(person)
            // })
        return acc
    },{} as Record<string,{persons:{datas:t_donation_data_member[]}}>)
    return grouped_data
}



}


export {
    Donation_api
}