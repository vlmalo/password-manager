import {AfterViewInit, Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-add-password-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-password-modal.component.html',
  styleUrl: './add-password-modal.component.css'
})
export class AddPasswordModalComponent implements AfterViewInit, OnDestroy {
  @Output() close = new EventEmitter<void>();

  ngAfterViewInit() {
    this.preventScroll();
  }

  ngOnDestroy() {
    this.allowScroll();
  }

  preventScroll() {
    document.body.classList.add('modal-open');
  }

  allowScroll() {
    document.body.classList.remove('modal-open');
  }


  togglePasswordVisibility(fieldId: string): void {
    const passwordField = document.getElementById(fieldId) as HTMLInputElement;
    const passwordIcon = document.getElementById(fieldId + 'Icon') as HTMLImageElement;

    if (passwordField.type === 'password') {
      passwordField.type = 'text';
      passwordIcon.src = 'assets/images/hide.png';
    } else {
      passwordField.type = 'password';
      passwordIcon.src = 'assets/images/eye.png';
    }
  }
  // Method to handle the close button click
  onClose() {
    this.close.emit();
  }


  submitPassword(form: any) {
    if (form.valid) {
      const newPasswordData = {
        itemName: form.value.itemName,
        username: form.value.username,
        password: form.value.password,
        uri: form.value.uri,
        notes: form.value.notes,
        masterPassword: form.value.masterPassword,
        confirmMasterPassword: form.value.confirmMasterPassword
      };

      console.log('New Password Data:', newPasswordData);
      //  logic to process the data

      this.onClose();
    }


  }
}
