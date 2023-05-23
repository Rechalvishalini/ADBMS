-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 10, 2022 at 08:20 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `hotelms`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `Delete_Food_Details` (IN `F_ID` INT)  BEGIN
	delete from cart where food_id=F_ID;	
	delete from food where food_id=F_ID;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Get_ALL_Users` ()  BEGIN
	select user_id,user_name,post from Users where post NOT LIKE 'admin';
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Get_Invoice_Id` (IN `DATE` DATE)  BEGIN
	select c.cus_name,i.invoice_id,i.price from customer c,invoice i where invoice_date=DATE and c.cus_id=i.cus_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `Get_order_details` (IN `ID` INT)  BEGIN
	select fo.order_id,c.cus_name,f.food_name from customer c,food_orders fo,food f where fo.order_id =ID and c.cus_id=fo.cus_id and fo.food_id=f.food_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `View_Add_To_Cart_Items` (IN `ID` INT)  BEGIN
	SELECT DISTINCT(f.food_name), f.food_id  FROM cart as c,food as f where c.cus_id = ID ;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `View_Allocated_Room` ()  BEGIN
select * from room where
Booking_status =1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `View_Allocated_Room_Customer_Details` (IN `R_ID` INT)  BEGIN
	select c.cus_name,c.cus_phone,c.cus_address,c.cus_email,c.cus_nic from room r,customer c where r.room_id=R_ID and c.cus_id=r.cus_id ;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `View_Empty_Room` ()  BEGIN
select * from room where
Booking_status =0;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `View_Food_Details` (IN `F_ID` INT)  BEGIN
	select * from food where food_id=F_ID;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `View_Food_Details_ByCategory` (IN `category` VARCHAR(255))  BEGIN
	select food_desc,food_image,food_name,food_price from food where food_category=Category;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `View_Room_Details` (IN `R_ID` INT)  BEGIN
	select * from room where room_id=R_ID;
END$$

--
-- Functions
--
CREATE DEFINER=`root`@`localhost` FUNCTION `getAge` (`ID` INT) RETURNS INT(11) BEGIN
   DECLARE ageRet INT;
	SELECT (YEAR(curdate())-YEAR(cus_dob)) into ageRet from customer where cus_id=ID;
    RETURN ageRet;
END$$

CREATE DEFINER=`root`@`localhost` FUNCTION `getRoomStatus` (`ID` INT) RETURNS VARCHAR(50) CHARSET utf8mb4 BEGIN
   DECLARE room_status VARCHAR(50);
   DECLARE st int;
   
	SELECT Booking_status into st from room;
    if st > 0 then 
		set room_status = "Booked";
    else
		set room_status = "Not Booked";
    end if;
    RETURN room_status;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `item_id` int(11) NOT NULL,
  `food_id` int(11) DEFAULT NULL,
  `cus_id` int(11) DEFAULT NULL,
  `price` float DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `cart`
--

INSERT INTO `cart` (`item_id`, `food_id`, `cus_id`, `price`, `quantity`) VALUES
(25, 16, 22, 8800, 3),
(26, 19, 22, 12350, 4);

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `cus_id` int(11) NOT NULL,
  `cus_name` varchar(255) DEFAULT NULL,
  `cus_phone` int(11) DEFAULT NULL,
  `cus_address` varchar(20) DEFAULT NULL,
  `cus_email` varchar(255) DEFAULT NULL,
  `cus_nic` varchar(20) DEFAULT NULL,
  `cus_gender` varchar(20) DEFAULT NULL,
  `cus_dob` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`cus_id`, `cus_name`, `cus_phone`, `cus_address`, `cus_email`, `cus_nic`, `cus_gender`, `cus_dob`) VALUES
(19, 'mnh', 21234, 'sad', 'sd', '1215', 'Male', '1998-02-02'),
(20, 'admin', 0, '', '', '123', '', NULL),
(22, 'mn', 233, 'sad', 'asd', '123', '', '1998-05-05'),
(23, 'ew', 319998, 'er', 'sad', '123', '', '2022-09-30');

--
-- Triggers `customer`
--
DELIMITER $$
CREATE TRIGGER `createUserAccount` AFTER INSERT ON `customer` FOR EACH ROW BEGIN
	DECLARE user_name varchar(255);
	DECLARE nic_as_pw varchar(255);
    DECLARE post varchar(255);
    DECLARE cus_id int;
    
    SET post = "customer";
    SET user_name = NEW.cus_name;
    SET nic_as_pw = NEW.cus_nic;
    SET cus_id = NEW.cus_id;
    insert into users(user_name,password,post,cus_id) values(user_name,md5(nic_as_pw),post,cus_id);
    
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `delete_userABCDE` BEFORE DELETE ON `customer` FOR EACH ROW BEGIN
	SET FOREIGN_KEY_CHECKS=OFF;
    delete from cart where cus_id= cus_id;
    delete from users where user_id= cus_id;
   SET FOREIGN_KEY_CHECKS=ON;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `employee`
