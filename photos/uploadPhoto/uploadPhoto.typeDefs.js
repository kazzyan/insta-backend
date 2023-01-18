import { gql } from "apollo-server";

export default gql`
    type Mutation {
        uploadPhoto(fileURL: String!, caption: String): Photo
    }
`;
