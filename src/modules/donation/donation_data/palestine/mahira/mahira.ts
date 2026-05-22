import { t_donation_data_member,t_data_profile } from "../../../../types";

const data_profile:t_data_profile={
        image:"picture.jpg",
        link:"link",
        name:"mahira",
        story:"she struggle for her life in gaza and feed her children",
        youtube_channel:"",
        youtube_profile:"",
}

const mahira:t_donation_data_member={
    person:{
        image:data_profile.image,
        link:data_profile.link,
        name:data_profile.name,
        story:data_profile.story,
        youtube_channel:data_profile.youtube_channel,
        youtube_profile:data_profile.youtube_profile
    }
}


export {mahira}