import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-gen-passwords',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './gen-passwords.component.html',
  styleUrls: ['./gen-passwords.component.css']
})
export class GenPasswordsComponent {
  dropdownVisible = false;

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
    console.log('Username copied!');

  }

  copyPassword() {
    console.log('Password copied!');
  }

  cloneEntry() {
    console.log('Entry cloned!');

  }

  modify() {
    console.log('Modify!');

  }

  deleteEntry() {
    console.log('Entry deleted!');

  }
}
