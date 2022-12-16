package com.godin.locationSpring.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.godin.locationSpring.model.Message;

public interface MessageRepository extends JpaRepository<Message, Integer> {

}
