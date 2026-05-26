import { Donation_api } from "../../utils";
import { e_status_code } from "../enum";
import {
	t_donation_controller_index_param,
	t_response,
	t_donation_data_global,
	t_donation_controller_show_param,
} from "../types";
import { DonationModel } from "./donation.model";
import { DonationService } from "./donation.service";

// todo https://www.w3schools.com/typescript/typescript_best_practices.php

/**
 * todo bisa filter data berdasarkan q_param
 * todo q_search_country
 * todo q_search{semua kecuali negara}
 */

class DonationController {
	private model:DonationModel = new DonationModel();
	private service:DonationService = new DonationService();
	constructor() {}
	public Index({
		status,
		q_params
	}: t_donation_controller_index_param): t_response {
		
		const model = this.model.getData();
		const message = `${e_status_code.SuccessMessage}`;
		const status_code = e_status_code.SuccessCode;
		const success = true;
		status({ status_number: status_code });
		return this.service.Index({
			message,
			model,
			status: status_code,
			success,
		});
	}

	public Show({
		status,
		id,
		country,
	}: t_donation_controller_show_param) {
		//todo ambil data country dan id dari individu
		let model: t_donation_data_global | [] =this.model.getData();
		const country_search = model.countries[country];
		const find_data_by_id =
			country_search?.persons.datas.find(
				(val) => val.id == id,
			);
		let message = `${e_status_code.SuccessMessage}`;
		let status_code = e_status_code.SuccessCode;
		let success = true;
		if (
			typeof country_search === "undefined" ||
			typeof find_data_by_id === "undefined"
		) {
			model = [];
			const validate_data_api:Record<string,boolean>={
				not_found_both:typeof find_data_by_id === "undefined" && typeof country_search === "undefined",
				found_id:typeof find_data_by_id !== "undefined" && typeof country_search === "undefined",
				found_country:typeof find_data_by_id === "undefined" && typeof country_search !== "undefined"
			}
			//todo kalau undefined salah 1 : kalau undefined keduanya 
			//todo country cocok tapi id gak ada? tampil id not found : keduanya not found 
			if(validate_data_api.not_found_both){
				message=`data with id ${id} and country is ${country} not found in our database`
			}
			if(validate_data_api.found_id){
				message=`data country for ${country} is not found in our database`
			}
			if(validate_data_api.found_country){
				message=`data id for ${id} is not found in our database`
			}
			status_code = e_status_code.NotFoundCode;
			success = false;
		} else {
			model = Donation_api.reformat({
				country: country,
				donation_data_profile:
					find_data_by_id,
			});
		}
		status({ status_number: status_code });
		return this.service.Index({
			message,
			model,
			status: status_code,
			success,
		});
	}
}

export { DonationController };
