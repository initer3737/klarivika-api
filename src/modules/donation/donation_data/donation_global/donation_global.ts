import { t_donation_data_global } from "../../../types";
import { palestine } from "../donation_palestine";

const donation_data_global: t_donation_data_global = {
	countries: {
		...palestine,
	},
};

export { donation_data_global };
