package org.daawat.fmb.api.objects;

import java.io.Serializable;
import java.util.Date;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name="thaaliCount")
public class ThaaliCount implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private int numOfSmallThaalis;
	private int numOfMediumThaalis;
	private int numOfLargeThaalis;
	private int totalNumOfThaalis;
	private Date thaaliDate;
	private int jamanQty; //in quarts
	private int numOfRiceCups; //size of 8 oz cups;
	private String instructions;
	
	public int getNumOfSmallThaalis() {
		return numOfSmallThaalis;
	}
	public void setNumOfSmallThaalis(int numOfSmallThaalis) {
		this.numOfSmallThaalis = numOfSmallThaalis;
	}
	public int getNumOfMediumThaalis() {
		return numOfMediumThaalis;
	}
	public void setNumOfMediumThaalis(int numOfMediumThaalis) {
		this.numOfMediumThaalis = numOfMediumThaalis;
	}
	public int getNumOfLargeThaalis() {
		return numOfLargeThaalis;
	}
	public void setNumOfLargeThaalis(int numOfLargeThaalis) {
		this.numOfLargeThaalis = numOfLargeThaalis;
	}
	public Date getThaaliDate() {
		return thaaliDate;
	}
	public void setThaaliDate(Date thaaliDate) {
		this.thaaliDate = thaaliDate;
	}
	public int getJamanQty() {
		return jamanQty;
	}
	public void setJamanQty(int jamanQty) {
		this.jamanQty = jamanQty;
	}
	public int getNumOfRiceCups() {
		return numOfRiceCups;
	}
	public void setNumOfRiceCups(int numOfRiceCups) {
		this.numOfRiceCups = numOfRiceCups;
	}
	public String getInstructions() {
		return instructions;
	}
	public void setInstructions(String instructions) {
		this.instructions = instructions;
	}
	public int getTotalNumOfThaalis() {
		return totalNumOfThaalis;
	}
	public void setTotalNumOfThaalis(int totalNumOfThaalis) {
		this.totalNumOfThaalis = totalNumOfThaalis;
	}
	
	
	
	
}
