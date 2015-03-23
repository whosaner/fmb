package org.daawat.fmb.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Locale;
import java.util.TimeZone;

public class DateUtils {

	private static final String COMP_NAME = "DateUtils";
	private static final String TIMEZONE_ID = "America/New_York"; //TODO This should be configurable
	
	/**
	 * Convenience method to convert a string representation of date into a java.util.Date object.
	 * @param dateStr
	 * @param pattern
	 * @return
	 */
	public static Date getDate(String dateStr, String pattern){		
		Date dateObj = null;
		try {
			if(dateStr != null && pattern != null){
				SimpleDateFormat simpleDateFormat = new SimpleDateFormat(pattern, Locale.US);
				simpleDateFormat.setTimeZone(TimeZone.getTimeZone(TIMEZONE_ID));
				dateObj = simpleDateFormat.parse(dateStr);
			}
			
		} catch (ParseException e) {
			Logger.error(COMP_NAME, "ParseException occurred inside getDate method - ", e);
		}
		return dateObj;
	}
	
	/**
	 * Convenience method that calculates the date from the num of days and returns the new date.
	 * @param fromDate
	 * @param numOfDays
	 * @return
	 */
	public static Date getToDate(Date fromDate, int numOfDays){
		Date date = null;		
		if(fromDate != null){
			Calendar calendar = DateUtils.getCalendar();
			updateCalendar(fromDate, calendar);
			calendar.add(Calendar.DAY_OF_MONTH, numOfDays);
			date = calendar.getTime();
		}
		return date;		
	}
	
	private static void updateCalendar(Date toDate, Calendar calendar){
		calendar.setTime(toDate);
		//calendar.setTimeZone(TimeZone.getTimeZone(TIMEZONE_ID));
	}
	
	/**
	 * This method would find the difference in days between the current date and the date given by the user. 
	 * @param date1
	 * @param datePattern
	 * @return
	 */
	public static int getDiffWithCurrentDate(Date endDate){
		Calendar startCalendar = DateUtils.getCalendar();
		
		Calendar endCalendar = DateUtils.getCalendar();
		updateCalendar(endDate, endCalendar);
		endCalendar = zeroOffset(endCalendar);
		
		int daysBetween = 0;
		if(startCalendar.before(endCalendar)){
			while (startCalendar.before(endCalendar)) {  
				  startCalendar.add(Calendar.DAY_OF_MONTH, 1);  
				  daysBetween++;  
			  } 
		}else{
			while (startCalendar.after(endCalendar)) {  
					endCalendar.add(Calendar.DAY_OF_MONTH, 1);  
					daysBetween--;  
			  }
		}		  
		return daysBetween;  
	}
	
	/**
	 * Returns the current date.
	 * @return
	 */
	public static Date getCurrentDate(){		
		Calendar startCalendar = DateUtils.getCalendar();
		return startCalendar.getTime();
	}
	
	
	
	/**
	 * Calculates the num of days between 2 given dates.
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	public static int getNumOfDays(Date startDate, Date endDate){
		Calendar startCalendar = DateUtils.getCalendar();		
		updateCalendar(startDate, startCalendar);			
		startCalendar = zeroOffset(startCalendar);
		
		Calendar endCalendar = DateUtils.getCalendar();
		updateCalendar(endDate, endCalendar);
		endCalendar = zeroOffset(endCalendar);		
		
		int daysBetween = 0;
		if(startCalendar.before(endCalendar)){
			while (startCalendar.before(endCalendar)) {  
				  startCalendar.add(Calendar.DAY_OF_MONTH, 1);  
				  daysBetween++;  
			  } 
		}else{
			while (startCalendar.after(endCalendar)) {  
					endCalendar.add(Calendar.DAY_OF_MONTH, 1);  
					daysBetween--;  
			  }
		}		  
		return daysBetween;  
	}
	
	
	public static Calendar getCalendar(){
		Calendar calendar = new GregorianCalendar();
		//Setting the offset to 00:00:00
		calendar = zeroOffset(calendar);
		return calendar;		
	}
	
	public  static Calendar zeroOffset(Calendar calendar){
		calendar.set(Calendar.HOUR, 0);
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		calendar.set(Calendar.MILLISECOND, 0);
		return calendar;
	} 
	
	public  static Date zeroOffset(Date date){
		Calendar calendar = DateUtils.getCalendar();
		calendar.setTime(date);
		calendar.set(Calendar.HOUR, 0);
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		calendar.set(Calendar.MILLISECOND, 0);
		return calendar.getTime();
	} 
	
	public static void main(String[] args) {
		Date obj = DateUtils.getDate("8/30/2014", "MM/dd/yyyy");
		Date obj1 = DateUtils.getDate("1/5/2014", "MM/dd/yyyy");
		System.out.println("Date is - "+obj.toString());
		
	}
	
	
}
