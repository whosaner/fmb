package org.daawat.fmb.impl.daos;

import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import org.daawat.fmb.api.db.ThaaliFeedbackDAO;
import org.daawat.fmb.api.enums.Category;
import org.daawat.fmb.api.objects.ThaaliFeedback;
import org.daawat.fmb.utils.PropertyFileManager;

public class ThaaliFeedbackDAOImpl extends BaseJDBCDAO<ThaaliFeedback> implements ThaaliFeedbackDAO{

	@Override
	public int addFeedback(ThaaliFeedback feedback) throws Exception {
		String sqlQuery = PropertyFileManager.getProperty("thaali_feedback_add_query");			
		executeQuery(sqlQuery, feedback.insert().toArray());
		return updateCount;
	}

	@Override
	public List<ThaaliFeedback> getThaaliFeedbackAll() throws Exception {
		String sqlQuery = PropertyFileManager.getProperty("thaalifeedback_select_query_all");			
		executeQuery(sqlQuery);
		return data;
	}

	@Override
	public List<ThaaliFeedback> getThaaliFeedbackNRows(int rowLimit)
			throws Exception {
		String sqlQuery = PropertyFileManager.getProperty("thaalifeedback_select_query_first_n_rows");			
		executeQuery(sqlQuery,rowLimit);
		return data;
	}

	@Override
	public List<ThaaliFeedback> unpack(ResultSet resultSet) throws Exception {
		List<ThaaliFeedback> feedbackList = new ArrayList<ThaaliFeedback>();
		while(resultSet.next()){
			ThaaliFeedback feedback = new ThaaliFeedback();
			feedback.seteJamaatId(resultSet.getString("EJAMAAT_ID"));
			feedback.setFamilyGroupId(resultSet.getInt("FAMILY_GROUP_ID"));
			feedback.setFamilyName(resultSet.getString("FAMILY_NAME"));
			feedback.setFirstName(resultSet.getString("FIRST_NAME"));
			feedback.setThaaliCategory(Category.getEnum(resultSet.getString("THAALI_CATEGORY")));
			feedback.setThaaliDate(resultSet.getDate("THAALI_DATE"));
			feedback.setThaaliFeedback(resultSet.getString("THAALI_FEEDBACK"));
			feedback.setFeedbackCreationDate(resultSet.getDate("THAALI_FEEDBACK_DATE"));
			feedback.setThaaliMenu(resultSet.getString("THAALI_MENU"));
			feedback.setQualityRating(resultSet.getString("THAALI_QUALITY"));
			feedback.setQuanityRating(resultSet.getString("THAALI_QUANTITY"));
			feedbackList.add(feedback);
		}
		return feedbackList;
	}

}
