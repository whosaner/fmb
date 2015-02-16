package org.daawat.fmb.api.enums;

public enum UserRole {
	
	USER("USER"), SUPER_USER("SUPER_USER"), ADMIN("ADMIN"), COOK("COOK");

	private String userRole;
	private UserRole(String role){
		this.userRole = role;
	}
	public String getValue(){
		return this.userRole;
	}
	
	public static UserRole getEnum(String enumVal){		
		for(UserRole userRoleEnum:values()){
			if(userRoleEnum.userRole.equalsIgnoreCase(enumVal)){
				return userRoleEnum;
			}
		}
		return null;
	}
	
	
}
