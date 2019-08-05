import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Utils } from 'config/utils.config';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { CommonService } from 'app/service/common.service';

import { ToolService } from '../tool/tool.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public serviceHttpIri: string;
  public pageSize: any = 15;


  constructor(
    public utils: ToolService,
    public commonService: CommonService
  ) {
    this.serviceHttpIri = Utils.GethttpIri();
  }
  // 过滤JSON数据重复
  // JSON {}
  // data 被赋值数据 =号左边   sub 赋值数据 =号右边
  // this.addData.data = res.data.model;
  public filterData(data, sub) {
    for (const k of Object.keys(data)) {
      data[k] = sub[k];
    }
    return data;
  }
  /** ========================== 玩家管理 ======================== */

  // 银行卡查询
  public noticeDetail(data: any): any{
    return this.commonService.post('/api/user-handle/bank-card-list', data)
  }



  // 上传图片
  public uploadPic(data: any): any{
    return this.commonService.post(this.commonService.imgURL, data)
  }
}