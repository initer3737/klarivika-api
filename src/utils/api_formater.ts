import { t_api_format_param, t_response } from "../modules/types"



class Api{
    constructor(){}

    static format({
        success,
        message,
        status,
        data
    }:t_api_format_param):t_response {
        return {
            success: success,
            message: message,
            status,
            data: data
        }
    }
}

export {
    Api
}