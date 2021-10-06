import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css']
})
export class ImageViewerComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private _sanitizer: DomSanitizer,) {}

  ngOnInit(): void {
    console.log(this.data)
  }

  base64ToImage(buffer: string): any {
    return this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + buffer);
  }
}
