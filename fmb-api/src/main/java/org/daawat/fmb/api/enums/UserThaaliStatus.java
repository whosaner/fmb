package org.daawat.fmb.api.enums;

public enum UserThaaliStatus {

	REQUESTED_BY_USER("REQUESTED"), CANCELLED_BY_USER("CANCELLED"), NOT_REQUESTED_BY_USER("NOT_REQUESTED"), REQUESTED_WITH_NO_RICE("REQUESTED_BUT_NO_RICE");

	private String status ;
	private UserThaaliStatus(String status){
		this.status = status;
	}
	
	public String getValue(){
		return this.status;
	}
	
	public static UserThaaliStatus getEnum(String enumVal){		
		for(UserThaaliStatus statusEnum:values()){
			if(statusEnum.status.equalsIgnoreCase(enumVal)){
				return statusEnum;
			}
		}
		return null;
	}
}
