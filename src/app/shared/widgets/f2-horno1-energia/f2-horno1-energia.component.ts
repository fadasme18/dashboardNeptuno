import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts';
import { InfluxdbService } from 'src/app/influxdb.service';
import { Subscription, interval } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import * as FileSaver from 'file-saver';

import * as moment from 'moment';

var energia: any[] = [];

@Component({
  selector: 'app-f2-horno1-energia',
  templateUrl: './f2-horno1-energia.component.html',
  styleUrls: ['./f2-horno1-energia.component.scss'],
})
export class F2Horno1EnergiaComponent implements OnInit, OnDestroy {
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
    const DoceHorasAtras = moment(now).subtract(13, 'hours').toDate();
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
  energyData: any[] = []; // Arreglo para almacenar datos de energio
  private dataSubscription: Subscription | undefined; // Inicializamos dataSubscription como undefined

  async loadData() {
    //---------------------------------------------------------------------------------------------------------------------
    if (this.startDate && this.endDate) {
      this.data = await this.InfluxdbService.F2_horno1_energia(
        this.startDate,
        this.endDate
      );
      // console.log("ACA ESTA MSJ!!")
      // console.log(this.data);
    }
    //---------------------------------------------------------------------------------------------------------------------
    this.energyData = [];

    this.data.forEach((item) => {
      if (item._field === 'Energy') {
        this.energyData.push({
          x: new Date(item._time).getTime(), // Convierte la fecha en una marca de tiempo
          y: Number(parseFloat(item._value).toFixed(2)), // Convierte el valor en número
        });
      }
    });

    energia = this.energyData;

    // console.log("energia ")
    // console.log(energia);
    this.graficar();
    // console.log("fflag")
  }

  private chart: Highcharts.Chart | undefined;
  graficar() {
    const self = this;
    this.chartOptions = {
      title: {
        text: 'Energia Equipo 1 (Horno de inducción) Fundición 2',
        align: 'center',
      },

      subtitle: {
        text: 'Unidad de medida kiloWattsHora (kWh)',
        align: 'center',
      },

      yAxis: {
        title: {
          text: 'Energia (kWh)',
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
        min: this.startDate
          ? this.startDate.getTime()
          : Date.now() - 20 * 60 * 60 * 1000, // Establecer el mínimo del eje x
        max: this.endDate ? this.endDate.getTime() : Date.now(), // Establecer el máximo del eje x
      },
      series: [
        {
          name: 'Energia',
          type: 'spline',
          data: energia,
        },
      ],
      tooltip: {
        enabled: true,
        headerFormat: '<b>Energía: </b> {point.y} (kWh) <br/>',
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
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
              },
            },
          },
        ],
      },
    };
  }
}
