import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { MatDateRangeInput } from '@angular/material/datepicker';
import { InfluxdbService } from 'src/app/influxdb.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() dateRangeSelected: EventEmitter<{ startDate: string, endDate: string }> = new EventEmitter();

  selectedStartDate: string = '';
  selectedEndDate: string = '';

  @ViewChild('datepickerRef') datepickerRef!: MatDateRangeInput<Date>;

  constructor(private InfluxdbService: InfluxdbService) {}

  onDateRangeSelected() {
    if (this.selectedStartDate && this.selectedEndDate) {
      this.InfluxdbService.emitDateRangeSelected(this.selectedStartDate, this.selectedEndDate);
    }
  }

  onDareRangeSelectedButton(startDate:string, endDate: string): void {
    this.InfluxdbService.emitDateRangeSelected(startDate, endDate);
  }

  onUpdateRangeClick(): void {
    this.InfluxdbService.emitUpdateRange();
    this.datepickerRef._startInput._elementRef.nativeElement.value = '';
    this.datepickerRef._endInput._elementRef.nativeElement.value = '';
  }

  // @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();



  ngOnInit() { }

  // toggleSideBar() {
  //   this.toggleSideBarForMe.emit();
  // }
}
