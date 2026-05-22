import { t_donation_controller_index_param,t_response,t_donation_data_global, t_donation_controller_show_param } from "../types"
import { DonationModel } from "./model"
import { DonationService } from "./service"



class DonationController{
    private model=new DonationModel()
    private service=new DonationService()
    constructor(){

    }
    public Index({status}:t_donation_controller_index_param):t_response{
        const model=this.model.getData()
        const message='200 ok!'
        const status_code=200
        const success=true
            status({status_number:status_code})
        return this.service.Index({message,model,status:status_code,success})
    }
       

    public Show({status,id,country}:t_donation_controller_show_param){
        //todo ambil data country dan id dari individu
        let model:t_donation_data_global|[]=this.model.getData()
        const country_search=model.countries[country]
        const find_data_by_id=country_search.persons.datas.find(val=>val.id==id)
        let message='200 ok!'
        let status_code=200
        let success=true
            if(typeof country_search === 'undefined' || typeof find_data_by_id === 'undefined'){
                 model=[]
                 message='data not found'
                 status_code=404
                 success=false
            }else{
                model={
                    countries:{
                        [country]:{
                            persons:{
                                datas:[
                                    find_data_by_id
                                ]
                            }
                        }
                    }
                }
            }
            status({status_number:status_code})
        return this.service.Index({message,model,status:status_code,success})
    }
}

export {
    DonationController
}