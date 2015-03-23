package org.daawat.fmb.api.objects;

import java.io.Serializable;

import javax.xml.bind.annotation.XmlRootElement;


@XmlRootElement(name="cook")
public class ThaaliCook implements Serializable{

	private static final long serialVersionUID = 1L;
	private String cookName;

	
	public String getCookName() {
		return cookName;
	}
	public void setCookName(String cook) {
		this.cookName = cook;
	}
		
		
	//the sequence of variables defined below should match the sequence defined in the database.properties file for insert query.
	public String insert(){
		return cookName;
	}
	@Override
	public String toString() {
		return "ThaaliCook [cook=" + cookName+"]";
	}
	
	
	

}
