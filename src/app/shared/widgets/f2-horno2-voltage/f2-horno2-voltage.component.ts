import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts';
import { InfluxdbService } from 'src/app/influxdb.service';
import { Subscription, interval } from 'rxjs';

import * as moment from 'moment';

var voltage1: any[] = [];
var voltage2: any[] = [];
var voltage3: any[] = [];

@Component({
  selector: 'app-f2-horno2-voltage',
  templateUrl: './f2-horno2-voltage.component.html',
  styleUrls: ['./f2-horno2-voltage.component.scss']
})
export class F2Horno2VoltageComponent implements OnInit, OnDestroy {

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
    const DoceHorasAtras = moment(now).subtract(13, 'hours').toDate();
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
  voltageData: any[] = []; // Arreglo para almacenar datos de voltage
  voltageData1: any[] = []; // Arreglo para almacenar datos de voltage
  voltageData2: any[] = []; // Arreglo para almacenar datos de voltage
  private dataSubscription: Subscription | undefined; // Inicializamos dataSubscription como undefined



  async loadData() {
    //---------------------------------------------------------------------------------------------------------------------
    if (this.startDate && this.endDate) {
      this.data = await this.InfluxdbService.F2_horno2_voltage(this.startDate, this.endDate);
      // console.log("ACA ESTA MSJ!!")
      // console.log(this.data);
    }
    //---------------------------------------------------------------------------------------------------------------------
 
      this.voltageData = [];
      this.voltageData1 = [];
      this.voltageData2 = [];

      this.data.forEach(item => {
        if (item._field === 'Voltage') {
          this.voltageData.push({
            x: new Date(item._time).getTime(), // Convierte la fecha en una marca de tiempo
            y: Number(parseFloat(item._value).toFixed(2)) // Convierte el valor en número
          });
        } else if (item._field === 'VoltageB') {
          this.voltageData1.push({
            x: new Date(item._time).getTime(), // Convierte la fecha en una marca de tiempo
            y: Number(parseFloat(item._value).toFixed(2)) // Convierte el valor en número
          });
        } else if (item._field === 'VoltageC') {
          this.voltageData2.push({
            x: new Date(item._time).getTime(), // Convierte la fecha en una marca de tiempo
            y: Number(parseFloat(item._value).toFixed(2)) // Convierte el valor en número
          });
        }
      });

      voltage1 = this.voltageData;
      voltage2 = this.voltageData1;
      voltage3 = this.voltageData2;
      
      // console.log("---------------------");
      // console.log(this.data);
      // console.log("---------------------");
      // console.log("voltage 1");
      // console.log(voltage1);
      // console.log("voltage 2");
      // console.log(voltage2);
      // console.log("voltage 3");
      // console.log(voltage3);

      this.graficar();
      // console.log("fflag")
  }

  private chart: Highcharts.Chart | undefined;

  graficar() {
    const self = this;
    this.chartOptions = {
      title: {
        text: 'Voltaje Equipo 2 (Horno de inducción) Fundición 2',
        align: 'center'
      },

      subtitle: {
        text: 'Unidad de medida: Volts (V)',
        align: 'center'
      },

      yAxis: {
        title: {
          text: 'Volt (V)'
        },
        max: 500,
        min: 0
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
        },
        // tickInterval: 900000,
        // min: Date.now() - 4 * 60 * 60 * 1000,
        // max: Date.now()
        tickInterval: this.calculateTickInterval(this.startDate, this.endDate),
        min: this.startDate ? this.startDate.getTime() : Date.now() - 20 * 60 * 60 * 1000, // Establecer el mínimo del eje x
        max: this.endDate ? this.endDate.getTime() : Date.now(), // Establecer el máximo del eje x

      },
      /*legend: {
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom'
      },*/

      series: [{
        name: 'Voltage fase 1',
        type: 'spline',
        data: voltage1
      },{
        name: 'Voltage fase 2',
        type: 'spline',
        data: voltage2
      },{
        name: 'Voltage fase 3',
        type: 'spline',
        data: voltage3
      }],
      tooltip: {
        enabled: true,
        headerFormat: '<b>Voltage: </b> {point.y} (V) <br/>',
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
        enabled: false,
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
              enabled: false
            }
          }
        }],
      }
    }
  }
}
/*
    this.chartOptions = {
      rangeSelector: {
        selected: 1
      },
      title: {
        text:'Voltage Horno 1 Fundición 2'
      },
      series: [{
        name: 'Voltage1',
        data: voltage,
        type: 'areaspline',
        threshold: null,
        tooltip: {
          valueDecimals: 2
        },
        fillColor: 'linear-gradient(to bottom, rgba(0, 0, 255, 0.3), rgba(0, 0, 255, 0))'

          /*linearGradient: {
            x1: 0,
            x2: 0,
            y1: 0,
            y2: 1
          },
          stops: [
            [0,Highcharts.getOptions().colors[0]],
            [1,Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
          ]
        
      }]
    }*/