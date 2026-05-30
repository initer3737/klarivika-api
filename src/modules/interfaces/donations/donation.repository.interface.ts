import { t_donation_repository_index_param, t_donation_repository_show_param, t_response } from "../../types";

export interface DonationRepositoryInterface {
    Show(params:t_donation_repository_show_param):t_response
    Index(params:t_donation_repository_index_param):t_response
}