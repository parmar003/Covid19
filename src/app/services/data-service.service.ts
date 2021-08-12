import { HttpClient } from '@angular/common/http';
import { CssSelector } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GlobalDataSummary } from '../modals/global-data';

@Injectable({
  providedIn: 'root',
})
export class DataServiceService {
  private globalDataUrl =
    'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/01-01-2021.csv';
  constructor(private http: HttpClient) {}

  getGlobalData() {
    return this.http.get(this.globalDataUrl, { responseType: 'text' }).pipe(
      map((result) => {
        let data: GlobalDataSummary[]=[];
        let raw={};
        let rows = result.split('\n');
        rows.splice(0,1);
        rows.forEach((row) => {
          let cols = row.split(/,(?=\S)/);
          let cs =({
            country:cols[3],
            confirmed:+cols[7],
            death:+cols[8],
            recovered:+cols[9],
            active:+cols[10]
          });
        });
       /* let temp=raw[cs.country];
        if(temp){
          
        }
        raw[cs.country]=cs;
        return [];*/
      })
    );
  }
}
