import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-f2-horno1',
  templateUrl: './f2-horno1.component.html',
  styleUrls: ['./f2-horno1.component.scss']
})
export class F2Horno1Component {

  constructor(private http: HttpClient) { }

  download_f2_horno1_corriente() {
    this.http.get('http://192.168.1.215:1880/fundicion2/horno1/corriente', { responseType: 'text' }).subscribe((data: string) => {
      const blob = new Blob([data], { type: 'text/csv' });
      FileSaver.saveAs(blob, 'datos.csv')
    })
  }

  download_f2_horno1_energia() {
    this.http.get('http://192.168.1.215:1880/fundicion2/horno1/energia', { responseType: 'text' }).subscribe((data: string) => {
      const blob = new Blob([data], { type: 'text/csv' });
      FileSaver.saveAs(blob, 'datos.csv')
    })
  }

  download_f2_horno1_potencia() {
    this.http.get('http://192.168.1.215:1880/fundicion2/horno1/potencia', { responseType: 'text' }).subscribe((data: string) => {
      const blob = new Blob([data], { type: 'text/csv' });
      FileSaver.saveAs(blob, 'datos.csv')
    })
  }
  download_f2_horno1_voltage() {
    this.http.get('http://192.168.1.215:1880/fundicion2/horno1/voltage', { responseType: 'text' }).subscribe((data: string) => {
      const blob = new Blob([data], { type: 'text/csv' });
      FileSaver.saveAs(blob, 'datos.csv')
    })
  }

}
