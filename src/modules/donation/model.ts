import { t_donation_data_member } from "../types"
import { donation_data_global } from "./donation_data"
class DonationModel{
    private data:t_donation_data_member[]=[...donation_data_global]
  
    
    public getData():t_donation_data_member[] {
       return this.data
    }
}

export {DonationModel}