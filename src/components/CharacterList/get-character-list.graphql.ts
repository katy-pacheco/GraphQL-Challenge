import { gql } from '@apollo/client';

export const GET_CHARACTER_LIST = gql`
  query GetCharacterList($page: Int) {
    characters(page: $page) {
      info {
        pages
        count
        prev
        next
      }
      results {
        id
        name
        species
      }
    }
  }
`;
