package org.daawat.fmb.web.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.daawat.fmb.api.db.ThaaliDataDAO;
import org.daawat.fmb.api.db.ThaaliFeedbackDAO;
import org.daawat.fmb.api.db.UserThaaliDataDAO;
import org.daawat.fmb.api.enums.ThaaliStatus;
import org.daawat.fmb.api.enums.UserRole;
import org.daawat.fmb.api.enums.UserThaaliStatus;
import org.daawat.fmb.api.objects.Request;
import org.daawat.fmb.api.objects.Response;
import org.daawat.fmb.api.objects.ThaaliData;
import org.daawat.fmb.api.objects.ThaaliFeedback;
import org.daawat.fmb.api.objects.UserProfileData;
import org.daawat.fmb.api.objects.UserThaaliData;
import org.daawat.fmb.api.objects.UserThaaliDayWiseData;
import org.daawat.fmb.api.objects.UserThaaliReport;
import org.daawat.fmb.api.objects.UserThaaliView;
import org.daawat.fmb.impl.daos.ThaaliDataDAOImpl;
import org.daawat.fmb.impl.daos.ThaaliFeedbackDAOImpl;
import org.daawat.fmb.impl.daos.UserThaaliDataDAOImpl;
import org.daawat.fmb.utils.DateUtils;
import org.daawat.fmb.utils.Logger;
import org.daawat.fmb.utils.PropertyFileManager;
import org.daawat.fmb.utils.StringUtils;
import org.daawat.fmb.utils.Utils;

@Path("/user")
public class UserThaaliDataService extends BaseService{

	private static final String COMP_NAME = "UserThaaliDataService";
	private static final String DATE_PATTERN = "MM/dd/yyyy";
	
	
	
	
	/**
	 * This method would be used by the user who wants to view his/her ThaaliData over the period of time, so that he can make modifications to it.
	 * @param eJamaatId
	 * @param password
	 * @param fromThaaliDate
	 * @param toThaaliDate
	 * @return
	 */
	@GET
	@Path("/getThaaliData")
	@Produces({MediaType.APPLICATION_XML,MediaType.APPLICATION_JSON})
	
