package org.daawat.fmb.api.objects;

import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import javax.xml.bind.annotation.XmlRootElement;

import org.daawat.fmb.api.enums.Category;
import org.daawat.fmb.api.enums.UserThaaliStatus;

@XmlRootElement(name = "userThaaliData")
public class UserThaaliData implements Serializable,Comparable<UserThaaliData>{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	protected Date thaaliDate; //date for which user has selected the thaali.
	protected String firstName; 
	protected String familyName;
	protected Category thaaliCategory; //category for thaali
	protected UserThaaliStatus userThaaliStatus; //status which tell if the thaali (is requested/cancelled)
	protected int familyGroupId; //groupId which tells the group for the particular user.
	protected String userInstructions; //specific instructions set by the user for that day thaali.
	protected String location; //user location 
	protected String userThaaliDate; //used in order to convert the string date to date object.
	
	
	
	public UserThaaliData() {
		super();
	}


	public UserThaaliData(Date thaaliDate, String firstName, String familyName,
			Category thaaliCategory, UserThaaliStatus thaaliStatus, int familyGroupId,
			String instructions, String location) {
		super();
		this.thaaliDate = thaaliDate;
		this.firstName = firstName;
		this.familyName = familyName;
		this.thaaliCategory = thaaliCategory;
		this.userThaaliStatus = thaaliStatus;
		this.familyGroupId = familyGroupId;
		this.userInstructions = instructions;
		this.location = location;
	}
	
	
	public Date getThaaliDate() {
		return thaaliDate;
	}
	
	
	public void setThaaliDate(Date thaaliDate) {
		this.thaaliDate = thaaliDate;
	}
	public String getFirstName() {
		return firstName;
	}
	
	
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getFamilyName() {
		return familyName;
	}
	
	public void setFamilyName(String familyName) {
		this.familyName = familyName;
	}
	public Category getThaaliCategory() {
		return thaaliCategory;
	}
	
	
	public void setThaaliCategory(Category thaaliCategory) {
		this.thaaliCategory = thaaliCategory;
	}
	public UserThaaliStatus getUserThaaliStatus() {
		return userThaaliStatus;
	}
	
	
	public void setUserThaaliStatus(UserThaaliStatus thaaliStatus) {
		this.userThaaliStatus = thaaliStatus;
	}
	public int getFamilyGroupId() {
		return familyGroupId;
	}
	
	
	public void setFamilyGroupId(int familyGroupId) {
		this.familyGroupId = familyGroupId;
	}
	public String getUserInstructions() {
		return userInstructions;
	}
	
	
	public void setUserInstructions(String instructions) {
		this.userInstructions = instructions;
	}
	
	public String getLocation() {
		return location;
	}
	
	
	public void setLocation(String location) {
		this.location = location;
	}
	
	
	public String getUserThaaliDate() {
		if(this.thaaliDate != null){
			return this.thaaliDate.toString();
		}
		return "";
	}


	public void setUserThaaliDate(String userThaaliDate) {
		this.userThaaliDate = userThaaliDate;
		try {
			if(userThaaliDate != null){				
				SimpleDateFormat simpleDateFormat = new SimpleDateFormat("MM/dd/yyyy",Locale.US);
				//simpleDateFormat.setTimeZone(TimeZone.getTimeZone(TIMEZONE_ID));
				this.thaaliDate = simpleDateFormat.parse(userThaaliDate);
			}
			
		} catch (ParseException e) {
			this.thaaliDate = null;
		}
	}


	public List<Object> toList_Insert(){
		List<Object> objList = new ArrayList<Object>();
				
		objList.add(thaaliDate);
		objList.add(familyGroupId);
		objList.add(firstName);
		objList.add(familyName);
		objList.add(thaaliCategory.getValue());
		objList.add(userThaaliStatus.getValue());		
		objList.add(userInstructions);
		objList.add(location);
		
		return objList;
	}
	
	public List<Object> toList_Update(){
		List<Object> objList = new ArrayList<Object>();			
		
		objList.add(firstName);
		objList.add(familyName);
		objList.add(thaaliCategory.getValue());
		objList.add(userThaaliStatus.getValue());
		objList.add(userInstructions);
		objList.add(location);
		objList.add(thaaliDate);//pk
		objList.add(familyGroupId);//pk
		
		return objList;
	}


	@Override
	public String toString() {
		return "UserThaaliData [thaaliDate=" + thaaliDate + ", firstName="
				+ firstName + ", familyName=" + familyName
				+ ", thaaliCategory=" + thaaliCategory + ", userThaaliStatus="
				+ userThaaliStatus + ", familyGroupId=" + familyGroupId
				+ ", userInstructions=" + userInstructions + ", location="
				+ location + ", userThaaliDate=" + userThaaliDate + "]";
	}


	@Override
	public int compareTo(UserThaaliData o) {		
		return this.getThaaliDate().compareTo(o.getThaaliDate());
	}


	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + familyGroupId;
		return result;
	}


	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		UserThaaliData other = (UserThaaliData) obj;
		if (familyGroupId != other.familyGroupId)
			return false;
		return true;
	}
	
	
	
	
}
