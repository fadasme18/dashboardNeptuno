import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts';
import { InfluxdbService } from 'src/app/influxdb.service';
import { Subscription, interval } from 'rxjs';

import * as moment from 'moment';

var potencia: any[] = [];

@Component({
  selector: 'app-f2-horno2-potencia',
  templateUrl: './f2-horno2-potencia.component.html',
  styleUrls: ['./f2-horno2-potencia.component.scss']
})
export class F2Horno2PotenciaComponent implements OnInit, OnDestroy {

  data: any[] = [];

  startDate!: Date;
  endDate!: Date;

  activateDatepicker: boolean = false;

  constructor(private InfluxdbService: InfluxdbService) { }


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
    const DoceHorasAtras = moment(now).subtract(15, 'hours').toDate();
    this.startDate = DoceHorasAtras;
    this.endDate = now;
    this.loadData();
    console.log('Real Time Selected');
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

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  powerData: any[] = []; // Arreglo para almacenar datos de potencia
  private dataSubscription: Subscription | undefined; // Inicializamos dataSubscription como undefined



  async loadData() {
    //---------------------------------------------------------------------------------------------------------------------
    if (this.startDate && this.endDate) {
      this.data = await this.InfluxdbService.F2_horno2_potencia(this.startDate, this.endDate);
      // console.log("ACA ESTA MSJ!!")
      // console.log(this.data);
    }
    //---------------------------------------------------------------------------------------------------------------------
    this.powerData = [];

      this.data.forEach(item => {
        if (item._field === 'Power') {
          this.powerData.push({
            x: new Date(item._time).getTime(), // Convierte la fecha en una marca de tiempo
          y: Number(parseFloat(item._value).toFixed(2)) // Convierte el valor en número
        });
      }
    });

    
      //potencia = this.data;
      potencia = this.powerData;

      // console.log("potencia")
      // console.log(potencia);

      this.graficar();
      // console.log("fflag")
  }

  private chart: Highcharts.Chart | undefined;
  graficar() {
    const self = this;
    this.chartOptions = {
      title: {
        text: 'Potencia Equipo 2 (Horno de inducción) Fundición 2',
        align: 'center'
      },

      subtitle: {
        text: 'Unidad de medida KiloWatts (kW)',
        align: 'center'
      },

      yAxis: {
        title: {
          text: 'Potencia (kW)'
        },
        max: 300,
        min:0
      },

      xAxis: {
        title: {
          text: "Tiempo"
        },
        type: 'datetime',
        labels: {
          formatter: function () {
            const timestamp = this.value;
            const date = new Date(timestamp);
            const options: Intl.DateTimeFormatOptions = {
              timeZone: 'America/Santiago',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            };
            return date.toLocaleTimeString('es-CL', options);
          }
          //format: '{value:%H:%M:%S}'
        },
        // tickInterval: 900000,
        // min: Date.now() - 4 * 60 * 60 * 1000,
        // max: Date.now()
        tickInterval: this.calculateTickInterval(this.startDate, this.endDate),
        min: this.startDate ? this.startDate.getTime() : Date.now() - 20 * 60 * 60 * 1000, // Establecer el mínimo del eje x
        max: this.endDate ? this.endDate.getTime() : Date.now(), // Establecer el máximo del eje x
      
      },
      series: [{
        name: 'Potencia',
        type: 'spline',
        data: potencia
      }],
      tooltip: {
        enabled: true,
        headerFormat: '<b>Potencia: </b> {point.y} (kW) <br/>',
        pointFormatter: function () {
          const timestamp = this.x;
          const date = new Date(timestamp);
          const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
          };
          return date.toLocaleString('es-CL', options);
        }
      },
      exporting: {
        enabled: true,
        buttons: {
          customButton: {
            text: 'Descargar CSV',
            onclick: function () {
              function formatDate(milliseconds: number) {
                const timestamp = new Date(milliseconds);
                const date = new Date(timestamp);
                const options: Intl.DateTimeFormatOptions = {
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  second: 'numeric'
                };
                return date.toLocaleString('es-CL', options);
              }

              let csvData = 'Fecha,Valor\n';
              self.chart?.series[0].data.forEach(point => {
                const fechaLegible = formatDate(point.x);
                csvData += `${fechaLegible},${point.y}\n`;
              });

              const blob = new Blob([csvData], { type: 'text/csv' });

              const link = document.createElement('a');
              link.href = URL.createObjectURL(blob);
              link.download = 'datos.csv';
              link.click();
            }
          }
        }
      },
      chart: {
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 5
      },
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }],
      }
    }
  }
}
