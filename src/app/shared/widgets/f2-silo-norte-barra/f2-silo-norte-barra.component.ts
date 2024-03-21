import { Component, OnInit, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts';
import { InfluxdbService } from 'src/app/influxdb.service';
import { Subscription, interval } from 'rxjs';

var s_norte: any[] = [];
var ultimovalor: any[] = [];

@Component({
  selector: 'app-f2-silo-norte-barra',
  templateUrl: './f2-silo-norte-barra.component.html',
  styleUrls: ['./f2-silo-norte-barra.component.scss'],
})
export class F2SiloNorteBarraComponent implements OnInit, OnDestroy {
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
  s_norteData: any[] = []; // Arreglo para almacenar datos de corriente
  ultimovalor: any[] = []; // Arreglo para almacenar datos de corriente
  private dataSubscription: Subscription | undefined; // Inicializamos dataSubscription como undefined

  async loadData() {
    //---------------------------------------------------------------------------------------------------------------------
    this.data = await this.InfluxdbService.F2_silo_norte_barra();
    // console.log('ACA ESTA MSJ!!');
    // console.log(this.data);
    //---------------------------------------------------------------------------------------------------------------------
    this.s_norteData = [];

    this.data.forEach((item: any) => {
      if (item._field === 'silo_norte') {
        this.s_norteData.push({
          x: new Date(item._time).getTime(), // Convierte la fecha en una marca de tiempo
          y: Number(item._value.toFixed(1)), // Convierte el valor en número
        });
      }
    });
    s_norte = this.s_norteData;
    ultimovalor = s_norte[s_norte.length - 1];
    // console.log('silo_norte');
    // console.log(ultimovalor);

    this.graficar();
  }

  private chart: Highcharts.Chart | undefined;
  graficar() {
    const self = this;
    this.chartOptions = {
      title: {
        text: 'Silo norte Fundición 2',
        align: 'center',
      },

      subtitle: {
        text: 'Unidad de medida: Porcentaje de llenado (%)',
        align: 'center',
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
        categories: ['Silo norte'],
      },
      legend: {
        enabled: true,
        layout: 'horizontal',
        align: 'center',
        verticalAlign: 'bottom',
      },
      series: [
        {
          name: 'Silo norte',
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
