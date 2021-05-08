package org.daawat.fmb.api.db;

import java.util.Date;
import java.util.List;

import org.daawat.fmb.api.objects.ThaaliCount;

public interface ThaaliCountDAO {

	public List<ThaaliCount> getThaaliCounts(Date fromDate, Date toDate) throws Exception;
	public List<ThaaliCount> getMiqaatCount(Date fromDate, Date toDate) throws Exception;
}
