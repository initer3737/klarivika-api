import { Donation_api } from "./utils"

//by object
type t_person={
    id: number,
    name:string,
    youtube_profile:string ,
    youtube_channel:string ,
    country_name:string ,
    link: {
    name:string,
    url:string
    },
    image:string,
    story:string | Array<string>
}
type t_data={
    countries:{
        [key:string]:{
            persons:{
                datas:t_person[]
            }
        }
    }
}
type t_api={
        success:boolean,
        message:string,
        status:number,
        datas:t_data
}
const api:t_api={
  "success": true,
  "message": "200 ok!",
  "status": 200,
  "datas": {
    "countries": {
      "palestine": {
        "persons": {
          "datas": [
            {
              "id": 1,
              "name": "mahira",
              "youtube_profile": "",
              "youtube_channel": "",
              "country_name":"palestine",
              "link": {
                "name": "link",
                "url": ""
              },
              "image": "picture.jpg",
              "story": "she struggle for her life in gaza and feed her children"
            }
          ]
        }
      }, //palestine
      "english": {
        "persons": {
          "datas": [
            {
              "id": 1,
              "name": "cindy",
              "youtube_profile": "",
              "youtube_channel": "",
              "country_name":"english",
              "link": {
                "name": "link",
                "url": ""
              },
              "image": "picture.jpg",
              "story": "she struggle for her life in gaza and feed her children"
            }
          ]
        }
      } //english
    }
  }
}

const group_by=({group_by}:{group_by:keyof t_person}):t_data=>{
   const grouped_data=Object.values(api.datas.countries).reduce((acc,data_country,idx)=>{
            const group_by_key=group_by
            data_country.persons.datas.forEach(person=>{
                const country=person[group_by_key] as string
                //todo kalau group by key kosong
                if(!acc[country]){
                    acc[country]={
                        persons:{datas:[]}
                    }
                }
                acc[country].persons.datas.push(person)
            })
        return acc
    },{} as Record<string,{persons:{datas:t_person[]}}>)
    return {countries:grouped_data}
}

const apis=Donation_api

//const format1=apis.reformat()

const q_params = 'struggle'; 
// Contoh pencarian (bisa parsial seperti 'mahi' atau 'gaza') [pencarian data tidak harus sama persis cuma potongan karakter sudah dianggap benar]

/**
 *@desc Fungsi pembantu untuk memeriksa apakah suatu nilai mengandung text pencarian secara rekursif atau tree traversal
 *@desc intinya menelusuri data object dan array dibongkar setiap valuenya hingga mencapai level primitif data type number boolean string etc
 *@param {string} query 
 *@param {any} value 
 */
const deepSearch = (value: any, query: string): boolean => {
    if (!value) return false;
    
    // Jika value berupa string, cek apakah mengandung kata kunci (case-insensitive)
    if (typeof value === 'string') {
        return value.toLowerCase().includes(query.toLowerCase());
    }
    
    // Jika value berupa Array, cek setiap elemen di dalamnya lalu lempar item yang didalamnya mungkin type datanya adalah string atau type data primitif tapi kalau isinya bukan string maka akan dilakukan pengecekan sampai valuenya ter ekstrak jadi type data primitif berupa string boolean maupun number lalu dilakukan pencocokan nilai  
    if (Array.isArray(value)) {
        return value.some(item => deepSearch(item, query));
    }
    
    // Jika value berupa Object (bukan null/array), cek semua value dari property-nya lalu validasi type akan terus berulang dan diproses sehingga data di param value akan menjadi type data primitif berupa string number ataupun boolean
    if (typeof value === 'object') {
        return Object.entries(value).some(item => deepSearch(item, query));
    }
    
    // Untuk tipe data lain seperti number, jika ingin dicocokkan juga bisa diubah ke string
    if (typeof value === 'number') {
        return value.toString().includes(query);
    }
    
    return false;
};

// Proses pencarian global melintasi semua negara
const searchResults: t_person[] = [];
        
Object.values(api.datas.countries).forEach(country => {
    country.persons.datas.forEach(person => {
        // Lakukan deep search pada objek person tersebut
        if (deepSearch(person, q_params)) {
            searchResults.push(person);
        }
    });
});

console.log(searchResults);