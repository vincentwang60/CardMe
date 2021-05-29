/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($id: ID!) {
    getUser(id: $id) {
      id
      email
      cardsCreated {
        id
        title
        content {
          id
          name
          data
        }
      }
      savedCards {
        id
        creatorID
        cardId
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
        email
        cardsCreated {
          id
          title
          content {
            id
            name
            data
          }
        }
        savedCards {
          id
          creatorID
          cardId
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
