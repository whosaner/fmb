package org.daawat.fmb.api.objects;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

import org.daawat.fmb.api.enums.Category;
import org.daawat.fmb.api.enums.EmailType;
import org.daawat.fmb.api.enums.UserRole;

@XmlRootElement(name="profile")
public class UserProfileData implements Serializable{

	private static final long serialVersionUID = 1L;
	
	private UserCredentialData userCredentials; 
	private String hofEJamaatId; //head of family ejamaat id
	private String familyName; //family name/last name associated with the user.
	private String firstName; //optional field specifying the name of the user;
	private UserRole userRole; //different user roles (user, admin, super user)
	private Category thaaliCategory; //thaali category (small, medium, large)
	private String location; //user location
	private String rice; //DOes the user want Rice (value are Yes, No)
	//A group if which will be unique for all the members in a family. 
	//This is needed to club a particular family member to a specific group.
	private int familyGroupId;
	private String emailAddresses = ""; //Comma separated list of email address.
	private EmailType emailType; 
	private int numOfFamilyMembers = 1; //number of family members which will be used for miqaat registration count -  default is 1


	

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public UserProfileData() {
		super();
	}

	public UserProfileData(UserCredentialData userCredentials,
			String hofEJamaatId, String familyName, String firstName,
			UserRole userRole, Category thaaliCategory, String rice, String location,
			int familyGroupId, int memberCount) {
		this(userCredentials, hofEJamaatId, familyName, firstName, userRole, thaaliCategory, rice, location);
		this.familyGroupId = familyGroupId;
		this.numOfFamilyMembers = memberCount;
	}
	
	public UserProfileData(UserCredentialData userCredentials,
			String hofEJamaatId, String familyName, String firstName,
			UserRole userRole, Category thaaliCategory, String rice, String location) {
		super();
		this.userCredentials = userCredentials;
		this.hofEJamaatId = hofEJamaatId;
		this.familyName = familyName;
		this.firstName = firstName;
		this.userRole = userRole;
		this.thaaliCategory = thaaliCategory;
		this.rice = rice;
		this.location = location;
		
	}

	public UserCredentialData getUserCredentials() {
		return userCredentials;
	}

	
	public void setUserCredentials(UserCredentialData userCredentials) {
		this.userCredentials = userCredentials;
	}

	public String getHofEJamaatId() {
		return hofEJamaatId;
	}

	
	public void setHofEJamaatId(String hofEJamaatId) {
		this.hofEJamaatId = hofEJamaatId;
	}

	public String getFamilyName() {
		return familyName;
	}

	
	public void setFamilyName(String familyName) {
		this.familyName = familyName;
	}

	public String getFirstName() {
		return firstName;
	}

	
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public UserRole getUserRole() {
		return userRole;
	}

	
	public void setUserRole(UserRole userRole) {
		this.userRole = userRole;
	}

	public Category getThaaliCategory() {
		return thaaliCategory;
	}

	
	public void setThaaliCategory(Category thaaliCategory) {
		this.thaaliCategory = thaaliCategory;
	}

	public int getFamilyGroupId() {
		return familyGroupId;
	}

	
	public void setFamilyGroupId(int familyGroupId) {
		this.familyGroupId = familyGroupId;
	}
	

	public String getRice() {
		return rice;
	}

	public void setRice(String rice) {
		this.rice = rice;
	}

	public String getLocation() {
		return location;
	}

	
	public void setLocation(String location) {
		this.location = location;
	}
	
	public String getEmailAddresses() {
		if(emailAddresses == null){
			return "";
		}
		return emailAddresses;
	}

	public void setEmailAddresses(String emailAddresses) {
		this.emailAddresses = emailAddresses;
	}
	

	public EmailType getEmailType() {
		return emailType;
	}

	public void setEmailType(EmailType emailType) {
		this.emailType = emailType;
	}
	
	public int getNumOfFamilyMembers() {
		return numOfFamilyMembers;
	}

	public void setNumOfFamilyMembers(int numOfFamilyMembers) {
		this.numOfFamilyMembers = numOfFamilyMembers;
	}

	
	

	public List<Object> toList_Insert(){
		List<Object> objList = new ArrayList<Object>();
		objList.addAll(userCredentials.toList());
		objList.add(hofEJamaatId);
		objList.add(familyName);
		objList.add(firstName);
		objList.add(userRole.getValue());
		objList.add(thaaliCategory.getValue());
		objList.add(rice);
		objList.add(familyGroupId);
		objList.add(location);
		objList.add(emailAddresses);
		objList.add(emailType.getValue());
		objList.add(numOfFamilyMembers);
		return objList;
		
	}
	
	public List<Object> toList_Update(){
		List<Object> objList = new ArrayList<Object>();		
		objList.add(hofEJamaatId);
		objList.add(familyName);
		objList.add(firstName);
		objList.add(thaaliCategory.getValue());
		objList.add(rice);
		objList.add(location);
		objList.add(emailAddresses);
		objList.add(numOfFamilyMembers);
		objList.add(userCredentials.geteJamaatId());
		objList.add(userCredentials.getPassword());
		//objList.add(emailType != null ? emailType.getValue(): EmailType.NONE.getValue()); //add this to update sql query also
		return objList;
		
	}
	
	@Override
	public String toString() {
		return "UserProfileData [userCredentials=" + userCredentials
				+ ", hofEJamaatId=" + hofEJamaatId + ", familyName="
				+ familyName + ", firstName=" + firstName + ", userRole="
				+ userRole + ", thaaliCategory=" + thaaliCategory
				+ ", location=" + location + ", rice=" + rice
				+ ", familyGroupId=" + familyGroupId + ", emailAddresses="
				+ emailAddresses + ", emailType=" + emailType + ", numOfFamilyMembers = "+numOfFamilyMembers+"]";
	}

	

	
	
	
}
