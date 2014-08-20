package org.daawat.fmb.impl.daos;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.Date;
import java.util.List;

import org.daawat.fmb.utils.Logger;
import org.daawat.fmb.utils.PropertyFileManager;

/**
 * This class will actually do the work of getting the data from the db by executing the query, packing the prepared statement with the input params and in case of a select it would then
 * call the respective child classes unpack method to convert the ResultSet object to appropriate entity.
 * @author HRangwala
 *
 * @param <T>
 */
public  abstract class BaseJDBCDAO<T>{
	
	//Making the below instance variables as protected so that it can be used by inheriting classes.
	
	protected Connection connection;
	protected PreparedStatement prepareStatement;
	protected List<T> data;
	protected int updateCount = 0;
	private static final String COMP_NAME = "BaseJDBCDAO";
	protected ResultSet resultSet = null;
	
	
	
	
	/**
	 * This method can be used to execute any type of query (Select, insert, update or delete) on db
	 * @param sqlQuery -  The query that needs to be executed.
	 * @param args -  The list of arguments.
	 * @throws Exception
	 */
	public void executeQuery(String sqlQuery, Object ... args) throws Exception{	
		try {
			getPrepareStatement(sqlQuery); //get the prepared statement
			pack(args); //packing the prepare statement object with the input arr.
			boolean result = prepareStatement.execute(); //executing the query.
			if(result){
				Logger.info(COMP_NAME, "Executed the PrepareStatement and now Fetching the ResultSet ---");
				//means the query returned a result set object
				ResultSet resultSet = prepareStatement.getResultSet();
				Logger.info(COMP_NAME, "Got the ResultSet object will now unpack the resultset. ----");
				data  = unpack(resultSet);
			}else{
				updateCount = prepareStatement.getUpdateCount();
				Logger.info(COMP_NAME, "No of rows affected by the sqlQuery is - "+updateCount);
			}
			releaseConnection(); //releasing the connection and the prepare statement
		} catch (Exception e) {
			// Log Message
			Logger.error(COMP_NAME, "An exception has occurred inside the executeQuery method for sqlQuery -"+sqlQuery, e);
			throw e;
		}
	}
	
	public void executeQueryAlt(String sqlQuery, Object ... args) throws Exception{
		try {
			getPrepareStatement(sqlQuery); //get the prepared statement
			pack(args); //packing the prepare statement object with the input arr.
			boolean result = prepareStatement.execute(); //executing the query.
			if(result){
				Logger.info(COMP_NAME, "Executed the PrepareStatement and now Fetching the ResultSet ---");
				//means the query returned a result set object
				resultSet = prepareStatement.getResultSet();
				Logger.info(COMP_NAME, "Got the ResultSet object----");				
			}else{
				updateCount = prepareStatement.getUpdateCount();
				Logger.info(COMP_NAME, "No of rows affected by the sqlQuery is - "+updateCount);
			}			
		} catch (Exception e) {
			// Log Message
			Logger.error(COMP_NAME, "An exception has occurred inside the executeQuery method for sqlQuery -"+sqlQuery, e);
			throw e;
		}		
	}
	
	/**
	 * This method will pack the prepare statement with all the args passed in.
	 * @param args
	 * @throws SQLException
	 */
	public void pack(Object[] args) throws SQLException {
		int i = 1;
		if (args != null && args.length > 0) {
			for (Object arg : args) {
				if (arg instanceof Date) {
					prepareStatement.setDate(i++, new java.sql.Date(((Date) arg).getTime()));
				} else if (arg instanceof Integer) {
					prepareStatement.setInt(i++, (Integer) arg);
				} else if (arg instanceof Long) {
					prepareStatement.setLong(i++, (Long) arg);
				} else if (arg instanceof Double) {
					prepareStatement.setDouble(i++, (Double) arg);
				} else if (arg instanceof Float) {
					prepareStatement.setFloat(i++, (Float) arg);
				} else if (arg instanceof Timestamp) {
					prepareStatement.setTimestamp(i++, new Timestamp(((Date) arg).getTime()));
				}else if (arg instanceof Boolean) {
					//If we set the preparesStatement as Boolean it will store as 1 or 0.
					prepareStatement.setString(i++, ((Boolean)arg).toString());
				}else {
					prepareStatement.setString(i++, (String) arg);
				}
			}
		}
		Logger.info(COMP_NAME, "Packing the ResulSet completed ---");
	}

	
	
	private void getPrepareStatement(String sqlQuery) throws Exception {
		String driverClass = PropertyFileManager.getProperty( "db.driverClassName");
		String dbUrl = PropertyFileManager.getProperty( "db.url");
		String username = PropertyFileManager.getProperty( "db.username");
		String password = PropertyFileManager.getProperty( "db.password");
		
		//Loading the driver class.
		Class.forName(driverClass);
		
		this.connection = DriverManager.getConnection(dbUrl,username,password);
		this.connection.setTransactionIsolation(Connection.TRANSACTION_READ_COMMITTED);
		this.connection.setAutoCommit(true);
		this.prepareStatement = connection.prepareStatement(sqlQuery);
		
		Logger.info(COMP_NAME, "Getting the prepared statement for the sql query --"+sqlQuery+", for the db.url -"+dbUrl);

	}
	
	/**
	 * Releasing the resources.
	 * @throws Exception
	 */
	protected void releaseConnection() throws Exception{
		//close connection			
		if(this.prepareStatement != null){
			this.prepareStatement.close();
		}
		
		if(this.connection != null){
			this.connection.close();
		}
		Logger.info(COMP_NAME, "Releasing the connection ----");
	
	}
	
	
	/**
	 * A method that should be overridden by the implementing child classes. This would be needed to convert the ResultSet object to appropriate entities.
	 * @param resultSet
	 * @return
	 */
	public abstract List<T>  unpack(ResultSet resultSet) throws Exception;

	
}
