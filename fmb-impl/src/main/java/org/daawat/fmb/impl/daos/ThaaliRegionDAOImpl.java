package org.daawat.fmb.impl.daos;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.daawat.fmb.api.db.ThaaliRegionDAO;
import org.daawat.fmb.api.objects.ThaaliRegion;
import org.daawat.fmb.utils.PropertyFileManager;

public class ThaaliRegionDAOImpl  extends BaseJDBCDAO<ThaaliRegion> implements ThaaliRegionDAO{

	@Override
	public int addRegion(ThaaliRegion region) throws Exception {
		String sqlQuery = PropertyFileManager.getProperty("region_add_query");			
		executeQuery(sqlQuery, region.insert().toArray());
		return updateCount;
	}

	@Override
	public List<ThaaliRegion> getRegions() throws Exception {
		String sqlQuery = PropertyFileManager.getProperty("region_select_query");			
		executeQuery(sqlQuery);
		return data;
	}

	@Override
	public List<ThaaliRegion> unpack(ResultSet resultSet) throws Exception {
		List<ThaaliRegion> regionList = new ArrayList<ThaaliRegion>();
		while(resultSet.next()){
			ThaaliRegion region = new ThaaliRegion();
			region.setRegionName(resultSet.getString("REGION_NAME"));
			region.setDescription(resultSet.getString("REGION_DESC"));
			regionList.add(region);
		}
		return regionList;
	}

	
}
