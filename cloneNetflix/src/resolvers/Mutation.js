const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { APP_SECRET } = require("../Const");
const getID = `{ id }`;

async function signup(parent,args,context,info) {
    const password = await bcrypt.hash(args.password,10);

    const user = context.db.mutation.createUser(
       {data:{...args,password},getID}
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

module.exports = {
    signup,
    login
}