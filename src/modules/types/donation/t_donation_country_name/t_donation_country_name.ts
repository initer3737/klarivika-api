import { t_donation_data_member } from "../..";

type t_donation_person_datas = {
	persons: {
		datas: t_donation_data_member[];
	};
};

type t_donation_country_name = {
	[name: string]: t_donation_person_datas;
};

export { t_donation_country_name };
