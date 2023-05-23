create database HOTELMS;

USE HOTELMS;

create table customer(
	cus_id int auto_increment primary key,
    cus_name varchar(255),
    cus_phone int(11),
    cus_address varchar(20),
    cus_email varchar(255),
    cus_nic varchar(20),
    cus_gender varchar(20),
    cus_dob date
);

create TABLE users(
user_id int auto_increment primary key,
user_name varchar(255),
password varchar(255),
post varchar(60),
cus_id int
);

/* Trigger to add new user account when customer register for the system */
DELIMITER //
create trigger createUserAccount
AFTER INSERT ON customer
FOR EACH ROW
BEGIN
	DECLARE user_name varchar(255);
	DECLARE nic_as_pw varchar(255);
    DECLARE post varchar(255);
    DECLARE cus_id int;
    
    SET post = "customer";
    SET user_name = NEW.cus_name;
    SET nic_as_pw = NEW.cus_nic;
    SET cus_id = NEW.cus_id;
    insert into users(user_name,password,post,cus_id) values(user_name,md5(nic_as_pw),post,cus_id);
    
END //
DELIMITER ;

create table food(
food_id int auto_increment primary key,
food_name varchar(255),
food_price float(10,2),
food_image varchar(255),
food_category varchar(255),
food_desc varchar(255)
);

insert into food(food_name,food_price,food_image,food_category,food_desc)
values
('Nasigurang',650.00,'../../public/Foods/2.jpg','Lunch','The best Nasigurang. In baasmathi rice'),
('Chicken Fry',750.00,'../../public/Foods/3.jpg','Starter','Best chicken fry'),
('Chicken BBQ',1650.00,'../../public/Foods/4.jpg','Lunch','Full chicken BBQ');

/*rooms*/
create table room(
    room_id varchar(255) primary key,
    Booking_status int,
    room_description varchar(255),
    cus_id int,
    foreign key(cus_id) references customer(cus_id)
);


show tables;

create table cart(
item_id int primary key,
food_id int,
cus_id int,
price float,
quantity int,
foreign key(cus_id) references customer(cus_id),
foreign key(food_id) references food(food_id)
);


create table employee(emp_id varchar(255),
emp_name varchar(255),
emp_age int,
emp_gender varchar(255),
emp_doj varchar(255),
emp_position varchar(255),
emp_address varchar(255)
);

create table invoice(invoice_id int primary key, 
cus_id int,
item_id int,
invoice_date date,
amount float(8,2),
foreign key(cus_id) references customer(cus_id),
foreign key(item_id) references cart(item_id ),
quantity int,
price float(8,2)
);

create table food_orders(
	order_id int auto_increment primary key,
    food_id int,
    food_name varchar(255),
    cus_id int,
    foreign key(food_id) references food(food_id),
    foreign key(cus_id) references customer(cus_id)
);

--  procedure
DELIMITER $
 CREATE PROCEDURE View_Add_To_Cart_Items(IN ID INT)
BEGIN
    SELECT f.food_name  FROM cart as c,food as f where f.food_id =c.food_id and c.cus_id = ID ;
END$
DELIMITER 


CREATE VIEW FOOD_ORDERS_VIEW
AS
SELECT c.cus_name, f.food_name
FROM ((food f
INNER JOIN food_orders fo ON f.food_id = fo.food_id)
INNER JOIN customer c ON c.cus_id = fo.cus_id);


-- procedure
DELIMITER $
 CREATE PROCEDURE View_Add_To_Cart_Items(IN ID INT)
BEGIN
	SELECT DISTINCT(f.food_name), f.food_id  FROM cart as c,food as f where c.cus_id = ID ;
END$
DELIMITER 

DELIMITER $
CREATE PROCEDURE
View_Empty_Room()
BEGIN
select * from room where
Booking_status =0;
END$
DELIMITER ;

call View_Empty_Room

DELIMITER $
CREATE PROCEDURE View_Room_Details(IN R_ID INT)
BEGIN
	select * from room where room_id=R_ID;
