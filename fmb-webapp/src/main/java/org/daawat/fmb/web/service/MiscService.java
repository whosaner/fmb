package org.daawat.fmb.web.service;

import java.util.Date;
import java.util.List;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.daawat.fmb.api.db.ThaaliCountDAO;
import org.daawat.fmb.api.db.ThaaliMenuDAO;
import org.daawat.fmb.api.db.ThaaliRegionDAO;
import org.daawat.fmb.api.objects.Response;
import org.daawat.fmb.api.objects.ThaaliCount;
import org.daawat.fmb.api.objects.ThaaliMenu;
import org.daawat.fmb.api.objects.ThaaliRegion;
import org.daawat.fmb.impl.daos.ThaaliCountDAOImpl;
import org.daawat.fmb.impl.daos.ThaaliMenuDAOImpl;
import org.daawat.fmb.impl.daos.ThaaliRegionDAOImpl;
import org.daawat.fmb.utils.DateUtils;
import org.daawat.fmb.utils.Logger;
import org.daawat.fmb.utils.StringUtils;

@Path("/misc")
public class MiscService extends BaseService{

	private static final String COMP_NAME = "MiscService";
	private static final String DATE_PATTERN = "MM/dd/yyyy";
	private final int NUM_OF_DAYS = 7;
	
	@GET
	@Path("/getMenu")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Response<ThaaliMenu> getMenu(@QueryParam("ejamaatId")String eJamaatId, @QueryParam("password")String password){
		String msg = "";
		boolean isError = false;
		List<ThaaliMenu> thaaliMenuList = null;
		try{
			authenticateUser(eJamaatId, password);			
			ThaaliMenuDAO thaaliMenuDAO = new ThaaliMenuDAOImpl();
			thaaliMenuList = thaaliMenuDAO.getMenuList();
			if(thaaliMenuList == null || thaaliMenuList.isEmpty()){
				isError = true;
				msg = "No menu items have been added yet.";
			}
			
		}catch(Exception ex){
			msg = "An exception has occurred inside getMenu for the i/p eJamaatId - "+eJamaatId+",password -"+password;
			Logger.error(COMP_NAME, msg, ex);
			isError = true;
		}
		return new Response<ThaaliMenu>(thaaliMenuList, msg, isError);
	}
	
	@GET
	@Path("/getRegion")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Response<ThaaliRegion> getRegion(@QueryParam("ejamaatId")String eJamaatId, @QueryParam("password")String password){
		String msg = "";
		boolean isError = false;
		List<ThaaliRegion> thaaliRegionList = null;
		try{
			authenticateUser(eJamaatId, password);			
			ThaaliRegionDAO thaaliRegionDAO = new ThaaliRegionDAOImpl();
			thaaliRegionList = thaaliRegionDAO.getRegions();
			if(thaaliRegionList == null || thaaliRegionList.isEmpty()){
				isError = true;
				msg = "No regions currently present.";
			}			
		}catch(Exception ex){
			msg = "An exception has occurred inside getRegion for the i/p eJamaatId - "+eJamaatId+",password -"+password;
			Logger.error(COMP_NAME, msg, ex);
			isError = true;
		}
		return new Response<ThaaliRegion>(thaaliRegionList, msg, isError);
	}
	
	@GET
	@Path("/getThaaliCount")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Response<ThaaliCount> getThaaliCount(@QueryParam("ejamaatId")String eJamaatId, @QueryParam("password")String password, @QueryParam("fromDate")String fromThaaliDate, @QueryParam("toDate")String toThaaliDate){
		String msg = "";
		boolean isError = false;
		List<ThaaliCount> thaaliCounts = null;
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
			
			if (StringUtils.isNullOrEmpty(toThaaliDate)) {
				// If toDate is null we default to number of rows set in the properties file.
				//we need to advance "numOfDays" from the given thaaliDate.
				toDate = DateUtils.getToDate(fromDate, NUM_OF_DAYS);							
			}else{
				toDate = DateUtils.getDate(toThaaliDate, DATE_PATTERN);
			}
			
			ThaaliCountDAO thaaliCountDAO = new ThaaliCountDAOImpl();
			thaaliCounts = thaaliCountDAO.getThaaliCounts(fromDate, toDate);
			
			if(thaaliCounts == null || thaaliCounts.isEmpty()){
				isError = true;
				msg = "No thaalis currently present.";
			}			
		}catch(Exception ex){
			msg = "An exception has occurred inside getThaaliCount for the i/p eJamaatId - "+eJamaatId+",password -"+password;
			Logger.error(COMP_NAME, msg, ex);
			isError = true;
		}
		return new Response<ThaaliCount>(thaaliCounts, msg, isError);
	}
}
