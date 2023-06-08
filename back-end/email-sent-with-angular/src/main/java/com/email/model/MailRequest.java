package com.email.model;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "emaildata")
public class MailRequest {
	
	private	String from;
	private String to;
	private String subject;
	private String message;

}
