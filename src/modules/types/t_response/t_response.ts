type t_data={
    [key:string]:any
}
type t_response={
    success: boolean,
    message:string,
    status:number,
    data:t_data
}


export{
    t_response
}