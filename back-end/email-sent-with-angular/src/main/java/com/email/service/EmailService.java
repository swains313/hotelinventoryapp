package com.email.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.email.model.MailRequest;
import com.email.model.MailResponse;
import com.email.repository.MailRequestRepos;

import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

	@Autowired
	private JavaMailSender mailSender;
	
	@Autowired
	private MailRequestRepos requestRepos;

	public MailResponse sendEmail(MailRequest mailRequest) {
		MimeMessage message = mailSender.createMimeMessage();
		MailResponse response = new MailResponse();
		try {

			MimeMessageHelper helper = new MimeMessageHelper(message, MimeMessageHelper.MULTIPART_MODE_MIXED_RELATED);
			helper.setFrom("communitydevloper@gmail.com");
			helper.setTo(mailRequest.getTo());
			helper.setSubject(mailRequest.getSubject());
			helper.setText(mailRequest.getMessage());

			mailSender.send(message);
			// response.setMessage("mail send to : " + mailRequest.getTo());
			response.setStatus(Boolean.TRUE);

		} catch (Exception e) {
			// response.setMessage("Mail Sending failure : "+e.getMessage());
			response.setStatus(Boolean.FALSE);
			return response;
		}
		requestRepos.save(mailRequest);
		return response;
	}

}
