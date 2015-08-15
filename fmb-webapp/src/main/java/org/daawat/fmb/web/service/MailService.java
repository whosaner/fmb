package org.daawat.fmb.web.service;


import java.util.List;
import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import org.daawat.fmb.api.db.UserProfileDataDAO;
import org.daawat.fmb.api.enums.EmailType;
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
	
	@Context ServletContext servletContext;
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
			prepareToSendEmailToJamaat(requestObj.getDataList().get(0));
		}catch(Exception e){
			msg += "An exception occurred while sending email, stacktrace is "+e.getMessage();
			Logger.error(COMP_NAME,msg);
			isError = true;
		}
		
		return new Response<FmbMailMessage>(msg, isError);
	}
	
	private void prepareToSendEmailToJamaat(FmbMailMessage msg) throws Exception{
	    final MailToType mailToType = msg.getMailTo();
				
		StringBuilder emailAddresses = new StringBuilder();
		UserProfileDataDAO userProfileDAO = new UserProfileDataDAOImpl();
		List<UserProfileData> userProfiles = userProfileDAO.getAllUsers();
		
		//We need to get email address of all jamaat members in order to send them email's.
		for(int i=0;i<userProfiles.size();i++){
			UserProfileData userProfile = userProfiles.get(i);
			final EmailType emailType  = userProfile.getEmailType();
			boolean append = false;
			
			if(MailToType.JAMAAT.equals(mailToType)){
				append = true;
			}
			else if(mailToType.toString().equals(userProfile.getUserRole().toString())){
				append = true;
			}
			
			if(append && (EmailType.ALL.equals(emailType) || emailType.equals(msg.getEmailType()))){
				emailAddresses = emailAddresses.length() > 0 && userProfile.getEmailAddresses().length()> 0 ? emailAddresses.append(","): emailAddresses.append("");
				emailAddresses.append(userProfile.getEmailAddresses());
			}
		}
		msg.setToEmailAddresses(emailAddresses.toString());
		prepareToSendEmail(msg);
	}
	
	public void prepareToSendEmail(FmbMailMessage msg) throws Exception{
		final String username = PropertyFileManager.getProperty("mail.username");
		final String password = PropertyFileManager.getProperty("mail.password");
		final String headerImg = PropertyFileManager.getProperty("mail.header.img");		
		final String footer = PropertyFileManager.getProperty("mail.footer");
		final String subject = msg.getSubject();
		final String htmlMsgBody = msg.getBody();
		
		
		StringBuilder htmlMsgContent = new StringBuilder();

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
 
			MimeMultipart content = new MimeMultipart("related");
			
			
			htmlMsgContent.append("<html><body>");
			//Add custom header image
			if(headerImg != null){				
				htmlMsgContent.append("<img src=\""+headerImg+"\"  style=\"display: block;\" />");
				//Attaching image as inline
				/*final String contentId = "email-logo-001";
				htmlMsgContent.append("<img src=\"cid:"+contentId+"\"  style=\"display: block;\" />");
				MimeBodyPart imagePart = new MimeBodyPart();
				Logger.info(COMP_NAME,"headerImg for the file is "+headerImg);
				File imgFile = new File(servletContext.getRealPath(headerImg));//gets the absolute path on the server.					
				if(imgFile != null){
					imagePart.attachFile(imgFile);
					imagePart.setContentID("<" + contentId + ">");
					imagePart.setDisposition(MimeBodyPart.INLINE);
					content.addBodyPart(imagePart);
				}*/				
			}
			
			//Message Body
			htmlMsgContent.append(htmlMsgBody);
			//Add custom footer
			htmlMsgContent.append(footer);
			htmlMsgContent.append("</body></html>");
			
			//Body part
			MimeBodyPart htmlPart = new MimeBodyPart();
			htmlPart.setText(htmlMsgContent.toString(), "UTF-8", "html");
			//adding it back to the content.
			content.addBodyPart(htmlPart);
			
			//send the message			
			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress(PropertyFileManager.getProperty("mail.email.from")));
			message.setRecipients(Message.RecipientType.BCC,
				InternetAddress.parse(msg.getToEmailAddresses(), false));
			message.setSubject(subject);			
			message.setContent(content);			
			Transport.send(message);
 
			Logger.info(COMP_NAME, "Successfully emailed to following emailAddress'es - "+msg.getToEmailAddresses()+", HTML msg is "+htmlMsgContent.toString());
 
		} catch (MessagingException e) {
			e.printStackTrace();
			throw new RuntimeException(e);
		} catch(Exception e){
			e.printStackTrace();
			throw new RuntimeException(e);
		}
	}
}
