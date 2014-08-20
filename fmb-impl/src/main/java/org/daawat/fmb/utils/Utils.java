package org.daawat.fmb.utils;

import java.util.List;

public class Utils {

	public static boolean isNullOrEmpty(List<? extends Object> list){
		if(list == null || list.isEmpty()){
			return true;
		}
		return false;
	}
}
