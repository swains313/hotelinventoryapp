package com.email.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import org.springframework.web.bind.annotation.RestController;

import com.email.model.MailRequest;
import com.email.model.MailResponse;
import com.email.service.EmailService;

@RestController
@CrossOrigin
public class EmailController {

	@Autowired
	private EmailService service;

	@PostMapping("/sendemail")
	public MailResponse sendEmail(@RequestBody MailRequest request) {
//		Map<String, Object> model = new HashMap<>();
//		//here with the help of map we can sent key value dynamic data
//		model.put("name", request.getName());
//		model.put("location", "Bangalore,India");
//		model.put("signature", "saumyaranajn");
		return service.sendEmail(request);

	}

}
