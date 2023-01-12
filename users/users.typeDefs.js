import { gql } from "apollo-server";

export default gql`
    type User {
        id: Int!
        username:  String!
        email:     String!
        name:      String
        location:  String
        password:  String!
        avatarURL: String
        githubUsername:  String
        createAt: String!
        updateAt: String!    
    }
    type LoginResult {
        ok: Boolean!
        token: String
        error: String
    }
    type EditProfileResult {
        ok: Boolean!
        error: String
    }
    type Query {
        seeProfile(username: String!): User
    }
    type Mutation {
        createAccount(username: String!, email: String!, name: String, password: String!): User
        login(username: String!, password: String!): LoginResult
        editProfile(username: String, email: String, name: String, password: String): EditProfileResult
    }
`;
