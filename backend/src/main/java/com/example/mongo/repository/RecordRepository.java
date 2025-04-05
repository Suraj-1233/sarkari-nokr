package com.example.mongo.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.mongo.model.MongoRecord;

public interface RecordRepository extends MongoRepository<MongoRecord , String> {
    List<MongoRecord> findByTypeOfPost(String typeOfPost);

}