END$
DELIMITER ;

DELIMITER $
 CREATE PROCEDURE View_Allocated_Room_Customer_Details(IN R_ID INT)
BEGIN
	select c.cus_name,c.cus_phone,c.cus_address,c.cus_email,c.cus_nic from
    room r,customer c where r.room_id=R_ID and c.cus_id=r.cus_id ;
END$
DELIMITER ;


-- function to calculate age
DELIMITER //
CREATE FUNCTION getAge(ID int)
RETURNS INT
BEGIN
   DECLARE ageRet INT;
	SELECT (YEAR(curdate())-YEAR(cus_dob)) into ageRet from customer where cus_id=ID;
    RETURN ageRet;
END; //
DELIMITER ; 



-- data to tables 
 insert into customer values(30,'Ajay',123456,'jaffna','aj@gmail.com','98756423101V','male','1998-11-18'),(31,'Jathu',456123,'Atchuvely','jathu@gmail.com','987478586V','male','1998-11-18'),
(32,'Prunthan',369852,'Pointpetro','ptn@gmail.com','357841236V','male','1998-09-30'),
(33,'Vishalini',741258,'Pointpetro','rechal@gmail.com','951234576V','female','1998-12-16'),
(34,'Farwin',357481,'Eravur','farwin@gmail.com','687342195V','female','1998-03-15'),
(35,'Sharanya',753621,'Karainagar','shara@gmail.com','3357841256V','female','1998-05-02');


insert into food(food_id,food_category,food_desc,food_name,food_price)  values(21,'Dinner','Chicken rice','Rice',650),(25,'Brekfast','Best Noodles','Noodles',450),(18,'Brekfast','Best Noodles','Noodles',450),
(22,'Breakfast','Best Machroni','Machroni',650),
(23,'Dinner','Best Koththu','Kothu',1500),
(24,'Lunch','Best Rice with fish fry','Rice',500);



insert into cart values(01,19,25,650,3),(02,20,26,1500,2),(03,21,24,500,1),(04,18,23,450,4),(05,19,22,650,3);


insert into employee(emp_id,emp_name,emp_age,emp_gender,emp_doj,emp_position,emp_address)
 values(103,'Malar',28,'female','Food management','Manager','Jaffna'),(104,'Kamalan',18,'male','Cleaning management','cleaner','Colombo'),
 (105,'Vimal',28,'male','Food management','Waiter','Batticaloa'),(106,'Siva',28,'female','Food management','Waiter','Jaffna'); 

-- views
--  View_Cart_Total_Price
create view View_Cart_Total_Price as 
select f.food_name,price,quantity,(price*quantity) as total from food f,cart c where f.food_id=c.food_id ;
 

-- View_Room_Details
DELIMITER $
 CREATE PROCEDURE View_Food_Details(IN F_ID INT)
BEGIN
	select * from food where food_id=F_ID;
END$
DELIMITER $

call View_Food_Details(16)

-- get room details weather booked or not
DELIMITER //
CREATE FUNCTION getRoomStatus(ID int)
RETURNS VARCHAR(50)
BEGIN
   DECLARE room_status VARCHAR(50);
   DECLARE st int;
   
	SELECT Booking_status into st from room where room_id=ID;
    if st > 0 then 
		set room_status = "Booked";
    else
		set room_status = "Not Booked";
    end if;
    RETURN room_status;
END//
DELIMITER ; 

-- view to show booked rooms including the customer
create view room_details
AS
select c.cus_name, getRoomStatus(r.room_id),r.room_description from 
room r inner join customer c on c.cus_id = r.cus_id ;

-- Get_order_details (output customer name, food_name)
DELIMITER $
CREATE PROCEDURE Get_order_details(IN ID INT)
BEGIN
	select fo.order_id,c.cus_name,f.food_name,fo.ordered_date from customer c,food_orders fo,food f where fo.order_id =1 and c.cus_id=fo.cus_id and fo.food_id=f.food_id;
END$
DELIMITER $
    
