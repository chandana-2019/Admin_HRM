import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks';
import { InMemoryCache } from 'apollo-cache-inmemory';


const client = new ApolloClient({

  uri: 'https://new-function-test.azurewebsites.net/graphql?code=JdYHdL6Qo0Mm47jtmAm68qYlkp5mffyzDuaZyPP0ufuoogFko/s/7A==',
  cache: new InMemoryCache()
});
ReactDOM.render(

    <ApolloProvider client={client}>
    <App />
    </ApolloProvider>
,
 document.getElementById('root'));

