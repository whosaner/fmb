package org.daawat.fmb;

import org.daawat.fmb.api.db.UserProfileDataDAO;
import org.daawat.fmb.api.enums.Category;
import org.daawat.fmb.api.enums.UserRole;
import org.daawat.fmb.api.objects.UserCredentialData;
import org.daawat.fmb.api.objects.UserProfileData;
import org.daawat.fmb.impl.daos.UserProfileDataDAOImpl;

import junit.framework.TestCase;

public class UserProfileDataDAOTestImpl extends TestCase {

	
	
	public static void testCreateUserProfileData(){
		UserProfileDataDAO updTable = new UserProfileDataDAOImpl();
		UserCredentialData ucd = new UserCredentialData();
		ucd.seteJamaatId("30308656");
		ucd.setPassword("test123");
		UserProfileData upd = new UserProfileData();
		upd.setFamilyGroupId(1);
		upd.setFamilyName("Rangwala");
		upd.setFirstName("Hussain");
		upd.setLocation("WEST CHESTER");
		upd.setThaaliCategory(Category.Small);
		upd.setUserRole(UserRole.USER);
		upd.setUserCredentials(ucd);
		upd.setHofEJamaatId("303308655");
		
		try {
			int count = updTable.createUserProfileData(upd);
			System.out.println("Output - "+count);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static void testGetUserProfileData(){
		UserProfileDataDAO updTable = new UserProfileDataDAOImpl();
		UserCredentialData ucd = new UserCredentialData();
		ucd.seteJamaatId("30308651");
		ucd.setPassword("test123");
		UserProfileData upd;
		try {
			upd = updTable.getUserProfileData(ucd);
			System.out.println(upd.toString());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static void testUpdateUserProfileData(){
		UserProfileDataDAO updTable = new UserProfileDataDAOImpl();
		UserCredentialData ucd = new UserCredentialData();
		ucd.seteJamaatId("30308654");
		ucd.setPassword("test1234");
		UserProfileData upd = new UserProfileData();
		upd.setFamilyGroupId(1);
		upd.setFamilyName("Rangwala_Update");
		upd.setFirstName("Hussain_Update");
		upd.setLocation("WEST CHESTER_UPDATE");
		upd.setThaaliCategory(Category.Small);
		upd.setUserRole(UserRole.USER);
		upd.setUserCredentials(ucd);
		upd.setHofEJamaatId("303308655");
		
		try {
			int count = updTable.updateUserProfileData(upd);
			System.out.println("Output - "+count);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
