import { DonationModel } from "./model"

class DonationController{
    private model=new DonationModel()
    constructor(){

    }
    public Index(){
        return this.model.getData()
    }
}

export {
    DonationController
}