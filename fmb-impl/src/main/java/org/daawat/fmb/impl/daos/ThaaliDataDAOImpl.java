package org.daawat.fmb.impl.daos;



import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.daawat.fmb.api.db.ThaaliDataDAO;
import org.daawat.fmb.api.enums.ThaaliStatus;
import org.daawat.fmb.api.objects.ThaaliData;
import org.daawat.fmb.utils.PropertyFileManager;

public class ThaaliDataDAOImpl extends BaseJDBCDAO<ThaaliData> implements ThaaliDataDAO{
	
	/**
	 * Method to get the thaali days which are still open (i.e no khidmatguzaar has yet volunteered to make thaali).
	 * @param fromDate
	 * @return
	 * @throws Exception
	 */
	public List<ThaaliData> getThaaliDataOpenDates(Date fromDate) throws Exception{
		String sqlQuery = PropertyFileManager.getProperty("thaalidata_open_thaali_dates");
		executeQuery(sqlQuery,fromDate);
		return data;		
	}

	//creates thaali data for multiple days.
	public int createThaaliData(ThaaliData thaaliData) throws Exception{
		String sqlQuery = PropertyFileManager.getProperty("thaalidata_insert_query");
		executeQuery(sqlQuery, thaaliData.toList_Insert().toArray());
		return updateCount;
		
	}
	
	//updates thaali data for multiple days.
	public int updateThaaliData(ThaaliData thaaliData) throws Exception{
		String sqlQuery = PropertyFileManager.getProperty("thaalidata_update_query");
		executeQuery(sqlQuery, thaaliData.toList_Update().toArray());
		return updateCount;
	}
	
	
	
	/**
	 * This method would return the List of ThaaliData by querying the Thaali_Data_Tbl. This method can take multiple arguments and return different result sets based on the input params.
	 * isVisible(if you pass null).
	 * 
	 * This method would be used both by SUPER_USERS and NORMAL_USERS (for the former isVisible would be null and for the latter isVisible would be TRUE)s
	 * 
	 * @param thaaliStartDate -  required parameter
	 * @param thaaliEndDate - required parameter
	 * @param oIsVisible - optional parameter, if specified will be used in the query selection.
	 * @return List<ThaaliData>
	 * @throws Exception
	 */
	public List<ThaaliData> getThaaliData2(Date thaaliStartDate, Date thaaliEndDate, Boolean oIsVisible) throws Exception{
		String sqlQuery = null;
		
		if(oIsVisible != null){
			//1
			sqlQuery = PropertyFileManager.getProperty("thaalidata_select_query_daterange_visible");
			executeQuery(sqlQuery, thaaliStartDate, thaaliEndDate,oIsVisible);
		}else{
			//2
			sqlQuery = PropertyFileManager.getProperty("thaalidata_select_query_daterange");
			executeQuery(sqlQuery, thaaliStartDate, thaaliEndDate);
		}
		
		return data;
	}
	
	/**
	 * This method would return the List of ThaaliData by querying the Thaali_Data_Tbl. This method can take multiple arguments and return different result sets based on the input params.
	 * thaaliEndDate and status are optional params(if you pass null).
	 * 
	 * @param thaaliStartDate -  required parameter
	 * @param oThaaliEndDate - optional parameter, if specified will be used in the query selection.
	 * @param oStatus - optional parameter, if specified will be used in the query selection.
	 * @return List<ThaaliData>
	 * @throws Exception
	 */
	public List<ThaaliData> getThaaliData(Date thaaliStartDate, Date oThaaliEndDate, ThaaliStatus oStatus) throws Exception{
		String sqlQuery = null;
		if(oThaaliEndDate != null){
			if(oStatus != null){
				//1
				sqlQuery = PropertyFileManager.getProperty("thaalidata_select_query_daterange_status");
				executeQuery(sqlQuery, thaaliStartDate, oThaaliEndDate,oStatus.getValue());
			}else{
				//3
				sqlQuery = PropertyFileManager.getProperty("thaalidata_select_query_daterange");
				executeQuery(sqlQuery, thaaliStartDate, oThaaliEndDate);
			}
		}else{
			if(oStatus !=null){
				//2
				sqlQuery = PropertyFileManager.getProperty("thaalidata_select_query_date_status");
				executeQuery(sqlQuery, thaaliStartDate,oStatus.getValue());
			}else{
				sqlQuery = PropertyFileManager.getProperty("thaalidata_select_query_date");
				executeQuery(sqlQuery, thaaliStartDate);	
			}
		}
		
		return data;
	}
	
	

	@Override
	public List<ThaaliData> unpack(ResultSet resultSet) throws Exception{

		List<ThaaliData> thaaliDataList = new ArrayList<ThaaliData>();
		while(resultSet.next()){
			ThaaliData thaaliData = new ThaaliData();
			//THAALI_DATE, THAALI_DAY, MENU, COOKNAME, INSTRUCTIONS, ADMIN_NAME, CREATION_DATE, STATUS
			thaaliData.setThaaliDate(resultSet.getDate("THAALI_DATE"));
			thaaliData.setThaaliDay(resultSet.getString("THAALI_DAY"));
			thaaliData.setMenu(resultSet.getString("MENU"));
			thaaliData.setCoookName(resultSet.getString("COOKNAME"));
			thaaliData.setInstructions(resultSet.getString("INSTRUCTIONS"));
			thaaliData.setAdminName(resultSet.getString("ADMIN_NAME"));
			thaaliData.setCreationDate(resultSet.getDate("CREATION_DATE"));
			thaaliData.setStatus(ThaaliStatus.getEnum(resultSet.getString("THAALI_STATUS")));
			thaaliData.setVisible(resultSet.getBoolean("VISIBLE_TO_USERS"));
			
			thaaliDataList.add(thaaliData);
			
		}
		return thaaliDataList;
	}
	
}
