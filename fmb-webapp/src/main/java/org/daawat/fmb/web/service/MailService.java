package org.daawat.fmb.web.service;


import java.util.List;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.daawat.fmb.api.db.UserProfileDataDAO;
import org.daawat.fmb.api.enums.MailToType;
import org.daawat.fmb.api.objects.FmbMailMessage;
import org.daawat.fmb.api.objects.Request;
import org.daawat.fmb.api.objects.Response;
import org.daawat.fmb.api.objects.UserProfileData;
import org.daawat.fmb.impl.daos.UserProfileDataDAOImpl;
import org.daawat.fmb.utils.Logger;
import org.daawat.fmb.utils.PropertyFileManager;

/**
 * This class will provide the functionality of sending email to FMB users.
 * @author HRangwala
 *
 */
@Path("/sendEmail")
public class MailService extends BaseService{
	private static final String COMP_NAME = MailService.class.getName();
	
	@POST	
	@Consumes(MediaType.APPLICATION_JSON)	
	@Produces({MediaType.APPLICATION_XML,MediaType.APPLICATION_JSON})
	public Response<FmbMailMessage> sendEmail(Request<FmbMailMessage> requestObj){
		String msg = "";
		boolean isError = false;
		String eJamaatId = requestObj.geteJamaatId();
		String password = requestObj.getPassword();
		try{
			
			//AUthenticate the user first..
			authenticateUser(eJamaatId, password);
			prepareToSendEmail(requestObj.getDataList().get(0));
		}catch(Exception e){
			msg += "An exception occurred while updating UserThaaliData for the user with the ejamaatid - "+eJamaatId+", stacktrace is "+e;
			Logger.error(COMP_NAME,msg);
			isError = true;
		}
		
		return new Response<FmbMailMessage>(msg, isError);
	}
	
	private void prepareToSendEmail(FmbMailMessage msg) throws Exception{
		final String username = PropertyFileManager.getProperty("mail.username");
		final String password = PropertyFileManager.getProperty("mail.password");
		final String headerImg = PropertyFileManager.getProperty("mail.header.img");
		final String footer = PropertyFileManager.getProperty("mail.footer");
		final String subject = PropertyFileManager.getProperty("mail.subject.prefix") + msg.getSubject();
		final String htmlMsgBody = msg.getBody();
		final String contentType = msg.getBodyContentType();
		final MailToType mailToType = msg.getMailTo();
		
		StringBuffer emailAddresses = new StringBuffer();
		StringBuffer messageContent = new StringBuffer();
		
		UserProfileDataDAO userProfileDAO = new UserProfileDataDAOImpl();
		List<UserProfileData> userProfiles = userProfileDAO.getAllUserProfileData();
		
		
		for(UserProfileData userProfile: userProfiles){
			if(MailToType.JAMAAT.equals(mailToType)){
				emailAddresses.append(userProfile.getEmailAddresses());
			}
			else if(MailToType.ADMIN.equals(mailToType) && MailToType.ADMIN.toString().equals(userProfile.getUserRole().toString())){
				emailAddresses.append(userProfile.getEmailAddresses());
			}
			else if(MailToType.THAALI_PAKAWNAAR.equals(mailToType) && MailToType.THAALI_PAKAWNAAR.toString().equals(userProfile.getUserRole().toString())){
				emailAddresses.append(userProfile.getEmailAddresses());
			}
			else if(MailToType.SUPER_USER.equals(mailToType) && MailToType.SUPER_USER.toString().equals(userProfile.getUserRole().toString())){
				emailAddresses.append(userProfile.getEmailAddresses());
			}
		}
		
		
		Properties props = new Properties();
		props.put("mail.smtp.auth", "true");
		props.put("mail.smtp.starttls.enable", "true");
		props.put("mail.smtp.port", PropertyFileManager.getProperty("mail.smtp.port"));
		props.put("mail.smtp.host", PropertyFileManager.getProperty("mail.smtp.host"));
		
 
		Session session = Session.getInstance(props,
		  new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(username, password);
			}
		  });
 
		try {
 
			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress(PropertyFileManager.getProperty("mail.email.from")));
			message.setRecipients(Message.RecipientType.TO,
				InternetAddress.parse(emailAddresses.toString(), false));
			message.setSubject(subject);
			//Add custom header
			if(headerImg != null){
				messageContent.append("<img src=\""+headerImg+"\">");
			}			
			//Add body
			messageContent.append(htmlMsgBody);
			//Add custom footer
			messageContent.append(footer);
			
			message.setContent(messageContent.toString(), contentType);
			
			Transport.send(message);
 
			Logger.info(COMP_NAME, "Successfully emailed to "+emailAddresses);
 
		} catch (MessagingException e) {
			throw new RuntimeException(e);
		}
	}
}
