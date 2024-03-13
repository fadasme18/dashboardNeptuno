import { Component, OnInit, OnDestroy } from '@angular/core';
import { InfluxdbService } from 'src/app/influxdb.service';
import { Subscription, interval } from 'rxjs';

var Energy: any[] = [];
var ultimovalor: any[] = [];

@Component({
  selector: 'app-f2-horno2-cs',
  templateUrl: './f2-horno2-cs.component.html',
  styleUrls: ['./f2-horno2-cs.component.scss']
})
export class F2Horno2CSComponent implements OnInit, OnDestroy {
  
  EnergyData: any[] = [];
  data: any;
  Energy: any[] = [];
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
    this.influxdbService.getData_F2_horno2_energia().subscribe((data: any[]) => {

      this.EnergyData = [];
      let status = 'Offline';
      data.forEach(item => {
        if (item._field === 'Energy') {          
          this.EnergyData.push({
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
      Energy = this.EnergyData;
      ultimovalor = Energy[Energy.length - 1];
      // console.log("----------")
      // console.log(ultimovalor);
      // console.log(status);
      // console.log(this.status);
      // console.log("----------")
    });
  }
}