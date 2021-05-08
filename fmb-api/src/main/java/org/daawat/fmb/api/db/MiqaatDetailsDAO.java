package org.daawat.fmb.api.db;

import java.util.Date;
import java.util.List;

import org.daawat.fmb.api.objects.MiqaatDetails;

public interface MiqaatDetailsDAO {

	public List<MiqaatDetails> getMiqaatDetailsNRows(int numOfRows) throws Exception;
	
	public MiqaatDetails getMiqaatDetailsOneDay(Date miqaatDate) throws Exception;
	    
    public int addMiqaatDetails(MiqaatDetails miqaatDetails) throws Exception;
}
