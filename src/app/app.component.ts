import { Component } from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';
import { AbstractControl, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  fileList = new FormArray([])
  supportedFileTypes: string[] = ["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "application/vnd.ms-excel"]

  add(files: FileList): void {
    if(files){
      for(let i=0; i<files.length; i++)
      {
        if (this.fileList.controls.findIndex(x => x.value.name == files.item(i).name) == -1 
          && this.supportedFileTypes.includes(files.item(i).type))
        {
          this.fileList.controls.push(new FormControl(files.item(i)))
        }
      }
    }
  }

  remove(file: AbstractControl): void {
    const index = this.fileList.controls.indexOf(file);

    if (index >= 0) {
      this.fileList.controls.splice(index, 1);
    }
  }
}
