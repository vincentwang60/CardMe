/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
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
export const onCreateOwnedCard = /* GraphQL */ `
  subscription OnCreateOwnedCard {
    onCreateOwnedCard {
      id
      name
      facebook
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateOwnedCard = /* GraphQL */ `
  subscription OnUpdateOwnedCard {
    onUpdateOwnedCard {
      id
      name
      facebook
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteOwnedCard = /* GraphQL */ `
  subscription OnDeleteOwnedCard {
    onDeleteOwnedCard {
      id
      name
      facebook
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSavedCard = /* GraphQL */ `
  subscription OnCreateSavedCard {
    onCreateSavedCard {
      id
      creatorId
      cardId
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateSavedCard = /* GraphQL */ `
  subscription OnUpdateSavedCard {
    onUpdateSavedCard {
      id
      creatorId
      cardId
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteSavedCard = /* GraphQL */ `
  subscription OnDeleteSavedCard {
    onDeleteSavedCard {
      id
      creatorId
      cardId
      createdAt
      updatedAt
    }
  }
`;
