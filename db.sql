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
    `icon` varchar(100) NULL,
    `key` varchar(100) NULL,
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
    `name` varchar(50) NULL,
    `msisdn` varchar(50) NULL,
    `telegram` varchar(50) NULL,
    `addresses` LONGTEXT NULL,
    `createdAt` datetime NULL,
    CONSTRAINT `PK_StoreMast` PRIMARY KEY 
    (
        `storeId` ASC 
    )
);

/***** Table:  LoginInfo *******/

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

/***** Table:  AdminMast *******/

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

/***** Table:  ProductMast *******/

CREATE TABLE `ProductMast` (
    `productId` int AUTO_INCREMENT NOT NULL,
    `categoryId` int NULL,
    `subCategoryId` int NULL,
    `storeId` int NULL,
    `brandId` int NULL,
    `description` varchar(255),
    `photos` longtext NULL,
    `keys` longtext NULL,
    `colors` longtext NULL,
    `vendorCode` int NULL,
    `productName` varchar(50) NULL,
    `productType` varchar(50) NULL,
    `gender` varchar(50) NULL,
    `msisdn` varchar(50) NULL,
    `telegram` varchar(50) NULL,
    `storeAddress` longtext NULL,
    `deliveryCost` int NULL,
    `remainProducts` int NULL,
    `price` int NULL,
    `salePrice` int NULL,
    `salePercent` int NULL,
    `size` longtext NULL,
    `tags` longtext NULL,
    `material` varchar(500) NULL,
    `manufacturerCountry` varchar(50) NULL,
    `metadata` longtext NULL,
    `createdAt` datetime NULL,
    CONSTRAINT `PK_ProductMast` PRIMARY KEY
    (
        `productId` ASC
    )
);

/***** Table:  OrderMast *******/
CREATE TABLE `OrderMast` (
    `orderId` int AUTO_INCREMENT NOT NULL,
    `userId` int NULL,
    `orders` longtext NULL,
    `totalPrice` int NULL,
    `location` varchar(500) NULL,
    `paymentStatus` varchar(50) NULL,
    `productStatus` varchar(50) NULL,
    `state` bit NULL,
    `refunded` bit NULL,
    `currency` varchar(50) NULL,
    `paid` bit NULL,
    `cancelled` bit NULL,
    `click_trans_id` int NULL,
    `createdAt` datetime NULL,
    CONSTRAINT `PK_OrderMast` PRIMARY KEY 
    (
        `orderId` ASC
    )
);

/****** Table: BrandMast ******/
CREATE TABLE `BrandMast` (
    `brandId` int AUTO_INCREMENT NOT NULL,
    `name` varchar(50) NULL,
    `createdAt` datetime NULL,
    CONSTRAINT `PK_BrandMast` PRIMARY KEY
    (
        `brandId` ASC
    )
);

/****** Table: TransactionMast *****/
CREATE TABLE `TransactionMast` (
    `transactionId` int AUTO_INCREMENT NOT NULL,
    `orderId` int NULL,
    `userId` int NULL,
    `payme_tid` varchar(255) NULL,
    `time` int NULL,
    `transaction` int NULL,
    `click_trans_id` int NULL,
    `merchant_trans_id` varchar(255) NULL,
    `sign_time` varchar(255) NULL,
    `sign_string` varchar(255) NULL,
    `click_paydoc_id` int NULL,
    `amount` int NULL,
    `create_time` int NULL,
    `perform_time` int NULL,
    `cancel_time` int NULL,
    `reason` varchar(500) NULL,
    `state` int NULL,
    `refID` varchar(255) NULL,
    `active` bit NULL,
    `createdAt` datetime NULL,
    `updatedAt` datetime NULL,
    CONSTRAINT `PK_TransactionMast` PRIMARY KEY
    (
        `transactionId` ASC
    )
);

/****** Table: WishlistMast *****/
CREATE Table `WishlistMast` (
    `wishId` int AUTO_INCREMENT NOT NULL,
    `productId` int NULL,
    `userId` int NULL,
    `createdAt` datetime NULL,
    CONSTRAINT `PK_WishlistMast` PRIMARY KEY
    (
        `wishId` ASC
    )
);