--

CREATE TABLE `employee` (
  `emp_id` int(11) NOT NULL,
  `emp_name` varchar(255) DEFAULT NULL,
  `emp_age` int(11) DEFAULT NULL,
  `emp_gender` varchar(255) DEFAULT NULL,
  `emp_doj` varchar(255) DEFAULT NULL,
  `emp_position` varchar(255) DEFAULT NULL,
  `emp_address` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `employee`
--

INSERT INTO `employee` (`emp_id`, `emp_name`, `emp_age`, `emp_gender`, `emp_doj`, `emp_position`, `emp_address`) VALUES
(1, 'Test', 12, 'M', 'sd', 'dsf', 'df');

-- --------------------------------------------------------

--
-- Table structure for table `food`
--

CREATE TABLE `food` (
  `food_id` int(11) NOT NULL,
  `food_category` varchar(255) DEFAULT NULL,
  `food_desc` varchar(255) DEFAULT NULL,
  `food_image` varchar(255) DEFAULT NULL,
  `food_name` varchar(255) DEFAULT NULL,
  `food_price` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `food`
--

INSERT INTO `food` (`food_id`, `food_category`, `food_desc`, `food_image`, `food_name`, `food_price`) VALUES
(16, 'Lunch', 'The best biriyani ', '', 'Biriyani', 550),
(19, 'Lunch', 'The best Nasigurang. In baasmathi rice', '../../public/Foods/2.jpg', 'Nasigurang', 650),
(20, 'Starter', 'Best chicken fry', '../../public/Foods/3.jpg', 'Chicken Fry', 750),
(21, 'Lunch', 'Full chicken BBQ', '../../public/Foods/4.jpg', 'Chicken BBQ', 1650);

--
-- Triggers `food`
--
DELIMITER $$
CREATE TRIGGER `deleteCart` BEFORE DELETE ON `food` FOR EACH ROW delete from cart where food_id=16;
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `food_orders`
--

CREATE TABLE `food_orders` (
  `order_id` int(11) NOT NULL,
  `food_id` int(11) DEFAULT NULL,
  `food_name` varchar(255) DEFAULT NULL,
  `cus_id` int(11) DEFAULT NULL,
  `ordered_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Stand-in structure for view `get_all_custom`
-- (See below for the actual view)
--
CREATE TABLE `get_all_custom` (
`cus_id` int(11)
,`cus_name` varchar(255)
,`cus_phone` int(11)
,`cus_address` varchar(20)
,`cus_email` varchar(255)
,`cus_nic` varchar(20)
,`cus_gender` varchar(20)
,`cus_dob` date
);

-- --------------------------------------------------------

--
-- Table structure for table `hibernate_sequence`
--

CREATE TABLE `hibernate_sequence` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `hibernate_sequence`
--

INSERT INTO `hibernate_sequence` (`next_val`) VALUES
(27);

-- --------------------------------------------------------

--
-- Table structure for table `invoice`
--

CREATE TABLE `invoice` (
  `invoice_id` int(11) NOT NULL,
  `cus_id` int(11) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `invoice_date` date DEFAULT NULL,
  `amount` float(8,2) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` float(8,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `room`
--

CREATE TABLE `room` (
  `room_id` int(255) NOT NULL,
  `Booking_status` varchar(25) DEFAULT NULL,
  `room_description` varchar(255) DEFAULT NULL,
  `cus_id` int(11) DEFAULT NULL,
  `room_occupancy` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `room`
--

INSERT INTO `room` (`room_id`, `Booking_status`, `room_description`, `cus_id`, `room_occupancy`) VALUES
(1, '1', 'Double Bed room', 22, NULL);

-- --------------------------------------------------------

--
-- Stand-in structure for view `room_details`
-- (See below for the actual view)
--
CREATE TABLE `room_details` (
`cus_name` varchar(255)
,`getRoomStatus(r.room_id)` varchar(50)
,`room_description` varchar(255)
);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `user_name` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `post` varchar(60) DEFAULT NULL,
  `cus_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_name`, `password`, `post`, `cus_id`) VALUES
(3, 'admin', '202cb962ac59075b964b07152d234b70', 'customer', 20),
(4, 'mn', '202cb962ac59075b964b07152d234b70', 'customer', 22),
(5, 'ew', '202cb962ac59075b964b07152d234b70', 'customer', 23);

-- --------------------------------------------------------

--
-- Stand-in structure for view `view_cart_total_price`
-- (See below for the actual view)
--
CREATE TABLE `view_cart_total_price` (
`food_name` varchar(255)
,`price` float
,`quantity` int(11)
,`total` double
);

-- --------------------------------------------------------

--
-- Structure for view `get_all_custom`
--
DROP TABLE IF EXISTS `get_all_custom`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `get_all_custom`  AS SELECT `customer`.`cus_id` AS `cus_id`, `customer`.`cus_name` AS `cus_name`, `customer`.`cus_phone` AS `cus_phone`, `customer`.`cus_address` AS `cus_address`, `customer`.`cus_email` AS `cus_email`, `customer`.`cus_nic` AS `cus_nic`, `customer`.`cus_gender` AS `cus_gender`, `customer`.`cus_dob` AS `cus_dob` FROM `customer` ;

-- --------------------------------------------------------

--
-- Structure for view `room_details`
--
DROP TABLE IF EXISTS `room_details`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `room_details`  AS SELECT `c`.`cus_name` AS `cus_name`, `getRoomStatus`(`r`.`room_id`) AS `getRoomStatus(r.room_id)`, `r`.`room_description` AS `room_description` FROM (`room` `r` join `customer` `c` on(`c`.`cus_id` = `r`.`cus_id`)) ;

-- --------------------------------------------------------

--
-- Structure for view `view_cart_total_price`
--
DROP TABLE IF EXISTS `view_cart_total_price`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_cart_total_price`  AS SELECT `f`.`food_name` AS `food_name`, `c`.`price` AS `price`, `c`.`quantity` AS `quantity`, `c`.`price`* `c`.`quantity` AS `total` FROM (`food` `f` join `cart` `c`) WHERE `f`.`food_id` = `c`.`food_id` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `cus_id` (`cus_id`),
  ADD KEY `food_id` (`food_id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`cus_id`);

--
-- Indexes for table `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`emp_id`);

--
-- Indexes for table `food`
--
ALTER TABLE `food`
  ADD PRIMARY KEY (`food_id`);

--
-- Indexes for table `food_orders`
--
ALTER TABLE `food_orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `food_id` (`food_id`),
  ADD KEY `cus_id` (`cus_id`);

--
-- Indexes for table `invoice`
--
ALTER TABLE `invoice`
  ADD PRIMARY KEY (`invoice_id`),
  ADD KEY `cus_id` (`cus_id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `room`
--
ALTER TABLE `room`
  ADD PRIMARY KEY (`room_id`),
  ADD KEY `cus_id` (`cus_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `cus_id` (`cus_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `cus_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `employee`
--
ALTER TABLE `employee`
  MODIFY `emp_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `food`
--
ALTER TABLE `food`
  MODIFY `food_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `food_orders`
--
ALTER TABLE `food_orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `room`
--
ALTER TABLE `room`
  MODIFY `room_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart`
--
ALTER TABLE `cart`
  ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`cus_id`) REFERENCES `customer` (`cus_id`),
  ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`food_id`) REFERENCES `food` (`food_id`);

--
-- Constraints for table `food_orders`
--
ALTER TABLE `food_orders`
  ADD CONSTRAINT `food_orders_ibfk_1` FOREIGN KEY (`food_id`) REFERENCES `food` (`food_id`),
  ADD CONSTRAINT `food_orders_ibfk_2` FOREIGN KEY (`cus_id`) REFERENCES `customer` (`cus_id`);

--
-- Constraints for table `invoice`
--
ALTER TABLE `invoice`
  ADD CONSTRAINT `invoice_ibfk_1` FOREIGN KEY (`cus_id`) REFERENCES `customer` (`cus_id`),
  ADD CONSTRAINT `invoice_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `cart` (`item_id`);

--
-- Constraints for table `room`
--
ALTER TABLE `room`
  ADD CONSTRAINT `room_ibfk_1` FOREIGN KEY (`cus_id`) REFERENCES `customer` (`cus_id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`cus_id`) REFERENCES `customer` (`cus_id`);

DELIMITER $$
--
-- Events
--
CREATE DEFINER=`root`@`localhost` EVENT `montly_update` ON SCHEDULE EVERY 1 MONTH STARTS '2022-10-09 06:45:01' ON COMPLETION NOT PRESERVE ENABLE DO truncate table customer$$

CREATE DEFINER=`root`@`localhost` EVENT `update_description` ON SCHEDULE EVERY 1 MONTH STARTS '2022-10-09 06:51:04' ON COMPLETION NOT PRESERVE ENABLE COMMENT 'This is the update of every one month' DO truncate table customer$$

DELIMITER ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
