/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
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
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
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
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
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
export const createOwnedCard = /* GraphQL */ `
  mutation CreateOwnedCard(
    $input: CreateOwnedCardInput!
    $condition: ModelownedCardConditionInput
  ) {
    createOwnedCard(input: $input, condition: $condition) {
      id
      name
      facebook
      createdAt
      updatedAt
    }
  }
`;
export const updateOwnedCard = /* GraphQL */ `
  mutation UpdateOwnedCard(
    $input: UpdateOwnedCardInput!
    $condition: ModelownedCardConditionInput
  ) {
    updateOwnedCard(input: $input, condition: $condition) {
      id
      name
      facebook
      createdAt
      updatedAt
    }
  }
`;
export const deleteOwnedCard = /* GraphQL */ `
  mutation DeleteOwnedCard(
    $input: DeleteOwnedCardInput!
    $condition: ModelownedCardConditionInput
  ) {
    deleteOwnedCard(input: $input, condition: $condition) {
      id
      name
      facebook
      createdAt
      updatedAt
    }
  }
`;
export const createSavedCard = /* GraphQL */ `
  mutation CreateSavedCard(
    $input: CreateSavedCardInput!
    $condition: ModelsavedCardConditionInput
  ) {
    createSavedCard(input: $input, condition: $condition) {
      id
      creatorId
      cardId
      createdAt
      updatedAt
    }
  }
`;
export const updateSavedCard = /* GraphQL */ `
  mutation UpdateSavedCard(
    $input: UpdateSavedCardInput!
    $condition: ModelsavedCardConditionInput
  ) {
    updateSavedCard(input: $input, condition: $condition) {
      id
      creatorId
      cardId
      createdAt
      updatedAt
    }
  }
`;
export const deleteSavedCard = /* GraphQL */ `
  mutation DeleteSavedCard(
    $input: DeleteSavedCardInput!
    $condition: ModelsavedCardConditionInput
  ) {
    deleteSavedCard(input: $input, condition: $condition) {
      id
      creatorId
      cardId
      createdAt
      updatedAt
    }
  }
`;
