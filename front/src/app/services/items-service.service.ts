import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ItemsServiceService {
  private _httpClient = inject(HttpClient);

  constructor() {}

  private apiUrl = 'http://localhost:5000/api/items';

  // Obtener todos los elementos
  getAllItems() {
    return this._httpClient.get<any[]>(this.apiUrl);
  }

  // Obtener un elemento por su ID
  getItemById(id: number) {
    return this._httpClient.get<any>(`${this.apiUrl}/${id}`);
  }

  // Crear un nuevo registro
  createItem(id: any, name: any, age: number, description: string) {
    return this._httpClient.post<any>(this.apiUrl, { id, name, age, description });
  }

  // Actualizar un registro existente
  updateItem(id: number, name: string, age: number, description: string) {
    return this._httpClient.put<any>(`${this.apiUrl}/${id}`, { name, age, description });
  }

  // Eliminar un registro
  deleteItem(id: number) {
    return this._httpClient.delete<any>(`${this.apiUrl}/${id}`);
  }
}
