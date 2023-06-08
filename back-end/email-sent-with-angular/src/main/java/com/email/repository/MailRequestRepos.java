package com.email.repository;


import org.springframework.data.mongodb.repository.MongoRepository;

import com.email.model.MailRequest;

public interface MailRequestRepos extends MongoRepository<MailRequest, String>{

}
