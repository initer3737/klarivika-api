import { Universal_api_util } from "../../utils"
import { DonationRepositoryAbstract } from "../abstracts"
import { e_status_code } from "../enum"
import { DonationRepositoryInterface } from "../interfaces"
import { t_response,t_donation_repository_index_param,t_q_params,t_donation_repository_show_param, t_fiture_q_search_country_param, t_fiture_q_search_param } from "../types"
import { DonationModel } from "./donation.model"
import { DonationService } from "./donation.service"




class DonationRepository extends DonationRepositoryAbstract implements DonationRepositoryInterface{
    //todo komunikasi antara model dan controller
    //todo: kode untuk validasi status code message dll
    protected model=new DonationModel()
    protected service=new DonationService()
    constructor(){
        super()
    }
    protected FitureQSearchCountry({cb_response,id,data_models,q_params_datas,country}:t_fiture_q_search_country_param){
            this.QSearchCountry({
                cb_response({ data_models, message_response, status_code_response, success_response }) {
                    cb_response({
                        data_models,
                        message_response,
                        status_code_response,
                        success_response
                    })
                },
                country,
                data_models,
                id,
                model_find:this.model,
                q_params_datas
            })

    }
    protected FitureQSearch({q_params_datas,data_models,cb_response}:t_fiture_q_search_param){
       this.QSearch({
        cb_response({data_models,message_response,status_code_response,success_response}){
            cb_response({data_models,message_response,status_code_response,success_response})
        },
        data_models,
        model_find:this.model,
        q_params_datas
       })
    }
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
            let query=""
            let status_code:number=e_status_code.SuccessCode
            let datas=this.model.findAll()
            let message:string=e_status_code.SuccessMessage
            let success:boolean=true
                //? kalau ada q_params ada isinya
                //?q_search adalah global search except id ya guys ya
                    const data_q_param:t_q_params|undefined=q_params
                    this.FitureQSearch({cb_response({ message_response, status_code_response, success_response,data_models }) {
                        status_code=status_code_response
                        success=success_response
                        message=message_response
                        datas=data_models
                    },data_models:datas,q_params_datas:data_q_param})
              
                if(data_q_param?.q_search_country !== undefined){
                        query=data_q_param.q_search_country
                    datas=this.model.findBy({param:{country_name:query}})
                        if(Object.values(datas.countries).length===0){
                            //  Donation_api.country_not_found_response({message,status_code,success})
                            Universal_api_util.responses({cb({message_response,status_code_response,success_response}){
                                success=success_response
                                message=message_response
                                status_code=status_code_response 
                            },code:404})
                        }
                }
            status({status_number:status_code})
            return this.service.Index({
                    datas,
                    message,
                    success,
                    status:status_code
            })
    }

    public Show({
			status,
            q_params,
            id,
            country
		}:t_donation_repository_show_param):t_response{
            let status_code:number=e_status_code.SuccessCode
            let message:string=e_status_code.SuccessMessage
            let success:boolean=true
            let datas=this.model.findBy({param:{id,country_name:country}})
            const q_params_datas:t_q_params|undefined=q_params
                

                //todo : gunanya untuk response 404 jika user asal asalan input country yang bukan merupakan negara
                // ? jika q_search_country ada 
                this.FitureQSearchCountry({
                    cb_response({data_models,message_response,status_code_response,success_response}){
                        datas=data_models
                        success=success_response
                        message=message_response
                        status_code=status_code_response 
                    }
                ,data_models:datas,country,q_params_datas,id})

                status({status_number:status_code})
            return this.service.Index({
                datas,
                message,
                status:status_code,
                success
            })
        
    }

}




export {
    DonationRepository
}