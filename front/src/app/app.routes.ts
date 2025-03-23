import { ComponentComponent } from './modules/component/component.component';
import { Routes } from '@angular/router';
import { NewItemComponent } from './modules/new-item/new-item.component';

export const routes: Routes = [
  {
    path: '',
    component: ComponentComponent,
  },
  {
    path: 'new-item',
    component: NewItemComponent,
  },
  {
    path: 'new-item/:id',
    component: NewItemComponent,
  }
];
