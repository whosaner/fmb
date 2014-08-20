package org.daawat.fmb.api.objects;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="menu")
public class ThaaliMenu implements Serializable{

	private static final long serialVersionUID = 1L;
	private String menu;
	private String userName;
	
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
		
	public String getMenu() {
		return menu;
	}
	public void setMenu(String menu) {
		this.menu = menu;
	}
	
	//the sequence of variables defined below should match the sequence defined in the database.properties file for insert query.
	public List<Object> insert(){
		List<Object> objList = new ArrayList<Object>();
		objList.add(menu);
		objList.add(userName);
		return objList;
	}
	@Override
	public String toString() {
		return "ThaaliMenu [menu=" + menu + ", userName=" + userName + "]";
	}
	
	
	

}
