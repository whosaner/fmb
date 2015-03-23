package org.daawat.fmb.api.enums;

public enum ThaaliStatus {

	THAALI_NOT_PRESENT("NO_THAALI"), THAALI_PRESENT("THAALI_PRESENT");

	private String status ;
	private ThaaliStatus(String status){
		this.status = status;
	}
	
	public String getValue(){
		return this.status;
	}
	
	public static ThaaliStatus getEnum(String enumVal){		
		for(ThaaliStatus statusEnum:values()){
			if(statusEnum.status.equalsIgnoreCase(enumVal)){
				return statusEnum;
			}
		}
		return null;
	}
}
