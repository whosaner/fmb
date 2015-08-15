package org.daawat.fmb.impl.daos;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.daawat.fmb.api.db.ThaaliCookDAO;
import org.daawat.fmb.api.enums.EmailType;
import org.daawat.fmb.api.objects.ThaaliCook;
import org.daawat.fmb.utils.PropertyFileManager;

public class ThaaliCookDAOImpl extends BaseJDBCDAO<ThaaliCook> implements ThaaliCookDAO{

	@Override
	//gets all the data from thaali menu table, since we are interested in all the menu items.
	public List<ThaaliCook> getCooks() throws Exception {
		String sqlQuery = PropertyFileManager.getProperty("thaalicook_select_query");			
		executeQuery(sqlQuery);
		return data;
	}

	

	@Override
	//adds a menu item to the thaali menu table.
	public int addCook(ThaaliCook cook) throws Exception {
		String sqlQuery = PropertyFileManager.getProperty("thaalicook_add_query");			
		executeQuery(sqlQuery, cook.insert());
		return updateCount;
	}
	
	@Override
	public List<ThaaliCook> unpack(ResultSet resultSet) throws Exception {
		List<ThaaliCook> cookList = new ArrayList<ThaaliCook>();
		while(resultSet.next()){
			ThaaliCook cook = new ThaaliCook();
			cook.setCookName(resultSet.getString("COOK"));
			cook.setEmailAddress(resultSet.getString("EMAIL_ADDRESSES"));
			cook.setEmailType(EmailType.getEnum(resultSet.getString("SEND_EMAIL")));
			cookList.add(cook);
		}
		return cookList;
	}

}
