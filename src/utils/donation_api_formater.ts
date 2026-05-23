import { t_api_format_param, t_donation_data_global, t_response,t_donation_api_reformat_param } from "../modules/types"


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


static reformat({country,donation_data_profile}:t_donation_api_reformat_param):t_donation_data_global{
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
}


export {
    Donation_api
}