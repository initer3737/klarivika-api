import { t_donation_data_member,t_donation_data_profile } from "../../../../types";

const data_profile:t_donation_data_profile={
        image:"picture.jpg",
        link:{
           name:"link",
           url:""
        },
        name:"mahira",
        story:"she struggle for her life in gaza and feed her children",
        youtube_channel:"",
        youtube_profile:"",
}

const mahira:t_donation_data_member={
        name:data_profile.name,
        youtube_profile:data_profile.youtube_profile,
        youtube_channel:data_profile.youtube_channel,
        link:data_profile.link,
        image:data_profile.image,
        story:data_profile.story,
}


export {mahira}