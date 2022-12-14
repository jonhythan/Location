package com.godin.locationSpring.service;

import java.security.PublicKey;
import java.sql.Timestamp;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.godin.locationSpring.model.Message;
import com.godin.locationSpring.repository.MessageRepository;

@Service
public class MessageService {
	@Autowired
	MessageRepository messageRepository;
	
	public List<Message> getAll(){
		return messageRepository.findAll();
	}
	
	public void insert(Map<String, Object> body) {
		Message message = new Message();
		message.setContenu((String)body.get("contenu"));
		message.setDateEnvoi(new Timestamp(System.currentTimeMillis()));
		message.setExpediteurId((Integer)body.get("expediteurId"));
		message.setRecepteurId((Integer)body.get("recepteurId"));
		
		messageRepository.save(message);
	}
}
