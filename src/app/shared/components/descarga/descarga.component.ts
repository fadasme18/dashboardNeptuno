import { Component, Input, OnInit,} from '@angular/core';
import * as moment from 'moment';
import { InfluxdbService } from 'src/app/influxdb.service';
import * as XLSX from 'xlsx'
import { Subscription, interval } from 'rxjs';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-descarga',
  templateUrl: './descarga.component.html',
  styleUrls: ['./descarga.component.scss']
})
export class DescargaComponent implements OnInit {

  data: any[] = [];

  startDate!: Date;
  endDate!: Date;

  activateDatepicker: boolean = false;

  constructor(private InfluxdbService: InfluxdbService, private route: ActivatedRoute) { }


  ngOnInit() {

    // console.log('URL actual: ', window.location.pathname);
    this.Realtimedata();
    this.updateRange();
    this.loadData();
    this.dataCatcherFromDatePicker();

    this.dataSubscription = interval(30000).subscribe(() => {
      this.loadData();
      // this.graficar();
      if (!this.activateDatepicker) {
        this.updateRange();
      }
      // console.log(this.activateDatepicker);
    });
  }

  ngOnDestroy() {
    // Detén el temporizador cuando el componente se destruya
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  dataCatcherFromDatePicker(): void {
    this.InfluxdbService.dateRangeSelected$.subscribe(({ startDate, endDate }) => {
      this.ingresarFechas(startDate, endDate);
      this.activateDatepicker = true;
    })
  }


  ingresarFechas(startDateValue: string, endDateValue: string): void {
    const startDate = new Date(startDateValue);
    const endDate = new Date(endDateValue);

    if (!isNaN(startDate.getTime()) && !isNaN(endDate.getTime())) {
      this.startDate = startDate;
      this.endDate = endDate;
      this.loadData();

    } else {
      console.error('Ingrese fechas validas');
    }
  }

  Realtimedata(): void {
    this.InfluxdbService.updateRange$.subscribe(() => {
      this.updateRange();
      this.activateDatepicker = false;
    })

  }

  updateRange(): void {
    const now = new Date();
    const DoceHorasAtras = moment(now).subtract(13, 'hours').toDate();
    this.startDate = DoceHorasAtras;
    this.endDate = now;
    this.loadData();
    // console.log('Real Time Selected');
  };

  calculateTickInterval(startDate: Date, endDate: Date): number {
    //calcula la duración del rango de las fechas en milisegundos
    const rangeDuration = endDate.getTime() - startDate.getTime();

    //Determina el intervalo de tiempo deseado para las marcas de tiempo
    let desiredTickInterval: number;
    if (rangeDuration < 24 * 60 * 60 * 1000) {
      //menos de un día: intervalo de 1 hora
      desiredTickInterval = 60 * 60 * 1000; //1 hora en milisegundos
    } else if (rangeDuration < 7 * 24 * 60 * 60 * 1000) {
      //Menos de una semana: intervalo de 6 horas
      desiredTickInterval = 3 * 60 * 60 * 1000; //6 hora en milisegundos
    } else {
      //Para rangos de fechas mas largos: intervalo de 1 día
      desiredTickInterval = 24 * 60 * 60 * 1000; //1 día en milisegundos
    }
    return desiredTickInterval
  }


  //---------------------------------------------------------------------------------------------------------------------

  private dataSubscription: Subscription | undefined; // Inicializamos dataSubscription como undefined



  async loadData() {
    if (this.startDate && this.endDate) {
      // this.data = await this.InfluxdbService.F2_horno1_corriente(this.startDate, this.endDate);

      this.loadDataFunctionBasedOnURL(window.location.pathname);
    }
  }

  async loadDataFunctionBasedOnURL(url: string) {
    switch (url) {
      case '/f2-horno1':
        this.data = await this.InfluxdbService.F2_horno1EXCEL(this.startDate, this.endDate);
        console.log("/horno1");
        break;
      case '/f2-horno2':
        this.data = await this.InfluxdbService.F2_horno2EXCEL(this.startDate, this.endDate);
        console.log("/horno2");
        break;
      case '/f2-silos':
        this.data = await this.InfluxdbService.F2_silosEXCEL(this.startDate, this.endDate);
        console.log("/silos");
        break;
      case '/f2-ttermicos':
        this.data = await this.InfluxdbService.F2_TT_horno2EXCEL(this.startDate, this.endDate);
        console.log("/ttermicos");
        break;
      default:
        console.error('URL no reconocida');
    }
  }

  async downloadData() {

    
    console.log(this.data);
    console.log(this.activateDatepicker);
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

  private s2ab(s: string): ArrayBuffer {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf; 
  }
}
