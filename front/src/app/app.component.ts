import { RouterOutlet } from '@angular/router';
import {ChangeDetectionStrategy, Component, inject, OnInit} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';
import { ItemsServiceService } from './services/items-service.service';
@Component({
  selector: 'app-root',
  imports: [MatInputModule, MatFormFieldModule , RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent  {
  private _itemsService = inject(ItemsServiceService)

}