	public  Response<UserThaaliView> getUserThaaliData(@QueryParam("ejamaatId")String eJamaatId, @QueryParam("password")String password, @QueryParam("fromDate")String fromThaaliDate, @QueryParam("toDate")String oToDate){
		String msg = "";
		boolean isError = false;
		UserProfileData userProfileData = null;
		List<UserThaaliView> userThaaliViewList = null;
		try {
			//Lets get the thaali data from the ThaaliDataService.
			ThaaliDataService thaaliDataService = new ThaaliDataService();
			Response<ThaaliData> thaaliDataResponse = thaaliDataService.getThaaliData(eJamaatId, password, fromThaaliDate, oToDate, Boolean.TRUE.toString());
			if(!thaaliDataResponse.isError()){
				List<ThaaliData> thaaliDataList = thaaliDataResponse.getDataList();
				if(!Utils.isNullOrEmpty(thaaliDataList)){
					userThaaliViewList = new ArrayList<UserThaaliView>();
					//We know for sure that Thaali is visible for duration specified.
					Date startDate = thaaliDataList.get(0).getThaaliDate(); //startDate
					Date endDate = thaaliDataList.get(thaaliDataList.size() - 1).getThaaliDate(); //end date.
				   //Now lets get the UserThaaliData for the startDate and endDate that we got from above.
					UserThaaliDataDAO thaaliDataDAO = new UserThaaliDataDAOImpl();			
					//We already have a handle to the UserProfileData fetched earlier by ThaaliDataService class.
					userProfileData =  thaaliDataService.userProfileData;
					int familyGroupId = userProfileData.getFamilyGroupId();
					List<UserThaaliData> userThaaliDataList = thaaliDataDAO.getThaaliDataPerUser(familyGroupId,startDate, endDate, null);	//No need to pass status as we need all the rows.
					if(userThaaliDataList == null){
						//This means that for the start date and end date there is no UserThaaliData present. 
						//Means user has not yet made any request for thaali yet.						
						userThaaliDataList = new ArrayList<UserThaaliData>();
					}
					
					for(int i=0;i<thaaliDataList.size();i++){
						//for every ThaaliData we need to merge the UserThaaliData also.
						ThaaliData thaaliData = thaaliDataList.get(i);
						Date thaaliDate = thaaliData.getThaaliDate();
						boolean isMatched = false;
						//O(n2)
						UserThaaliData userThaaliData = null;
						for(int j=0;j<userThaaliDataList.size();j++){
							userThaaliData = userThaaliDataList.get(j);
							if(thaaliDate.compareTo(userThaaliData.getThaaliDate()) == 0){
								//This means we found a match, we need to merge.
								isMatched = true;
								break;
								
							}
						}
						
						boolean isLocked = false;
						
						UserThaaliView userThaaliView = new UserThaaliView();
						if(!isMatched){
							//Means we didn't find a match..we need to create a new UserThaaliData object.
							userThaaliData = new UserThaaliData(thaaliDate, userProfileData.getFirstName(), userProfileData.getFamilyName(), userProfileData.getThaaliCategory(), UserThaaliStatus.NOT_REQUESTED_BY_USER, familyGroupId, "", userProfileData.getLocation());
						}
						
						//Check if Thaali is present for the particular day, there can be a scenario where the admin wants the jamaat to know that there is no
						//thaali present for a particular day in event of a miqaat/function. In this case user should not be allowed to mark/update thaali requests.
						if(thaaliData.getStatus().equals(ThaaliStatus.THAALI_NOT_PRESENT)){
							isLocked = true;
							//also mark user status as no..since thaali is not present.
							userThaaliData.setUserThaaliStatus(UserThaaliStatus.NOT_REQUESTED_BY_USER);
						}else{
							//Check if the user can make any modification for the current thaali date at this point in time.
							isLocked = isThresholdReached(thaaliDate);
						}
						
						
						//Populating the UserThaaliView						
						userThaaliView.setLocked(isLocked);
						userThaaliView.setMenu(thaaliData.getMenu());
						userThaaliView.setThaaliDate(thaaliDate);
						userThaaliView.setThaaliDay(thaaliData.getThaaliDay());
						userThaaliView.setThaaliInstructions(thaaliData.getInstructions());
						userThaaliView.setThaaliStatus(thaaliData.getStatus());
						userThaaliView.setUserInstructions(userThaaliData.getUserInstructions());
						userThaaliView.setUserThaaliCategory(userThaaliData.getThaaliCategory());
						userThaaliView.setUserThaaliStatus(userThaaliData.getUserThaaliStatus());
						
						
						userThaaliViewList.add(userThaaliView);						
					}

				}else{
					//No thaali data for the duration requested. Its not an error but no data to display either.
					msg = "Inside getUserThaaliData and no ThaaliData is present for the duration, fromThaaliData "+fromThaaliDate+", toThaaliDate "+oToDate+", for the user with the ejamaatid - "+eJamaatId;
					Logger.info(COMP_NAME,msg);
				}
			}else{
				//Error condition.
				msg = "Inside getUserThaaliData and an error occurred while fetching ThaaliData from the ThaaliDataService for the user with the ejamaatid - "+eJamaatId+",fromThaaliData "+fromThaaliDate+", toThaaliDate "+oToDate;
				Logger.error(COMP_NAME,msg);
				isError = true;
			}
			
		}catch(Exception e){
			msg = "An exception occurred while updating UserThaaliData for the user with the ejamaatid - "+eJamaatId+", stacktrace is "+e;
			Logger.error(COMP_NAME,msg);
			isError = true;
		}
		
		return new Response<UserThaaliView>(userThaaliViewList, msg, isError);
	}
	
