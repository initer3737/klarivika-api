import { t_q_params } from "../modules/types"

export class Universal_api_util{
     static get_queries_params=({query}:{query:Record<string,string>})=>{
        const {
            q_search_country,
            q_search}=query 
            const q_params:t_q_params={
                    q_search_country,
                    q_search
            }
            return q_params
      }
      /**
             *@desc Fungsi pembantu untuk memeriksa apakah suatu nilai mengandung text pencarian secara rekursif atau tree traversal
            *@desc intinya menelusuri data object dan array dibongkar setiap valuenya hingga mencapai level primitif data type number boolean string etc
            *@param {string} query 
            *@param {any} value 
      */
     public static deep_search({value,query}:{value:any,query:string}):boolean{
            const validate_data={
                  value_is_string:typeof value === 'string',
                  value_is_array:Array.isArray(value),
                  value_is_number:typeof value === 'number',
                  value_is_object:typeof value === 'object',
            }
            if(!value)return false
            if(validate_data.value_is_string){
                  return value.toLowerCase().includes(query.toLowerCase())
            }
            if(validate_data.value_is_number){
                  return String(value).toLowerCase().includes(query)
            }
            if(validate_data.value_is_array){
                  return value.some((val:string|number|object)=>this.deep_search({query:query,value:val}))
            }
            if(validate_data.value_is_object){
                  return Object.values(value).some(val=>this.deep_search({query:query,value:val}))
            }

           return false 
     } 
}