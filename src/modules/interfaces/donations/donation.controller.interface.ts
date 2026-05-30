import { t_donation_controller_index_param, t_response,t_donation_controller_show_param } from "../../types";

export interface DonationControllerInterface{
    Index(params: t_donation_controller_index_param): t_response 
    Show(params: t_donation_controller_show_param):t_response
}