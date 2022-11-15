import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'Json/data.json';
@Injectable()
export class DataService {
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get(BASE_URL);
  }
}
