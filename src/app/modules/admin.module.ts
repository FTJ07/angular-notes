import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { AdminProductsComponent } from '../admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from '../admin/admin-orders/admin-orders.component';
import { RouterModule } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';


@NgModule({
 declarations: [
  AdminProductsComponent,
  AdminOrdersComponent
 ],
 imports: [
  CommonModule,
  RouterModule.forChild([
   {
     path: 'admin/products',
     component: AdminProductsComponent,
     canActivate: [AuthGuardService]
   },
   {
     path: 'admin/orders',
     component: AdminOrdersComponent,
     canActivate: [AuthGuardService]
   }
 ])
 ],
 providers: [
  AuthGuardService
 ]
})

export class AdminModule {}