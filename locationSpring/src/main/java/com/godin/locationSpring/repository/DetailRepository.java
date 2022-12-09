package com.godin.locationSpring.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.godin.locationSpring.model.Detail;
import com.godin.locationSpring.model.idClass.DetailId;

public interface DetailRepository extends JpaRepository<Detail, DetailId> {

}
