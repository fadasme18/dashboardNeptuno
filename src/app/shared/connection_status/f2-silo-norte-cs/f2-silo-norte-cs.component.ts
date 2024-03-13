import { Component, OnInit, OnDestroy } from '@angular/core';
import { InfluxdbService } from 'src/app/influxdb.service';
import { Subscription, interval } from 'rxjs';

var silo_norte: any[] = [];
var ultimovalor: any[] = [];

@Component({
  selector: 'app-f2-silo-norte-cs',
  templateUrl: './f2-silo-norte-cs.component.html',
  styleUrls: ['./f2-silo-norte-cs.component.scss']
})
export class F2SiloNorteCSComponent implements OnInit, OnDestroy {
  
  silo_norteData: any[] = [];
  data: any;
  silo_norte: any[] = [];
  status: string = 'Offline'
  ultimovalor: any[] = [];
  connectionStatus: string = 'desconectado';

  private dataSubscription: Subscription | undefined; // Inicializamos dataSubscription como undefined


  constructor(private influxdbService: InfluxdbService) { }

  ngOnInit() {

    this.loadData();

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

  loadData() {
    this.influxdbService.getData_F2_silo_norte().subscribe((data: any[]) => {

      this.silo_norteData = [];
      let status = 'Offline';
      data.forEach(item => {
        if (item._field === 'silo_norte') {          
          this.silo_norteData.push({
            x: new Date(item._time).getTime(), // Convierte la fecha en una marca de tiempo
            y: parseFloat(item._value),
            z: item._value
          });
          if (parseFloat(item._value) > 0) {
            status = 'Online'
          }else if (parseFloat(item._value) === 0){
            status = 'Offline' 
          }
        }
      });
      this.status = status
      silo_norte = this.silo_norteData;
      ultimovalor = silo_norte[silo_norte.length - 1];
      // console.log("----------")
      // console.log(ultimovalor);
      // console.log(status);
      // console.log(this.status);
      // console.log("----------")
    });
  }
}