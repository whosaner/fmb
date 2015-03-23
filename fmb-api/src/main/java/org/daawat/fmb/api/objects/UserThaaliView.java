package org.daawat.fmb.api.objects;

import java.io.Serializable;
import java.util.Date;

import javax.xml.bind.annotation.XmlRootElement;

import org.daawat.fmb.api.enums.Category;
import org.daawat.fmb.api.enums.ThaaliStatus;
import org.daawat.fmb.api.enums.UserThaaliStatus;

@XmlRootElement(name="userThaaliView")
public class UserThaaliView implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String thaaliDay;
	private String menu; //Menu for that day
	private String thaaliInstructions; //instruction set by the admin for that day thaali
	private boolean isLocked;
	
	private ThaaliStatus thaaliStatus;
	private Date thaaliDate;
	private Category userThaaliCategory; //category for thaali
	private UserThaaliStatus userThaaliStatus; //status which tell if the thaali (is requested/cancelled)
	private String userInstructions; //specific instructions set by the user for that day thaali.
		
	
	public UserThaaliView() {
		super();
	}
	


	public String getThaaliDay() {
		return thaaliDay;
	}
	public void setThaaliDay(String thaaliDay) {
		this.thaaliDay = thaaliDay;
	}
	public String getMenu() {
		return menu;
	}
	public void setMenu(String menu) {
		this.menu = menu;
	}
	
	public String getThaaliInstructions() {
		return thaaliInstructions;
	}
	public void setThaaliInstructions(String thaaliInstructions) {
		this.thaaliInstructions = thaaliInstructions;
	}
	public boolean isLocked() {
		return isLocked;
	}
	public void setLocked(boolean isLocked) {
		this.isLocked = isLocked;
	}
	public ThaaliStatus getThaaliStatus() {
		return thaaliStatus;
	}

	public void setThaaliStatus(ThaaliStatus thaaliStatus) {
		this.thaaliStatus = thaaliStatus;
	}
	public Date getThaaliDate() {
		return thaaliDate;
	}

	public void setThaaliDate(Date thaaliDate) {
		this.thaaliDate = thaaliDate;
	}
	public Category getUserThaaliCategory() {
		return userThaaliCategory;
	}
	public void setUserThaaliCategory(Category userThaaliCategory) {
		this.userThaaliCategory = userThaaliCategory;
	}
	public UserThaaliStatus getUserThaaliStatus() {
		return userThaaliStatus;
	}
	public void setUserThaaliStatus(UserThaaliStatus userThaaliStatus) {
		this.userThaaliStatus = userThaaliStatus;
	}
	public String getUserInstructions() {
		return userInstructions;
	}
	public void setUserInstructions(String userInstructions) {
		this.userInstructions = userInstructions;
	}



	@Override
	public String toString() {
		return "UserThaaliView [thaaliDay=" + thaaliDay + ", menu=" + menu
				+ ", thaaliInstructions=" + thaaliInstructions + ", isLocked="
				+ isLocked + ", thaaliStatus=" + thaaliStatus + ", thaaliDate="
				+ thaaliDate + ", userThaaliCategory=" + userThaaliCategory
				+ ", userThaaliStatus=" + userThaaliStatus
				+ ", userInstructions=" + userInstructions + "]";
	}


	

	
	
	

}
