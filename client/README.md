# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

*** Capstone Notes: ***
*BRANCHING:*
    *git checkout -b <ticket/ticketname>* - creates a new branch
    *git checkout branch name* - switches over to that branch

*GITHUB:*
    To push to Github:
    *Git add .*
    *Git commit -m "message about what you are committing"*
    *Git push origin branch name (the one you are working on not develop)*

*CODE NOTES:*

*Use .jsx for every file (doesnt change the code at all)*
*Our main pages will go in the pages folder. components in components folder*
*Pages and components should start with a capitol letter*
*When adding the route for a new page, follow the protected route sytntax (this makes it so a user cant access those pages unless they are signed in)*
*When a user makes an account, they are added to firebase and giving a user uid*
*They are also added to mongo db with their username, and the user uid from firebase*
*Lets do single quotes for everything*


*LOG IN INFO:*
The movie DataBase signin:
    username: graham2823
    email: gmfreundlich@gmail.com
    password: <our team name>

Email:
    email: TerrorTimeMachineCapstone@gmail.com
    password: <our team name with a '!' at the end>

MongoDB:
    sign in through email or:
    username: terrortimemachine
    password: <our team name>

Firebase: 
    sign in through email
