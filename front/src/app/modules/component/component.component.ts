import { Component, inject, OnInit } from '@angular/core';
import { ItemsServiceService } from '../../services/items-service.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { NgModel } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
@Component({
  selector: 'app-component',
  imports: [
    MatButtonModule,
    MatTableModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    CommonModule,
    MatListModule
  ],
  templateUrl: './component.component.html',
  styleUrl: './component.component.scss'
})
export class ComponentComponent implements OnInit {
  private _itemsService = inject(ItemsServiceService)
  private _router = inject(Router)
  ngOnInit(): void {
    this.getAllItems();
   }
  items: any[] = [];

  title = 'front';
  async getAllItems() {
  this._itemsService.getAllItems().subscribe((items) => {
    this.items = items;
  })
  }

   createItem() {
    this._router.navigate(['/new-item']);
  }

   updateItem(id: number) {
    this._router.navigate(['/new-item', id]);
  }

  async deleteItem(id: number) {
    this._itemsService.deleteItem(id).subscribe(() => {
      this.getAllItems();
    })
  }

}
