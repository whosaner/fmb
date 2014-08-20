package org.daawat.fmb.api.objects;

import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlAnyElement;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlSeeAlso;

@XmlRootElement(name="response")
@XmlSeeAlso({UserProfileData.class,ThaaliData.class,UserThaaliData.class,UserThaaliView.class, UserThaaliReport.class, ThaaliCount.class})

public class Response<T>{

	
	private List<T> dataList;
	
	private String message;
	
	private boolean isError;
	
	
	
	public Response(){
		
	}

	public Response(List<T> dataList, String message, boolean isError) {
		super();
		this.dataList = dataList;
		this.message = message;
		this.isError = isError;
	}

	public Response(T data, String message, boolean isError) {
		super();
		this.message = message;
		this.isError = isError;
		this.addData(data);
	}
	
	public Response(String message, boolean isError) {
		super();
		this.message = message;
		this.isError = isError;
	}

	public boolean isError() {
		return isError;
	}

	@XmlAttribute
	public void setError(boolean isError) {
		this.isError = isError;
	}

	@XmlAnyElement(lax = true)
	public List<T> getDataList() {
		return dataList;
	}

	@XmlElementWrapper(name = "dataList")
	public void setDataList(List<T> dataList) {
		this.dataList = dataList;
	}

	public String getMessage() {
		return message;
	}

	
	public void setMessage(String message) {
		this.message = message;
	}
	
	public void addData(T data){
		if(this.dataList == null){
			this.dataList = new ArrayList<T>();
		}
		this.dataList.add(data);
	}

	@Override
	public String toString() {
		return "Response [dataList=" + dataList + ", message=" + message
				+ ", isError=" + isError + "]";
	}
	
	

	
}
