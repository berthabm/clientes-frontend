import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'phone'
})
export class PhonePipe implements PipeTransform {
  transform(value: string | undefined): string {

    if (!value) return '';

    const cleanedPhoneNumber = value.replace(/\D/g, '');
    
    if (cleanedPhoneNumber.length === 11) {
      const formattedPhoneNumber = `+${cleanedPhoneNumber.substring(0, 3)} ${cleanedPhoneNumber.substring(3, 7)} ${cleanedPhoneNumber.substring(7)}`;
      return formattedPhoneNumber;
    }
    
    return value;
  }
}