DELIMITER $
CREATE PROCEDURE Get_Invoice_Id(IN DATE DATE)
BEGIN
	select c.cus_name,i.invoice_id,i.price from customer c,invoice i where invoice_date=DATE and c.cus_id=i.cus_id;
END$
DELIMITER $

-- procedure to delete a food

DELIMITER $
CREATE PROCEDURE Delete_Food_Details(IN F_ID INT)
BEGIN
	delete from cart where food_id=F_ID;	
	delete from food where food_id=F_ID;
END$
DELIMITER ;

call Get_Invoice_Id('2022-10-09')

DELIMITER $
CREATE PROCEDURE
View_Allocated_Room()
BEGIN
select * from room where
Booking_status =1;
END$
DELIMITER ;

DELIMITER $
 CREATE PROCEDURE View_Food_Details_ByCategory(IN category VARCHAR(255))
BEGIN
	select food_name,food_desc,food_price from food where food_category=Category;
END$
DELIMITER ;

DELIMITER $
CREATE PROCEDURE View_Ordereditem_byID(IN id int)
BEGIN
select f.food_name,o.ordered_date from food f,food_orders o where f.food_id=o.food_id and cus_id=id ;
END$
DELIMITER $

DELIMITER $
 CREATE PROCEDURE getGenderMale(IN cus_gender VARCHAR(20))
BEGIN
	select *from customer where cus_gender= male;
END$
DELIMITER ;


-- trigger
--  delete customer  
DELIMITER $$
CREATE TRIGGER delete_userABCDE
    before DELETE
    ON customer FOR EACH ROW
BEGIN
	SET FOREIGN_KEY_CHECKS=OFF;
    delete from cart where cus_id= cus_id;
    delete from users where user_id= cus_id;
   SET FOREIGN_KEY_CHECKS=ON;
END$$    
DELIMITER ; 

DELIMITER $
CREATE PROCEDURE Get_Orders_By_Date(IN datee DATE)
BEGIN
	select f.food_category,f.food_image,f.food_name,food_price from food f,food_orders o where ordered_date=datee and o.food_id=f.food_id;
END$
DELIMITER $


call Get_Orders_By_Date('2022-10-09');

-- get all the orderd foods
CREATE VIEW GET_FOOD_ORDERS
AS
select fo.order_id,fo.ordered_date,f.food_name,fo.Amount from food_orders fo
inner join food f on f.food_id = fo.food_id;

-- get profit from a view
CREATE VIEW GET_PROFIT
AS
select sum(amount) from GET_FOOD_ORDERS

DELIMITER $$
CREATE TRIGGER delete_food
    before DELETE
    ON food FOR EACH ROW
BEGIN
	SET FOREIGN_KEY_CHECKS=OFF;
    delete from cart where food_id= old.food_id;
   SET FOREIGN_KEY_CHECKS=ON;
END$$    
DELIMITER ; 

-- get all rooms with status
create view allRoomDetails
AS
select getRoomStatus(r.room_id), r.room_description from room r;


-- procedure to get all employees
DELIMITER $
 CREATE PROCEDURE getAllEmployees()
BEGIN
    SELECT * from employee;
END$
DELIMITER ;

-- get cart items
CREATE VIEW GET_ALL_ITEMS_IN_CART
AS
select f.food_name,c.price,c.quantity,c.cus_id from cart c inner join food f where c.food_id=f.food_id

-- cart items procedure
DELIMITER $
 CREATE PROCEDURE get_cart_items_of_user(IN ID int)
BEGIN
    SELECT food_name,quantity,price FROM GET_ALL_ITEMS_IN_CART where cus_id = ID;
END$
DELIMITER ;

DELIMITER $
 CREATE PROCEDURE get_total_cart(IN ID int)
BEGIN
    SELECT sum(price) FROM GET_ALL_ITEMS_IN_CART where cus_id = ID;
END$
DELIMITER ;

-- profit margin
CREATE VIEW PROFIT_MARGIN
AS
SELECT((SELECT * from GET_PROFIT)/(SELECT count(*) from customer)) as ProfitM



