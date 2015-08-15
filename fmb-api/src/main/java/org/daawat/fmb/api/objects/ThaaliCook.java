package org.daawat.fmb.api.objects;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlRootElement;

import org.daawat.fmb.api.enums.EmailType;


@XmlRootElement(name="cook")
public class ThaaliCook implements Serializable{

	private static final long serialVersionUID = 1L;
	private String cookName;
	private String emailAddress;
	private EmailType emailType;
	private String mobileNumber;
	private boolean register4SMSAlerts;

	
	public String getMobileNumber() {
		return mobileNumber;
	}
	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}
	public boolean isRegister4SMSAlerts() {
		return register4SMSAlerts;
	}
	public void setRegister4SMSAlerts(boolean register4smsAlerts) {
		register4SMSAlerts = register4smsAlerts;
	}
	public String getEmailAddress() {
		return emailAddress;
	}
	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}
	
	public EmailType getEmailType() {
		return emailType;
	}
	public void setEmailType(EmailType emailType) {
		this.emailType = emailType;
	}
	public String getCookName() {
		return cookName;
	}
	public void setCookName(String cook) {
		this.cookName = cook;
	}
		
		
	//the sequence of variables defined below should match the sequence defined in the database.properties file for insert query.
	public String insert(){
		return cookName;
	}
	
	@Override
	public String toString() {
		return "ThaaliCook [cookName=" + cookName + ", emailAddress="
				+ emailAddress + ", emailType=" + emailType + ", mobileNumber="
				+ mobileNumber + ", register4SMSAlerts=" + register4SMSAlerts
				+ "]";
	}
	
	
	
	

}
