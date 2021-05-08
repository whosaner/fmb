package org.daawat.fmb.api.objects;

import java.io.Serializable;
import java.util.Date;
import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlTransient;

@XmlRootElement(name="miqaatDetails")
public class MiqaatDetails implements Serializable{

	private static final long serialVersionUID = 1L;
	private String miqaatName;
	@XmlTransient
	private Date miqaatDate;
	
	
	public Date getMiqaatDate() {
		return miqaatDate;
	}
	public void setMiqaatDate(Date miqaatDate) {
		this.miqaatDate = miqaatDate;
	}
	
	public String getMiqaatName() {
		return miqaatName;
	}
	public void setMiqaatName(String miqaatName) {
		this.miqaatName = miqaatName;
	}
	
	//the sequence of variables defined below should match the sequence defined in the database.properties file for insert query.
	public List<Object> insert(){
			List<Object> objList = new ArrayList<Object>();
			objList.add(miqaatDate);
			objList.add(miqaatName);			
			return objList;
	}
		
	
	
	
	
}
