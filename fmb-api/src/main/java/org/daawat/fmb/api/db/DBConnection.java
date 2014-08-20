package org.daawat.fmb.api.db;

import java.sql.ResultSet;

public interface DBConnection {

	public ResultSet read(String sqlQuery);
	
	public int create(String sqlQuery);
	
	public int update(String sqlQuery);
	
	public int delete(String sqlQuery);
	
	
}
