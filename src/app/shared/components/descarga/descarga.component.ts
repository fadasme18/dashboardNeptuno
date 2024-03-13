import { Component } from '@angular/core';
import { InfluxdbService } from 'src/app/influxdb.service';
import * as XLSX from 'xlsx'


@Component({
  selector: 'app-descarga',
  templateUrl: './descarga.component.html',
  styleUrls: ['./descarga.component.scss']
})
export class DescargaComponent {

  data: any[] = [];

  startDate!: Date;
  endDate!: Date;

  activateDatepicker: boolean = false;

  constructor(private InfluxdbService: InfluxdbService) { }

  async downloadData() {
    this.loadData();
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.data);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Datos');

    const wbout = XLSX.write(wb, { type: 'binary'});
    const blob = new Blob([this.s2ab(wbout)], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });      

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'datos.xlsx';
    link.click();

    window.URL.revokeObjectURL(url);
  }

  async loadData() {
    if (this.startDate && this.endDate) {
      this.data = await this.InfluxdbService.F2_horno1_corriente(this.startDate, this.endDate);
    }
  }

  private s2ab(s: string): ArrayBuffer {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
  }

  // dataCatcherFromDatePicker(): void {
  //   this.InfluxdbService.dateRangeSelected$.subscribe(({ startDate, endDate }) => {
  //     this.ingresarFechas(startDate, endDate);
  //     this.activateDatepicker = true;
  //   })
  // }


  // ingresarFechas(startDateValue: string, endDateValue: string): void {
  //   const startDate = new Date(startDateValue);
  //   const endDate = new Date(endDateValue);

  //   if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
  //     this.startDate = startDate;
  //     this.endDate = endDate;
  //     this.loadData();

  //   } else {
  //     console.error('Ingrese fechas validas');
  //   }
  // }

  // Realtimedata(): void {
  //   this.InfluxdbService.updateRange$.subscribe(() => {
  //     this.updateRange();
  //     this.activateDatepicker = false;
  //   })

  // }

  // updateRange(): void {
  //   const now = new Date();
  //   const DoceHorasAtras = moment(now).subtract(13, 'hours').toDate();
  //   this.startDate = DoceHorasAtras;
  //   this.endDate = now;
  //   this.loadData();
  //   console.log('Real Time Selected');
  // };

}
