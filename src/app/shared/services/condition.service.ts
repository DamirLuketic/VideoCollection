import { Injectable } from '@angular/core';
import {Condition} from "../class/condition";
import {RootService} from "./root.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class ConditionService {

  public conditionsList: Array<Condition> = null;

  constructor(
      private root: RootService,
      private http: HttpClient
  ) { }

  getConditionsList() {
    return this.http.get(this.root.apiRoute + 'condition');
  }

}
