package org.daawat.fmb.utils;

public class StringUtils {

	public static boolean isNullOrEmpty(String arg0){
		boolean isNullOrEmpty = true;
		if(arg0 != null && arg0.trim().length() > 0){
			isNullOrEmpty = false;
		}
		return isNullOrEmpty;
	}
}
