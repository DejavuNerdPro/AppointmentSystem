import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Schedule } from "../models/schedule";
import { Department } from "../models/department";
import { Team } from "../models/team";
import { Member } from "../models/member";
// import { File } from "../models/file";
import { file } from "googleapis/build/src/apis/file";
import { InterSchedule } from "models/interSchedule";
import * as moment from 'moment';

@Injectable({
  providedIn: "root",
})
export class ScheduleService {
  private baseUrl = "http://localhost:8081";
  constructor(private httpClient: HttpClient) {}

  addSchedule(schedule: Schedule): Observable<Object> {
    return this.httpClient.post(`${this.baseUrl}/schedule`, schedule);
  }

  //  work - file and title
  addFile(file: File[], schTitle: String): Observable<Object> {
    const data: FormData = new FormData();
    // data.append("file", file);   //1 file
    Array.from(file).forEach((file) => {
      data.append("file", file);
    });
    data.append("title", JSON.stringify(schTitle));
    const headers = new HttpHeaders();
    headers.append("Content-Type", `multipart/form-data`);

    return this.httpClient.post(`${this.baseUrl}/file/up`, data, {
      headers,
    });
  }

  //attendees
  getDepartmentList(): Observable<Department[]> {
    return this.httpClient.get<Department[]>(
      `${this.baseUrl}/department/alldep`
    );
  }

  getTeamList(): Observable<Team[]> {
    return this.httpClient.get<Team[]>(`${this.baseUrl}/team/allTeam`);
  }

  getMemberList(): Observable<Member[]> {
    return this.httpClient.get<Member[]>(`${this.baseUrl}/user/allUser`);
  }

  getUserList(): Observable<Member[]> {
    return this.httpClient.get<Member[]>(`${this.baseUrl}/user/getUsers`);
  }
  getScheduleList(): Observable<Schedule[]> {
    return this.httpClient.get<Schedule[]>(`${this.baseUrl}/user/getMembers`);
  }

  // for Daily Report 
  ReportMethod(userId:any):any{
    // let currentDate = new Date().toJSON().slice(0,10);
    const start=moment().format('YYYY-MM-DD');
    console.log("current date" , start);
    const httpOptions = {
      // responseType: 'arraybuffer'as 'json'
      responseType: 'blob' as 'json'
    };
    return this.httpClient.get(`${this.baseUrl}/schedule/dailyReport?userId=${userId}&start=${start}`
    );
  }
}
  
