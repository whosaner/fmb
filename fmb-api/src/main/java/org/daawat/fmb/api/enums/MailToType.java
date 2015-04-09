package org.daawat.fmb.api.enums;

public enum MailToType {

	JAMAAT("JAMAAT"), ADMIN("ADMIN"),SUPER_USER("SUPER_USER"), THAALI_PAKAWNAAR("THAALI_PAKAWNAAR"), ROTI_BANAWNAAR("ROTI_BANAWNAAR"), NONE("NONE");
	
	private  String type ;
	private MailToType(String type){
		this.type = type;
	}
	
	public String getValue(){
		return this.type;
	}
	public static MailToType getEnum(String enumVal){		
		for(MailToType mailTypeEnum:values()){
			if(mailTypeEnum.type.equalsIgnoreCase(enumVal)){
				return mailTypeEnum;
			}
		}
		return null;
	}
	
}
