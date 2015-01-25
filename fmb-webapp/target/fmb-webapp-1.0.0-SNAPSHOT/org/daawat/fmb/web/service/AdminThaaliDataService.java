package org.daawat.fmb.web.service;

import java.util.Collections;
import java.util.Date;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.daawat.fmb.api.db.ThaaliDataDAO;
import org.daawat.fmb.api.db.ThaaliFeedbackDAO;
import org.daawat.fmb.api.db.ThaaliMenuDAO;
import org.daawat.fmb.api.db.ThaaliRegionDAO;
import org.daawat.fmb.api.db.UserProfileDataDAO;
import org.daawat.fmb.api.enums.UserRole;
import org.daawat.fmb.api.objects.Request;
import org.daawat.fmb.api.objects.Response;
import org.daawat.fmb.api.objects.ThaaliData;
import org.daawat.fmb.api.objects.ThaaliFeedback;
import org.daawat.fmb.api.objects.ThaaliMenu;
import org.daawat.fmb.api.objects.ThaaliRegion;
import org.daawat.fmb.api.objects.UserProfileData;
import org.daawat.fmb.impl.daos.ThaaliDataDAOImpl;
import org.daawat.fmb.impl.daos.ThaaliFeedbackDAOImpl;
import org.daawat.fmb.impl.daos.ThaaliMenuDAOImpl;
import org.daawat.fmb.impl.daos.ThaaliRegionDAOImpl;
import org.daawat.fmb.impl.daos.UserProfileDataDAOImpl;
import org.daawat.fmb.utils.Logger;
import org.daawat.fmb.utils.Utils;

@Path("/admin")
public class AdminThaaliDataService extends BaseService{
	
	private static final String COMP_NAME = "AdminThaaliDataService";

	@POST
	@Path("/addMenu")
	@Consumes(MediaType.APPLICATION_JSON)	
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Response<ThaaliMenu> addMenu(Request<ThaaliMenu> requestObj){
		String msg = "";  
		boolean isError = false;
		int returnVal = -1;
		
		try{
			if(isSuperUser(requestObj, msg)){
				ThaaliMenuDAO thaaliMenuDAO = new ThaaliMenuDAOImpl();
				List<ThaaliMenu> thaaliMenus = requestObj.getDataList();
				if(thaaliMenus != null && !thaaliMenus.isEmpty()){
					for(ThaaliMenu menu:thaaliMenus){
						returnVal = thaaliMenuDAO.addMenu(menu);
						isError = isOperationSuccessful(returnVal, msg, "Add Menu");
						if(isError){
							break;//no need to proceed, since an error has occurred.
						}
					}
				}else{
					msg = "Menu list is empty";
					Logger.error(COMP_NAME, msg);
					isError = true;
				}				
			}
		}catch(Exception e){
			msg = "Menu cannot be added since an exception has occurred inside addMenu method, stacktrace is "+e;
			Logger.error(COMP_NAME, msg,e);
			isError = true;
		}		
		return new Response<ThaaliMenu>(msg, isError);		
	}
	
	@POST
	@Path("/addRegion")
	@Consumes(MediaType.APPLICATION_JSON)	
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Response<ThaaliRegion> addRegion(Request<ThaaliRegion> requestObj){
		String msg = "";  
		boolean isError = false;
		int returnVal = -1;
		
		try{
			if(isSuperUser(requestObj, msg)){
				ThaaliRegionDAO thaaliRegionDAO = new ThaaliRegionDAOImpl();
				List<ThaaliRegion> thaaliRegions = requestObj.getDataList();
				if(thaaliRegions != null && !thaaliRegions.isEmpty()){
					for(ThaaliRegion region:thaaliRegions){
						returnVal = thaaliRegionDAO.addRegion(region);
						isError = isOperationSuccessful(returnVal, msg, "Add Region");
						if(isError){
							break;//no need to proceed, since an error has occurred.
						}
					}
				}else{
					msg = "Region list is empty";
					Logger.error(COMP_NAME, msg);
					isError = true;
				}				
			}
		}catch(Exception e){
			msg = "Region cannot be added since an exception has occurred inside addRegion method, stacktrace is "+e;
			Logger.error(COMP_NAME, msg,e);
			isError = true;
		}
		
		return new Response<ThaaliRegion>(msg, isError);
	}
	
