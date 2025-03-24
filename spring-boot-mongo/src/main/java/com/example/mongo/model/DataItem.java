package com.example.mongo.model;

import java.util.List;
import java.util.Map;

public class DataItem {
    private String title;
    private String dataType;
    private boolean collapsed;
    private List<String> items;
    private String newItem;
    private List<String> columns;
    private List<Map<String, String>> data;

    // Getters and Setters
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDataType() { return dataType; }
    public void setDataType(String dataType) { this.dataType = dataType; }

    public boolean isCollapsed() { return collapsed; }
    public void setCollapsed(boolean collapsed) { this.collapsed = collapsed; }

    public List<String> getItems() { return items; }
    public void setItems(List<String> items) { this.items = items; }

    public String getNewItem() { return newItem; }
    public void setNewItem(String newItem) { this.newItem = newItem; }

    public List<String> getColumns() { return columns; }
    public void setColumns(List<String> columns) { this.columns = columns; }

    public List<Map<String, String>> getData() { return data; }
    public void setData(List<Map<String, String>> data) { this.data = data; }
}
