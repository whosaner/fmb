package org.daawat.fmb.api.db;

import java.util.Date;
import java.util.List;

import org.daawat.fmb.api.enums.UserThaaliStatus;
import org.daawat.fmb.api.objects.UserThaaliData;

public interface UserThaaliDataDAO {
	
	//	Adds a row to the UserThaaliData table.
	public int addUserThaaliData(UserThaaliData userThaaliData) throws Exception;
	
	
	//update the user thaali data.
	public int updateUserThaaliData(UserThaaliData userThaaliData) throws Exception;
	
	
	//gets thaali data for a given date range and status for all the user's.
	public List<UserThaaliData> getThaaliDataAllUsers(Date thaaliFromDate, Date oThaaliToDate, UserThaaliStatus oThaaliStatus) throws Exception;
	
	//gets thaali data for a particular user.
	public List<UserThaaliData> getThaaliDataPerUser(int familyGroupId, Date thaaliFromDate, Date thaaliToDate, UserThaaliStatus oThaaliStatus) throws Exception;
	
	
}
