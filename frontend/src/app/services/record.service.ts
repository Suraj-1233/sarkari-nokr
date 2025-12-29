import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ENDPOINTS } from '../constants/api-endpoints';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  private baseUrl = API_ENDPOINTS.BASE_URL;

  constructor(private http: HttpClient) {}

  // Get all records
  getAllRecords(): Observable<any> {
    return this.http.get(`${this.baseUrl}${API_ENDPOINTS.RECORDS.GET_ALL}`);
  }

  // Get record by ID
  getRecordById(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${API_ENDPOINTS.RECORDS.GET_BY_ID(id)}`);
  }

  // Get records by type
  getRecordsByType(type: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${API_ENDPOINTS.RECORDS.GET_BY_TYPE(type)}`);
  }

  // Create a new record (Auth header added by interceptor)
  createRecord(record: any): Observable<any> {
    return this.http.post(`${this.baseUrl}${API_ENDPOINTS.RECORDS.CREATE}`, record);
  }

  // Update an existing record (Auth header added by interceptor)
  updateRecord(id: string, record: any): Observable<any> {
    return this.http.put(`${this.baseUrl}${API_ENDPOINTS.RECORDS.UPDATE(id)}`, record);
  }

  // Delete a record (Auth header added by interceptor)
  deleteRecord(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}${API_ENDPOINTS.RECORDS.DELETE(id)}`);
  }
}
