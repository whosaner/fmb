package org.daawat.fmb.impl.daos;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.daawat.fmb.api.db.ThaaliCountDAO;
import org.daawat.fmb.api.objects.ThaaliCount;
import org.daawat.fmb.utils.PropertyFileManager;

public class ThaaliCountDAOImpl extends BaseJDBCDAO<ThaaliCount> implements ThaaliCountDAO{

	public final double LARGE_RICE = 0.8;
	public final double MEDIUM_RICE = 0.6;
	public final double SMALL_RICE = 0.5;
	
	public final double LARGE_JAMAN = 1.25;
	public final double MEDIUM_JAMAN = 1.0;
	public final double SMALL_JAMAN = 0.8;
	
	@Override
	public List<ThaaliCount> getThaaliCounts(Date fromDate, Date toDate)
			throws Exception {
		String sqlQuery = PropertyFileManager.getProperty("thaalicount_select_query");
		executeQuery(sqlQuery,fromDate, toDate);
		return data;
	}

	@Override
	public List<ThaaliCount> unpack(ResultSet resultSet) throws Exception {
		// TODO Auto-generated method stub
		List<ThaaliCount> thaaliCounts = new ArrayList<ThaaliCount>();
		while(resultSet.next()){
			ThaaliCount thaaliCount = new ThaaliCount();
			int small = resultSet.getInt("SMALL");
			int medium = resultSet.getInt("MED");
			int large = resultSet.getInt("LARGE");
					
			thaaliCount.setNumOfSmallThaalis(small);
			thaaliCount.setNumOfMediumThaalis(medium);
			thaaliCount.setNumOfLargeThaalis(large);
			thaaliCount.setThaaliDate(resultSet.getDate("THAALI_DATE"));
			thaaliCount.setJamanQty(calculateJamanQty(small,medium,large));
			thaaliCount.setNumOfRiceCups(calculateNumOfRiceCups(small, medium, large));
			thaaliCount.setInstructions("");			
			thaaliCounts.add(thaaliCount);			
		}
		return thaaliCounts;
	}
	
	public int calculateNumOfRiceCups(int small, int medium, int large){
		int numOfRiceCups = (int) Math.ceil(LARGE_RICE * large + MEDIUM_RICE * medium + SMALL_RICE * small);
		return numOfRiceCups;
	}
	
	public int calculateJamanQty(int small, int medium, int large){
		int jamanQty = (int) Math.ceil(LARGE_JAMAN * large + MEDIUM_JAMAN * medium + SMALL_JAMAN * small);
		return jamanQty;
	}

}
