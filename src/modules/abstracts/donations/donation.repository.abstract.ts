import { DonationModel } from "../../donation/donation.model";
import { DonationService } from "../../donation/donation.service";
import { BaseAbstract } from "../global";


export abstract class DonationRepositoryAbstract extends BaseAbstract{
    protected abstract model:DonationModel
    protected abstract service:DonationService
}