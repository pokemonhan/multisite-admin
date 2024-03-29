import { NgModule } from '@angular/core';
import { Utils } from 'config/utils.config';
import { SharedModule } from '@shared';
import { UEditorModule } from 'ngx-ueditor';
import { ManagerManagerCharacterComponent } from './manager-character/manager-character.component';
import { OperasyonRoutingModule } from './operasyon-routing.module';
import { LogOperationLogComponent } from './operation-log/operation-log.component';
import { OperasyonOperasyonSettingComponent } from './operasyon-setting/operasyon-setting.component';
import { OperasyonActivityListComponent } from './activity-list/activity-list.component';
import { PipesModule } from 'app/pipes/pipes.module';
import { OperasyonCategoryManageComponent } from './category-manage/category-manage.component';
import { OperasyonArticleManageComponent } from './article-manage/article-manage.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { OperasyonActivityTypeComponent } from './activity-type/activity-type.component';
import { OperasyonBankManageComponent } from './bank-manage/bank-manage.component';
import { OperasyonQuotaManageComponent } from './quota-manage/quota-manage.component';
import { OperasyonBannarComponent } from './bannar/bannar.component';
import { OperasyonPageModelComponent } from './page-model/page-model.component';
import { OperasyonNavOneComponent } from './nav-one/nav-one.component';
import { OperasyonNavTwoComponent } from './nav-two/nav-two.component';
import { OperasyonAnnouncementManageComponent } from './announcement-manage/announcement-manage.component';
import { OperasyonFrontendListComponent } from './frontend-list/frontend-list.component';
import { OperasyonHelperComponent } from './helper/helper.component';

const COMPONENTS = [
  ManagerManagerCharacterComponent,
  LogOperationLogComponent,
  OperasyonOperasyonSettingComponent,
  OperasyonActivityListComponent,
  OperasyonCategoryManageComponent,
  OperasyonArticleManageComponent,
  OperasyonActivityTypeComponent,
  OperasyonBankManageComponent,
  OperasyonQuotaManageComponent,
  OperasyonBannarComponent,
  OperasyonPageModelComponent,
  OperasyonNavOneComponent,
  OperasyonNavTwoComponent,
  OperasyonAnnouncementManageComponent,
  OperasyonFrontendListComponent,
  OperasyonHelperComponent];
const COMPONENTS_NOROUNT = [];

@NgModule({
  imports: [
    SharedModule,
    PipesModule,
    DragDropModule,
    OperasyonRoutingModule,
    UEditorModule.forRoot({
      js: [
        `../../../assets/ueditor/ueditor.config.js`,
        `../../../assets/ueditor/ueditor.all.js`,
      ],
      // 默认前端配置项
      options: {
        UEDITOR_HOME_URL: './assets/ueditor/',
        // serverUrl:'http://api.9170ttt.com/api/content/upload-pic'//不配置该参数，代码动态获取
      }
    })
  ],
  declarations: [
    ...COMPONENTS,
   
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class OperasyonModule { }
