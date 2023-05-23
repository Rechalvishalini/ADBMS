package com.example.demo.Controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Domain.Cart;
import com.example.demo.Domain.Cart_Items;
import com.example.demo.Domain.Customer;
import com.example.demo.Domain.Employee;
import com.example.demo.Domain.Foods;
import com.example.demo.Domain.Invoice;
import com.example.demo.Domain.Users;
import com.example.demo.Repositories.CustomerRepo;
import com.example.demo.Repositories.UsersRepo;
import com.example.demo.Service.UsersServ;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class MyController {
	@Autowired
	private UsersServ usersServ;

	@Autowired
	UsersRepo repo;

	@RequestMapping("/")
	public String index() {
		return "Hello MNH";
	}

	@GetMapping("/getByUser/{user}")
	public List<Users> getByUser(@PathVariable("user") String user){
		return (List<Users>)usersServ.getDetailByUser(user);
	}

	@GetMapping("/getAllUsers")
	public List<Object[]> getAllUsers(){
		return usersServ.getAllUsersView();
	}

	@GetMapping("/getFoods")
	public List<Foods> allFoods() {
		return usersServ.getAllFoods();
	}
	
	@GetMapping("/getCus")
	public List<Customer> registerCus(){
		return usersServ.getAllCustomerView();
	}

	@GetMapping("/getInvoices")
	public List<Invoice> allInvoices() {
		return usersServ.getAllInvoice();
	}

	@PostMapping("/addCustomer")
	public String addCustomer(@RequestBody Customer cus){
		return usersServ.AddNewCus(cus);
		
	}

	@PostMapping("/addFood")
	public String addFood(@RequestBody Foods food){
		return usersServ.AddNewFood(food);
	}

	@PostMapping("/addToCart")
	public String addToCart(@RequestBody Cart cart){
		return usersServ.AddToCart(cart);
	}

	@GetMapping("/getCart/{id}")
	public List<Object[]> getAllCart(@PathVariable("id") Integer id){
		return usersServ.getAllCartItems(id);
	}

	@GetMapping("/getCartTotal/{id}")
	public List<Object[]> getAllCartTotal(@PathVariable("id") Integer id){
		return usersServ.getAllCartItemsTotal(id);
	}

	@GetMapping("/getCustomers")
	public List<Object[]> getAllCustomers(){
		return usersServ.getAllCus();
	}

	@GetMapping("/getEmployees")
    public List<Object[]> getAllEmpl(){
        return usersServ.getAllEmp();
    }

	@GetMapping("/testView")
	public List<Object[]> getTest(){
		return usersServ.getTestView();
	}
	@GetMapping("/getRooms")
	public List<Object[]> getBookedRooms(){
		return usersServ.bookedRooms();

	}

	@GetMapping("/testProcedure/{id}")
	public List<Object[]> getProc(@PathVariable("id") Integer id){
		return usersServ.getTestProc(id);
	}



	@GetMapping("/emptyRooms")
	public List<Object[]> getEmptyRooms(){
		return usersServ.getEmptyRoomList();
	}

	@PostMapping("/addEmployee")
	public String addEmployee(@RequestBody Employee employee){
		return usersServ.AddNewEmployee(employee);
	}

	@DeleteMapping("/deleteCustomer/{id}")
	public String deleteCustomer(@PathVariable Integer id){
		return usersServ.deleteCustomer(id);
	}

	@GetMapping("/getOrders/{id}")
	public List<Object[]> getOrdersDEtails(@PathVariable("id") Integer id){
		return usersServ.getOrdersDetail(id);
	}

	@DeleteMapping("/deleteFood/{id}")
	public void deleteFoodSelected(@PathVariable("id") Integer id){
		usersServ.deleteFood(id);

	}

	@GetMapping("/allocatedRooms")
	public List<Object[]> getallocatedRooms(){
		return usersServ.getallocatedRoomsList();
	}

	@GetMapping("/getFoodItems/{category}")
	public List<Object[]> getOrdersDEtails(@PathVariable("category") String category){
		return usersServ.getFoodDetails(category);
	}

	@GetMapping("/getFoodItemsByDate/{date}")
	public List<Object[]> getFoodItemsByDate(@PathVariable("date") String datee){
		return usersServ.getFoodItemsByDateList(datee);
	}
	
	@RequestMapping("bookRoom/{theId}/{roomNo}")
	public String bookARoom(@PathVariable("theId") Integer id,@PathVariable("roomNo") Integer room){
		usersServ.bookNewRoom(id,room);
		return "Room booked";
	}

	@GetMapping("/getFoodOrders")
	public List<Object[]> getFoodOrders(){
		return usersServ.getFoodOrdersView();
	}

	@GetMapping("/getProfit")
	public String getProfit(){
		return usersServ.getProfitView();
	}

	@GetMapping("/getAllRooms")
	public List<Object[]> getAllRooms(){
		return usersServ.getallRoomslist();
	}

	@GetMapping("/myProfitMargin")
	public String getProMar(){
		return usersServ.getProfMarg();
	}
	
}
