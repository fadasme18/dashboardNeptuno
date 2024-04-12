import { Component, OnInit, OnDestroy } from '@angular/core';
import { InfluxdbService } from 'src/app/influxdb.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-pagprincipal',
  templateUrl: './pagprincipal.component.html',
  styleUrls: ['./pagprincipal.component.scss'],
})
export class PagprincipalComponent implements OnInit, OnDestroy {
  private socketSubscription!: Subscription;
  public message: any;
  public horno1: boolean | null = null;
  public horno2: boolean | null = null;
  public hornosTT: boolean | null = null;
  public silo_cohete: boolean | null = null;
  public silo_norte: boolean | null = null;
  public silo_sur: boolean | null = null;
  public lastUpdate: Date | null = null;
  public counter: number = 0;
  private timer: any;

  constructor(private InfluxdbService: InfluxdbService) {}

  ngOnInit() {
    this.connectWebSocket();
    this.sendMessage(true);
    // Inicializa el temporizador para actualizar la última actualización cada segundo
    interval(1000).subscribe(() => {
      this.startTimer();
    });
  }

  ngOnDestroy() {
    this.disconnectWebSocket();
    this.stopTimer();
  }

  private startTimer(): void {
    this.timer = this.counter++;
    // this.timer = setInterval(() => {
    //   this.counter++;
    // }, 1000);
  }

  private stopTimer(): void {
    this.counter = 0;
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
        this.stopTimer();
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
    }, 3000);
  }

  getIndicatorClass(value: boolean | null): string {
    return value === true ? 'badge badge-success' : 'badge badge-danger';
  }

  sendMessage(canal: boolean): void {
    const message1 = canal;
    this.InfluxdbService.sendMessage(message1);
  }

  updateLastUpdate(): void {
    this.lastUpdate = new Date(); // Actualiza la fecha y hora actual
    // console.log(this.lastUpdate);
  }

  getLastUpdateDuration(): string {
    // console.log('Tiempo antes', this.timer);
    // console.log('Tiempo ahora');
    return `${this.counter}`;
  }
}

// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { InfluxdbService } from 'src/app/influxdb.service';
// import { Subscription, interval } from 'rxjs';

// @Component({
//   selector: 'app-pagprincipal',
//   templateUrl: './pagprincipal.component.html',
//   styleUrls: ['./pagprincipal.component.scss'],
// })
// export class PagprincipalComponent implements OnInit, OnDestroy {
//   private socketSubscription!: Subscription;
//   public message: any;
//   public horno1: boolean | null = null;
//   public horno2: boolean | null = null;
//   public hornosTT: boolean | null = null;
//   public silo_cohete: boolean | null = null;
//   public silo_norte: boolean | null = null;
//   public silo_sur: boolean | null = null;
//   constructor(private InfluxdbService: InfluxdbService) {}

//   ngOnInit() {
//     this.connectWebSocket();
//     this.sendMessage(true);
//   }

//   ngOnDestroy() {
//     this.disconnectWebSocket();
//   }

//   private connectWebSocket(): void {
//     this.socketSubscription = this.InfluxdbService.getData().subscribe(
//       (message) => {
//         this.horno1 = message?.horno1 ?? null;
//         this.hornosTT = message?.hornosTT ?? null;
//         this.horno2 = message?.horno2 ?? null;
//         this.silo_cohete = message?.silo_cohete ?? null;
//         this.silo_norte = message?.silo_norte ?? null;
//         this.silo_sur = message?.silo_sur ?? null;

//         console.log(message);
//       },
//       () => {
//         console.log('Conexion cerrada. Intentando reconectar...');
//         this.reconnectWebSocket();
//       }
//     );
//   }

//   private disconnectWebSocket(): void {
//     if (this.socketSubscription) {
//       this.socketSubscription.unsubscribe();
//     }
//   }

//   private reconnectWebSocket(): void {
//     setTimeout(() => {
//       console.log('Reconectando al websocket...');
//       this.disconnectWebSocket();
//       this.connectWebSocket();
//     }, 3000);
//   }

//   getIndicatorClass(value: boolean | null): string {
//     return value === true ? 'badge badge-success' : 'badge badge-danger';
//   }

//   sendMessage(canal: boolean): void {
//     const message1 = canal;
//     this.InfluxdbService.sendMessage(message1);
//   }
// }
