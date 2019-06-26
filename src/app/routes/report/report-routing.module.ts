import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReportRechargeReportComponent } from './recharge-report/recharge-report.component';
import { ReportAccountReportComponent } from './account-report/account-report.component';
import { ReportUserBetsComponent } from './user-bets/user-bets.component';

const routes: Routes = [
  { path: '', redirectTo: 'recharge-report', pathMatch: 'full' },
  { path: 'recharge-report', component: ReportRechargeReportComponent },
  { path: 'account-report', component: ReportAccountReportComponent },
  { path: 'user-bets', component: ReportUserBetsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
