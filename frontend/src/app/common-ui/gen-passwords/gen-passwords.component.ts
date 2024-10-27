import {Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {PasswordService} from '../../services/password.service';

@Component({
  selector: 'app-gen-passwords',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gen-passwords.component.html',
  styleUrls: ['./gen-passwords.component.css']
})
export class GenPasswordsComponent {
  @Input() password: any = {
    itemName: 'No Name',
    username: 'No Username',
    uri: 'No URI',
  };
  dropdownVisible = false;
  @Output() passwordDeleted = new EventEmitter<void>();

  constructor(private passwordService: PasswordService) {
  }

  // Toggles dropdown visibility
  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
    console.log('Dropdown visibility:', this.dropdownVisible);
  }

  // Detects click events on the document
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;

    // Check if click is outside the dropdown and close it if open
    if (!targetElement.closest('.password-actions') && this.dropdownVisible) {
      this.dropdownVisible = false;
      console.log('Clicked outside, dropdown closed');
    }
  }

  copyUsername() {
    navigator.clipboard.writeText(this.password.username).then(() => {
      console.log('Username copied!');
      this.dropdownVisible = false;
    });
  }

  copyPassword() {
    navigator.clipboard.writeText(this.password.password).then(() => {
      console.log('Password copied!');
      this.dropdownVisible = false;
    });
  }


  modify() {
    console.log('Modify!');
    this.dropdownVisible = false;

  }

  deleteEntry() {
    const confirmDelete = window.confirm('Are you sure you want to delete this entry?');

    if (confirmDelete) {
      this.passwordService.deletePassword(this.password.id).subscribe(
        () => {
          console.log('Entry deleted!');
          this.passwordDeleted.emit();
        },
        error => console.error('Error deleting entry:', error)
      );
    }

    this.dropdownVisible = false;
  }
}
