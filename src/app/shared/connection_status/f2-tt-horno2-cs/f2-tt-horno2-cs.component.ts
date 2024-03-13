import { Component, OnInit, OnDestroy } from '@angular/core';
import { InfluxdbService } from 'src/app/influxdb.service';
import { Subscription, interval } from 'rxjs';

var h2ttF2: any[] = [];
var ultimovalor: any[] = [];

@Component({
  selector: 'app-f2-tt-horno2-cs',
  templateUrl: './f2-tt-horno2-cs.component.html',
  styleUrls: ['./f2-tt-horno2-cs.component.scss']
})
export class F2TtHorno2CsComponent implements OnInit, OnDestroy {
  
  h2ttF2Data: any[] = [];
  data: any;
  h2ttF2: any[] = [];
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
    this.influxdbService.getData_F2_TT_horno2().subscribe((data: any[]) => {

      this.h2ttF2Data = [];
      let status = 'Offline';
      data.forEach(item => {
        if (item._field === 'TT_horno2_F2') {          
          this.h2ttF2Data.push({
            x: new Date(item._time).getTime(), // Convierte la fecha en una marca de tiempo
            y: parseFloat(item._value),
            z: item._value
          });
          if (parseFloat(item._value) > 0) {
            status = 'Online'
          }else /*if (parseFloat(item._value) === 0)*/{
            status = 'Offline' 
          }
        }
      });
      this.status = status
      h2ttF2 = this.h2ttF2Data;
      ultimovalor = h2ttF2[h2ttF2.length - 1];
      // console.log("----------")
      // console.log(ultimovalor);
      // console.log(status);
      // console.log(this.status);
      // console.log("----------")
    });
  }
}
