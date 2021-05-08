package org.daawat.fmb.impl.daos;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.daawat.fmb.api.db.MiqaatRegistrationDAO;
import org.daawat.fmb.api.objects.MiqaatRegistration;
import org.daawat.fmb.utils.PropertyFileManager;

public class MiqaatRegistrationDAOImpl extends BaseJDBCDAO<MiqaatRegistration> implements MiqaatRegistrationDAO {

	@Override
	public List<MiqaatRegistration> getMiqaatRegistrationNRows(int rowLimit) throws Exception{
		String sqlQuery = PropertyFileManager.getProperty("miqaat_select_query_first_n_rows");			
		executeQuery(sqlQuery, rowLimit);
		return data;
	}
	
	@Override
    public List<MiqaatRegistration> getMiqaatRegistrationAll() throws Exception {
		String sqlQuery = PropertyFileManager.getProperty("miqaat_select_query_all");			
		executeQuery(sqlQuery);
		return data;
    }
    
    @Override
    public int addMiqaatRegistration(MiqaatRegistration registration) throws Exception {
    	String sqlQuery = PropertyFileManager.getProperty("miqaat_registration_add_query");			
		executeQuery(sqlQuery, registration.insert().toArray());
		return updateCount;
    }
    
    @Override
	public List<MiqaatRegistration> unpack(ResultSet resultSet) throws Exception {
		List<MiqaatRegistration> registrationList = new ArrayList<MiqaatRegistration>();
		while(resultSet.next()){
			MiqaatRegistration registration = new MiqaatRegistration();
			registration.seteJamaatId(resultSet.getString("EJAMAAT_ID"));
			registration.setFamilyGroupId(resultSet.getInt("FAMILY_GROUP_ID"));
			registration.setFamilyName(resultSet.getString("FAMILY_NAME"));
			registration.setFirstName(resultSet.getString("FIRST_NAME"));
			registration.setMiqaatDate(resultSet.getDate("MIQAAT_DATE"));
			registration.setMiqaatName(resultSet.getString("MIQAAT_NAME"));
			registration.setEligibility(resultSet.getString("ELIGIBILITY"));
			registration.setSignup(resultSet.getString("SIGNUP"));
			registration.setCovidStatus(resultSet.getString("COVID_STATUS"));
			registration.setFamilyMembers(resultSet.getString("FAMILY_MEMBERS"));
			registration.setTimestamp(resultSet.getString("TIMESTAMP"));
			registrationList.add(registration);
		}
		return registrationList;
	}
}
