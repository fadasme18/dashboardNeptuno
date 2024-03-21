import { Component, OnInit, OnDestroy } from '@angular/core';
import { InfluxdbService } from 'src/app/influxdb.service';
import { Subscription, interval } from 'rxjs';



@Component({
  selector: 'app-f2-connection-status',
  templateUrl: './f2-connection-status.component.html',
  styleUrls: ['./f2-connection-status.component.scss']
})
export class F2connectionstatusComponent implements OnInit, OnDestroy {
  
  private socketSubscription!: Subscription;
  public message: any;
  public horno1: boolean | null = null;
  public horno2: boolean | null = null;
  public hornosTT: boolean | null = null;
  public silo_cohete: boolean | null = null;
  public silo_norte: boolean | null = null;
  public silo_sur: boolean | null = null;
  constructor(private InfluxdbService: InfluxdbService) { }

  ngOnInit() {
    this.connectWebSocket();
    this.sendMessage(true);
  }

  ngOnDestroy() {
    this.disconnectWebSocket();
  }

  private connectWebSocket(): void {
    this.socketSubscription = this.InfluxdbService.getData().subscribe(
      (message) => {
        this.horno1 = message?.horno1 ?? null;
        this.hornosTT = message?.hornosTT ?? null;
        this.horno2 = message?.horno2 ?? null;
        this.silo_cohete = message?.silo_cohete ?? null;
        this.silo_norte = message?.silo_norte ?? null;
        this.silo_sur = message?.silo_sur ?? null;

        console.log(message);
      },
      () => {
        console.log('Conexion cerrada. Intentando reconectar...');
        this.reconnectWebSocket();
      }
    );
  }

  private disconnectWebSocket(): void {
    if (this.socketSubscription) {
      this.socketSubscription.unsubscribe();
    }
  }

  private reconnectWebSocket(): void {
    setTimeout(() => {
      console.log('Reconectando al websocket...');
      this.disconnectWebSocket();
      this.connectWebSocket();
    }, 3000)
  }

  getIndicatorClass(value: boolean | null): string {
    return value === true ? 'online' : 'offline';
  }

  sendMessage(canal: boolean): void {
    const message1 = canal;
    this.InfluxdbService.sendMessage(message1);
  }

  // h2ttF2Data: any[] = [];
  // data: any;
  // h2ttF2: any[] = [];
  // status: string = 'Offline'
  // ultimovalor: any[] = [];
  // connectionStatus: string = 'desconectado';

  // private dataSubscription: Subscription | undefined; // Inicializamos dataSubscription como undefined


  // constructor(private influxdbService: InfluxdbService) { }

  // ngOnInit() {

  //   this.loadData();

  //   this.dataSubscription = interval(30000).subscribe(() => {
  //     this.loadData();
  //   });
  // }

  // ngOnDestroy() {
  //   // Detén el temporizador cuando el componente se destruya
  //   if (this.dataSubscription) {
  //     this.dataSubscription.unsubscribe();
  //   }
  // }

  // loadData() {
  //   this.influxdbService.getData_F2_TT_horno2().subscribe((data: any[]) => {

  //     this.h2ttF2Data = [];
  //     let status = 'Offline';
  //     data.forEach(item => {
  //       if (item._field === 'TT_horno2_F2') {          
  //         this.h2ttF2Data.push({
  //           x: new Date(item._time).getTime(), // Convierte la fecha en una marca de tiempo
  //           y: parseFloat(item._value),
  //           z: item._value
  //         });
  //         if (parseFloat(item._value) > 0) {
  //           status = 'Online'
  //         }else /*if (parseFloat(item._value) === 0)*/{
  //           status = 'Offline' 
  //         }
  //       }
  //     });
  //     this.status = status
  //     h2ttF2 = this.h2ttF2Data;
  //     ultimovalor = h2ttF2[h2ttF2.length - 1];
  //     // console.log("----------")
  //     // console.log(ultimovalor);
  //     // console.log(status);
  //     // console.log(this.status);
  //     // console.log("----------")
  //   });
  // }
}