	/**
	 * This method would check if the user is allowed to make any further modifications to his/her Thaali Data (i.e Request, Cancel, Modify ).
	 * 
	 * @param thaaliDate
	 */
	private boolean isThresholdReached(Date thaaliDate) throws Exception{
		//Get current date.
		//if thaaliDate - currentDate > 2
		  //return true
		//else return false
		int diff = DateUtils.getDiffWithCurrentDate(thaaliDate);
		int threshold  = PropertyFileManager.getIntValue("thaali_freeze_threshold_days") ;
		if(diff < threshold){
			//Means no further modifications allowed
			return true;
		}else{
			//safe to make modifications since threshold has not been reached yet.
			return false;
		}
		
	}
	
	@POST
	@Path("/updateThaaliData")
	@Consumes(MediaType.APPLICATION_JSON)	
	@Produces({MediaType.APPLICATION_XML,MediaType.APPLICATION_JSON})
	public Response<UserThaaliData> updateUserThaaliData(Request<UserThaaliData> requestObj){
		String msg = "";		
		String eJamaatId = "";
		String logMsg = "";
		boolean isError = false;
		boolean isMatched = false;
		
		try{
			List<UserThaaliData> inputUserThaaliDataList = requestObj.getDataList();
			eJamaatId = requestObj.geteJamaatId();
			String password = requestObj.getPassword();
			//AUthenticate the user first..
			UserProfileData userProfileData = authenticateUser(eJamaatId, password);
			UserThaaliDataDAO userThaaliDAO = new UserThaaliDataDAOImpl();
			ThaaliDataDAO thaaliDataDAO = new ThaaliDataDAOImpl();
			int size = inputUserThaaliDataList.size();
			int familyGroupId = userProfileData.getFamilyGroupId();		
			//Sorting the input data list since we need to make sure the thaali dates are in ascending order.
			Collections.sort(inputUserThaaliDataList);
			Date fromDate = inputUserThaaliDataList.get(0).getThaaliDate();
			Date toDate = inputUserThaaliDataList.get(size-1).getThaaliDate();
			//We are getting the actual thaali's present in the system.
			List<ThaaliData> thaaliDataList = thaaliDataDAO.getThaaliData2(fromDate, toDate, null);
	
			if(!Utils.isNullOrEmpty(thaaliDataList)){
				for(int i=0;i<size;i++){
					UserThaaliData userThaaliData = inputUserThaaliDataList.get(i);						
					Date userThaaliDate = userThaaliData.getThaaliDate();
					
					//For each thaali date lets check if thaali is present for that day.
					isError = false;
					isMatched = false;
					
					for(int j=0;j<thaaliDataList.size();j++){
						ThaaliData thaaliData = thaaliDataList.get(j);
						Date thaaliDate = thaaliData.getThaaliDate();
						if(userThaaliDate.compareTo(thaaliDate) == 0){
							if(ThaaliStatus.THAALI_PRESENT.equals(thaaliData.getStatus()) && thaaliData.isVisible()){
								//Means we have thaali present for the day user has asked
								//Now we need to see if the user can update the thaali request for that day or not.
								if(!isThresholdReached(thaaliDate) || UserThaaliStatus.NOT_REQUESTED_BY_USER.equals(userThaaliData.getUserThaaliStatus())){
									List<UserThaaliData> userThaaliDataList = userThaaliDAO.getThaaliDataPerUser(familyGroupId,thaaliDate, null, null);
									int returnVal = 0;
									if(!Utils.isNullOrEmpty(userThaaliDataList)){
										//Means row exists we need to update.
										UserThaaliData userThaaliDataDB = userThaaliDataList.get(0); //getting the first and the only object..
										userThaaliDataDB.setThaaliCategory(userThaaliData.getThaaliCategory());
										userThaaliDataDB.setUserThaaliStatus(userThaaliData.getUserThaaliStatus());
										userThaaliDataDB.setUserInstructions(userThaaliData.getUserInstructions());
										returnVal = userThaaliDAO.updateUserThaaliData(userThaaliDataDB);							
									}else{
										//Row does not exist
										UserThaaliData userThaaliDataDB = new UserThaaliData(userThaaliData.getThaaliDate(), userProfileData.getFirstName(), userProfileData.getFamilyName(), userThaaliData.getThaaliCategory(), UserThaaliStatus.REQUESTED_BY_USER, familyGroupId, userThaaliData.getUserInstructions(), userProfileData.getLocation());
										returnVal = userThaaliDAO.addUserThaaliData(userThaaliDataDB);					
									}
									
									if(returnVal == 1){
										//Row created in the db succesfully.
										 logMsg = "User Thaali Data updated/created successfully";
									}else{
										//Update did not happen successfully.
										 logMsg = "User Thaali Data did not update/create successfully";
										 isError = true;
									}
								}else{
									//What if the threshold has reached but user wants to change his preference from a YES to NO, that should be allowed.
									logMsg = "User Thaali Data was not updated intentionally since the cut-off date to signup for thaali has passed. Today's date is - "+DateUtils.getCalendar().toString()+", Thaali Date requested is - "+thaaliDate.toString();
								}
							}else{
								//TODO
								if(userThaaliData.getUserThaaliStatus().equals(UserThaaliStatus.REQUESTED_BY_USER)){
									//User has asked for a Thaali but seems there is no Thaali present on this day..
									//This can only happen if during the course of signing up for thaali, the admin has updated the Thaali Status.								
									logMsg = "User Thaali Data cannot be updated successfully since either there is no thaali present on this day anymore or the admin has disabled the thaali data.";
									isError = true;
								}
							}
							
							//Since we found a match.
							isMatched = true;
							break;
						}
					}
					
					//TODO
					if(!isMatched){
						//Update did not happen successfully.
						logMsg = "User Thaali Data did not update/create successfully  since no record for that date was found in the system.";						
						isError = true;
					}
					
					logMsg += " for user with eJamaatId - "+eJamaatId+" and thaali date - "+userThaaliData.getThaaliDate()+",";
					msg += logMsg;
					if(isError){
						Logger.error(COMP_NAME, logMsg);
					}else{
						Logger.info(COMP_NAME, logMsg);
					}

				}
			}else{
				//Update did not happen successfully.
				msg += "User Thaali Data did not update/create successfully since there are no thaali present for the duration "+fromDate+" to "+toDate+" for the user with the ejamaatid - "+eJamaatId+",";
				Logger.error(COMP_NAME,msg);
				isError = true;
			}
			
		}
		catch(Exception e){
			msg += "An exception occurred while updating UserThaaliData for the user with the ejamaatid - "+eJamaatId+", stacktrace is "+e;
			Logger.error(COMP_NAME,msg);
			isError = true;
		}
		
		return new Response<UserThaaliData>(msg, isError);

	}
	
	
	
	
	//Below methods would be invoked by the Thaali Khidmatguzaar who wish to see the thaali count for a given day/day's.
	
