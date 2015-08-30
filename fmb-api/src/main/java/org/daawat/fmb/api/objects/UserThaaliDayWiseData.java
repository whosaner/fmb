package org.daawat.fmb.api.objects;

import java.io.Serializable;
import java.util.Date;

import org.daawat.fmb.api.enums.Category;
import org.daawat.fmb.api.enums.UserThaaliStatus;

public class UserThaaliDayWiseData implements Serializable{

	private static final long serialVersionUID = 1L;
	protected Date thaaliDate; //date for which user has selected the thaali.	
	protected Category thaaliCategory; //category for thaali
	protected String rice;
	
	protected UserThaaliStatus userThaaliStatus = UserThaaliStatus.NOT_REQUESTED_BY_USER; //status which tell if the thaali (is requested/cancelled)	
	protected String userThaaliDate; //used in order to convert the string date to date object.
	protected String menu;
	
	public Date getThaaliDate() {
		return thaaliDate;
	}
	public void setThaaliDate(Date thaaliDate) {
		this.thaaliDate = thaaliDate;
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
	public void setUserThaaliStatus(UserThaaliStatus userThaaliStatus) {
		this.userThaaliStatus = userThaaliStatus;
	}
	public String getUserThaaliDate() {
		return userThaaliDate;
	}
	public void setUserThaaliDate(String userThaaliDate) {
		this.userThaaliDate = userThaaliDate;
	}
	public String getMenu() {
		return menu;
	}
	public void setMenu(String menu) {
		this.menu = menu;
	}
	public String getRice() {
		return rice;
	}
	public void setRice(String rice) {
		this.rice = rice;
	}
	
	
}
