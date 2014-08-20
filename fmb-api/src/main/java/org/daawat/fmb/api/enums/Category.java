package org.daawat.fmb.api.enums;

public enum Category {

	Small("Small"), Medium("Medium"),Large("Large");
	
	private  String category ;
	private Category(String category){
		this.category = category;
	}
	
	public String getValue(){
		return this.category;
	}
	public static Category getEnum(String enumVal){		
		for(Category categoryEnum:values()){
			if(categoryEnum.category.equalsIgnoreCase(enumVal)){
				return categoryEnum;
			}
		}
		return null;
	}
	
}
