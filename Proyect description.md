# Proyect description

In this document we describe:

- [API endpoints](#api-endpoints)
- [Roles Pages and Urls](#roles-pages-and-urls)
- [Components](#components)
- [Models](#models)

## API endpoints

See SwaggerUI.pdf file or http://localhost:7000/api_docs

3 facades:

- /api/auth
- /api/me
- /api/admin

[Top](#proyect-description)

## Roles, Pages and Urls

| Role            | Page          | Url             |
| --------------- | ------------- | --------------- |
| Unauthenticated | LoginPage:    | Unauthenticated | /login |
| Unauthenticated | RegisterPage: | /register       |
| User            | EditMePage:   | /editme         |
| Admin           | UserListPage: | /userlist       |
| Admin           | NewUserPage:  | /newuser        |
| Admin           | EditUserPage: | /edituser/:id   |

[Top](#proyect-description)

## Components

- Header
- Footer
- LoginBox
- LoginForm
- RegisterForm
- UserList
- UserItem
- NewUserForm
- EditUserForm
- EditMeForm
- ChangePasswordForm

[Top](#proyect-description)

## Models

### Global state (1st version)

State

- isLoggedIn: boolean
- role: enum( USER, ADMIN )
- currentUser: User
- userList: [User]

[Top](#proyect-description)

### Hooks and Context (2nd version)

[Top](#proyect-description)
