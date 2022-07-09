/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser {
    onCreateUser {
      id
      email
      cardsCreated {
        id
        title
        style
        layout
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser {
    onUpdateUser {
      id
      email
      cardsCreated {
        id
        title
        style
        layout
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser {
    onDeleteUser {
      id
      email
      cardsCreated {
        id
        title
        style
        layout
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
