import { Injectable } from '@angular/core';
//import { InfluxDB, FluxTableMetaData } from '@influxdata/influxdb-client';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { InfluxDB } from '@influxdata/influxdb-client';
import * as moment from 'moment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class InfluxdbService {

  private url = 'http://127.0.0.1:8086';
  private token = 'qM-zFpT66Q94gpLfB9J6gnHHFIxnkafkCHsO-l4jGujqHH6XQbAdvxUmr63veMh6HoiBpfyBIUBnNOtdX_Z2MQ==';
  private orgID = '3779feade251cf1f';
  private bucket = 'DATA';

  private createEmpty = 'true';  //Espacios en blanco en el grafico verdadero o falso

  private client: any;

  constructor(private http: HttpClient) {
    this.client = new InfluxDB({ url: this.url, token: this.token });
  }

  //---------------------------------------------------------------------Fundicion 2-------------------------------------------------------------

  //-------------------------------------------------------------QUERY TRATAMIENTOS TERMICOS HORNO 2------------------------------------------------
  async F2_TT_horno2(startDate: Date, endDate: Date): Promise<any[]> {

    const rangeDuration = this.calculateRangeDuration_TT(startDate, endDate);
    const fluxQuery = `
    from(bucket: "${this.bucket}")
    |> range(start: ${startDate.toISOString()}, stop: ${endDate.toISOString()})
    |> filter(fn: (r) => r["_measurement"] == "F2-TT-[ADAM-6018]")
    |> filter(fn: (r) => r["_field"] == "TT_horno2_F2")
    |> aggregateWindow(every: ${rangeDuration}, fn: mean, createEmpty: ${this.createEmpty})
    |> yield(name: "mean")
    `;
    try {
      const queryApi = this.client.getQueryApi(this.orgID);

      const result = await queryApi.collectRows(fluxQuery);
      return result;
    } catch (error) {
      console.error('Error al consultar Influxdb: ', error);
      return [];
    }
  }
  //----------------------------------------------------------FIN QUERY TRATAMIENTOS TERMICOS HORNO 2------------------------------------------------


  //-------------------------------------------------------------QUERY TRATAMIENTOS TERMICOS HORNO 1------------------------------------------------
  async F2_TT_horno1(startDate: Date, endDate: Date): Promise<any[]> {

    const rangeDuration = this.calculateRangeDuration_TT(startDate, endDate);
    const fluxQuery = `
  from(bucket: "${this.bucket}")
  |> range(start: ${startDate.toISOString()}, stop: ${endDate.toISOString()})
  |> filter(fn: (r) => r["_measurement"] == "F2-TT-[ADAM-6018]")
  |> filter(fn: (r) => r["_field"] == "TT_horno1_F2")
  |> aggregateWindow(every: ${rangeDuration}, fn: mean, createEmpty: ${this.createEmpty})
  |> yield(name: "mean")
  `;
    try {
      const queryApi = this.client.getQueryApi(this.orgID);

      const result = await queryApi.collectRows(fluxQuery);
      return result;
    } catch (error) {
      console.error('Error al consultar Influxdb: ', error);
      return [];
    }
  }
  //----------------------------------------------------------FIN QUERY TRATAMIENTOS TERMICOS HORNO 1------------------------------------------------


  //-------------------------------------------------------------QUERY SILO SUR------------------------------------------------
  async F2_silo_sur(startDate: Date, endDate: Date): Promise<any[]> {

    const rangeDuration = this.calculateRangeDuration_silos(startDate, endDate);
    const fluxQuery = `
  from(bucket: "${this.bucket}")
  |> range(start: ${startDate.toISOString()}, stop: ${endDate.toISOString()})
  |> filter(fn: (r) => r["_measurement"] == "F2-silo-NyS-[ADAM6017]")
  |> filter(fn: (r) => r["_field"] == "silo_sur")
  |> aggregateWindow(every: ${rangeDuration}, fn: mean, createEmpty: ${this.createEmpty})
  |> yield(name: "mean")
  `;
    try {
      const queryApi = this.client.getQueryApi(this.orgID);

      const result = await queryApi.collectRows(fluxQuery);
      return result;
    } catch (error) {
      console.error('Error al consultar Influxdb: ', error);
      return [];
    }
  }
  //----------------------------------------------------------FIN QUERY SILO SUR------------------------------------------------

  //-------------------------------------------------------------QUERY SILO NORTE------------------------------------------------
  async F2_silo_norte(startDate: Date, endDate: Date): Promise<any[]> {

    const rangeDuration = this.calculateRangeDuration_silos(startDate, endDate);
    const fluxQuery = `
  from(bucket: "${this.bucket}")
  |> range(start: ${startDate.toISOString()}, stop: ${endDate.toISOString()})
  |> filter(fn: (r) => r["_measurement"] == "F2-silo-NyS-[ADAM6017]")
  |> filter(fn: (r) => r["_field"] == "silo_norte")
  |> aggregateWindow(every: ${rangeDuration}, fn: mean, createEmpty: ${this.createEmpty})
  |> yield(name: "mean")
  `;
    try {
      const queryApi = this.client.getQueryApi(this.orgID);

      const result = await queryApi.collectRows(fluxQuery);
      return result;
    } catch (error) {
      console.error('Error al consultar Influxdb: ', error);
      return [];
    }
  }
  //----------------------------------------------------------FIN QUERY SILO NORTE------------------------------------------------

  //-------------------------------------------------------------QUERY SILO COHETE------------------------------------------------
  async F2_silo_cohete(startDate: Date, endDate: Date): Promise<any[]> {

    const rangeDuration = this.calculateRangeDuration_silos(startDate, endDate);
    const fluxQuery = `
  from(bucket: "${this.bucket}")
  |> range(start: ${startDate.toISOString()}, stop: ${endDate.toISOString()})
  |> filter(fn: (r) => r["_measurement"] == "F2-silo-cohete-[ADAM6017]")
  |> filter(fn: (r) => r["_field"] == "silo_cohete")
  |> aggregateWindow(every: ${rangeDuration}, fn: mean, createEmpty: ${this.createEmpty})
  |> yield(name: "mean")
  `;
    try {
      const queryApi = this.client.getQueryApi(this.orgID);

      const result = await queryApi.collectRows(fluxQuery);
      return result;
    } catch (error) {
      console.error('Error al consultar Influxdb: ', error);
      return [];
    }
  }
  //----------------------------------------------------------FIN QUERY SILO COHETE------------------------------------------------

  //-------------------------------------------------------------QUERY HORNO INDUCCION 2 VOLTAGE------------------------------------------------
  async F2_horno2_voltage(startDate: Date, endDate: Date): Promise<any[]> {

    const rangeDuration = this.calculateRangeDuration_Horno_induccion(startDate, endDate);
    const fluxQuery = `
  from(bucket: "${this.bucket}")
  |> range(start: ${startDate.toISOString()}, stop: ${endDate.toISOString()})
  |> filter(fn: (r) => r["_measurement"] == "F2-Horno2-[DPM-C530]")
  |> filter(fn: (r) => r["_field"] == "Voltage" or r["_field"] == "VoltageB" or r["_field"] == "VoltageC")
  |> aggregateWindow(every: ${rangeDuration}, fn: mean, createEmpty: ${this.createEmpty})
  |> yield(name: "mean")
  `;
    try {
      const queryApi = this.client.getQueryApi(this.orgID);

      const result = await queryApi.collectRows(fluxQuery);
      return result;
    } catch (error) {
      console.error('Error al consultar Influxdb: ', error);
      return [];
    }
  }
  //----------------------------------------------------------FIN QUERY HORNO INDUCCION 2 VOLTAGE------------------------------------------------


  //-------------------------------------------------------------QUERY HORNO INDUCCION 2 POTENCIA------------------------------------------------
  async F2_horno2_potencia(startDate: Date, endDate: Date): Promise<any[]> {

    const rangeDuration = this.calculateRangeDuration_Horno_induccion(startDate, endDate);
    const fluxQuery = `
  from(bucket: "${this.bucket}")
  |> range(start: ${startDate.toISOString()}, stop: ${endDate.toISOString()})
  |> filter(fn: (r) => r["_measurement"] == "F2-Horno2-[DPM-C530]")
  |> filter(fn: (r) => r["_field"] == "Power")
  |> aggregateWindow(every: ${rangeDuration}, fn: mean, createEmpty: ${this.createEmpty})
  |> yield(name: "mean")
  `;
    try {
      const queryApi = this.client.getQueryApi(this.orgID);

      const result = await queryApi.collectRows(fluxQuery);
      return result;
    } catch (error) {
      console.error('Error al consultar Influxdb: ', error);
      return [];
    }
  }
  //----------------------------------------------------------FIN QUERY HORNO INDUCCION 2 POTENCIA------------------------------------------------


  //-------------------------------------------------------------QUERY HORNO INDUCCION 2 ENERGIA------------------------------------------------
  async F2_horno2_energia(startDate: Date, endDate: Date): Promise<any[]> {

    const rangeDuration = this.calculateRangeDuration_Horno_induccion(startDate, endDate);
    const fluxQuery = `
  from(bucket: "${this.bucket}")
  |> range(start: ${startDate.toISOString()}, stop: ${endDate.toISOString()})
  |> filter(fn: (r) => r["_measurement"] == "F2-Horno2-[DPM-C530]")
  |> filter(fn: (r) => r["_field"] == "Energy")
  |> aggregateWindow(every: ${rangeDuration}, fn: mean, createEmpty: ${this.createEmpty})
  |> yield(name: "mean")
  `;
    try {
      const queryApi = this.client.getQueryApi(this.orgID);

      const result = await queryApi.collectRows(fluxQuery);
      return result;
    } catch (error) {
      console.error('Error al consultar Influxdb: ', error);
      return [];
    }
  }
  //----------------------------------------------------------FIN QUERY HORNO INDUCCION 2 ENERGIA------------------------------------------------

  //-------------------------------------------------------------QUERY HORNO INDUCCION 2 CORRIENTE------------------------------------------------
  async F2_horno2_corriente(startDate: Date, endDate: Date): Promise<any[]> {

    const rangeDuration = this.calculateRangeDuration_Horno_induccion(startDate, endDate);
    const fluxQuery = `
  from(bucket: "${this.bucket}")
  |> range(start: ${startDate.toISOString()}, stop: ${endDate.toISOString()})
  |> filter(fn: (r) => r["_measurement"] == "F2-Horno2-[DPM-C530]")
  |> filter(fn: (r) => r["_field"] == "Current" or r["_field"] == "CurrentC" or r["_field"] == "CurrentB")
  |> aggregateWindow(every: ${rangeDuration}, fn: mean, createEmpty: ${this.createEmpty})
  |> yield(name: "mean")
  `;
    try {
      const queryApi = this.client.getQueryApi(this.orgID);

      const result = await queryApi.collectRows(fluxQuery);
      return result;
    } catch (error) {
      console.error('Error al consultar Influxdb: ', error);
      return [];
    }
  }
  //----------------------------------------------------------FIN QUERY HORNO INDUCCION 2 CORRIENTE------------------------------------------------


  //-------------------------------------------------------------QUERY HORNO INDUCCION 1 VOLTAGE------------------------------------------------
  async F2_horno1_voltage(startDate: Date, endDate: Date): Promise<any[]> {

    const rangeDuration = this.calculateRangeDuration_Horno_induccion(startDate, endDate);
    const fluxQuery = `
  from(bucket: "${this.bucket}")
  |> range(start: ${startDate.toISOString()}, stop: ${endDate.toISOString()})
  |> filter(fn: (r) => r["_measurement"] == "F2-Horno1-[COUNTIS-E53]")
  |> filter(fn: (r) => r["_field"] == "Voltage1" or r["_field"] == "Voltage2" or r["_field"] == "Voltage3")
  |> aggregateWindow(every: ${rangeDuration}, fn: mean, createEmpty: ${this.createEmpty})
  |> yield(name: "mean")
  `;
    try {
      const queryApi = this.client.getQueryApi(this.orgID);

      const result = await queryApi.collectRows(fluxQuery);
      return result;
    } catch (error) {
      console.error('Error al consultar Influxdb: ', error);
      return [];
    }
  }
  //----------------------------------------------------------FIN QUERY HORNO INDUCCION 1 VOLTAGE------------------------------------------------


  //-------------------------------------------------------------QUERY HORNO INDUCCION 1 POTENCIA------------------------------------------------
  async F2_horno1_potencia(startDate: Date, endDate: Date): Promise<any[]> {

    const rangeDuration = this.calculateRangeDuration_Horno_induccion(startDate, endDate);
    const fluxQuery = `
  from(bucket: "${this.bucket}")
  |> range(start: ${startDate.toISOString()}, stop: ${endDate.toISOString()})
  |> filter(fn: (r) => r["_measurement"] == "F2-Horno1-[COUNTIS-E53]")
  |> filter(fn: (r) => r["_field"] == "Power")
  |> aggregateWindow(every: ${rangeDuration}, fn: mean, createEmpty: ${this.createEmpty})
  |> yield(name: "mean")
  `;
    try {
      const queryApi = this.client.getQueryApi(this.orgID);

      const result = await queryApi.collectRows(fluxQuery);
      return result;
    } catch (error) {
      console.error('Error al consultar Influxdb: ', error);
      return [];
    }
  }
  //----------------------------------------------------------FIN QUERY HORNO INDUCCION 1 POTENCIA------------------------------------------------


  //-------------------------------------------------------------QUERY HORNO INDUCCION 1 ENERGIA------------------------------------------------
  async F2_horno1_energia(startDate: Date, endDate: Date): Promise<any[]> {

    const rangeDuration = this.calculateRangeDuration_Horno_induccion(startDate, endDate);
    const fluxQuery = `
  from(bucket: "${this.bucket}")
  |> range(start: ${startDate.toISOString()}, stop: ${endDate.toISOString()})
  |> filter(fn: (r) => r["_measurement"] == "F2-Horno1-[COUNTIS-E53]")
  |> filter(fn: (r) => r["_field"] == "Energy")
  |> aggregateWindow(every: ${rangeDuration}, fn: mean, createEmpty: ${this.createEmpty})
  |> yield(name: "mean")
  `;
    try {
      const queryApi = this.client.getQueryApi(this.orgID);

      const result = await queryApi.collectRows(fluxQuery);
      return result;
    } catch (error) {
      console.error('Error al consultar Influxdb: ', error);
      return [];
    }
  }
  //----------------------------------------------------------FIN QUERY HORNO INDUCCION 1 ENERGIA------------------------------------------------

  //-------------------------------------------------------------QUERY HORNO INDUCCION 1 CORRIENTE------------------------------------------------
  async F2_horno1_corriente(startDate: Date, endDate: Date): Promise<any[]> {

    const rangeDuration = this.calculateRangeDuration_Horno_induccion(startDate, endDate);
    const fluxQuery = `
  from(bucket: "${this.bucket}")
  |> range(start: ${startDate.toISOString()}, stop: ${endDate.toISOString()})
  |> filter(fn: (r) => r["_measurement"] == "F2-Horno1-[COUNTIS-E53]")
  |> filter(fn: (r) => r["_field"] == "Current1" or r["_field"] == "Current2" or r["_field"] == "Current3")
  |> aggregateWindow(every: ${rangeDuration}, fn: mean, createEmpty: ${this.createEmpty})
  |> yield(name: "mean")
  `;
    try {
      const queryApi = this.client.getQueryApi(this.orgID);

      const result = await queryApi.collectRows(fluxQuery);
      return result;
    } catch (error) {
      console.error('Error al consultar Influxdb: ', error);
      return [];
    }
  }
  //----------------------------------------------------------FIN QUERY HORNO INDUCCION 1 CORRIENTE------------------------------------------------
  //----------------------------------------------------------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------------------------------------------------------------------------------------------------------
  //----------------------------------------------------------INICIO DE FUNCIONES------------------------------------------------------------------
  calculateRangeDuration_TT(startDate: Date, endDate: Date): string {
    const diffInDays = moment(endDate).diff(startDate, 'days');
    if (diffInDays <= 1) {
      return '2m'; // Rango de 12 horas o menos
    } else if (diffInDays === 1) {
      return '2m'; // Rango de 1 día
    } else if (diffInDays >= 2 && diffInDays <= 3) {
      return '10m'; // Rango de 2-3 días
    } else if (diffInDays >= 4 && diffInDays <= 7) {
      return '30m'; // Rango de 4-7 días
    } else if (diffInDays >= 8 && diffInDays <= 30) {
        return '1h'; // Rango de 8-30 días
    } else if (diffInDays >= 31 && diffInDays <= 60) {
        return '2h'; // Rango de 31-60 días
    } else if (diffInDays >= 61 && diffInDays <= 90) {
        return '3h'; // Rango de 31-60 días
    } else if (diffInDays >= 91 && diffInDays <= 120) {
        return '4h'; // Rango de 91-120 días
    } else if (diffInDays >= 121 && diffInDays <= 150) {
          return '6h'; // Rango de 121-150 días
    } else if (diffInDays >= 151 && diffInDays <= 360) {
          return '12h'; // Rango de 151-360 días
    } else {
      return '2m'; // Por defecto, rango de 12 horas
    }
  }

  calculateRangeDuration_silos(startDate: Date, endDate: Date): string {
    const diffInDays = moment(endDate).diff(startDate, 'days');
    if (diffInDays <= 1) {
      return '2m'; // Rango de 12 horas o menos
    } else if (diffInDays === 1) {
      return '2m'; // Rango de 1 día
    } else if (diffInDays >= 2 && diffInDays <= 3) {
      return '10m'; // Rango de 2-3 días
    } else if (diffInDays >= 4 && diffInDays <= 7) {
      return '30m'; // Rango de 4-7 días
    } else if (diffInDays >= 8 && diffInDays <= 30) {
        return '1h'; // Rango de 8-30 días
    } else if (diffInDays >= 31 && diffInDays <= 60) {
        return '2h'; // Rango de 31-60 días
    } else if (diffInDays >= 61 && diffInDays <= 90) {
        return '3h'; // Rango de 31-60 días
    } else if (diffInDays >= 91 && diffInDays <= 120) {
        return '4h'; // Rango de 91-120 días
    } else if (diffInDays >= 121 && diffInDays <= 150) {
          return '6h'; // Rango de 121-150 días
    } else if (diffInDays >= 151 && diffInDays <= 360) {
          return '12h'; // Rango de 151-360 días
    } else {
      return '2m'; // Por defecto, rango de 12 horas
    }
  }

  calculateRangeDuration_Horno_induccion(startDate: Date, endDate: Date): string {
    const diffInDays = moment(endDate).diff(startDate, 'days');
    if (diffInDays <= 1) {
      return '1m'; // Rango de 12 horas o menos
    } else if (diffInDays === 1) {
      return '1m'; // Rango de 1 día
    } else if (diffInDays >= 2 && diffInDays <= 3) {
      return '5m'; // Rango de 2-3 días
    } else if (diffInDays >= 4 && diffInDays <= 7) {
      return '30m'; // Rango de 4-7 días
    } else if (diffInDays >= 8 && diffInDays <= 30) {
        return '1h'; // Rango de 8-30 días
    } else if (diffInDays >= 31 && diffInDays <= 60) {
        return '2h'; // Rango de 31-60 días
    } else if (diffInDays >= 61 && diffInDays <= 90) {
        return '3h'; // Rango de 31-60 días
    } else if (diffInDays >= 91 && diffInDays <= 120) {
        return '4h'; // Rango de 91-120 días
    } else if (diffInDays >= 121 && diffInDays <= 150) {
          return '6h'; // Rango de 121-150 días
    } else if (diffInDays >= 151 && diffInDays <= 360) {
          return '12h'; // Rango de 151-360 días
    } else {
      return '1m'; // Por defecto, rango de 12 horas
    }
  }

  private dateRangeSelectedSource = new Subject<{ startDate: string, endDate: string }>();

  dateRangeSelected$ = this.dateRangeSelectedSource.asObservable();

  emitDateRangeSelected(startDate: string, endDate: string) {
    this.dateRangeSelectedSource.next({ startDate, endDate });
  }

  private updateRangeSubject: Subject<void> = new Subject<void>();
  public updateRange$ = this.updateRangeSubject.asObservable();

  emitUpdateRange(): void {
    this.updateRangeSubject.next();
    console.log('EMIT UPDATE RANGE')
  }
  //----------------------------------------------------------FIN DE FUNCIONES------------------------------------------------------------------

  getData_F2_horno1_energia(): Observable<any[]> {
    return this.http.get<any[]>('http://192.168.1.215:1880/fundicion2/horno1/energia');
  }

  getData_F2_horno2_energia(): Observable<any[]> {
    return this.http.get<any[]>('http://192.168.1.215:1880/fundicion2/horno2/energia');
  }

  getData_F2_silo_cohete(): Observable<any[]> {
    return this.http.get<any[]>('http://192.168.1.215:1880/fundicion2/silo/cohete');
  }

  getData_F2_silo_norte(): Observable<any[]> {
    return this.http.get<any[]>('http://192.168.1.215:1880/fundicion2/silo/norte');
  }

  getData_F2_silo_sur(): Observable<any[]> {
    return this.http.get<any[]>('http://192.168.1.215:1880/fundicion2/silo/sur');
  }

  getData_F2_horno2(): Observable<any[]> {
    return this.http.get<any[]>('http://192.168.1.215:1880/fundicion2/horno2/potencia');
  }

  getData_F2_TT_horno1(): Observable<any[]> {
    return this.http.get<any[]>('http://192.168.1.215:1880/fundicion2/TT/horno1');
  }

  getData_F2_TT_horno2(): Observable<any[]> {
    return this.http.get<any[]>('http://192.168.1.215:1880/fundicion2/TT/horno2');
  }
}
