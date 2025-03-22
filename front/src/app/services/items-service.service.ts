import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ItemsServiceService {
private _httpClient = inject(HttpClient)
  constructor() { }

  private apiUrl = 'http://localhost:5000/api/items';

  getAllItems() {
    return this._httpClient.get<any[]>(this.apiUrl);
  }

  getItemById(id: number) {
    return this._httpClient.post<any>(`${this.apiUrl}/get`, { id });
  }

  createItem(id:any, name:any) {

    return this._httpClient.post<any>(this.apiUrl, { id, name});
  }

  updateItem(id: number, name: string) {
    return this._httpClient.put<any>(this.apiUrl, { id, name });
  }

  deleteItem(id: number) {
    return this._httpClient.post<any>(`${this.apiUrl}/delete`, { id });
  }

}
