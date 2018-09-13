const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');

const resolvers = {
    Query,
    Mutation
}


const server = new GraphQLServer({
    typeDefs:'./src/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        db: new Prisma({
            typeDefs: 'src/generated/prisma.graphql',
            endpoint: 'https://eu1.prisma.sh/enrique-alvarez-barajas-c39ae6/database/dev',
            debug:true
        })
    }),
    resolverValidationOptions:{
        requireResolversForResolveType:false
    }
})


module.exports = server;