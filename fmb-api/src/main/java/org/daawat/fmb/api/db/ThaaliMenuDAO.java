package org.daawat.fmb.api.db;

import java.util.List;

import org.daawat.fmb.api.objects.ThaaliMenu;

public interface ThaaliMenuDAO {

	//Gets the list of menu from the database.
	public List<ThaaliMenu> getMenuList() throws Exception;
	
	//adds the menu to the db.
	public int addMenu(ThaaliMenu menuList) throws Exception;
}
