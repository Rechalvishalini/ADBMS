package com.example.demo.Service;

import java.sql.Date;
import java.util.List;

import com.example.demo.Domain.Cart;
import com.example.demo.Domain.Cart_Items;
import com.example.demo.Domain.Customer;
import com.example.demo.Domain.Employee;
import com.example.demo.Domain.Foods;
import com.example.demo.Domain.Invoice;
import com.example.demo.Domain.Users;

public interface UsersServ{

    public List<Users> getDetailByUser(String name);
	
	public List<Foods> getAllFoods();	

    public String AddNewCus(Customer cus);

	public  List<Object[]> getAllCus();

	public List<Object[]> getAllCartItems(Integer id);

    public String AddNewFood(Foods food);

	public String AddToCart(Cart cart);

	public List<Invoice> getAllInvoice();

	public List<Object[]> getAllEmp();

	public List<Customer> getAllCustomerView();

	public List<Object[]> getTestView();

	public List<Object[]> getTestProc(Integer id);

	public List<Object[]> bookedRooms();

    public String AddNewEmployee(Employee employee);

    public List<Object[]> getAllUsersView();

	public List<Object[]> getEmptyRoomList();

    public String deleteCustomer(Integer id);

    public List<Object[]> getOrdersDetail(Integer id);

    public void deleteFood(Integer id);

    public List<Object[]> getallocatedRoomsList();

	public List<Object[]> getFoodDetails(String category);

    public List<Object[]> getFoodItemsByDateList(String datee);

    public void bookNewRoom(Integer id, Integer room);

	public List<Object[]> getFoodOrdersView();

	public String getProfitView();

	public List<Object[]> getallRoomslist();

	public List<Object[]> getAllCartItemsTotal(Integer id);

    public String getProfMarg();


    

	

	

	
}


	