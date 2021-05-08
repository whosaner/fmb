package org.daawat.fmb.impl.daos;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.daawat.fmb.api.db.UserProfileDataDAO;
import org.daawat.fmb.api.enums.Category;
import org.daawat.fmb.api.enums.EmailType;
import org.daawat.fmb.api.enums.UserRole;
import org.daawat.fmb.api.objects.UserCredentialData;
import org.daawat.fmb.api.objects.UserProfileData;
import org.daawat.fmb.utils.DateUtils;
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
	
	//gets the profile data for one per family.
	public List<UserProfileData> getUserProfilePerFamily() throws Exception {
		String sqlQuery = PropertyFileManager.getProperty("userprofile_select_query_familywise");
		executeQuery(sqlQuery);
		return data;
	}
	
	//gets the profile data for all the  users in the system.
	public List<UserProfileData> getAllUsers() throws Exception {
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
			Logger.info(COMP_NAME, "Family Group Id - "+maxGroupId);
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
	public int updateUserProfileData(UserProfileData userProfileData) throws Exception {
		String userProfilesPerFamily = PropertyFileManager.getProperty("userprofile_select_query_per_family");
		String sqlQuery = PropertyFileManager.getProperty("userprofile_update_query");		
		UserProfileData userProfileDB = getUserProfileData(userProfileData.getUserCredentials());
		int updateCount = 0;
		if(userProfileDB != null){
			//setting data for fields that do not come from UI
			userProfileData.setFamilyGroupId(userProfileDB.getFamilyGroupId()); 
			userProfileData.setEmailType(userProfileDB.getEmailType());
			
			Logger.info(COMP_NAME, "User who tried to update the profile is "+userProfileDB);		
			executeQuery(userProfilesPerFamily, userProfileDB.getFamilyGroupId());
			List<UserProfileData> familyMembers = data;		
			if(familyMembers != null && familyMembers.size() > 0){
				for(int i=0; i<familyMembers.size(); i++){
					//When a user makes an update to user profile table - updates are relevant to the entire family
					UserProfileData userProfileFamilyMember = familyMembers.get(i);
					if(userProfileFamilyMember.getUserCredentials().geteJamaatId().equalsIgnoreCase(userProfileData.getUserCredentials().geteJamaatId())){					
						//for original user we update entire row
						Logger.info(COMP_NAME, "Will now update the data for the requested user having user profile = "+userProfileData);
						executeQuery(sqlQuery, userProfileData.toList_Update().toArray());
					}else{
						//for other users belonging to the 
						userProfileFamilyMember.setThaaliCategory(userProfileData.getThaaliCategory());
						userProfileFamilyMember.setRice(userProfileData.getRice());
						userProfileFamilyMember.setNumOfFamilyMembers(userProfileData.getNumOfFamilyMembers());
						userProfileFamilyMember.setLocation(userProfileData.getLocation());
						Logger.info(COMP_NAME, "Will now update the data for the user belonging to the family with user profile = "+userProfileFamilyMember);
						executeQuery(sqlQuery, userProfileFamilyMember.toList_Update().toArray());
						Logger.info(COMP_NAME, "Updated USER_PROFILE_TBL for user: "+userProfileFamilyMember.getFirstName());
					}				
				}
				updateCount = this.updateCount;
				//We also need to update the USER_THAALI_DATA_TBL if there are any entries				
				List<Object> params = createParamsForUserThaaliData(userProfileData);
				String userThaaliDataTblQuery = PropertyFileManager.getProperty("userthaalidata_update_post_userprofile_changes");
				executeQuery(userThaaliDataTblQuery, params.toArray());
			}
		}else {
			Logger.info(COMP_NAME, "No data found in USER_PROFILE_TBL for groupId: "+userProfileData.getFamilyGroupId()+", userProfileData = "+userProfileData);
		}
		
		return updateCount;
	}
	
	public List<Object> createParamsForUserThaaliData(UserProfileData userProfileData){
		List<Object> objList = new ArrayList<Object>();
		Date fromDate = DateUtils.getCurrentDate();
		objList.add(userProfileData.getThaaliCategory().getValue());
		objList.add(userProfileData.getRice());
		objList.add(userProfileData.getLocation());
		objList.add(fromDate);//pk
		objList.add(userProfileData.getFamilyGroupId());//pk
		
		return objList;
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
			userProfileData.setRice(resultSet.getString("RICE"));
			userProfileData.setFamilyGroupId(resultSet.getInt("FAMILY_GROUP_ID"));
			userProfileData.setLocation(resultSet.getString("USER_LOCATION"));
			userProfileData.setEmailAddresses(resultSet.getString("EMAIL_ADDRESSES"));
			userProfileData.setEmailType(EmailType.getEnum(resultSet.getString("SEND_EMAIL")));
			userProfileData.setNumOfFamilyMembers(resultSet.getInt("FAMILY_MEMBER_COUNT"));
			userProfileData.setUserCredentials(ucd);
			userProfileDataList.add(userProfileData);
		}
		 
		return userProfileDataList;
	}
	
	
	
	
	
}
