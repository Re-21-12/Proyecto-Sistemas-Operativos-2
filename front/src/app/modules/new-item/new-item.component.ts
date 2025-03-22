import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ItemsServiceService } from '../../services/items-service.service';
@Component({
  selector: 'app-new-item',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './new-item.component.html',
  styleUrl: './new-item.component.scss'
})
export class NewItemComponent implements OnInit {
  private _router = inject(Router)
  private _activatedRoute = inject(ActivatedRoute)

  private _itemService = inject(ItemsServiceService)
  itemForm: FormGroup;
  id?: number;
  constructor(private fb: FormBuilder) {
    this.itemForm = this.fb.group({
      id: [null,  ],
      name: [null, Validators.required],
    });
  }

  ngOnInit() {
    if(this._activatedRoute.snapshot.params["id"]) {
      this.id = this._activatedRoute.snapshot.params["id"];
    this.fb.group({
      id: [this.id, Validators.required],
    });
    }
  }

  onSubmit() {
    if (this.itemForm.valid) {
      console.log('Form submitted: ', this.itemForm.value);

      const {id, name} = this.itemForm.value;
      if(this.id) {
        this._itemService.updateItem(this.id,name)
        .subscribe(
          (res) => {
            console.log('Item updated successfully!');
            this.resetForm();
            this._router.navigate(['/home']);
          },
          (error) => {
            console.log('Error while updating item: ', error);
          }
        );
        }
      this._itemService.createItem(id, name).subscribe(
        (res) => {
          console.log('Item created successfully!');
          this.resetForm();
          this._router.navigate(['/home']);
        },
        (error) => {
          console.log('Error while creating item: ', error);
        }
      );
    }
      }
          resetForm() {
    this.itemForm.reset();
  }
  goBack() {
    this._router.navigate(['/home']);
  }
}
