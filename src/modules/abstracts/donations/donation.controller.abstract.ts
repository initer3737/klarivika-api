import { DonationRepository } from "../../donation/donation.respository";

export abstract class DonationControllerAbstract {
    protected abstract repository:DonationRepository
    
}