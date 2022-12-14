package com.godin.locationSpring.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.godin.locationSpring.model.Message;
import com.godin.locationSpring.service.MessageService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class MessageController {
	@Autowired
	MessageService messageService;
	
	@GetMapping("/messages")
	public List<Message> getMessages(){
		return messageService.getAll();
	}
	
	@PostMapping("/message/insert")
	public void insertMessage(@RequestBody Map<String, Object> body) {
		messageService.insert(body);
	}

}
