package org.daawat.fmb.api.db;

import java.util.List;

import org.daawat.fmb.api.objects.ThaaliRegion;

public interface ThaaliRegionDAO {

	//get list of all region's for thaali
	public List<ThaaliRegion> getRegions() throws Exception;
	
	//add region to region table
	public int addRegion(ThaaliRegion region) throws Exception;
}
