# Table of Content
- [projectAlpha-backend](#projectalpha-backend)
  * [Getting Started](#getting-started)
    + [Prerequisites](#prerequisites)
      - [Nodejs + npm](#nodejs---npm)
    + [Installation](#installation)
    + [Configuration](#configuration)
  * [Object Relational Mapper](#object-relational-mapper)
  * [Routes](#routes)
    + [/showEditableUserFields](#-showeditableuserfields)
    + [/editUser](#-edituser)
    + [/showEditableProjectFields](#-showeditableprojectfields)
    + [/editProject](#-editproject)
    + [/showProjectDetails](#-showprojectdetails)
    + [/verifyEmail](#-verifyemail)
    + [/updatePassword](#-updatepassword)
    + [/showUserProjects](#-showuserprojects)
    + [/auth/logout](#-auth-logout)
    + [/auth/login](#-auth-login)
    + [/getCurrentUser](#-getcurrentuser)
  * [Authors](#authors)
  * [License](#license)

# projectAlpha-backend

This is a project which aims to get expertise in best practices for Nodejs and webservices in general. The frontend part can be found here https://github.com/Shippeyy/projectAlpha-frontend

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them

#### Nodejs + npm
[Installing Nodejs](https://nodejs.org/en/download/package-manager/)

**note: the versions which were used during development are**
* Nodejs: v8.1.2
* npm: v5.0.3
### Installation

A step by step series of examples that tell you have to get a development env running

cloning the repository

```
git clone https://github.com/Shippeyy/project_alpha.git
```

installing modules

```
npm install
```

running the webservice
```
npm run start
```

### Configuration
The folder root/config is missing the file config.js as it was added to the gitignore for security reasons (the file contains sensitive data such as credentials for various services).

Please add the missing file by pasting and filling out following schema:
```
module.exports =
{
    postgresql: {
        connectionString: 'DATABASECONNECTIONSTRING'
    },
    server: {
        port: {
            http: 8080
        }
    },
    session: {
        secret: 'SECRETFORSESSIONENCRYPTION'
    },
    log: {
        level: 'info'
    },
    version: {
        currentState: 'alpha',
        version: '0.1.1'
    }
};
```

## Object Relational Mapper
The object relational mapper (ORM) uses the sequlize library in order to connect to a postgreSQL database.

If a creation script for the database is needed, the ORM can be modified in a way, that it creates the database schema
itself.
This can be done by going into each individuell table file in the folder **root/src/models/XYZ** (replace XYZ with the tablename) and adjusting the following field:
```
XYZ.sync({force: true});
```

**note: existing data in the database will be lost if force is set to true**

## Routes
### /showEditableUserFields
1. route: /api/editUser (get)
2. input:
3. output (returns all editable fields):
    * username: String
    * firstname: String
    * lastname: String
    * email: String
    * email_verified: boolean
    * description: String
    **note: uses guid of logged in user**
------
### /editUser
1. route: /api/editUser
2. input (includes all editable fields, even if they are not changed):
    * username: String
    * firstname: String
    * lastname: String
    * email: String
    * email_verified: boolean
    * description: String
3. output:
    * 200 Ok
    **note: uses guid of logged in user**
------
### /showEditableProjectFields
1. route: /api/editProject (get)
2. input:
    * projectguid: GUID
3. output (returns all editable fields):
    * title: String
    * gitlink: String
    * description: String
------
### /editProject
1. route: /api/editProject
2. input (includes all editable fields, even if they are not changed):
    * projectguid: GUID
    * title: String
    * gitlink: String
    * description: String
3. output:
    * 200 Ok
------
### /showProjectDetails
1. route: /api/showProjectDetails
2. input:
    * projectguid: GUID
3. output:
    * guid: GUID
    * title: String
    * gitlink: String
    * description: String
    * projectCreation_timestamp: DateTimestamp
------
### /verifyEmail
1. route: /api/verifyEmail
2. input:
3. output:
    * 200 Ok
    **note: uses guid of logged in user**
------
### /updatePassword
1. route: /api/updatePassword
2. input:
    * password: String
3. output:
    * 200 Ok
**note: also creates a new salt in the database for the user; uses guid of logged in user**
------
### /showUserProjects
1. route: /api/showUserProjects
2. input:
    * userguid: GUID
3. output:
    * [GUID{title: string, description: string}, ...]
------
### /auth/logout
1. route: /api/auth/logout 
2. input:
3. output:
    * 200 Ok
**note: destroys active session**
------
### /auth/login
1. route: /api/auth/login
2. input:
    * username: String
    * password: String
3. output:
    * 200 Ok
**note: creates session for logged in user**
------
### /getCurrentUser
1. route: /api/getCurrentUser
2. input:
3. output:
    * userguid: GUID
------
## Authors

* **Julian Präsent** -  [Shippeyy](https://github.com/Shippeyy)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

