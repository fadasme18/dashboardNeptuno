import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts';
import { InfluxdbService } from 'src/app/influxdb.service';
import { Subscription, interval } from 'rxjs';

import * as moment from 'moment';

var tthorno2: any[] = [];

@Component({
  selector: 'app-f2-tt-horno2',
  templateUrl: './f2-tt-horno2.component.html',
  styleUrls: ['./f2-tt-horno2.component.scss'],
})
export class F2TtHorno2Component implements OnInit, OnDestroy {
  data: any[] = [];

  startDate!: Date;
  endDate!: Date;

  activateDatepicker: boolean = false;

  constructor(private InfluxdbService: InfluxdbService) {}

  ngOnInit() {
    this.Realtimedata();
    this.updateRange();
    this.loadData();
    this.graficar();
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
    this.InfluxdbService.dateRangeSelected$.subscribe(
      ({ startDate, endDate }) => {
        this.ingresarFechas(startDate, endDate);
        this.activateDatepicker = true;
      }
    );
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
    });
  }

  updateRange(): void {
    const now = new Date();
    const DoceHorasAtras = moment(now).subtract(20, 'hours').toDate();
    this.startDate = DoceHorasAtras;
    this.endDate = now;
    this.loadData();
    // console.log('Real Time Selected');
  }

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
    return desiredTickInterval;
  }

  //---------------------------------------------------------------------------------------------------------------------

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  tthorno2Data: any[] = []; // Arreglo para almacenar datos de corriente
  private dataSubscription: Subscription | undefined; // Inicializamos dataSubscription como undefined

  async loadData() {
    //---------------------------------------------------------------------------------------------------------------------
    if (this.startDate && this.endDate) {
      this.data = await this.InfluxdbService.F2_TT_horno2(
        this.startDate,
        this.endDate
      );
      // console.log("ACA ESTA MSJ!!")
      // console.log(this.data);
    }
    //---------------------------------------------------------------------------------------------------------------------
    this.tthorno2Data = [];

    this.data.forEach((item) => {
      if (item._field === 'TT_horno2_F2') {
        //------------------------------------------------------------------------------------------------------------
        this.tthorno2Data.push({
          x: new Date(item._time).getTime(), // Convierte la fecha en una marca de tiempo
          y: Number(parseFloat(item._value).toFixed(2)), // Convierte el valor en número
        });
      }
    });

    tthorno2 = this.tthorno2Data;

    // console.log("TT horno 2")
    // console.log(tthorno2);

    this.graficar();
    // console.log("-------------------------------------------------")
    // console.log(this.data);
  }

  private chart: Highcharts.Chart | undefined;

  graficar() {
    const self = this;
    this.chartOptions = {
      title: {
        text: 'horno 2 Tratamientos Térmicos Fundición 2',
        align: 'center',
      },

      subtitle: {
        text: 'Unidad de medida: Grados Celcius (°C)',
        align: 'center',
      },
      credits: {
        enabled: false,
      },
      yAxis: {
        title: {
          text: 'Grados (°C)',
        },
        max: 1000,
        min: 0,
      },

      xAxis: {
        title: {
          text: 'Tiempo',
        },
        type: 'datetime',
        labels: {
          formatter: function () {
            const timestamp = this.value;
            const date = new Date(timestamp);
            const options: Intl.DateTimeFormatOptions = {
              day: '2-digit',
              month: 'short',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            };
            return date.toLocaleTimeString('es-CL', options);
          },
        },
        dateTimeLabelFormats: {
          // Configura el formato para diferentes unidades de tiempo
          millisecond: '%b %e %H:%M:%S',
          second: '%b %e %H:%M:%S',
          minute: '%b %e %H:%M',
          hour: '%b %e %H:%M',
          day: '%b %e', // Añade el día al formato
          week: '%b %e',
          month: '%b %e',
          year: '%b %e',
        },
        tickInterval: this.calculateTickInterval(this.startDate, this.endDate),
        //tickInterval: 1800000,
        min: this.startDate
          ? this.startDate.getTime()
          : Date.now() - 20 * 60 * 60 * 1000, // Establecer el mínimo del eje x
        max: this.endDate ? this.endDate.getTime() : Date.now(), // Establecer el máximo del eje x
        // min: Date.now() - 72 * 60 * 60 * 1000,
        // // min: Date.now() - 20 * 60 * 60 * 1000,
        // max: Date.now()
      },
      series: [
        {
          name: 'Horno 2',
          type: 'line',
          data: tthorno2,
        },
      ],
      tooltip: {
        enabled: true,
        headerFormat: '<b>Temperatura: </b> {point.y} (°C) <br/>',
        pointFormatter: function () {
          const timestamp = this.x;
          const date = new Date(timestamp);
          const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
          };
          return date.toLocaleString('es-CL', options);
        },
      },
      chart: {
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 5,
      },
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                enabled: false,
              },
            },
          },
        ],
      },
    };
  }
}
