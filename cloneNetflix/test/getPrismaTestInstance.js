const {Prisma} = require('prisma-binding');

const getPrismaTestInstance = () => {
    return new Prisma({
        typeDefs:'src/generated/prisma.graphql',
        endpoint:'https://us1.prisma.sh/enrique-alvarez-barajas-c39ae6/test/dev'
    })
}