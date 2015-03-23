package org.daawat.fmb.api.objects;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="credentials")
public class UserCredentialData implements Serializable{

	private static final long serialVersionUID = 1L;
	private String eJamaatId; //kept it as a string since we do not know the underlying rule associated with ejmaatid generation.
	private String password;
	
	
	
	public UserCredentialData() {
		super();
	}

	public UserCredentialData(String eJamaatId, String password) {
		super();
		this.eJamaatId = eJamaatId;
		this.password = password;
	}
	
	public String geteJamaatId() {
		return eJamaatId;
	}
	
	
	public void seteJamaatId(String eJamaatId) {
		this.eJamaatId = eJamaatId;
	}
	
	
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	public List<Object> toList(){
		List<Object> objList = new ArrayList<Object>();
		objList.add(eJamaatId);
		objList.add(password);
		return objList;
	}
	@Override
	public String toString() {
		return "UserCredentialData [eJamaatId=" + eJamaatId + ", password="
				+ password + "]";
	}

	
}
