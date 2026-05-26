import {t_donation_data_global } from "../types"
import { donation_data_global } from "./donation_data"

type t_model_param={
    [key:string]:string
}
class DonationModel{
    private data:t_donation_data_global={...donation_data_global}
  
    
    public getData():t_donation_data_global {
       return this.data
    }

    public findAll():t_donation_data_global{
        return this.data
    }
    /**
     * @desc to find data based on object given by developer
     * @param param 
     */
    public findBy(param:t_model_param){

    }
}

export {DonationModel}