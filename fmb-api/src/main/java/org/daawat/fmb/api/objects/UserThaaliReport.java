package org.daawat.fmb.api.objects;

import java.io.Serializable;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "userThaaliReport")
public class UserThaaliReport implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;	
	protected String firstName; 
	protected String familyName;	
	protected int familyGroupId; //groupId which tells the group for the particular user.
	protected String location; //user location 
	protected List<UserThaaliDayWiseData> userThaaliDayWiseData;
	
	
	
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
	
	
	public int getFamilyGroupId() {
		return familyGroupId;
	}
	
	
	public void setFamilyGroupId(int familyGroupId) {
		this.familyGroupId = familyGroupId;
	}
	
	public String getLocation() {
		return location;
	}
	
	
	public void setLocation(String location) {
		this.location = location;
	}
	
	
	
	public List<UserThaaliDayWiseData> getUserThaaliDayWiseData() {
		return userThaaliDayWiseData;
	}

	public void setUserThaaliDayWiseData(List<UserThaaliDayWiseData> userThaaliDayWiseData) {
		this.userThaaliDayWiseData = userThaaliDayWiseData;
	}


	@Override
	public String toString() {
		return "UserThaaliReport [firstName=" + firstName + ", familyName="
				+ familyName + ", familyGroupId=" + familyGroupId
				+ ", location=" + location + "]";
	}
	

	
  

	
	
	
	
	
}
