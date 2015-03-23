package org.daawat.fmb.web.service;

import javax.ws.rs.Consumes;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;

import org.daawat.fmb.api.db.UserProfileDataDAO;
import org.daawat.fmb.api.objects.Response;
import org.daawat.fmb.api.objects.UserCredentialData;
import org.daawat.fmb.api.objects.UserProfileData;
import org.daawat.fmb.impl.daos.UserProfileDataDAOImpl;
import org.daawat.fmb.utils.Logger;

@Path("/profile")
public class UserProfileService extends BaseService{

	private static final String COMP_NAME = "UserProfileService";
	/**
	 * This method would return the user profile data if the user is present in the db with the below credentials else would return an 
	 * exception with the response.
	 * @param ejamaatId
	 * @param password
	 * @return
	 */
	
	@GET
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Path("/getProfile")
	public Response<UserProfileData> getUserProfile(@QueryParam("ejamaatId") String ejamaatId, @QueryParam("password") String password){
		UserProfileData userProfileData = null;
		boolean isError = false;
		String msg = "";
		
		try{
			userProfileData = authenticateUser(ejamaatId, password);
		}catch(Exception e){
			msg = "An exception has occurred inside getUserProfile method for the ejamaat id - "+ejamaatId+", stacktrace is -" + e.getMessage();
			Logger.error(COMP_NAME, msg, e);
			isError = true;
		}
		return new Response<UserProfileData>(userProfileData,msg,isError);
		
	}
	
	
	
	
	/**
	 * Updates the user profile in the DB.
	 * @param eJamaatId
	 * @param password
	 * @param hofEJamaatId
	 * @param familyName
	 * @param firstName
	 * @param thaaliCategory
	 * @param location
	 * @return
	 */
	
	@POST
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Consumes(MediaType.APPLICATION_JSON)
	@Path("/updateProfile")
	public Response<UserProfileData> updateUserProfile(UserProfileData userProfileData){		
		//Check if user exists in the database.
		 //if it does return with msg.
		 //if it does not. create one.
		 String msg = "";  
		 boolean isError = false;
		 String eJamaatId = null;
		try{
			
			UserProfileDataDAO userProfileDataDAO = new UserProfileDataDAOImpl();
			UserCredentialData ucd = userProfileData.getUserCredentials();
			eJamaatId = ucd.geteJamaatId();
			authenticateUser(ucd.geteJamaatId(), ucd.getPassword());
			//Update only if the user exists in the database.			
			int returnVal = userProfileDataDAO.updateUserProfileData(userProfileData);
			if(returnVal == 1){
				//Row updated in the db succesfully.
				msg = "User Profile updated successfully for user with eJamaatId - "+eJamaatId;	
				Logger.info(COMP_NAME, msg);
			}else{
				//Update did not happen successfully.
				msg = "User Profile did not update successfully for user with eJamaatId - "+eJamaatId;	
				Logger.error(COMP_NAME, msg);
				isError = true;
			}
			
		}catch(Exception e){
			msg = "User profile cannot be updated since an exception has occurred inside updateUserProfile method for the ejamaat id - "+eJamaatId+", stacktrace is "+e;
			Logger.error(COMP_NAME, msg,e);
			isError = true;
			
		}
		
		return new Response<UserProfileData>(msg, isError);
	}
	
	
	@POST
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Path("/updatePassword")
	public Response<UserProfileData> updatePassword(@FormParam("ejamaatId") String eJamaatId, @FormParam("oldPassword") String oldPassword, @FormParam("newPassword") String newPassword){
		//Check if user exists in the db.
		 String msg = "";  
		 boolean isError = false;
		try{
			authenticateUser(eJamaatId, oldPassword);
			//Means user is valid.			
			UserProfileDataDAO userProfileDAO = new UserProfileDataDAOImpl();
			int returnVal = userProfileDAO.updateUserProfileData(eJamaatId,oldPassword,newPassword);
			if(returnVal == 1){
				//Row updated in the db succesfully.
				msg = "User Password updated successfully for user with eJamaatId - "+eJamaatId;	
				Logger.info(COMP_NAME, msg);
			}else{
				//Update did not happen successfully.
				msg = "User Password did not update successfully for user with eJamaatId - "+eJamaatId;	
				Logger.error(COMP_NAME, msg);
				isError = true;
			}
		}catch(Exception e){
			msg = "Cannot update user password for the ejamaat id - "+eJamaatId+", an exception has occurred, stacktrace is "+e;
			Logger.error(COMP_NAME, msg);
			isError = true;
		}
		
		return new Response<UserProfileData>(msg, isError);
		
		
	}
	
	@GET
	@Produces(MediaType.APPLICATION_JSON)
	@Path("/getJson/{numOfRows}/{numOfCols}")
	public String getJson(@PathParam("numOfRows") int numOfRows,@PathParam("numOfCols") int numOfCols){

		StringBuilder sb = new StringBuilder();
		sb.append("{\"d\" : {\"results\" :");
		sb.append("[");
		for(int i=0;i<numOfRows;i++){
			sb.append("{");
			sb.append("\"__metadata\" : {\"uri\" : \"http://cdtssoa101d.rxcorp.com:8680/odata/GossipPilot/Tables(Name='Columns',SchemaName='SYS',VDBName='GossipPilot')\", \"type\" : \"SYS.Tables\"},");
			sb.append("\"__deferred\" : {\"uri\" : \"http://cdtssoa101d.rxcorp.com:8680/odata/GossipPilot/Tables(Name='DataTypes',SchemaName='SYS',VDBName='GossipPilot')/Tables\"},");
			for(int j=0;j<numOfCols;j++){
				sb.append("\"Name"+j+"\"");
				sb.append(":");
				sb.append("\"Value"+j+"\"");
				if(j != numOfCols-1){
					sb.append(",");
				}
			}
			sb.append("}");
			if(i != numOfRows-1){
				sb.append(",");
			}
		}
		sb.append("]}}");
		
		return sb.toString();
		
	}
	
	
}