	@GET
	@Path("/getAllUserProfileData")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Response<UserProfileData> getAllUserProfileData(@QueryParam("ejamaatId")String eJamaatId, @QueryParam("password")String password){
		String msg = "";  
		boolean isError = false;
		List<UserProfileData> userProfileDataList = null;
		
		try{
			Request<UserProfileData> requestObj = new Request<UserProfileData>();
			requestObj.seteJamaatId(eJamaatId);
			requestObj.setPassword(password);
			
			if(isSuperUser(requestObj, msg)){			
				UserProfileDataDAO userProfileDataDAO = new UserProfileDataDAOImpl();				
				userProfileDataList = userProfileDataDAO.getAllUserProfileData();
				
				if(userProfileDataList == null || userProfileDataList.isEmpty()){
					msg = "There are no user profiles entered yet.";
					Logger.error(COMP_NAME, msg);
					isError = true;
				}								
			}
		}catch(Exception e){
			msg = "An exception has occurred inside getAllUserProfileData method, stacktrace is "+e;
			Logger.error(COMP_NAME, msg,e);
			isError = true;
		}		
		return new Response<UserProfileData>(userProfileDataList, msg, isError);
	}
	
	
	
	@GET
	@Path("/getFeedback")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Response<ThaaliFeedback> getFeedback(@QueryParam("ejamaatId")String eJamaatId, @QueryParam("password")String password, @QueryParam("limit")String limit){
		String msg = "";  
		boolean isError = false;
		int rowLimit = 0;
		List<ThaaliFeedback> thaaliFeedbackList = null;
		
		try{
			Request<ThaaliFeedback> requestObj = new Request<ThaaliFeedback>();
			requestObj.seteJamaatId(eJamaatId);
			requestObj.setPassword(password);
			
			if(isSuperUser(requestObj, msg)){			
				ThaaliFeedbackDAO thaaliFeedbackDAO = new ThaaliFeedbackDAOImpl();
				if(limit != null && limit.trim().length() > 0){
					try{
						rowLimit = Integer.parseInt(limit);
					}catch(Exception e){
						rowLimit = 0;
					}
				}
				
				if(rowLimit == 0){
					thaaliFeedbackList = thaaliFeedbackDAO.getThaaliFeedbackAll();
				}else{
					thaaliFeedbackList = thaaliFeedbackDAO.getThaaliFeedbackNRows(rowLimit);
				}
				
				if(thaaliFeedbackList == null || thaaliFeedbackList.isEmpty()){
					msg = "There are no feedbacks entered yet.";
					Logger.info(COMP_NAME, msg);
				}
								
			}
		}catch(Exception e){
			msg = "An exception has occurred inside getFeedback method, stacktrace is "+e;
			Logger.error(COMP_NAME, msg,e);
			isError = true;
		}
		
		return new Response<ThaaliFeedback>(thaaliFeedbackList, msg, isError);
	}
	
	
	
	/**
	 * Method that would create a user profile in the db.
	 * @param eJamaatId
	 * @param password
	 * @param hofEJamaatId
	 * @param familyName
	 * @param firstName
	 * @param thaaliCategory
	 * @param location
	 * @param familyGroupId
	 * @return
	 */
	//POST Method
	@POST
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Path("/createProfile")
	
	public Response<UserProfileData> createUserProfile(Request<UserProfileData> userProfileDataReqObj){
		 String msg = "";  
		 boolean isError = false;
		try{
			if(isSuperUser(userProfileDataReqObj, msg)){
				 UserProfileData userProfileDataObj =  userProfileDataReqObj.getDataList().get(0); //since we would get request for creating only one profile at a time.								
				 UserProfileDataDAO userProfileDataDAO = new UserProfileDataDAOImpl();
				
				if(userProfileDataObj.getFamilyGroupId() < 0){
					//Also if familyGroupId is set to -1 or less than 0 that means we need to generate a new familyGroupId(since it would be new user, new family). 
					int familyGroupId = userProfileDataDAO.getMaxFamilyGroupId();
					userProfileDataObj.setFamilyGroupId(familyGroupId+1); //incrementing it by 1.
				}									
				int returnVal = userProfileDataDAO.createUserProfileData(userProfileDataObj);
				isError = isOperationSuccessful(returnVal, msg, "User Profile Creation ");							
			}			
		}catch(Exception e){
			msg = "User profile cannot be created since an exception has occurred inside createUserProfile method, stacktrace is "+e;
			Logger.error(COMP_NAME, msg,e);
			isError = true;			
		} 
		return new Response<UserProfileData>(msg, isError);		
	}
	
	

