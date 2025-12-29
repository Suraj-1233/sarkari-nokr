package com.example.mongo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Document(collection = "records") // MongoDB collection name
public class MongoRecord {
    
    @Id
    private String id;
    private String title;
    private String nameOfPost;  // `name_of_post` JSON field
    private String typeOfPost;  // `type_of_post` JSON field
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime postDate;  // `post_date` as Date type
    private String shortInformation;  // `short_information` JSON field
    private List<Map<String, Object>> data; // Flexible for nested JSON structures

    // Default constructor
    public MongoRecord() {}

    // Constructor with parameters
    public MongoRecord(String title, String nameOfPost, String typeOfPost, LocalDateTime postDate, String shortInformation, List<Map<String, Object>> data) {
        this.title = title;
        this.nameOfPost = nameOfPost;
        this.typeOfPost = typeOfPost;
        this.postDate = postDate;
        this.shortInformation = shortInformation;
        this.data = data;
    }

    // Getter and Setter for id
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    // Getter and Setter for title
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    // Getter and Setter for nameOfPost
    public String getNameOfPost() {
        return nameOfPost;
    }

    public void setNameOfPost(String nameOfPost) {
        this.nameOfPost = nameOfPost;
    }

    // Getter and Setter for typeOfPost
    public String getTypeOfPost() {
        return typeOfPost;
    }

    public void setTypeOfPost(String typeOfPost) {
        this.typeOfPost = typeOfPost;
    }

    // Getter and Setter for postDate
    public LocalDateTime getPostDate() {
        return postDate;
    }

    public void setPostDate(LocalDateTime postDate) {
        this.postDate = postDate;
    }

    // Getter and Setter for shortInformation
    public String getShortInformation() {
        return shortInformation;
    }

    public void setShortInformation(String shortInformation) {
        this.shortInformation = shortInformation;
    }

    // Getter and Setter for data
    public List<Map<String, Object>> getData() {
        return data;
    }

    public void setData(List<Map<String, Object>> data) {
        this.data = data;
    }
}
