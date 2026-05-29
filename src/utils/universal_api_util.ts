import { t_q_params ,t_deep_search2,t_deep_search} from "../modules/types"



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
            *@desc dia by default akan menggunakkan logika | kalau di sql seperti where like %what% 
            *@param {string} query 
            *@param {any} value 
      */
     
     public static deep_search({value,query}:t_deep_search):boolean{
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

     
     public static deep_search2=({data,queries,logic='or'}:t_deep_search2):boolean=>{
                const validate_data_type={
                    array:Array.isArray(data),
                    string:typeof data === 'string',
                    number:typeof data === 'number'
                }
                //? nilai falsy 
                /**
                 * ?null (mengatasi bug typeof null === 'object')
                 * ?undefined (jika ada properti objek yang tidak diisi)
                 * ?"" (string kosong)
                 * ?0 atau NaN
                 * todo: loloskan string kosong dan 0 jika ada
                 */
                if( data === null ||  data === undefined )return false
                //todo : array adalah object keynya index {0:data,1:jaka} tapi dikasih property length pop push dll
                //todo :param queries itu memvalidasi banyak data dari array lalu data dicari dengan some untuk mnencocokkan setiap data yang akan cocok ,queries pakai every guna memastikan semua value queries ada didalam array, data yang diubah adalah datanya[data yang dimasukkan kedalam param data lalu divalidasi sampai level type data primitif[value berupa string ataupun number]] karena yang dicari adalah nilai dari data bukan queriesnya karena queries hanya digunakkan untuk proses pencarian data 
                  if(Array.isArray(data)){
                    //todo param queries_data akan dioper guna pencocokan di level dasar | type data primitif via parameter 
                    //todo: every merupakan perulangan yang mencocokkan nilai dan return berupa boolean every akan memastikan semua data harus bernilai true jika ada 1 yang false maka dianggap gagal every itu seperti logika dan &&  misal 1>3 && 6===6 maka jawabannya false sebab logika dan[&&] menghasilkan false jika kedua nilai perbandingan tidak benar semua 
                    //todo: untuk some dia akan benar jika salah satu datanya ada yang bernilai true atau benar ,some logikanya seperti operator or | , misal 1>2 | 5<2 hasilnya true karena salah satu perbandingan nilai ada yang benar 
                       
                               //? kalau object {country:palestine} maka?
                              //? menghasilkan nested array [country,palestine] 
                              //? misal queries berisi [country_name,palestine]
                              //? cocokkan semua value dari queries dan semua data di queries harus ada didalam data
                              //? query_data menyimpan queries untuk dicocokkan pada saat data di ekstrak menjadi type data primitif  
                            return data.some(valsome=>this.deep_search2({data:valsome,queries:queries,logic}))
                        
                  }
                  //? jika pengecekkan object ditaruh dipaling atas maka dia akan menyebabkan infinite loop karena object di konversi sebagai array lalu di cek di pengecekan object lagi tanpa henti karena array adalah object juga
                  if(typeof data ==='object'){
                 
                        const data_arrays=Object.entries(data as Record<string,any>)
                        //todo: check setiap data
                        //? kalau ada 1 data key match misal key maka akan terus check minimal 1 kecocokan dan dia true
                        //? jika data array [[name,jaka],[country_name,palestine]]
                        let local_object_string = "";
                        const nested_objects_or_arrays: any[] = [];
                     for(const [key,value] of data_arrays){
                              //todo: cocokan key dan valuenya
                              //?kalau value ternyata adalah array dan object dan bukan null
                              if(value !== null && typeof value === 'object'){
                                    nested_objects_or_arrays.push(value)
                              } 
                              //? kalau value type datanya primitif maka jadikan string
                              else if(value !== undefined){
                                    //? name jaka
                                    local_object_string+=`${key} ${value}`
                              }
                                    //todo : lakukan pencocokan
                                    //?curent_string='name jaka'
                                    //?queries=[name,jaka]
                              const curent_string=local_object_string.toString().toLowerCase()
                              let is_match=false
                              if(logic === 'and')is_match=queries.every(queri=>curent_string.includes(queri.toString().toLowerCase()))
                              if(logic === 'or')is_match=queries.some(queri=>curent_string.includes(queri.toString().toLowerCase()))
                               if(is_match)return true 
                        }
                              //todo: jika ternyata nested_objects_or_arrays adalah array atau object
                              if(nested_objects_or_arrays.length>0){
                                  return nested_objects_or_arrays.some(nested_data=>
                                      this.deep_search2({data:nested_data,logic,queries})
                                    )
                              }     
                        //.every(val_every=>this.deep_search2({data:val_every,queries:queries,logic}))//.every(everyval=>deep_search_and())
                    

                    return false
                }
                  if(validate_data_type.number){
                        if(logic==='and'){
                              return queries.every(queri=> String(data).toLowerCase().includes(queri?.toString().toLowerCase()))
                        }
                        if(logic==='or'){
                              return queries.some(queri=> String(data).toLowerCase().includes(queri?.toString().toLowerCase()))
                        }
                  }
                  //? queries [country,palestine]
                  if(typeof data === 'string'){
                        //?misal data berisi palestine lalu queries_Data berisi palestine maka akan return true
                        //? pencocokan secara parsial misal data=palestine queries_data=pal maka dia true
                        if(logic === 'and'){
                              return queries.every(queri=> data.toLowerCase().includes(queri?.toString()!))
                        }
                        if(logic === 'or'){
                              return queries.some(queri=> data.toLowerCase().includes(queri?.toString()!))
                        }
                  }
                  return false
            }

}