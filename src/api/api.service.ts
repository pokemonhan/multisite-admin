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
  public noticeDetail(data: any): any {
    return this.commonService.post('/api/user-handle/bank-card-list', data);
  }
  // 删除银行卡
  public deleteBank(data: any): any {
    return this.commonService.post('/api/user-handle/delete-bank-card', data);
  }

  // 上传图片
  public uploadPic(data: any): any {
    return this.commonService.post(this.commonService.imgURL, data);
  }
  /** ========================== 游戏管理 ======================== */
  // 彩种系列 列表
  public lotterySeriesList(data: any): any {
    return this.commonService.get('/api/lottery-series/detail', data);
  }
  // 彩种系列 添加
  public lotterySeriesAdd(data: any): any {
    return this.commonService.post('/api/lottery-series/add', data);
  }
  // 彩种系列 编辑
  public lotterySeriesEdit(data: any): any {
    return this.commonService.post('/api/lottery-series/edit', data);
  }
  // 彩种系列 删除
  public lotterySeriesDelete(data: any): any {
    return this.commonService.post('/api/lottery-series/delete', data);
  }

  // 获取充值渠道 和 充值类型
  public payment_info({data = {}}): any {
    const url = '/api/reportManagement/payment-info';
    return this.commonService.get(url, data);
  }

  // 玩家提现记录报表
  public withdraw_record({data = {}}): any {
    const url = '/api/reportManagement/withdraw-record';
    return this.commonService.post(url, data);
  }

  // 提现详细
  public show({data = {}}): any {
    const url = `/api/withdraw/show?id=${data['id']}${
      data['start_time'] !== '' ? '&start_time=' + Utils.change_date_string(data['start_time']) : ''}${
        data['end_time'] !== '' ? '&end_time=' + Utils.change_date_string(data['end_time']) : ''}`;
    return this.commonService.get(url);
  }

  // 提现状态切换
  public status({data = {}}): any {
    const url = '/api/withdraw/status';
    return this.commonService.post(url, data);
  }
}
