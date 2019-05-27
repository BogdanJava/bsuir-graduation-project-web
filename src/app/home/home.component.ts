import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Chart} from 'chart.js';
import {TimeRequestService} from '../time-request.service';
import {WorktimeRequestService} from '../worktime.service';
import {zip} from 'rxjs';
import {RequestStatus, RequestType} from '../model/TimeRequest';
import {setTime} from '../model/DateUtils';
import {merge} from 'rxjs/internal/observable/merge';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentDate: DateWrapper = new DateWrapper();
  @ViewChild('processedRequestsCanvas')
  processedRequestsCanvas: ElementRef<HTMLCanvasElement>;
  @ViewChild('timeRequestTypesCanvas')
  timeRequestTypesCanvas: ElementRef<HTMLCanvasElement>;
  processedRequestsChart: Chart;
  timeRequestTypesChart: Chart;

  constructor(private timeRequestService: TimeRequestService,
              private worktimeRequestService: WorktimeRequestService) {
  }

  ngOnInit() {
    this.loadRequests();
    setInterval(() => {
      this.updateClock();
    }, 500);
  }

  private updateClock() {
    this.currentDate.date = new Date();
  }

  private loadRequests() {
    const today = new Date();
    const mongoAgoDate = new Date();
    mongoAgoDate.setMonth(mongoAgoDate.getMonth() - 1);
    const filter = {
      updated: {
        operator: 'AND',
        value: [
          {operator: 'GTE', value: setTime(mongoAgoDate, 'min'), type: 'DATE'},
          {operator: 'LTE', value: setTime(today, 'max'), type: 'DATE'}
        ]
      },
      status: {operator: 'EQ', value: 'PENDING', not: true}
    };
    const projection = ['status', 'type'];
    const timeRequestsObservable = this.timeRequestService.getByFilter(filter, projection, 0, 1000);
    const worktimeRequestsObservable = this.worktimeRequestService.getByFilter(filter, null, 0, 1000);
    // todo move all calculations to server side
    zip(timeRequestsObservable, worktimeRequestsObservable).subscribe((resultArrays) => {
      let counters = this.getApprovedDeclinedCounts(resultArrays);
      let approvedCount = counters[0];
      let declinedCount = counters[1];
      if (approvedCount != 0 || declinedCount != 0) {
        this.drawRequestsNumberChart(approvedCount, declinedCount);
      }
    });
    const activeProcessedFilter = {
      status: {operator: 'EQ', value: 'APPROVED'},
      startDate: {operator: 'LTE', value: today, type: 'DATE'},
      endDate: {operator: 'GTE', value: today, type: 'DATE'},
    };
    const activeRequestsObservable = this.timeRequestService.getByFilter(activeProcessedFilter, projection, 0, 1000);
    activeRequestsObservable.subscribe(timeRequests => {
      const businessLeaveCount = timeRequests.filter(r => r.type == RequestType.BUSINESS_LEAVE).length;
      const unpaidCount = timeRequests.filter(r => r.type == RequestType.UNPAID).length;
      const illnessCount = timeRequests.filter(r => r.type == RequestType.ILLNESS).length;
      const timeShiftCount = timeRequests.filter(r => r.type == RequestType.TIME_SHIFT).length;
      const vacationLeaveCount = timeRequests.filter(r => r.type == RequestType.VACATION).length;
      this.timeRequestTypesChart = new Chart(this.timeRequestTypesCanvas.nativeElement.getContext('2d'), {
        type: 'polarArea',
        data: {
          labels: ['Business leave', 'Unpaid', 'Illness', 'Time shift', 'Vacation'],
          datasets: [
            {
              label: 'Time requests',
              data: [businessLeaveCount, unpaidCount, illnessCount, timeShiftCount, vacationLeaveCount],
              backgroundColor: ['rgba(41,86,190,0.71)', 'rgba(199,199,199,0.71)', 'rgba(199,81,62,0.71)',
                'rgba(81,190,90,0.71)', 'rgba(199,111,16,0.71)']
            }
          ]
        }
      });
    });
  }

  private drawRequestsNumberChart(approvedCount, declinedCount) {
    this.processedRequestsChart = new Chart(this.processedRequestsCanvas.nativeElement.getContext('2d'), {
      type: 'pie',
      data: {
        labels: ['approved', 'declined'],
        datasets: [
          {
            label: 'Kek',
            data: [approvedCount, declinedCount],
            backgroundColor: ['rgba(81,190,90,0.71)', 'rgba(199,199,199,0.71)']
          }
        ]
      }
    });
  }

  private getApprovedDeclinedCounts(resultArrays) {
    let approvedCount = 0;
    let declinedCount = 0;
    for (let requests of resultArrays) {
      for (let request of requests) {
        if (request.status === RequestStatus.Approved) {
          approvedCount++;
        }
        if (request.status === RequestStatus.Declined) {
          declinedCount++;
        }
      }
    }
    return [approvedCount, declinedCount];
  }
}

class DateWrapper {
  date: Date;

  constructor() {
    this.date = new Date();
  }
}
