const {Prisma} = require('prisma-binding');


const getPrismaTestInstance = () => {
    return new Prisma({
        typeDefs:'src/generated/prisma.graphql',
        endpoint:'https://test-server-netflix.herokuapp.com/TEST/test'
    })
}

module.exports = {
    getPrismaTestInstance
}