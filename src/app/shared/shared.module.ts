import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
import { AlertModalComponent } from './alert-modal/alert-modal.component';



@NgModule({

  imports: [
    CommonModule
  ],
  declarations: [ConfirmModalComponent, AlertModalComponent],
  exports: [ConfirmModalComponent]
})
export class SharedModule { }
