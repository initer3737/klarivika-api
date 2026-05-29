import { Donation_api } from "../../utils";
import { e_status_code } from "../enum";
import {
	t_donation_controller_index_param,
	t_response,
	t_donation_data_global,
	t_donation_controller_show_param,
} from "../types";
import { DonationModel } from "./donation.model";
import { DonationRepository } from "./donation.respository";
import { DonationService } from "./donation.service";

// todo https://www.w3schools.com/typescript/typescript_best_practices.php

/**
 * todo bisa filter data berdasarkan q_param
 * todo q_search_country
 * todo q_search{semua kecuali negara}
 */

class DonationController {
	//todo di controller masukkan ke repository lalu repository kkomunikasi dengan model 
	private model:DonationModel = new DonationModel();
	private service:DonationService = new DonationService();
	private repository:DonationRepository=new DonationRepository()
	constructor() {}
	public Index({
		status,
		q_params
	}: t_donation_controller_index_param): t_response {
		//todo : repository butuh status code ,q_params
		//todo: message datas success ada didalam repository
		//todo: repository mengirimkan kembali status code sebagai callback
		return this.repository.Index({
			// status({status_number:200}),
			//? status method dari repository  
			status({status_number}){
				//? status ini asalnya dari parameter controller 
				//? untuk menerima status number dari method index repository
				status({ status_number })
			},
			q_params
		});
	}

	public Show({
		status,
		id,
		country,
	}: t_donation_controller_show_param) {
		return this.repository.Show()
		//todo ambil data country dan id dari individu
		//todo ganti country jadi country_name
	// 	let datas: t_donation_data_global | [] =this.model.getData();
	// 	const country_search = datas.countries[country];
	// 	const find_data_by_id =
	// 		country_search?.persons.datas.find(
	// 			(val) => val.id == id,
	// 		);
	// 	let message = `${e_status_code.SuccessMessage}`;
	// 	let status_code = e_status_code.SuccessCode;
	// 	let success = true;
	// 	if (
	// 		typeof country_search === "undefined" ||
	// 		typeof find_data_by_id === "undefined"
	// 	) {
	// 		datas = [];
	// 		const validate_data_api:Record<string,boolean>={
	// 			not_found_both:typeof find_data_by_id === "undefined" && typeof country_search === "undefined",
	// 			found_id:typeof find_data_by_id !== "undefined" && typeof country_search === "undefined",
	// 			found_country:typeof find_data_by_id === "undefined" && typeof country_search !== "undefined"
	// 		}
	// 		//todo kalau undefined salah 1 : kalau undefined keduanya 
	// 		//todo country cocok tapi id gak ada? tampil id not found : keduanya not found 
	// 		if(validate_data_api.not_found_both){
	// 			message=`data with id ${id} and country is ${country} not found in our database`
	// 		}
	// 		if(validate_data_api.found_id){
	// 			message=`data country for ${country} is not found in our database`
	// 		}
	// 		if(validate_data_api.found_country){
	// 			message=`data id for ${id} is not found in our database`
	// 		}
	// 		status_code = e_status_code.NotFoundCode;
	// 		success = false;
	// 	} else {
	// 		datas = Donation_api.reformat_single_country({
	// 			country: country,
	// 			donation_data_profile:
	// 				find_data_by_id,
	// 		});
	// 	}
	// 	status({ status_number: status_code });
	// 	return this.service.Index({
	// 		message,
	// 		datas,
	// 		status: status_code,
	// 		success,
	// 	});
	}
}

export { DonationController };
