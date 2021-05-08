package org.daawat.fmb.api.db;

import java.util.List;

import org.daawat.fmb.api.objects.MiqaatRegistration;

public interface MiqaatRegistrationDAO {

	public List<MiqaatRegistration> getMiqaatRegistrationNRows(int numOfRows) throws Exception;
	
    public List<MiqaatRegistration> getMiqaatRegistrationAll() throws Exception;
    
    public int addMiqaatRegistration(MiqaatRegistration registration) throws Exception;
}
