import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { AdminHomeComponent } from './adminhome/adminhome.component';
import { AdminPostComponent } from './adminpost/adminpost.component';
import { AdminTagComponent } from './admintag/admintag.component';
import { AdminCategoryComponent } from './admincategory/admincategory.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { CollapseModule, ModalModule } from 'ngx-bootstrap';
import { AdminMenuComponent } from './adminmenu/adminmenu.component';
import { AuthGuard } from './auth.guard';
import { SharedModule } from '../shared/shared.module';
import { CKEditorModule } from 'ng2-ckeditor';
@NgModule({
  imports: [
    CoreModule,
    CKEditorModule,
    AdminRoutingModule,
    SharedModule
  ],
  declarations: [
    AdminComponent,
    AdminMenuComponent,
    AdminHomeComponent,
    AdminPostComponent,
    AdminCategoryComponent,
    AdminTagComponent
  ],
  providers: [
    AuthGuard
  ]
})
export class AdminModule { }
