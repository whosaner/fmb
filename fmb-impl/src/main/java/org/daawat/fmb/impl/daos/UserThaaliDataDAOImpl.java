package org.daawat.fmb.impl.daos;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.daawat.fmb.api.db.UserThaaliDataDAO;
import org.daawat.fmb.api.enums.Category;
import org.daawat.fmb.api.enums.UserThaaliStatus;
import org.daawat.fmb.api.objects.UserThaaliData;
import org.daawat.fmb.utils.PropertyFileManager;

public class UserThaaliDataDAOImpl extends BaseJDBCDAO<UserThaaliData> implements UserThaaliDataDAO{

	//Adds a row to the UserThaaliData table.
	public int addUserThaaliData(UserThaaliData userThaaliData) throws Exception{
		String sqlQuery = PropertyFileManager.getProperty("userthaalidata_insert_query");			
		executeQuery(sqlQuery, userThaaliData.toList_Insert().toArray());
		return updateCount;
	}
	
	//update the user thaali data.
	public int updateUserThaaliData(UserThaaliData userThaaliData) throws Exception{
		String sqlQuery = PropertyFileManager.getProperty("userthaalidata_update_query");			
		executeQuery(sqlQuery, userThaaliData.toList_Update().toArray());
		return updateCount;
	}
	
	
	/**
	 * This method would return the List of UserThaaliData by querying the UserThaaliData_TBL. This method can take multiple arguments and return different result sets based on the input params.
	 * thaaliEndDate and status are optional params(if you pass null).
	 * 
	 * @param thaaliStartDate -  required parameter
	 * @param oThaaliEndDate - optional parameter, if specified will be used in the query selection.
	 * @param oStatus - optional parameter, if specified will be used in the query selection.
	 * @return List<UserThaaliData>
	 * @throws Exception
	 */
	
	public List<UserThaaliData> getThaaliDataAllUsers(Date thaaliFromDate, Date oThaaliToDate, UserThaaliStatus oThaaliStatus) throws Exception{
		String sqlQuery = null;
		if(oThaaliStatus != null){
			if(oThaaliToDate != null){
				sqlQuery = PropertyFileManager.getProperty("userthaalidata_select_query_daterange_status_all");
				executeQuery(sqlQuery, thaaliFromDate, oThaaliToDate, oThaaliStatus.getValue());
			}else{
				sqlQuery = PropertyFileManager.getProperty("userthaalidata_select_query_date_status_all");
				executeQuery(sqlQuery,thaaliFromDate,oThaaliStatus.getValue());
			}			
			
		}else{
			if(oThaaliToDate != null){
				sqlQuery = PropertyFileManager.getProperty("userthaalidata_select_query_daterange_all");
				executeQuery(sqlQuery,thaaliFromDate,oThaaliToDate);
			}else{
				sqlQuery = PropertyFileManager.getProperty("userthaalidata_select_query_date_all");
				executeQuery(sqlQuery,thaaliFromDate);
			}
			
		}
				
		return data;
	}
	
	
	
	
	/**
	 * 
	 * This method would return the List of UserThaaliData by querying the UserThaaliData_TBL. This method can take multiple arguments and return different result sets based on the input params.
	 * only status is optional (if you pass null).
	 * @param thaaliFromDate
	 * @param oThaaliToDate
	 * @param oThaaliStatus
	 * @param familyGroupId
	 * @return
	 * @throws Exception
	 */
	public List<UserThaaliData> getThaaliDataPerUser(int familyGroupId, Date thaaliFromDate, Date oThaaliToDate, UserThaaliStatus oThaaliStatus) throws Exception{
		String sqlQuery = null;
		if(oThaaliStatus != null){
			if(oThaaliToDate !=null){
				sqlQuery = PropertyFileManager.getProperty("userthaalidata_select_query_daterange_status_user");
				executeQuery(sqlQuery,familyGroupId, thaaliFromDate, oThaaliToDate, oThaaliStatus.getValue());		
			}else{
				sqlQuery = PropertyFileManager.getProperty("userthaalidata_select_query_user_status");
				executeQuery(sqlQuery,familyGroupId, thaaliFromDate, oThaaliStatus.getValue());		
			}

		}else{
			if(oThaaliToDate !=null){
				sqlQuery = PropertyFileManager.getProperty("userthaalidata_select_query_daterange_user");
				executeQuery(sqlQuery,familyGroupId, thaaliFromDate,oThaaliToDate);
			}else{
				sqlQuery = PropertyFileManager.getProperty("userthaalidata_select_query_user");
				executeQuery(sqlQuery,familyGroupId, thaaliFromDate);
			}
			
			
		}
				
		return data;
	}

	@Override
	public List<UserThaaliData> unpack(ResultSet rs) throws Exception{
		List<UserThaaliData> userThaaliList = new ArrayList<UserThaaliData>();
		while(rs.next()){
			UserThaaliData userThaali =  new UserThaaliData();
			//THAALI_DATE, FIRST_NAME, FAMILY_NAME, THAALI_CATEGORY, THAALI_STATUS, FAMILY_GROUP_ID, INSTRUCTIONS, USER_LOCATION
			userThaali.setThaaliDate(rs.getDate("THAALI_DATE"));
			userThaali.setFirstName(rs.getString("FIRST_NAME"));
			userThaali.setFamilyName(rs.getString("FAMILY_NAME"));
			userThaali.setThaaliCategory(Category.getEnum(rs.getString("THAALI_CATEGORY")));
			userThaali.setRice(rs.getString("RICE"));
			userThaali.setUserThaaliStatus(UserThaaliStatus.getEnum(rs.getString("USER_THAALI_STATUS")));
			userThaali.setFamilyGroupId(rs.getInt("FAMILY_GROUP_ID"));
			userThaali.setUserInstructions(rs.getString("INSTRUCTIONS"));
			userThaali.setLocation(rs.getString("USER_LOCATION"));
			userThaaliList.add(userThaali);
		}
		return userThaaliList;
	}
	
	
}
