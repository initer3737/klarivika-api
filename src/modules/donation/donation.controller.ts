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

class DonationController {
	private model = new DonationModel();
	private service = new DonationService();
	constructor() {}
	public Index({
		status,
	}: t_donation_controller_index_param): t_response {
		const model = this.model.getData();
		const message = `${e_status_code.Success} ok!`;
		const status_code = e_status_code.Success;
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
		let model: t_donation_data_global | [] =
			this.model.getData();
		const country_search = model.countries[country];
		const find_data_by_id =
			country_search.persons.datas.find(
				(val) => val.id == id,
			);
		let message = `${e_status_code.Success} ok!`;
		let status_code = e_status_code.Success;
		let success = true;
		if (
			typeof country_search === "undefined" ||
			typeof find_data_by_id === "undefined"
		) {
			model = [];
			message = "data not found";
			status_code = e_status_code.NotFound;
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
