import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts';
import { InfluxdbService } from 'src/app/influxdb.service';
import { Subscription, interval } from 'rxjs';

var s_cohete: any[] = [];
var ultimovalor: any[] = [];

@Component({
  selector: 'app-f2-silo-cohete-barra',
  templateUrl: './f2-silo-cohete-barra.component.html',
  styleUrls: ['./f2-silo-cohete-barra.component.scss']
})
export class F2SiloCoheteBarraComponent implements OnInit, OnDestroy {
  data: any;
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  s_coheteData: any[] = []; // Arreglo para almacenar datos de corriente
  ultimovalor: any[] = []; // Arreglo para almacenar datos de corriente


  private dataSubscription: Subscription | undefined; // Inicializamos dataSubscription como undefined


  constructor(private influxdbService: InfluxdbService) { }

  ngOnInit() {

    this.loadData();
    this.graficar();

    this.dataSubscription = interval(30000).subscribe(() => {
      this.loadData();
      this.graficar();
    });
  }

  ngOnDestroy() {
    // Detén el temporizador cuando el componente se destruya
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  loadData() {
    this.influxdbService.getData_F2_silo_cohete().subscribe((data: any[]) => {

      this.s_coheteData = [];

      data.forEach(item => {
        if (item._field === 'silo_cohete') {
          this.s_coheteData.push({
            x: new Date(item._time).getTime(), // Convierte la fecha en una marca de tiempo
            y: Number(parseFloat(item._value).toFixed(1)) // Convierte el valor en número
          });
        }
      });

      /*this.data = data.map(item => ({
        x: new Date(item._time).getTime(), // Convierte la fecha en una marca de tiempo
        y: parseFloat(item._value) // Convierte el valor en número

      }));
      nombre = this.data;*/
      s_cohete = this.s_coheteData;
      ultimovalor = s_cohete[s_cohete.length - 1];
      // console.log("silo_cohete")
      // console.log(ultimovalor);

      this.graficar();
      // console.log("flag")
    });
  }
  private chart: Highcharts.Chart | undefined;
  graficar() {
    const self = this;
    this.chartOptions = {
      title: {
        text: 'Silo cohete Fundición 2',
        align: 'center'
      },

      subtitle: {
        text: 'Unidad de medida: Porcentaje de llenado (%)',
        align: 'center'
      },

      yAxis: {
        title: {
          text: 'Porcentaje de llenado (%)',
        },
        allowDecimals: false,
        max: 100,
        min: 0
      },
      xAxis: {
        labels: {
          enabled: false
        },
        categories: ['Silo cohete']
      },
      legend: {
        enabled: true,
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom'
      },
      series: [{
        name: 'Silo cohete',
        type: 'column',
        data: [ultimovalor]
      }],
      tooltip: {
        enabled: true,
        headerFormat: '<b>Porcentaje: </b> {point.y} (%) <br/>',
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
        type: 'column',
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 5
      },
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
        }],
      }
    }
  }
}
