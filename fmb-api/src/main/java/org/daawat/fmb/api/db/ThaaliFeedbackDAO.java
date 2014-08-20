package org.daawat.fmb.api.db;

import java.util.List;

import org.daawat.fmb.api.objects.ThaaliFeedback;

public interface ThaaliFeedbackDAO {

	//gets list of all feedback, we need to get only few rows.
	public List<ThaaliFeedback> getThaaliFeedbackNRows(int numOfRows) throws Exception;
	
	//gets list of all feedback
    public List<ThaaliFeedback> getThaaliFeedbackAll() throws Exception;
    
    //add feedback
    public int addFeedback(ThaaliFeedback feedback) throws Exception;
}
