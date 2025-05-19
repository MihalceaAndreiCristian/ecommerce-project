import {AUTHORIZATION} from "./constants";
import {FormGroup} from "@angular/forms";
import {Photo} from "../models/product";

export function getAuthToken(): string | null {
  return sessionStorage.getItem(AUTHORIZATION);
}

export function removeFromSessionStorage(keyName:string) : void {
   sessionStorage.removeItem(keyName);
}

export function setAuthToken(token:string):void {
  sessionStorage.setItem(AUTHORIZATION, 'Bearer ' + token);

}


export function validateNumberInput(event: KeyboardEvent) {
  const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'];
  if (allowedKeys.includes(event.key)) return;

  const regex = /^[0-9.,]$/;
  if (!regex.test(event.key)) {
    event.preventDefault();
  }
}

export function formatPrice(event: Event, formGroup: FormGroup) {
  const input = event.target as HTMLInputElement;
  let value = input.value.replace(/[^0-9.,]/g, '');

  // Convertim virgula în punct
  value = value.replace(/,/g, '.');

  // Permitem doar un punct pentru zecimale
  const parts = value.split('.');
  if (parts.length > 2) {
    value = parts[0] + '.' + parts.slice(1).join('');
  }

  // Formatare cu separator de mii
  const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const decimalPart = parts[1] ? `.${parts[1].slice(0, 2)}` : '';

  const newValue = integerPart + decimalPart;
  const cursorPosition = input.selectionStart;

  formGroup.patchValue({
    price: newValue
  });

  // Actualizăm poziția cursorului
  setTimeout(() => {
    const diff = newValue.length - value.length;
    input.setSelectionRange(cursorPosition! + diff, cursorPosition! + diff);
  });
}

export function addPhotosToArray(event: Event, photos: Photo[]) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length) {
    const files = input.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        let imageBase64 = reader.result as string;
        let findExtension = file.name.split('.')[1];
        let photo: Photo = {
          photoName: file.name,
          content: imageBase64,
          extension: findExtension,
          isMainPhoto: files.length === 1,
        };
        photos.push(photo);
      };
      reader.readAsDataURL(file);
    }
  }
}
