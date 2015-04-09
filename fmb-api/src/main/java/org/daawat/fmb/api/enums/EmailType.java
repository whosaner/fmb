package org.daawat.fmb.api.enums;

public enum EmailType {
	ALL("ALL"),
	MIQAAT("MIQAAT"),
	FMB("FMB"),
	NONE("NONE");
	
	private  String type ;
	private EmailType(String type){
		this.type = type;
	}
	
	public String getValue(){
		return this.type;
	}
	public static EmailType getEnum(String enumVal){		
		for(EmailType emailTemplateEnum:values()){
			if(emailTemplateEnum.type.equalsIgnoreCase(enumVal)){
				return emailTemplateEnum;
			}
		}
		return null;
	}
	
}
