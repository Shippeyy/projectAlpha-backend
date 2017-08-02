# Table of Content
- [projectAlpha](#projectalpha)
  * [Getting Started](#getting-started)
    + [Prerequisites](#prerequisites)
      - [Nodejs + npm](#nodejs---npm)
    + [Installation](#installation)
  * [Object Relational Mapper](#object-relational-mapper)
  * [Routes](#routes)
    + [/showEditableUserFields](#-showeditableuserfields)
    + [/editUser](#-edituser)
    + [/showEditableProjectFields](#-showeditableprojectfields)
    + [/editProject](#-editproject)
    + [/showProjectDetails](#-showprojectdetails)
    + [/verifyEmail](#-verifyemail)
  * [Authors](#authors)
  * [License](#license)
  * [Acknowledgments](#acknowledgments)

# projectAlpha

private project for learning best practices for Nodejs and webservices in general

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
    * userguid: GUID
3. output (returns all editable fields):
    * username: String
    * firstname: String
    * lastname: String
    * email: String
    * email_verified: boolean
    * description: String
------
### /editUser
1. route: /api/editUser (post)
2. input (includes all editable fields, even if they are not changed):
    * userguid: GUID
    * username: String
    * firstname: String
    * lastname: String
    * email: String
    * email_verified: boolean
    * description: String
3. output:
    * 200 Ok
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
    * userguid: GUID
3. output:
    * 200 Ok
------
## Authors

* **Julian Palmanshofer** -  [Shippeyy](https://github.com/Shippeyy)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used

