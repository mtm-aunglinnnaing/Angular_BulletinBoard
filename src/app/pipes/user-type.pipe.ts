import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userType'
})
export class UserTypePipe implements PipeTransform {

  transform(value: string , isAdmin : number = 0): any {

    return isAdmin ? value : value.replace(/./g, 'User');
  
  }

}
