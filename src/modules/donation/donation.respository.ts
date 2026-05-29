import { e_status_code } from "../enum"
import { t_response,t_donation_repository_index_param } from "../types"
import { DonationModel } from "./donation.model"
import { DonationService } from "./donation.service"

class DonationRepository{
    //todo komunikasi antara model dan controller
    //todo: kode untuk validasi status code message dll
    private model=new DonationModel()
    private service=new DonationService()
    constructor(){}
        //todo : repository butuh status code ,q_params
		//todo: message datas success ada didalam repository
		//todo: repository mengirimkan kembali status code sebagai callback
    public Index({
			status,
            q_params
		}:t_donation_repository_index_param):t_response{
            //? q_search_country:string,
            // ?q_search:string global search
            //? 
            const queries=[]
            let status_code:number=e_status_code.SuccessCode
            let datas=this.model.findAll()
            let message:string=e_status_code.SuccessMessage
            let success:boolean=true
                //? kalau ada q_params ada isinya
                if(q_params !== undefined){
                    Object.values(q_params).forEach(val=>queries.push(val))
                    datas=this.model.findBy({logic:"or",})
                }
            status({status_number:status_code})
            return this.service.Index({
                    datas,
                    message,
                    success,
                    status:status_code
            })
    }

    public Show(){
        try {
            return this.model.findBy({country_name:'palestine',name:"mahira"})
            
        } catch (error) {
            return error
        }
    }

}




export {
    DonationRepository
}