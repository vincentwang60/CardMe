/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: String!) {
    getUser(id: $id) {
      id
      name
      cards {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCard = /* GraphQL */ `
  query GetCard($id: String!) {
    getCard(id: $id) {
      id
      name
      facebook
      createdAt
      updatedAt
    }
  }
`;
export const listCards = /* GraphQL */ `
  query ListCards(
    $filter: ModelCardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCards(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        facebook
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
