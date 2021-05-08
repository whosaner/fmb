package org.daawat.fmb.impl.daos;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.daawat.fmb.api.db.MiqaatDetailsDAO;
import org.daawat.fmb.api.objects.MiqaatDetails;
import org.daawat.fmb.utils.Logger;
import org.daawat.fmb.utils.PropertyFileManager;

public class MiqaatDetailsDAOImpl extends BaseJDBCDAO<MiqaatDetails> implements MiqaatDetailsDAO {

	@Override
	public List<MiqaatDetails> getMiqaatDetailsNRows(int rowLimit) throws Exception{
		String sqlQuery = PropertyFileManager.getProperty("miqaat_details_select_query_first_n_rows");			
		executeQuery(sqlQuery, rowLimit);
		return data;
	}
	
	@Override
	public MiqaatDetails getMiqaatDetailsOneDay(Date miqaatDate) throws Exception {
		String sqlQuery = PropertyFileManager.getProperty("miqaat_details_select_query_single_day");			
		executeQuery(sqlQuery, miqaatDate);
		if(data != null && !data.isEmpty()) return data.get(0);
		Logger.error("MiqaatDetailsDAOImpl", "Inside getMiqaatDetailsOneDay and the data returned from the MIQAAT_DETAIL table is null/empty for the miqaatDate - "+miqaatDate);
		return null;
	}
	
    
    @Override
    public int addMiqaatDetails(MiqaatDetails miqaatDetails) throws Exception {
    	String sqlQuery = PropertyFileManager.getProperty("miqaat_details_add_query");			
		executeQuery(sqlQuery, miqaatDetails.insert().toArray());
		return updateCount;
    }
    
    @Override
	public List<MiqaatDetails> unpack(ResultSet resultSet) throws Exception {
		List<MiqaatDetails> detailsList = new ArrayList<MiqaatDetails>();
		while(resultSet.next()){
			MiqaatDetails miqaatDetail = new MiqaatDetails();
			miqaatDetail.setMiqaatDate(resultSet.getDate("MIQAAT_DATE"));
			miqaatDetail.setMiqaatName(resultSet.getString("MIQAAT_NAME"));			
			detailsList.add(miqaatDetail);
		}
		return detailsList;
	}
}