	/**
	 * This method would return all the rows from the UserThaaliData table based on the date range and status. The data would be for all the users.
	 * @param eJamaatId
	 * @param password
	 * @param fromThaaliDate
	 * @param toThaaliDate
	 * @param status
	 * @return
	 */
	@GET
	@Path("/getAllUserThaaliData")
	@Produces({MediaType.APPLICATION_XML,MediaType.APPLICATION_JSON})
	
	public  Response<UserThaaliReport> geAllUserThaaliData(@QueryParam("ejamaatId") String eJamaatId, @QueryParam("password") String password,  @QueryParam("fromDate")String fromThaaliDate,  @QueryParam("toDate") String oToThaaliDate, @QueryParam("status")String status){
		String msg = "";
		boolean isError = false;
		List<UserThaaliData> userThaaliDataList  = null;
		Date fromDate = null;
		Date toDate = null;
		UserThaaliStatus userThaaliStatus = null;
		List<UserThaaliReport> userThaaliReports = null;
		try{
			UserThaaliDataDAO userThaaliDataDAO = new UserThaaliDataDAOImpl();
			UserProfileData userProfileData = authenticateUser(eJamaatId, password);
			if(!UserRole.USER.equals(userProfileData.getUserRole())){
				if(!StringUtils.isNullOrEmpty(fromThaaliDate)){
					fromDate = DateUtils.getDate(fromThaaliDate, DATE_PATTERN);		
				}else{
					//we are doing this since fromDate is mandatory...
					fromDate = DateUtils.getCurrentDate();
				}
						
				if(!StringUtils.isNullOrEmpty(oToThaaliDate)){
					toDate = DateUtils.getDate(oToThaaliDate, DATE_PATTERN);
				}
				
				if(!StringUtils.isNullOrEmpty(status)){
					userThaaliStatus = UserThaaliStatus.getEnum(status);
				}else{
					//We are doing this since by default the Thaali Khidmat Guzaar would be interested in seeing only the list of requested thaalis.
					userThaaliStatus = UserThaaliStatus.REQUESTED_BY_USER;
				}

				//we need to get the number of days from the THAALI_DATA_TBL for which thaali is present and also it should be visible to the users.
				ThaaliDataDAO thaaliDataDAO = new ThaaliDataDAOImpl();		
				List<ThaaliData> thaaliDataList = thaaliDataDAO.getThaaliData(fromDate, toDate, ThaaliStatus.THAALI_PRESENT);
				
				Map<Date, String> dateMap = new LinkedHashMap<Date, String>();
				if(thaaliDataList != null){
					for(int i=0;i<thaaliDataList.size();i++){
						ThaaliData thaaliData = thaaliDataList.get(i);
						if(thaaliData.isVisible()){
							//Only interested in days which are visible.
							dateMap.put(thaaliData.getThaaliDate(), thaaliData.getMenu());
							
						}
					}
					
					if(dateMap.size() > 0){
						//since we know for sure that there are thaalis present for the date range given...lets get the thaali data for all users.
						userThaaliDataList = userThaaliDataDAO.getThaaliDataAllUsers(fromDate, toDate, userThaaliStatus);
						
						if(UserThaaliStatus.REQUESTED_BY_USER.equals(userThaaliStatus)){
							//In this case we are also interested in getting the thaalis with no rice as well...
							userThaaliDataList.addAll(userThaaliDataDAO.getThaaliDataAllUsers(fromDate, toDate, UserThaaliStatus.REQUESTED_WITH_NO_RICE));
						}
						
						/*the data returned from the above call would contain multiple rows per family and each row representing one day of thaali. we need to convert it to one row per family
						with multiple columns each column representing one day of thaali.*/						
						if(userThaaliDataList != null && userThaaliDataList.size() > 0){
							
							int previousGroupId = -1;
							userThaaliReports = new ArrayList<UserThaaliReport>();
							UserThaaliReport userThaaliReport = null;
							for(int i=0;i<userThaaliDataList.size();i++){
								UserThaaliData userThaaliData = userThaaliDataList.get(i);
								int groupId = userThaaliData.getFamilyGroupId();
								
								if(previousGroupId != groupId){
									List<UserThaaliDayWiseData> userThaaliDayWiseData = getUserThaaliDayWiseData(dateMap, groupId, userThaaliDataList);
									userThaaliReport = new UserThaaliReport();									
									userThaaliReport.setFamilyGroupId(groupId);
									userThaaliReport.setFamilyName(userThaaliData.getFamilyName());
									userThaaliReport.setFirstName(userThaaliData.getFirstName());
									userThaaliReport.setLocation(userThaaliData.getLocation());	
									userThaaliReport.setUserThaaliDayWiseData(userThaaliDayWiseData);
									previousGroupId = groupId;
									
									userThaaliReports.add(userThaaliReport);
								}																
							} 
							
						}else{
							//no users have signed for thaalis during this date range, log and return an empty array.
							msg = "No users have signed up for thaalis during the range - fromDate - "+fromThaaliDate+",toDate -"+oToThaaliDate+",status -"+status+" ";
							Logger.info(COMP_NAME, msg);	
						}
						
					}else{
						//der is no thaalis present for the date specified. return an empty array
						msg = "No thaalis are present that are currently visible to the users for the given date range, fromDate - "+fromThaaliDate+",toDate -"+oToThaaliDate+",status -"+status+" ";
						Logger.info(COMP_NAME, msg);	
					}
					
				}else{
					//der is no thaalis present for the date specified. return an empty array
					msg = "No thaalis are present for the given date range, fromDate - "+fromThaaliDate+",toDate -"+oToThaaliDate+",status -"+status+" ";
					Logger.info(COMP_NAME, msg);
				}	
			}
			else{
				msg = "User with the given ejamaat id - "+eJamaatId+" is not authorized to see this data.";
				Logger.error(COMP_NAME, msg);
				isError = true;					
			}		
		}catch(Exception ex){
			msg = "An exception has occurred inside geAllUserThaaliData for the i/p fromDate - "+fromThaaliDate+",toDate -"+oToThaaliDate+",status -"+status+" for ejamaat id";
			Logger.error(COMP_NAME, msg, ex);
			isError = true;
		}
		return new Response<UserThaaliReport>(userThaaliReports, msg, isError);
	}
	
