import { gql } from '@apollo/client';

export const GET_CHARACTER_DETAIL = gql`
    query GetCharacterDetail($id: ID!) {
        character(id: $id) {
            id
            name
            status
            species
            gender
            image
        origin {
                name
            }
        location {
                name
            }
        episode {
                id
                name
            }
        }
    }
`
