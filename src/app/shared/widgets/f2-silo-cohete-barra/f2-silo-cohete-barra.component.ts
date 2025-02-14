import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts';
import { InfluxdbService } from 'src/app/influxdb.service';
import { Subscription, interval } from 'rxjs';

var s_cohete: any[] = [];
var ultimovalor: any[] = [];

@Component({
  selector: 'app-f2-silo-cohete-barra',
  templateUrl: './f2-silo-cohete-barra.component.html',
  styleUrls: ['./f2-silo-cohete-barra.component.scss'],
})
export class F2SiloCoheteBarraComponent implements OnInit, OnDestroy {
  data: any;

  constructor(private InfluxdbService: InfluxdbService) {}

  ngOnInit() {
    this.loadData();
    this.graficar();

    this.dataSubscription = interval(30000).subscribe(() => {
      this.loadData();
    });
  }

  ngOnDestroy() {
    // Detén el temporizador cuando el componente se destruya
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  //---------------------------------------------------------------------------------------------------------------------

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};
  s_coheteData: any[] = []; // Arreglo para almacenar datos de corriente
  ultimovalor: any[] = []; // Arreglo para almacenar datos de corriente
  private dataSubscription: Subscription | undefined; // Inicializamos dataSubscription como undefined

  async loadData() {
    //---------------------------------------------------------------------------------------------------------------------
    this.data = await this.InfluxdbService.F2_silo_cohete_barra();
    // console.log('ACA ESTA MSJ!!');
    // console.log(this.data);
    //---------------------------------------------------------------------------------------------------------------------
    this.s_coheteData;

    this.data.forEach((item: any) => {
      if (item._field === 'silo_cohete') {
        this.s_coheteData.push({
          x: new Date(item._time).getTime(), // Convierte la fecha en una marca de tiempo
          y: Number(item._value.toFixed(1)), // Convierte el valor en número
        });
      }
    });

    s_cohete = this.s_coheteData;
    ultimovalor = s_cohete[s_cohete.length - 1];
    // console.log('silo_cohete');
    // console.log(ultimovalor);

    this.graficar();
    // console.log("flag")
  }
  private chart: Highcharts.Chart | undefined;
  graficar() {
    const self = this;
    this.chartOptions = {
      title: {
        text: 'Silo cohete Fundición 2',
        align: 'center',
      },

      subtitle: {
        text: 'Unidad de medida: Porcentaje de llenado (%)',
        align: 'center',
      },
      credits: {
        enabled: false,
      },
      yAxis: {
        title: {
          text: 'Porcentaje de llenado (%)',
        },
        allowDecimals: false,
        max: 100,
        min: 0,
      },
      xAxis: {
        labels: {
          enabled: false,
        },
        categories: ['Silo cohete'],
      },
      legend: {
        enabled: true,
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom',
      },
      series: [
        {
          name: 'Silo cohete',
          type: 'column',
          data: [ultimovalor],
        },
      ],
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
            second: 'numeric',
          };
          return date.toLocaleString('es-CL', options);
        },
      },
      chart: {
        type: 'column',
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
          },
        ],
      },
    };
  }
}