	//POST
	/**
	 * This method would create a row in the ThaaliData table if the row does not exists else will update a row . Note that this method can be invoked only by a user whose role is SUPER_USER
	 * @param eJamaatId
	 * @param password
	 * @param thaaliDate
	 * @param thaaliDay
	 * @param menu
	 * @param cookName
	 * @param instructions
	 * @param adminName
	 * @return
	 */
	@POST
	@Path("/updateThaaliData")
	@Consumes(MediaType.APPLICATION_JSON)	
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Response<ThaaliData> updateThaaliData(Request<ThaaliData> requestObj){
		//Check if the user is authorized to insert a row in THAALI_DATA_TBL, by querying the USER_PROFILE_TBL to see if the user is an admin.
		  //If ADMIN, check if row already exists for that date.
		   //If not, create it.
		//String eJamaatId, String password, String thaaliDate, String thaaliDay, String menu, String cookName, String instructions, String adminName, String isVisible
		String msg = "";
		boolean isError = false;
		String eJamaatId = "";
		String logMsg = "";
		try{
			eJamaatId = requestObj.geteJamaatId();
			//Get the user profile data from the UserProfileService
			userProfileData = authenticateUser(eJamaatId, requestObj.getPassword());
			
			if(isSuperUser(requestObj,msg)){
				//only user with role as SUPER_USER is authorized to insert a row in db.
				List<ThaaliData> inputThaaliDataList = requestObj.getDataList();
				int size = inputThaaliDataList.size();
				
				//Sorting the input data list since we need to make sure the thaali dates are in ascending order.
				Collections.sort(inputThaaliDataList);
				Date fromDate = inputThaaliDataList.get(0).getThaaliDate();
				Date toDate = inputThaaliDataList.get(size-1).getThaaliDate();
				//Getting the list of thaalis from the DB.
				List<ThaaliData> thaaliDataList = getThaaliDataFromDB(fromDate,toDate,null);
				ThaaliDataDAO thaaliDataDAO = new ThaaliDataDAOImpl();
				
				
				for(int i=0;i<inputThaaliDataList.size();i++){
					//Iterating over all the thaali data object.
					ThaaliData thaaliData = inputThaaliDataList.get(i);															
					
					//User authorized to create thaali data. Means the given user has a super_user role.
					//We need to check if thaali data already exists for that date or not.
					
					Date thaaliDate = thaaliData.getThaaliDate();
					boolean isMatched = false;
					int returnVal = 0;
					if(!Utils.isNullOrEmpty(thaaliDataList)){
						for(int j=0;j<thaaliDataList.size();j++){
							ThaaliData thaaliDataDB = thaaliDataList.get(j);
							Date thaaliDateInDB = thaaliDataDB.getThaaliDate();
							if(thaaliDate.compareTo(thaaliDateInDB) == 0){
								//Means we need to update.
								//Data already exists, lets update							
								returnVal = thaaliDataDAO.updateThaaliData(thaaliData);								
								isMatched = true;
								break;
							}
						}
					}
					
					if(!isMatched){
						//NO data exists, lets create a row for thaali data.											
						//INvoking the ThaaliDataDAO Impl with the thaali data, the DAO will insert a row in the DB.												
						returnVal =thaaliDataDAO.createThaaliData(thaaliData);
					}
					
					isError = isOperationSuccessful(returnVal, msg, "User Thaali Data for user with eJamaatId - "+eJamaatId+" and thaali date"+thaaliDate);						
				}

			}			
		}catch(Exception e){
			msg += "Exception occurred inside createThaaliData while creating a row for ThaaliData for the user with the eJamaatId - "+eJamaatId+", stack trace is "+e;
			Logger.error(COMP_NAME, logMsg,e);
			isError = true;
		}
		
		return new Response<ThaaliData>(msg, isError);
	}
	
	
	/**
	 * Convenience method to check if the user is a super user or not.
	 * @param requestObj
	 * @param msg
	 * @return
	 * @throws Exception
	 */
	public <T> boolean isSuperUser(Request<T> requestObj, String msg) throws Exception{
		boolean isSuperUser = true;
		UserProfileData adminUserProfileData  = authenticateUser(requestObj.geteJamaatId(), requestObj.getPassword());
		if(!UserRole.SUPER_USER.equals(adminUserProfileData.getUserRole())){	
			msg += "User with the eJamaatId - "+requestObj.geteJamaatId()+" is not authorized to perform this operation, the role of the User in the system is- "+adminUserProfileData.getUserRole();
			Logger.error(COMP_NAME, msg);
			isSuperUser = false;
		}
		return isSuperUser;
	}
	
	
}
