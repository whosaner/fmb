package org.daawat.fmb.utils;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

public class PropertyFileManager {
	
	protected  static final String PROP_FILE_NAME = "database.properties";
	private static final String COMP_NAME = "PropertyFileManager";
	private static Map<String, Properties> propMap = new HashMap<String, Properties>();
	
	private PropertyFileManager(){
		
	}
	
	//This method would load the properties file once and cache it in a Map so every time we load the same file comes from the Map.
	public static Properties loadProperties(String propFileName) throws Exception{
		Properties prop = null;
		try {
			if (!propMap.containsKey(propFileName)) {
				// Create a properties object and store it in a Map.
				prop = new Properties();				
				ClassLoader classLoader = ClassLoader.getSystemClassLoader();
				InputStream is = classLoader.getResourceAsStream(propFileName);
				if(is == null){
					//This means we are running in server mode
					is = PropertyFileManager.class.getResourceAsStream("/"+propFileName);
				}
				if(is != null){
					prop.load(is);
				}else{
					//TODO //Log message
					String msg = "The property file  - "+propFileName+" cannot be loaded";
					Logger.error(COMP_NAME, msg);
					throw new Exception(msg);
				}
				
				propMap.put(propFileName, prop);
			} else {
				prop = propMap.get(propFileName);
			}
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			prop = null;
		}
		return prop;
	}
	
	public static String getProperty(String propertyName) throws Exception{
		String prop = null;
		Properties propertiesObj = loadProperties(PROP_FILE_NAME);
		if(propertiesObj != null){
			prop = propertiesObj.getProperty(propertyName);
		}
		return prop;
	}
	
	public static Integer getIntValue(String propertyName) throws Exception{
		String prop = getProperty( propertyName);
		Integer value = null;
		if(prop != null){
			value = Integer.parseInt(prop);
		}
		return value;
	}
	
	
	
}
