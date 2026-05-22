type t_data={
    [key:string]:any
}
type t_response={
    success: boolean,
    message:string,
    status:number,
    data:t_data
}
type t_format_param=t_response

class Api{
    constructor(){}

    static format({
        success,
        message,
        status,
        data
    }:t_format_param):t_response {
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