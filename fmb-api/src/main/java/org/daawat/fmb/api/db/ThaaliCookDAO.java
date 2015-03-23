package org.daawat.fmb.api.db;

import java.util.List;

import org.daawat.fmb.api.objects.ThaaliCook;

public interface ThaaliCookDAO {

	//Gets the list of cooks from the database.
	public List<ThaaliCook> getCooks() throws Exception;
	
	//adds the cook to the db.
	public int addCook(ThaaliCook cook) throws Exception;
}
