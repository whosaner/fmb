package org.daawat.fmb.api.enums;

public enum ErrorCode {

	USER_ALREADY_EXISTS(1, "User already exists in the system"),
	INCORRECT_CREDENTIALS(2,"Either the ejamaat id or the password is incorrect");
	private  String erroCodeMsg ;
	private int errorCode;
	
	private ErrorCode(int errorCode,String erroCodeMsg){
		this.erroCodeMsg = erroCodeMsg;
		this.errorCode = errorCode;
	}
	
	public String getErrorCodeMsg(){
		return this.erroCodeMsg;
	}
	public int getErrorCode(){
		return this.errorCode;
	}
	public static ErrorCode getEnum(int errorCode){		
		for(ErrorCode errorCodeEnum:values()){
			if(errorCodeEnum.errorCode == errorCode){
				return errorCodeEnum;
			}
		}
		return null;
	}
	
}
