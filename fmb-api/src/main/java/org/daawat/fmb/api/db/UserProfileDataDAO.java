package org.daawat.fmb.api.db;

import java.util.List;

import org.daawat.fmb.api.objects.UserCredentialData;
import org.daawat.fmb.api.objects.UserProfileData;

public interface UserProfileDataDAO {

		//Select on the DB table based on the user credential.
		public UserProfileData getUserProfileData(UserCredentialData userCredentials) throws Exception;
		
		//creates a user profile row in the UserProfileTable
		public int createUserProfileData(UserProfileData userProfileData) throws Exception;
		
		//updates the user profile row in the UserProfileTable
		public int updateUserProfileData(UserProfileData userProfileData) throws Exception;
		
		 //Get max of family groupd id.
		public int getMaxFamilyGroupId() throws Exception;
		
		//Update the password.
		public int updateUserProfileData(String eJamaatId, String oldPassword, String newPassword) throws Exception;
		
		//The below method gets all the user profiles by grouping their FamilyId.
		public List<UserProfileData> getUserProfilePerFamily() throws Exception;

		
		public List<UserProfileData> getAllUsers() throws Exception;
		
	
}
