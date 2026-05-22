import { Elysia } from "elysia";
import { openapi } from '@elysia/openapi'
import { rateLimit } from 'elysia-rate-limit'
import { Api } from "../src/modules";
import { DonationController } from "../src/modules";
//index is controller service model
//rate limit 80
// 429 Too Many Requests
const donation_controller=new DonationController()
const warcrime_keyword_route:string='/warcrime' 
const donation_keyword_route:string='/donation' 
const app = new Elysia()
.use(rateLimit({
  duration:60000, //1 minutes
  max:80, //maximal hit request in 60 seconds or 1 minutes,
  errorResponse:"too many request" //when user hit too many request and reach the limit message will appear
}))
.use(openapi())
.get("/", ({set}) => {
   const status_code=set.status=400
   set.status=400

   return "hello world "+status_code
})
.get("/ip", ({server,request}) =>{
  return server?.requestIP(request)
})
.group('/v1',(app)=>
  app
// todo warcrime route start
.get(`${warcrime_keyword_route}s`,()=>"hello") 
.get(`${warcrime_keyword_route}/:id`,({params:{id}})=>"hello "+id) 
// todo warcrime route end

// todo donation route start
.get(`${donation_keyword_route}s`,({set})=>{
  return donation_controller.Index({status({ status_number }) {
    set.status=status_number
  },})
}) 
.get(`${donation_keyword_route}/:id/:country`,({set,params:{id,country}})=>{
     return donation_controller.Show({status({ status_number }) {
    set.status=status_number
  },id,country})
})
// todo donation route end
   
      )
  
.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
