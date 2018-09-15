const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { APP_SECRET, PRICES } = require("../Const");

const getID = `{ id }`;

const queryUser = `{
    id,
    email,
    name,
    lastname,
    birth_date,
    suscription{
        id,
        end_date,
        suscription_type,
        price
    }
}`

const { getUserId } = require('../utils/utils')


Date.prototype.addDays = function(days){
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

async function signup(parent,args,context,info) {
    const password = await bcrypt.hash(args.password,10);

    const user = await context.db.mutation.createUser(
       {data:{...args,password,suscription:{
           create:{
               suscription_type : "FREE",
               price:0,
               end_date: new Date().addDays(30) 
           }
       }
    }},queryUser
    )

    const token = jsonwebtoken.sign({userId:user.id},APP_SECRET);

    return {
        token,
        user
    }

}

async function login(parent,args,context,info){

    const user = await context.db.query.user({
        where:{email:args.email}
    })

    if(!user){
        throw new Error("Not user find");
    }

    const validPassword = await bcrypt.compare(args.password, user.password);
    console.log(validPassword);
    if(!validPassword) throw new Error ("Invalid password")

    const token = jsonwebtoken.sign({userId:user.id},APP_SECRET);

    return {
        token,
        user
    }

}

async function upgradeSuscription (context,args,info,parent) {
    let user = getUserId(context);
    let days = (args.suscription_type == "PREMIUM") ? 90 : 30;
    let updateUser = await context.db.mutation.updateUser(
        {
            data: {
                suscription:{
                    update:{
                        suscription_type:args.suscription_type,
                        end_date : new Date().addDays(days),
                        price : PRICES[args.suscription_type]
                    }
                }
                
            },
            where:{
                id:user
            }
        },queryUser)

    return suscription;
  }

module.exports = {
    signup,
    login,
    upgradeSuscription
}