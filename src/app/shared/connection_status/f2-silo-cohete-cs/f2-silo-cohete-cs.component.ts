import { Component, OnInit, OnDestroy } from '@angular/core';
import { InfluxdbService } from 'src/app/influxdb.service';
import { Subscription, interval } from 'rxjs';

var silo_cohete: any[] = [];
var ultimovalor: any[] = [];

@Component({
  selector: 'app-f2-silo-cohete-cs',
  templateUrl: './f2-silo-cohete-cs.component.html',
  styleUrls: ['./f2-silo-cohete-cs.component.scss']
})
export class F2SiloCoheteCSComponent implements OnInit, OnDestroy {
  
  silo_coheteData: any[] = [];
  data: any;
  silo_cohete: any[] = [];
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
    this.influxdbService.getData_F2_silo_cohete().subscribe((data: any[]) => {

      this.silo_coheteData = [];
      let status = 'Offline';
      data.forEach(item => {
        if (item._field === 'silo_cohete') {          
          this.silo_coheteData.push({
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
      silo_cohete = this.silo_coheteData;
      ultimovalor = silo_cohete[silo_cohete.length - 1];
      // console.log("----------")
      // console.log(ultimovalor);
      // console.log(status);
      // console.log(this.status);
      // console.log("----------")
    });
  }
}