package com.example.mongo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.mongo.model.MongoRecord;
import com.example.mongo.service.RecordService;

import java.util.Date;
import java.util.List;

@CrossOrigin(
    origins = {
        "https://servicesarkari.com",
      "https://www.servicesarkari.com"
        "http://13.233.121.16",
        "http://localhost:4200"
    },
    allowCredentials = "true"
)
@RestController
@RequestMapping("/records")
public class RecordController {

    @Autowired
    private RecordService recordService;

    // ✅ Store a new record
    @PostMapping
    public ResponseEntity<MongoRecord> createRecord(@RequestBody MongoRecord record) {
        MongoRecord savedRecord = recordService.saveRecord(record);
        return ResponseEntity.ok(savedRecord);
    }

    // ✅ Get all records
    @GetMapping
    public ResponseEntity<List<MongoRecord>> getAllRecords() {
        List<MongoRecord> records = recordService.getAllRecords();
        return ResponseEntity.ok(records);
    }

    // ✅ Get records by type
    @GetMapping("/type/{type}")
    public ResponseEntity<List<MongoRecord>> getRecordsByType(@PathVariable String type) {
        List<MongoRecord> records = recordService.getRecordsByType(type);
        return records.isEmpty() ? ResponseEntity.noContent().build() : ResponseEntity.ok(records);
    }

    // ✅ Get a single record by ID
    @GetMapping("/{id}")
    public ResponseEntity<MongoRecord> getRecord(@PathVariable String id) {
        return recordService.getRecordById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // ✅ Update a record
    @PutMapping("/{id}")
    public ResponseEntity<MongoRecord> updateRecord(@PathVariable String id, @RequestBody MongoRecord updatedRecord) {
        MongoRecord updated = recordService.updateRecord(id, updatedRecord);
        return ResponseEntity.ok(updated);
    }

    // ✅ Delete a record
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteRecord(@PathVariable String id) {
        recordService.deleteRecord(id);
        return ResponseEntity.ok("Record deleted successfully!");
    }
     @GetMapping("/by-date")
    public String getByDate(@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        return "Parsed Date: " + date.toString();
    }
}
