import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
 MatFormFieldModule,
 MatInputModule,
 MatCardModule,
 MatIconModule,
 MatProgressSpinnerModule,
 MatButtonModule,
 MatDialogModule,
 MatTableModule,
 MatToolbarModule,
 MatMenuModule,
 MatSidenavModule,
 MatListModule,
 MatGridListModule
} from '@angular/material';


@NgModule({
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule
  ]
})
export class AppMaterialModule { }
