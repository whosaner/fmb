package org.daawat.fmb.api.objects;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="region")
public class ThaaliRegion implements Serializable{

	
	private static final long serialVersionUID = 1L;
	private String regionName;
	private String description;
	
	public String getRegionName() {
		return regionName;
	}
	public void setRegionName(String regionName) {
		this.regionName = regionName;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	
	//the sequence of variables defined below should match the sequence defined in the database.properties file for insert query.
	public List<Object> insert(){
		List<Object> objList = new ArrayList<Object>();
		objList.add(regionName);
		objList.add(description);
		return objList;
	}

}
