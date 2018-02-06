import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminPostComponent } from './adminpost/adminpost.component';
import { AdminTagComponent } from './admintag/admintag.component';
import { AdminHomeComponent } from './adminhome/adminhome.component';
import { AdminCategoryComponent } from './admincategory/admincategory.component';
import { AuthGuard } from './auth.guard';
export const routes: Routes = [
  {
    path: '',
    component: AdminComponent, canActivate: [AuthGuard],
    children: [
      { path: 'tag', component: AdminTagComponent },
      { path: 'category', component: AdminCategoryComponent },
      { path: 'post', component: AdminPostComponent },
      { path: '', component: AdminHomeComponent }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
