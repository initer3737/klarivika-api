
import { DonationControllerAbstract } from "../abstracts";
import { DonationControllerInterface } from "../interfaces";
import {
	t_donation_controller_index_param,
	t_response,
	t_donation_controller_show_param,
} from "../types";
import { DonationRepository } from "./donation.respository";

// todo https://www.w3schools.com/typescript/typescript_best_practices.php

/**
 * todo bisa filter data berdasarkan q_param
 * todo q_search_country
 * todo q_search{semua kecuali negara}
 */

class DonationController extends DonationControllerAbstract implements DonationControllerInterface {
	//todo di controller masukkan ke repository lalu repository kkomunikasi dengan model 
	protected repository:DonationRepository=new DonationRepository()
	constructor() {
		super()
	}
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
		//? kemungkinan error di idnya
		return this.repository.Show({
			id,
			country,
			status({status_number}){
				status({status_number})
			}
		})
	}
}

export { DonationController };
