package org.daawat.fmb.api.objects;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

@XmlRootElement(name="miqaatRegistration")
public class MiqaatRegistration implements Serializable{

	private static final long serialVersionUID = 1L;
	private String eJamaatId;
	private String firstName;
	private String familyName;
	private int familyGroupId;
	private String eligibility;
	private String signup;
	private String covidStatus;
	private String miqaatName;
	private String familyMembers;
	private String timestamp;
	@XmlTransient
	private Date miqaatDate;
	
	
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
	public String getEligibility() {
		return eligibility;
	}
	public void setEligibility(String eligibility) {
		this.eligibility = eligibility;
	}
	public String getSignup() {
		return signup;
	}
	public void setSignup(String signup) {
		this.signup = signup;
	}
	public String getCovidStatus() {
		return covidStatus;
	}
	public void setCovidStatus(String covidStatus) {
		this.covidStatus = covidStatus;
	}
	public Date getMiqaatDate() {
		return miqaatDate;
	}
	public void setMiqaatDate(Date miqaatDate) {
		this.miqaatDate = miqaatDate;
	}
	
	public String getMiqaatName() {
		return miqaatName;
	}
	public void setMiqaatName(String miqaatName) {
		this.miqaatName = miqaatName;
	}
	
	public String getFamilyMembers() {
		return familyMembers;
	}
	public void setFamilyMembers(String familyMembers) {
		this.familyMembers = familyMembers;
	}
	
	public String getTimestamp() {
		return timestamp;
	}
	public void setTimestamp(String timestamp) {
		this.timestamp = timestamp;
	}
	
	
		//the sequence of variables defined below should match the sequence defined in the database.properties file for insert query.
		public List<Object> insert(){
			List<Object> objList = new ArrayList<Object>();
			objList.add(miqaatDate);
			objList.add(miqaatName);			
			objList.add(eJamaatId);
			objList.add(firstName);
			objList.add(familyName);
			objList.add(familyGroupId);
			objList.add(eligibility);
			objList.add(signup);
			objList.add(covidStatus);
			System.out.println("Family Members before adding to DB = " +familyMembers);
			objList.add(familyMembers);
			objList.add(timestamp);
			return objList;
	}
		
		@Override
		public String toString() {
			return "MiqaatRegistration [eJamaatId=" + eJamaatId
					+ ", firstName=" + firstName + ", familyName=" + familyName
					+ ", familyGroupId=" + familyGroupId + ", eligibility="
					+ eligibility + ", signup=" + signup + ", covidStatus="
					+ covidStatus + ", miqaatName=" + miqaatName
					+ ", familyMembers=" + familyMembers + ", timestamp="
					+ timestamp + ", miqaatDate=" + miqaatDate + "]";
		}
		
		
		
	
	
	
	
}
