package org.daawat.fmb;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import junit.framework.TestCase;

import org.daawat.fmb.api.enums.Category;
import org.daawat.fmb.api.enums.UserThaaliStatus;
import org.daawat.fmb.api.objects.UserThaaliData;
import org.daawat.fmb.impl.daos.UserThaaliDataDAOImpl;

public class UserThaaliDataDAOTestImpl extends TestCase {

	public static void testAddUserThaaliData(){
		try{
			UserThaaliDataDAOImpl thaaliDataDAO =  new UserThaaliDataDAOImpl();
			SimpleDateFormat sdf = new  SimpleDateFormat("MM/dd/yyyy");		
			Date date = sdf.parse("12/01/2013");
			
			UserThaaliData data1 =  new UserThaaliData();		
			data1.setFamilyGroupId(1);
			data1.setFamilyName("Rangwala");
			data1.setFirstName("Hussain");
			data1.setUserInstructions("No rice.");
			data1.setLocation("WEST CHESTER");
			data1.setThaaliCategory(Category.Medium);
			data1.setThaaliDate(date);
			data1.setUserThaaliStatus(UserThaaliStatus.REQUESTED_BY_USER);
			
			int val= thaaliDataDAO.addUserThaaliData(data1);
			System.out.println("Output - "+val);
			
		}catch(Exception e){
			e.printStackTrace();
		}
		
	}
	
	public static void testUpdateUserThaaliData(){
		try{
			UserThaaliDataDAOImpl thaaliDataDAO =  new UserThaaliDataDAOImpl();
			SimpleDateFormat sdf = new  SimpleDateFormat("MM/dd/yyyy");		
			Date date = sdf.parse("12/01/2013");
			
			UserThaaliData data1 =  new UserThaaliData();		
			data1.setFamilyGroupId(1);
			data1.setFamilyName("Rangwala");
			data1.setFirstName("Hussain");
			data1.setUserInstructions("No rice...Updated");
			data1.setLocation("WEST CHESTER");
			data1.setThaaliCategory(Category.Medium);
			data1.setThaaliDate(date);
			data1.setUserThaaliStatus(UserThaaliStatus.REQUESTED_BY_USER);
			
			int val= thaaliDataDAO.updateUserThaaliData(data1);
			System.out.println("Output - "+val);
			
		}catch(Exception e){
			e.printStackTrace();
		}
		
	}
	
	public static void testGetUserThaaliData(){
		
		try{
			
			UserThaaliDataDAOImpl thaaliDataDAO =  new UserThaaliDataDAOImpl();
			SimpleDateFormat sdf = new  SimpleDateFormat("MM/dd/yyyy");		
			Date fromDate = sdf.parse("12/01/2013");
			Date toDate = sdf.parse("12/06/2013");
			
			//Case 1:
			List<UserThaaliData> dataList = thaaliDataDAO.getThaaliDataAllUsers(fromDate, toDate, UserThaaliStatus.REQUESTED_BY_USER);
			print(dataList);
			
			
			//Case 2:
			 dataList = thaaliDataDAO.getThaaliDataAllUsers(fromDate, toDate, null);
			print(dataList);
			
			//Case 3:
			 dataList = thaaliDataDAO.getThaaliDataAllUsers(fromDate,null , UserThaaliStatus.REQUESTED_BY_USER);
			print(dataList);
			
			//Case 4 :
			 dataList = thaaliDataDAO.getThaaliDataAllUsers(fromDate,null , null);
			print(dataList);
			
		}catch(Exception e){
			e.printStackTrace();
		}
		
	}
	
	
	
	public static void print(List<UserThaaliData> list){
		for(UserThaaliData data:list){
			System.out.println(data);
		}
		System.out.println("------------------------");
	}
	
}
