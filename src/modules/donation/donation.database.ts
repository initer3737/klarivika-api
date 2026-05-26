import { t_donation_data_global } from "../types"
import { donation_data_global } from "./donation_data"

class DonationDatabase{
    private data:t_donation_data_global={...donation_data_global}
    public getData():t_donation_data_global {
       return this.data
    }
}


export {
    DonationDatabase
}