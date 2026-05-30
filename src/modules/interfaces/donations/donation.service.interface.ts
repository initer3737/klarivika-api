import { t_donation_service_index_param, t_response } from "../../types";

export interface DonationServiceInterface{
     Index(params: t_donation_service_index_param): t_response
}