package org.daawat.fmb.impl.daos;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.daawat.fmb.api.db.UserProfileDataDAO;
import org.daawat.fmb.api.enums.Category;
import org.daawat.fmb.api.enums.UserRole;
import org.daawat.fmb.api.objects.UserCredentialData;
import org.daawat.fmb.api.objects.UserProfileData;
import org.daawat.fmb.utils.Logger;
import org.daawat.fmb.utils.PropertyFileManager;

//This DAO would be responsible to do the basic CRUD operations related to the UserInfoTable
public class UserProfileDataDAOImpl extends BaseJDBCDAO<UserProfileData> implements UserProfileDataDAO{

	private static final String COMP_NAME = "UserProfileDataDAOImpl";
	
	//Select on the DB table based on the user credential.
	public UserProfileData getUserProfileData(UserCredentialData userCredentials) throws Exception {
		UserProfileData userProfileData = null;
		String sqlQuery = PropertyFileManager.getProperty("userprofile_select_query");
		executeQuery(sqlQuery, userCredentials.toList().toArray());
		if(data != null && !data.isEmpty()){
			userProfileData  = data.get(0);//we will get only one row. since ejamaat id is unique.
		}else{
			Logger.error(COMP_NAME, "Inside getUserProfileData and the data returned from the USER_PROFILE_TBL is null/empty for the eJamaat Id - "+userCredentials.geteJamaatId());
			userProfileData =  null;
		}
		return userProfileData;
	}
	
	//gets the profile data for all the distinct users in the system.
	public List<UserProfileData> getAllUserProfileData() throws Exception {
		String sqlQuery = PropertyFileManager.getProperty("userprofile_select_query_all");
		executeQuery(sqlQuery);
		return data;
	}
	
	
	
		
	//Select on the DB table based on the user ejamaat id.
	public int getMaxFamilyGroupId() throws Exception {
		int maxGroupId = 0;
		String sqlQuery = PropertyFileManager.getProperty("userprofile_select_max_family_group_id");
		executeQueryAlt(sqlQuery);
		while(resultSet.next()){
			maxGroupId = resultSet.getInt("FAMILY_GROUP_ID");
		}
		releaseConnection();
		return maxGroupId;
	}
	
	//creates a user profile row in the UserProfileTable
	public int createUserProfileData(UserProfileData userProfileData) throws Exception{
		String sqlQuery = PropertyFileManager.getProperty("userprofile_insert_query");			
		executeQuery(sqlQuery, userProfileData.toList_Insert().toArray());
		return updateCount;
		
	}
	
	//updates the user profile row in the UserProfileTable
	public int updateUserProfileData(UserProfileData userProfileData) throws Exception{					
		String sqlQuery = PropertyFileManager.getProperty("userprofile_update_query");
		executeQuery(sqlQuery, userProfileData.toList_Update().toArray());
		return updateCount;
	}
	
	
	//updates the user profile row in the UserProfileTable
		public int updateUserProfileData(String eJamaatId, String oldPassword, String newPassword) throws Exception{					
			String sqlQuery = PropertyFileManager.getProperty("userprofile_update_password_query");
			executeQuery(sqlQuery, newPassword,eJamaatId,oldPassword);
			return updateCount;
		}
	

	@Override
	public List<UserProfileData> unpack(ResultSet resultSet) throws Exception{
		List<UserProfileData> userProfileDataList = new ArrayList<UserProfileData>();
		while(resultSet.next()){
			UserProfileData userProfileData = new UserProfileData();
			UserCredentialData ucd = new UserCredentialData();
			ucd.seteJamaatId(resultSet.getString("EJAMAAT_ID"));
			ucd.setPassword(resultSet.getString("PASSWORD"));
			userProfileData.setHofEJamaatId(resultSet.getString("HOF_EJAMAAT_ID"));
			userProfileData.setFamilyName(resultSet.getString("FAMILY_NAME"));
			userProfileData.setFirstName(resultSet.getString("FIRST_NAME"));
			userProfileData.setUserRole(UserRole.getEnum(resultSet.getString("USER_ROLE")));
			userProfileData.setThaaliCategory(Category.getEnum(resultSet.getString("THAALI_CATEGORY")));
			userProfileData.setFamilyGroupId(resultSet.getInt("FAMILY_GROUP_ID"));
			userProfileData.setLocation(resultSet.getString("USER_LOCATION"));
			userProfileData.setEmailAddresses(resultSet.getString("EMAIL_ADDRESSES"));
			userProfileData.setUserCredentials(ucd);
			userProfileDataList.add(userProfileData);
		}
		 
		return userProfileDataList;
	}
	
	
	
	
	
}
