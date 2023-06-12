import React from 'react'
import { ApolloClient, InMemoryCache, gql, useQuery } from '@apollo/client'
import { GET_ALL_LAUNCHPAD_INFO } from '@/graphql/launchpad'
import client from '@/services/apollo'
const test = async () => {
    
client
  .query({
    query: gql(GET_ALL_LAUNCHPAD_INFO),
  })
  .then((data) => console.log('Subgraph data: ', data.data.idopools))
  .catch((err) => {
    console.log('Error fetching data: ', err)
  })
  return (
    <div>test</div>
  )
}

export default test