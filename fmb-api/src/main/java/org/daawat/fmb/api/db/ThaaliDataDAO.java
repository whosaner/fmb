package org.daawat.fmb.api.db;

import java.util.Date;
import java.util.List;

import org.daawat.fmb.api.enums.ThaaliStatus;
import org.daawat.fmb.api.objects.ThaaliData;

public interface ThaaliDataDAO {

	//An admin can create data for many thaali's at once.
	public int createThaaliData(ThaaliData thaaliData) throws Exception;
	
	//An admin can update data for many thaali's at once.
	public int updateThaaliData(ThaaliData thaaliData) throws Exception;
	
	//Method to retrieve multiple thaali data based on the date range given.s
	public List<ThaaliData> getThaaliData(Date thaaliStartDate, Date oThaaliEndDate, ThaaliStatus oStatus) throws Exception;
	
	
	public List<ThaaliData> getThaaliData2(Date thaaliStartDate, Date thaaliEndDate, Boolean oIsVisible) throws Exception;
	
	//method to get the open thaali dates.
	public List<ThaaliData> getThaaliDataOpenDates(Date fromDate) throws Exception;
}
