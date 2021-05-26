/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: String!) {
    getUser(id: $id) {
      id
      name
      ownedCards {
        nextToken
      }
      savedCards {
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
export const getOwnedCard = /* GraphQL */ `
  query GetOwnedCard($id: ID!) {
    getOwnedCard(id: $id) {
      id
      name
      facebook
      createdAt
      updatedAt
    }
  }
`;
export const listOwnedCards = /* GraphQL */ `
  query ListOwnedCards(
    $filter: ModelownedCardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listOwnedCards(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
export const getSavedCard = /* GraphQL */ `
  query GetSavedCard($id: ID!) {
    getSavedCard(id: $id) {
      id
      creatorId
      cardId
      createdAt
      updatedAt
    }
  }
`;
export const listSavedCards = /* GraphQL */ `
  query ListSavedCards(
    $filter: ModelsavedCardFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSavedCards(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        creatorId
        cardId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
