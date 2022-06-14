import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
    uri: "https://publicc39756146039dcd4.stepzen.net/api/modest-salamander/__graphql",
    fetchOptions: {
        mode: 'no-cors',
      },
    headers: {
        Authorization: `ApiKey ${process.env.NEXT_PUBLIC_STEPZEN_KEY}`
    },
    cache: new InMemoryCache(),
});

export default client;