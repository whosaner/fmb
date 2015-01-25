package org.daawat.fmb.api.objects;

import java.util.List;

import javax.xml.bind.annotation.XmlAnyElement;
import javax.xml.bind.annotation.XmlElementWrapper;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlSeeAlso;

@XmlRootElement(name="request")
@XmlSeeAlso({UserProfileData.class,ThaaliData.class,UserThaaliData.class,UserThaaliView.class, ThaaliMenu.class, ThaaliRegion.class, ThaaliFeedback.class, ThaaliCook.class})

public class Request<T> {

	private List<T> dataList;
	
	private String eJamaatId;
	
	private String password;
	
	public Request(){
		
	}

	@XmlAnyElement(lax = true)
	public List<T> getDataList() {
		return dataList;
	}

	@XmlElementWrapper(name = "dataList")
	public void setDataList(List<T> dataList) {
		this.dataList = dataList;
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
	
	
}
