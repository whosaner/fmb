package org.daawat.fmb.api.objects;

import java.io.Serializable;
import java.util.List;

import javax.xml.bind.annotation.XmlRootElement;

import org.daawat.fmb.api.enums.MailToType;

@XmlRootElement(name="mail")
public class FmbMailMessage implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String body;
	private String bodyContentType;
	private String subject;
	//TODO not too sure
	private List<byte[]> mailAttachments;
	private MailToType mailTo;
	
	
	
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	public List<byte[]> getMailAttachments() {
		return mailAttachments;
	}
	public void setMailAttachments(List<byte[]> mailAttachments) {
		this.mailAttachments = mailAttachments;
	}
	public MailToType getMailTo() {
		return mailTo;
	}
	public void setMailTo(MailToType mailTo) {
		this.mailTo = mailTo;
	}
	public String getBody() {
		return body;
	}
	public void setBody(String body) {
		this.body = body;
	}
	public String getBodyContentType() {
		return bodyContentType;
	}
	public void setBodyContentType(String bodyContentType) {
		this.bodyContentType = bodyContentType;
	}
}
