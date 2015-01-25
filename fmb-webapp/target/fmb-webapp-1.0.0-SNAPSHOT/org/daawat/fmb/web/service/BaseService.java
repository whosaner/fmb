package org.daawat.fmb.web.service;

import java.util.Date;
import java.util.List;

import org.daawat.fmb.api.db.ThaaliDataDAO;
import org.daawat.fmb.api.db.UserProfileDataDAO;
import org.daawat.fmb.api.objects.ThaaliData;
import org.daawat.fmb.api.objects.UserCredentialData;
import org.daawat.fmb.api.objects.UserProfileData;
import org.daawat.fmb.impl.daos.ThaaliDataDAOImpl;
import org.daawat.fmb.impl.daos.UserProfileDataDAOImpl;
import org.daawat.fmb.utils.Logger;

public class BaseService{

	protected UserProfileData userProfileData;
	private static final String COMP_NAME = "BaseService";
	
	
	/**
	 * Convenience method that returns a valid UserProfileData
	 * @param eJamaatId
	 * @param password
	 * @return
	 * @throws Exception
	 */
	public UserProfileData authenticateUser(String eJamaatId, String password) throws Exception{
		UserProfileDataDAO userProfileDAO = new UserProfileDataDAOImpl();
		//Populating the UserCredential object...
		UserCredentialData userData = new UserCredentialData(eJamaatId, password);
		UserProfileData userProfileData = userProfileDAO.getUserProfileData(userData);
		
		if(userProfileData == null){
			String msg = "Inside authenticateUser and the user does not exist in the system with the ejamaatid - "+eJamaatId;
			Logger.error(COMP_NAME,msg+", and password -"+ password);
			throw new Exception(msg);
		}
		this.userProfileData = userProfileData;
		return userProfileData;
	}
	
	public List<ThaaliData> getThaaliDataFromDB(Date fromDate, Date toDate, String isVisible) throws Exception{
		ThaaliDataDAO thaaliDataDAO = new ThaaliDataDAOImpl();		
		List<ThaaliData> thaaliDataList = null;
		Boolean isVisibleFlag = null;
		if(isVisible != null){
			isVisibleFlag = Boolean.valueOf(isVisible);
		}
		thaaliDataList = thaaliDataDAO.getThaaliData2(fromDate, toDate, isVisibleFlag);
		
		return thaaliDataList;
	}
	
	/**
	 * 
	 * @param returnVal
	 * @param msg
	 * @param operation
	 * @return
	 */
	public boolean isOperationSuccessful(int returnVal, String msg, String operation){
		boolean isError = false;
		if(returnVal == 1){
			//Row created in the db succesfully.
			msg += operation +" executed successfully";	
			Logger.info(COMP_NAME, msg);
		}else{
			//Update did not happen successfully.
			msg += operation + " did not execute successfully";	
			Logger.error(COMP_NAME, msg);
			isError = true;
		}
		return isError;
	}
	
	
	
	
	
}
 