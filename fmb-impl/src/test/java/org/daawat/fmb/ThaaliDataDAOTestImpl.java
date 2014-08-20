package org.daawat.fmb;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import junit.framework.TestCase;

import org.daawat.fmb.api.enums.ThaaliStatus;
import org.daawat.fmb.api.objects.ThaaliData;
import org.daawat.fmb.impl.daos.ThaaliDataDAOImpl;

public class ThaaliDataDAOTestImpl extends TestCase {
	
	
/*public static void testCreateThaaliData(){
		
		try{
			SimpleDateFormat sdf = new  SimpleDateFormat("MM/dd/yyyy");		
			List<ThaaliData> dataList = new ArrayList<ThaaliData>();
			
			ThaaliDataDAOImpl thaaliDataDAO = new ThaaliDataDAOImpl();
			String [] dateArr = {"12/01/2013","12/02/2013","12/03/2013","12/04/2013","12/05/2013","12/06/2013"};
			for(int i=0;i<6;i++){
				ThaaliData data1 =  new ThaaliData();		
				data1.setAdminName("Hussain");
				data1.setCoookName("Khadija");
				Date date = sdf.parse(dateArr[i]);
				data1.setThaaliDate(date);
				data1.setCreationDate(date);
				data1.setInstructions("Instruction for Day -"+i);
				data1.setMenu("Menu for Day -"+i);
				data1.setStatus(Status.THAALI_PRESENT);			
				data1.setThaaliDay("");
				dataList.add(data1);
				
			}
			
			List<Integer> output = thaaliDataDAO.createThaaliData(dataList);
			for(Integer val:output){
				System.out.println("Output - "+val);
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		
	}*/

	public static void testGetThaaliData(){

		try{
			SimpleDateFormat sdf = new  SimpleDateFormat("MM/dd/yyyy");
			Date dateFrom = sdf.parse("12/01/2013");
			Date dateTo = sdf.parse("12/06/2013");
			
			ThaaliDataDAOImpl thaaliDataDAO = new ThaaliDataDAOImpl();
			
			//Case 1:-			
			List<ThaaliData> thaaliDataList = thaaliDataDAO.getThaaliData(dateFrom, dateTo, null);
			print(thaaliDataList);
			
			//Case 2:-			
			thaaliDataList = thaaliDataDAO.getThaaliData(dateFrom, null, ThaaliStatus.THAALI_PRESENT);
			print(thaaliDataList);
			
			//Case 3:-			
			thaaliDataList = thaaliDataDAO.getThaaliData(dateFrom, dateTo, ThaaliStatus.THAALI_PRESENT);
			print(thaaliDataList);
			
			//Case 3:-			
			thaaliDataList = thaaliDataDAO.getThaaliData(dateFrom, null, null);
			print(thaaliDataList);
			
			
			
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	public static void print(List<ThaaliData> list){
		for(ThaaliData data:list){
			System.out.println(data);
		}
		System.out.println("--------------------------------------");
	}
	
	
	
	
	public static void testUpdateThaaliData(){
		
		try{
			SimpleDateFormat sdf = new  SimpleDateFormat("MM/dd/yyyy");		
			
			ThaaliDataDAOImpl thaaliDataDAO = new ThaaliDataDAOImpl();
			String [] dateArr = {"12/01/2013","12/02/2013","12/03/2013","12/04/2013","12/05/2013","12/06/2013"};
			for(int i=0;i<6;i++){
				ThaaliData data1 =  new ThaaliData();		
				data1.setAdminName("Hussain");
				data1.setCoookName("Khadija");
				Date date = sdf.parse(dateArr[i]);
				data1.setThaaliDate(date);
				data1.setCreationDate(date);
				data1.setInstructions("Instruction for Day -"+i+" has been updated");
				data1.setMenu("Menu for Day -"+i+" has been updated");
				data1.setStatus(ThaaliStatus.THAALI_PRESENT);			
				data1.setThaaliDay("");
				
				int output = thaaliDataDAO.updateThaaliData(data1);
				System.out.println("Output - "+output);
				
			}
			
			
		}catch(Exception e){
			e.printStackTrace();
		}
		
	}
}
