package org.daawat.fmb.web.utils;

import org.daawat.fmb.api.db.UserProfileDataDAO;
import org.daawat.fmb.api.objects.UserCredentialData;
import org.daawat.fmb.api.objects.UserProfileData;
import org.daawat.fmb.impl.daos.UserProfileDataDAOImpl;
import org.daawat.fmb.utils.Logger;

public class LoginUtils {

	private static final String COMP_NAME = "LoginUtils";
	
	/**
	 * Convenience method to check if the user exists in the DB or not.
	 * @param eJamaatId
	 * @return isValidUser
	 */
	public static boolean isValidUser(String eJamaatId,String password){
		UserProfileData userProfileData = null;
		boolean isValidUser = false;
		try{
			UserProfileDataDAO userProfileDAO = new UserProfileDataDAOImpl();
			//Populating the UserCredential object...
			UserCredentialData ucd = new UserCredentialData(eJamaatId, password);
			userProfileData = userProfileDAO.getUserProfileData(ucd);
			if(userProfileData == null){
				Logger.info(COMP_NAME, "User does not exist for the ejamaat id - ");	
			}else{
				isValidUser = true;
			}
			
		}catch(Exception e){
			Logger.error(COMP_NAME, "An exception has occurred inside getUserProfile method for the ejamaat id - "+eJamaatId, e);
		}
		return isValidUser;
	}
	
	
}
