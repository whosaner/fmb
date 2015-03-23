package org.daawat.fmb.web.service;

import java.util.Date;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.daawat.fmb.api.db.ThaaliDataDAO;
import org.daawat.fmb.api.objects.Response;
import org.daawat.fmb.api.objects.ThaaliData;
import org.daawat.fmb.impl.daos.ThaaliDataDAOImpl;
import org.daawat.fmb.utils.DateUtils;
import org.daawat.fmb.utils.Logger;
import org.daawat.fmb.utils.PropertyFileManager;
import org.daawat.fmb.utils.StringUtils;

@Path("/thaali")
public class ThaaliDataService extends BaseService{

	private static final String COMP_NAME = "ThaaliDataService";
	private static final String DATE_PATTERN = "MM/dd/yyyy";
	
	
	
    /**
     * Generic method used to get the thaali data based on the input params.
     * @param fromThaaliDate
     * @param toThaaliDate
     * @param status
     * @return
     */
	@GET
	@Path("/getThaaliData")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})	
	public  Response<ThaaliData> getThaaliData(@QueryParam("ejamaatId")String eJamaatId, @QueryParam("password")String password, @QueryParam("fromDate")String fromThaaliDate, @QueryParam("toDate")String oToThaaliDate, @QueryParam("isVisible")String oIsVisible){
		String msg = "";
		boolean isError = false;
		List<ThaaliData> thaaliDataList  = null;		
		try{
			authenticateUser(eJamaatId, password);			
			Date fromDate = null;
			Date toDate = null;
			
			if (StringUtils.isNullOrEmpty(fromThaaliDate)) {
				//If fromDate is null we set it with current date.			
				fromDate = DateUtils.getCurrentDate();							
			}else{
				fromDate = DateUtils.getDate(fromThaaliDate, DATE_PATTERN);
			}
			
			if (StringUtils.isNullOrEmpty(oToThaaliDate)) {
				// If toDate is null we default to number of rows set in the properties file.
				Integer numOfDays = PropertyFileManager.getIntValue("num_of_days_to_display");
				//we need to advance "numOfDays" from the given thaaliDate.
				toDate = DateUtils.getToDate(fromDate, numOfDays);							
			}else{
				toDate = DateUtils.getDate(oToThaaliDate, DATE_PATTERN);
			}
			
			//Getting thaali data only if the user is authorized.
			thaaliDataList = getThaaliDataFromDB(fromDate, toDate, oIsVisible);
			
		}catch(Exception ex){
			msg = "An exception has occurred inside getThaaliData for the i/p fromDate - "+fromThaaliDate+",toDate -"+oToThaaliDate+",isVisible -"+oIsVisible;
			Logger.error(COMP_NAME, msg, ex);
			isError = true;
		}
		
		return new Response<ThaaliData>(thaaliDataList, msg, isError);
	}
	
	
	/**
	 * Method used to get the list of all open days (i.e days on which nobody has volunteered to prepare thaali)
	 * @param eJamaatId
	 * @param password
	 * @param fromThaaliDate
	 * @return
	 */
	@GET
	@Path("/getOpenThaaliDays")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})	
	public  Response<ThaaliData> getThaaliDataOpenDates(@QueryParam("ejamaatId")String eJamaatId, @QueryParam("password")String password, @QueryParam("fromDate")String fromThaaliDate){
		String msg = "";
		boolean isError = false;
		List<ThaaliData> thaaliDataList = null;
		try {
			authenticateUser(eJamaatId, password);
			Date fromDate = null;
			if (StringUtils.isNullOrEmpty(fromThaaliDate)) {
				// If fromDate is null we set it with current date.
				fromDate = DateUtils.getCurrentDate();
			} else {
				fromDate = DateUtils.getDate(fromThaaliDate, DATE_PATTERN);
			}

			// Getting thaali data only if the user is authorized.
			ThaaliDataDAO thaaliDataDAO = new ThaaliDataDAOImpl();
			thaaliDataList = thaaliDataDAO.getThaaliDataOpenDates(fromDate);

		} catch (Exception ex) {
			msg = "An exception has occurred inside getThaaliDataOpenDates for the i/p fromDate - "+ fromThaaliDate;
			Logger.error(COMP_NAME, msg, ex);
			isError = true;
		}

		return new Response<ThaaliData>(thaaliDataList, msg, isError);
	}
	
}
