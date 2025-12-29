package com.example.mongo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.mongo.model.MongoRecord;
import com.example.mongo.repository.RecordRepository;

import java.util.List;
import java.util.Optional;

@Service
public class RecordService {
    @Autowired
    private RecordRepository recordRepository;

    // Store a new record
    public MongoRecord  saveRecord(MongoRecord  record) {
        return recordRepository.save(record);
    }

    // Get a record by ID
    public Optional<MongoRecord > getRecordById(String id) {
        return recordRepository.findById(id);
    }

   public MongoRecord updateRecord(String id, MongoRecord updatedRecord) {
    return recordRepository.findById(id).map(record -> {
        record.setTitle(updatedRecord.getTitle());
        record.setNameOfPost(updatedRecord.getNameOfPost());  // Updating name_of_post
        record.setTypeOfPost(updatedRecord.getTypeOfPost());  // Updating type_of_post
        record.setPostDate(updatedRecord.getPostDate());  // Updating post_date
        record.setShortInformation(updatedRecord.getShortInformation()); // Updating short_information
        record.setData(updatedRecord.getData()); // Updating the `data` field
        
        return recordRepository.save(record);
    }).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Record not found with ID: " + id));
}


   
     public List<MongoRecord> getAllRecords() {
        return recordRepository.findAll();
    }

    // Get records by type
    public List<MongoRecord> getRecordsByType(String type) {
       return recordRepository.findByTypeOfPost(type);
    }

    // Delete a record
    public void deleteRecord(String id) {
        if (!recordRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Record not found with ID: " + id);
        }
        recordRepository.deleteById(id);
    }

}