	/**
	 * Convenience method to get the container object for the user thaali view.
	 * @param dateList
	 * @param groupId
	 * @param userThaaliDataList
	 * @return
	 */
	public List<UserThaaliDayWiseData> getUserThaaliDayWiseData(Map<Date, String> dateMap, int groupId, List<UserThaaliData> userThaaliDataList){
		List<UserThaaliDayWiseData> userThaaliDayWiseDataList = new ArrayList<UserThaaliDayWiseData>(dateMap.size());
		for(Map.Entry<Date, String> entry: dateMap.entrySet()){
			Date date = entry.getKey();
			String menu = entry.getValue();
			boolean isMatched = false;
			
			UserThaaliDayWiseData userThaaliDayWiseData = new UserThaaliDayWiseData();
			userThaaliDayWiseData.setThaaliDate(date);
			userThaaliDayWiseData.setMenu(menu);
			for(int j=0;j<userThaaliDataList.size();j++){
				UserThaaliData userThaaliData = userThaaliDataList.get(j);
				if(userThaaliData.getFamilyGroupId() == groupId && userThaaliData.getThaaliDate().compareTo(date) == 0){
					//Matched
					isMatched = true;	
					userThaaliDayWiseData.setUserThaaliStatus(userThaaliData.getUserThaaliStatus());
					userThaaliDayWiseData.setThaaliCategory(userThaaliData.getThaaliCategory());
					break;
				}
			}
			if(!isMatched){
				userThaaliDayWiseData.setUserThaaliStatus(UserThaaliStatus.NOT_REQUESTED_BY_USER);
			}
			
			userThaaliDayWiseDataList.add(userThaaliDayWiseData);
		}
		return userThaaliDayWiseDataList;
	}
	
	
	@POST
	@Path("/submitFeedback")
	@Consumes(MediaType.APPLICATION_JSON)	
	@Produces({MediaType.APPLICATION_XML,MediaType.APPLICATION_JSON})
	public Response<ThaaliFeedback> submitThaaliFeedback(Request<ThaaliFeedback> requestObj){
		String msg = "";
		boolean isError = false;
		int returnVal = -1;
		
		try{
			authenticateUser(requestObj.geteJamaatId(), requestObj.getPassword());
			ThaaliFeedbackDAO feedbackDAO =  new ThaaliFeedbackDAOImpl();
			ThaaliFeedback thaaliFeedback = requestObj.getDataList().get(0); //Since for a given request only one feedback can be submitted.
			returnVal = feedbackDAO.addFeedback(thaaliFeedback);
			isError = isOperationSuccessful(returnVal, msg, "Submit Feedback");
		}catch(Exception e){
			msg = "An exception has occurred inside submitThaaliFeedback.";
			Logger.error(COMP_NAME, msg, e);
			isError = true;
		}
		return new Response<ThaaliFeedback>(msg, isError);
	}
	
	
}
