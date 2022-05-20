/****** Table: UserMast **********/

CREATE TABLE `UserMast` (
    `userId` int AUTO_INCREMENT NOT NULL,
    `fullName` varchar(50) NULL,
    `msisdn` varchar(50) NULL,
    `region` varchar(50) NULL,
    `district` varchar(50) NULL,
    `address` varchar(100) NULL,
    `address2` varchar(100) NULL,
    `createdAt` datetime NULL,
    CONSTRAINT `PK_UserMast` PRIMARY KEY
    (
        `userId` ASC
    )
);

/******  Table:  CategoryMast ******/

CREATE TABLE `CategoryMast` (
    `categoryId` int AUTO_INCREMENT NOT NULL,
    `name` varchar(50) NULL,
    `createdAt` datetime NULL,
    CONSTRAINT `PK_CategoryMast` PRIMARY KEY 
    (
        `categoryId` ASC
    )
);

/***** Table: SubCategoryMast ******/

CREATE TABLE `SubCategoryMast` (
    `subCategoryId` int AUTO_INCREMENT NOT NULL,
    `categoryId` int NULL,
    `name` varchar(50) NULL,
    `createdAt` datetime NULL,
    CONSTRAINT `PK_SubCategoryMast` PRIMARY KEY
    (
        `subCategoryId` ASC
    ) 
);

/***** Table:  StoreMast *******/

CREATE TABLE `StoreMast` (
    `storeId` int AUTO_INCREMENT NOT NULL,
    `msisdn` varchar(50) NULL,
    `telegram` varchar(50) NULL,
    `address` JSON NULL,
    `createdAt` datetime NULL,
    CONSTRAINT `PK_StoreMast` PRIMARY KEY 
    (
        `storeId` ASC 
    )
);

CREATE TABLE `LoginInfo` (
    `loginId` int AUTO_INCREMENT NOT NULL,
    `msisdn` varchar(50) NULL,
    `code` int NULL,
    `createdAt` datetime NULL,
    CONSTRAINT `PK_LoginInfo` PRIMARY KEY
    (
        `loginId` ASC
    )
);


CREATE TABLE `AdminMast` (
    `id` int AUTO_INCREMENT NOT NULL,
    `firstName` varchar(50) NULL,
    `lastName` varchar(50) NULL,
    `email` varchar(50) NULL,
    `password` varchar(100) NULL,
    `createdAt` datetime NULL,
    CONSTRAINT `PK_AdminMast` PRIMARY KEY
    (
        `id` ASC
    )
);