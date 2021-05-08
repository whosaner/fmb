package org.daawat.fmb.impl.daos;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.daawat.fmb.api.db.ThaaliCountDAO;
import org.daawat.fmb.api.objects.ThaaliCount;
import org.daawat.fmb.utils.PropertyFileManager;

public class ThaaliCountDAOImpl extends BaseJDBCDAO<ThaaliCount> implements ThaaliCountDAO{

	public final double XLARGE_RICE = 1.0;
	public final double LARGE_RICE = 0.8;
	public final double MEDIUM_RICE = 0.6;
	public final double SMALL_RICE = 0.5;
	public final double XSMALL_RICE = 0.3;
	
	public final double XLARGE_JAMAN = 1.75;
	public final double LARGE_JAMAN = 1.25;
	public final double MEDIUM_JAMAN = 1.0;
	public final double SMALL_JAMAN = 0.8;
	public final double XSMALL_JAMAN = 0.5;
	
	@Override
	public List<ThaaliCount> getThaaliCounts(Date fromDate, Date toDate)
			throws Exception {
		String sqlQuery = PropertyFileManager.getProperty("thaalicount_select_query");
		executeQuery(sqlQuery,fromDate, toDate);
		return data;
	}
	
	@Override
	public List<ThaaliCount> getMiqaatCount(Date fromDate, Date toDate)
			throws Exception {
		String sqlQuery = PropertyFileManager.getProperty("miqaatcount_select_query");
		executeQuery(sqlQuery,fromDate, toDate);
		return data;
	}

	@Override
	public List<ThaaliCount> unpack(ResultSet resultSet) throws Exception {
		// TODO Auto-generated method stub
		List<ThaaliCount> thaaliCounts = new ArrayList<ThaaliCount>();
		while(resultSet.next()){
			ThaaliCount thaaliCount = new ThaaliCount();			
			
			int xSmall = resultSet.getInt("X_SMALL");
			int small =  resultSet.getInt("SMALL");
			int medium = resultSet.getInt("MED");			
			int large =  resultSet.getInt("LARGE");
			int xLarge = resultSet.getInt("X_LARGE");
			
			//set num of rice cups b4 calculating thaalis with no rice.
			thaaliCount.setNumOfRiceCups(calculateNumOfRiceCups(xSmall, small, medium, large, xLarge));
			
			xSmall += resultSet.getInt("X_SMALL_NO_RICE");
			small += resultSet.getInt("SMALL_NO_RICE");
			medium += resultSet.getInt("MED_NO_RICE");
			large += resultSet.getInt("LARGE_NO_RICE");
			xLarge += resultSet.getInt("X_LARGE_NO_RICE");
			
			thaaliCount.setNumOfXSmallThaalis(xSmall);
			thaaliCount.setNumOfSmallThaalis(small);
			thaaliCount.setNumOfMediumThaalis(medium);
			thaaliCount.setNumOfLargeThaalis(large);
			thaaliCount.setNumOfXLargeThaalis(xLarge);
			thaaliCount.setTotalNumOfThaalis(xSmall+small+medium+large+xLarge);
			thaaliCount.setThaaliDate(resultSet.getDate("THAALI_DATE"));
			thaaliCount.setJamanQty(calculateJamanQty(xSmall, small,medium,large, xLarge));
			
			thaaliCount.setNumOfPpl(resultSet.getInt("NUM_OF_PPL"));
			
			Double approxThaals = Math.ceil((double)thaaliCount.getNumOfPpl()/(double)8);
			thaaliCount.setApproxNumOfThaals(approxThaals.intValue());
			thaaliCount.setMiqaatInstructions("Few approximations that can help mumineen prepare jaman - 2 cups of rice (8 oz each) per thaal, 1.5 quart tarkaari per thaal OR 1 lb gosht per thaal");
			thaaliCount.setInstructions("");			
			thaaliCounts.add(thaaliCount);			
		}
		return thaaliCounts;
	}
	
	public int calculateNumOfRiceCups(int xSmall, int small, int medium, int large, int xLarge){
		int numOfRiceCups = (int) Math.ceil(XLARGE_RICE * xLarge + LARGE_RICE * large + MEDIUM_RICE * medium + SMALL_RICE * small + XSMALL_RICE * xSmall);
		return numOfRiceCups;
	}
	
	public int calculateJamanQty(int xSmall, int small, int medium, int large, int xLarge){
		int jamanQty = (int) Math.ceil(XLARGE_JAMAN * xLarge + LARGE_JAMAN * large + MEDIUM_JAMAN * medium + SMALL_JAMAN * small + XSMALL_JAMAN * xSmall);
		return jamanQty;
	}
	

}
