import { Donation_api } from "..";
import { t_response, t_donation_service_index_param } from "../types";
//? berperan sebagai view
//? repository memanggil model untuk komunikasi ke database
//? service digunakkan untuk menampilkan api
//? controller memanggil repositry
//? callback based untuk mengoper status codennya
//? service memformat api lalu dimasukkan data di dalam argumen format api lalu di repository panggil model dan service ,model hanya passing data ke service

class DonationService {
	public Index({
		datas,
		message,
		status,
		success,
	}: t_donation_service_index_param): t_response {
		return Donation_api.format({
			success,
			message,
			status,
			data: datas,
		});
	}
}

export { DonationService };
