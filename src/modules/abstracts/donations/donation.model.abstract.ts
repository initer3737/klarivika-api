import { Donation_api } from "../../../utils"
import { DonationDatabase } from "../../donation/donation.database"

export abstract class DonationModelAbstract {
    protected abstract database:DonationDatabase
    protected abstract donation_util: Donation_api
}