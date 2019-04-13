import {
  ApolloServer,
  makeExecutableSchema,
  addMockFunctionsToSchema
} from 'apollo-server';
import resolvers from './resolvers';
import typeDefs from './graphql';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
  logger: { log: (e: Error) => console.log(e) }
});

addMockFunctionsToSchema({
  schema,
  mocks: {},
  preserveResolvers: false
});

const server = new ApolloServer({
  schema,
  context: ({ req }) => ({
    authScope: req.headers.authorization
  }),
  mockEntireSchema: true
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
