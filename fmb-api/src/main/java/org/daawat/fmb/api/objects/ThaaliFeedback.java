package org.daawat.fmb.api.objects;

import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

import org.daawat.fmb.api.enums.Category;

@XmlRootElement(name="feedback")
public class ThaaliFeedback implements Serializable{

	private static final long serialVersionUID = 1L;
	private String eJamaatId;
	private String firstName;
	private String familyName;
	private int familyGroupId;
	private Category thaaliCategory; //thaali category (small, medium, large)
	private String thaaliFeedback;
	@XmlTransient
	private Date thaaliDate;
	@XmlTransient
	private Date feedbackCreationDate;
	private String thaaliMenu; //optional thaali menu for which feedback is provided.
	private String qualityRating; //optional
	private String quantityRating; //optional
	private String thaaliDateEntered; //optional
	
	
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public String geteJamaatId() {
		return eJamaatId;
	}
	public void seteJamaatId(String eJamaatId) {
		this.eJamaatId = eJamaatId;
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
	public int getFamilyGroupId() {
		return familyGroupId;
	}
	public void setFamilyGroupId(int familyGroupId) {
		this.familyGroupId = familyGroupId;
	}
	public Category getThaaliCategory() {
		return thaaliCategory;
	}
	public void setThaaliCategory(Category thaaliCategory) {
		this.thaaliCategory = thaaliCategory;
	}
	
	public String getThaaliFeedback() {
		return thaaliFeedback;
	}
	public void setThaaliFeedback(String thaaliFeedback) {
		this.thaaliFeedback = thaaliFeedback;
	}
	public Date getThaaliDate() {
		return thaaliDate;
	}
	public void setThaaliDate(Date thaaliDate) {	
		this.thaaliDate = thaaliDate;
	}
	public Date getFeedbackCreationDate() {
		return feedbackCreationDate;
	}
	public void setFeedbackCreationDate(Date feedbackCreationDate) {
		this.feedbackCreationDate = feedbackCreationDate;
	}
	
	public String getThaaliMenu() {
		return thaaliMenu;
	}
	public void setThaaliMenu(String thaaliMenu) {
		this.thaaliMenu = thaaliMenu;
	}
	public String getQualityRating() {
		return qualityRating;
	}
	public void setQualityRating(String qualityRating) {
		this.qualityRating = qualityRating;
	}
	public String getQuantityRating() {
		return quantityRating;
	}
	public void setQuanityRating(String quantityRating) {
		this.quantityRating = quantityRating;
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
				SimpleDateFormat simpleDateFormat = new SimpleDateFormat("MM/dd/yyyy",Locale.US);
				//simpleDateFormat.setTimeZone(TimeZone.getTimeZone(TIMEZONE_ID));
				this.thaaliDate = simpleDateFormat.parse(thaaliDateEntered);
			}
			
		} catch (ParseException e) {
			this.thaaliDate = null;
		}
	}
	
	//the sequence of variables defined below should match the sequence defined in the database.properties file for insert query.
	public List<Object> insert(){
		List<Object> objList = new ArrayList<Object>();	
		objList.add(thaaliDate);
		objList.add(eJamaatId);
		objList.add(firstName);
		objList.add(familyName);
		objList.add(familyGroupId);
		objList.add(thaaliCategory.getValue());
		objList.add(thaaliFeedback);
		objList.add(thaaliMenu);
		objList.add(qualityRating);
		objList.add(quantityRating);
		
		return objList;
	}
	@Override
	public String toString() {
		return "ThaaliFeedback [eJamaatId=" + eJamaatId + ", firstName="
				+ firstName + ", familyName=" + familyName + ", familyGroupId="
				+ familyGroupId + ", thaaliCategory=" + thaaliCategory
				+ ", thaaliFeedback=" + thaaliFeedback + ", thaaliDate="
				+ thaaliDate + ", feedbackCreationDate=" + feedbackCreationDate
				+ ", thaaliMenu=" + thaaliMenu + ", qualityRating="
				+ qualityRating + ", quantityRating=" + quantityRating
				+ ", thaaliDateEntered=" + thaaliDateEntered + "]";
	}
	
	


	
}
