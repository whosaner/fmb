package org.daawat.fmb.impl.daos;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.daawat.fmb.api.db.ThaaliMenuDAO;
import org.daawat.fmb.api.objects.ThaaliMenu;
import org.daawat.fmb.utils.PropertyFileManager;

public class ThaaliMenuDAOImpl extends BaseJDBCDAO<ThaaliMenu> implements ThaaliMenuDAO{

	@Override
	//gets all the data from thaali menu table, since we are interested in all the menu items.
	public List<ThaaliMenu> getMenuList() throws Exception {
		String sqlQuery = PropertyFileManager.getProperty("thaalimenu_select_query");			
		executeQuery(sqlQuery);
		return data;
	}

	

	@Override
	//adds a menu item to the thaali menu table.
	public int addMenu(ThaaliMenu menu) throws Exception {
		String sqlQuery = PropertyFileManager.getProperty("thaalimenu_add_query");			
		executeQuery(sqlQuery, menu.insert().toArray());
		return updateCount;
	}
	
	@Override
	public List<ThaaliMenu> unpack(ResultSet resultSet) throws Exception {
		List<ThaaliMenu> menuList = new ArrayList<ThaaliMenu>();
		while(resultSet.next()){
			ThaaliMenu menu = new ThaaliMenu();
			menu.setMenu(resultSet.getString("MENU"));
			menu.setUserName(resultSet.getString("USERNAME"));
			menuList.add(menu);
		}
		return menuList;
	}

}
