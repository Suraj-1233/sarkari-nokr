package com.example.mongo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import com.example.mongo.model.MongoRecord;
import com.example.mongo.service.RecordService;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/records")
public class RecordController {

    @Autowired
    private RecordService recordService;

    // ✅ Store a new record
    @PostMapping
    public ResponseEntity<MongoRecord> createRecord(@Valid @RequestBody MongoRecord record) {
        MongoRecord savedRecord = recordService.saveRecord(record);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRecord);
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
    public ResponseEntity<MongoRecord> updateRecord(@PathVariable String id, @Valid @RequestBody MongoRecord updatedRecord) {
        MongoRecord updated = recordService.updateRecord(id, updatedRecord);
        return ResponseEntity.ok(updated);
    }

    // ✅ Delete a record
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteRecord(@PathVariable String id) {
        try {
            recordService.deleteRecord(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Record deleted successfully!");
            response.put("id", id);
            return ResponseEntity.ok(response);
        } catch (org.springframework.web.server.ResponseStatusException e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Record not found with ID: " + id);
            errorResponse.put("error", e.getReason());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Failed to delete record: " + e.getMessage());
            errorResponse.put("error", "Internal server error");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
     @GetMapping("/by-date")
    public String getByDate(@RequestParam @DateTimeFormat(pattern = "yyyy-MM-dd") Date date) {
        return "Parsed Date: " + date.toString();
    }
}
