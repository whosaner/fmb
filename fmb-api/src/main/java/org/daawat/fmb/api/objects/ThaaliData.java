package org.daawat.fmb.api.objects;

import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

import org.daawat.fmb.api.enums.ThaaliStatus;

@XmlRootElement(name="thaaliData")
public class ThaaliData implements Serializable,Comparable<ThaaliData>{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private Date thaaliDate; //Date on which thaali is there
	private String thaaliDay; //Just a convenient way to know the day from the above thaaliDate;
	private String menu; //Menu for that day
	private String coookName; //person who made the food for that day
	private String instructions; //instruction set by the admin for that day thaali
	private String adminName; //name of the admin who created the thaali for this day.
	@XmlTransient
	private Date creationDate; //date on which thaali data was entered on.
	private ThaaliStatus status; 
	private boolean visible;
	private String thaaliDateEntered;
	
	
	
	public ThaaliData() {
		
	}
	public ThaaliData(Date thaaliDate, String thaaliDay, String menu,
			String coookName, String instructions, String adminName, ThaaliStatus status,boolean isVisible) {
		super();
		this.thaaliDate = thaaliDate;
		this.thaaliDay = thaaliDay;
		this.menu = menu;
		this.coookName = coookName;
		this.instructions = instructions;
		this.adminName = adminName;
		this.status = status;
		this.visible = isVisible;
	}
	public Date getThaaliDate() {
		return thaaliDate;
	}
	
	public void setThaaliDate(Date thaaliDate) {
		this.thaaliDate = thaaliDate;
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
	public String getCoookName() {
		return coookName;
	}
	
	
	public void setCoookName(String coookName) {
		this.coookName = coookName;
	}
	public String getInstructions() {
		return instructions;
	}
	
	
	public void setInstructions(String instructions) {
		this.instructions = instructions;
	}
	public String getAdminName() {
		return adminName;
	}
	

	public void setAdminName(String adminName) {
		this.adminName = adminName;
	}
	
	
	public ThaaliStatus getStatus() {
		return status;
	}
	
	
	public void setStatus(ThaaliStatus status) {
		this.status = status;
	}
	
	public Date getCreationDate() {
		return creationDate;
	}
	
	
	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}
	
	
	public boolean isVisible() {
		return visible;
	}
	
	public void setVisible(boolean visible) {
		this.visible = visible;
	}
	
	public String getThaaliDateEntered() {
		if(this.thaaliDate != null){
			return this.thaaliDate.toString();
		}
		return "";
	}
	
	public void setThaaliDateEntered(String thaaliDateEntered) {
		this.thaaliDateEntered = thaaliDateEntered;
		try {
			if(thaaliDateEntered != null){
				SimpleDateFormat simpleDateFormat = new SimpleDateFormat("MM/dd/yyyy");
				this.thaaliDate = simpleDateFormat.parse(thaaliDateEntered);
			}
			
		} catch (ParseException e) {
			this.thaaliDate = null;
		}
	}
	
	
	public List<Object> toList_Insert(){
		List<Object> objList = new ArrayList<Object>();
		objList.add(thaaliDate);
		objList.add(thaaliDay);
		objList.add(menu);
		objList.add(coookName);
		objList.add(instructions);
		objList.add(adminName);
		objList.add(status.getValue());
		objList.add(visible);
		
		return objList;
	}
	
	public List<Object> toList_Update(){
		List<Object> objList = new ArrayList<Object>();		
		objList.add(thaaliDay);
		objList.add(menu);
		objList.add(coookName);
		objList.add(instructions);
		objList.add(adminName);
		objList.add(status.getValue());
		objList.add(visible);
		objList.add(thaaliDate);
		
		return objList;
	}
	@Override
	public String toString() {
		return "ThaaliData [thaaliDate=" + thaaliDate + ", thaaliDay="
				+ thaaliDay + ", menu=" + menu + ", coookName=" + coookName
				+ ", instructions=" + instructions + ", adminName=" + adminName
				+ ", creationDate=" + creationDate + ", status=" + status
				+ ", isVisible=" + visible + ", thaaliDateEntered="
				+ thaaliDateEntered + "]";
	}
	@Override
	public int compareTo(ThaaliData o) {
		return this.getThaaliDate().compareTo(o.getThaaliDate());		
	}
	
	
	
	
	
}
