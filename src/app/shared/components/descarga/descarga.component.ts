import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-descarga',
  templateUrl: './descarga.component.html',
  styleUrls: ['./descarga.component.scss']
})
export class DescargaComponent {

  constructor(private http: HttpClient) {}

  downloadCSV() {
    this.http.get('http://192.168.1.215:1880/fundicion2/TT/horno2', {responseType: 'text' }).subscribe((data:string) => {
      const blob = new Blob([data], {type: 'text/csv' });
      FileSaver.saveAs(blob, 'datos.csv')
    })
  }

}
