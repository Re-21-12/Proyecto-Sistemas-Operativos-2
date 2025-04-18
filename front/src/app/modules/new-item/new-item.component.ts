import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ItemsServiceService } from '../../services/items-service.service';

@Component({
  selector: 'app-new-item',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './new-item.component.html',
  styleUrls: ['./new-item.component.scss'],
})
export class NewItemComponent implements OnInit {
  private _router = inject(Router);
  private _activatedRoute = inject(ActivatedRoute);

  private _itemService = inject(ItemsServiceService);
  itemForm: FormGroup;
  id?: number;

  constructor(private fb: FormBuilder) {
    this.itemForm = this.fb.group({
      id: [null],
      name: [null, Validators.required],
      age: [null, [Validators.required, Validators.min(0)]], // Validación para age
      description: [null, Validators.required], // Validación para description
    });
  }

  async ngOnInit() {
    await this.checkId();
  }

  async checkId() {
    this.id = this._activatedRoute.snapshot.params['id'];
    if (this.id) {
      await this._itemService.getItemById(this.id).subscribe((item) => {
        this.itemForm = this.fb.group({
          id: [item.id, Validators.required],
          name: [item.name, Validators.required],
          age: [item.age, [Validators.required, Validators.min(0)]], // Asignar age
          description: [item.description, Validators.required], // Asignar description
        });
      });
    }
  }

  onSubmit() {
    if (this.itemForm.valid) {
      console.log('Form submitted: ', this.itemForm.value);

      const { id, name, age, description } = this.itemForm.value;
      if (this.id) {
        this._itemService.updateItem(this.id, name, age, description).subscribe(
          (res) => {
            console.log('Item updated successfully!');
            this.resetForm();
            this._router.navigate(['/']);
          },
          (error) => {
            console.log('Error while updating item: ', error);
          }
        );
      } else {
        this._itemService.createItem(id, name, age, description).subscribe(
          (res) => {
            console.log('Item created successfully!');
            this.resetForm();
            this._router.navigate(['/']);
          },
          (error) => {
            console.log('Error while creating item: ', error);
          }
        );
      }
    }
  }

  resetForm() {
    this.itemForm.reset();
  }

  goBack() {
    this._router.navigate(['/']);
  }
}
