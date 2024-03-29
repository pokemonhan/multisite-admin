import { SettingsService, _HttpClient, preloaderFinished } from '@delon/theme';
import { Component, OnDestroy, Inject, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
// import { ToolService } from '../../../../tool/tool.service';
import {
  SocialService,
  SocialOpenType,
  ITokenService,
  DA_SERVICE_TOKEN,
} from '@delon/auth';
import { ReuseTabService } from '@delon/abc';
import { environment } from '@env/environment';
import { StartupService } from '@core';
import { LoginService } from 'app/service/login.service';
preloaderFinished();
@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [SocialService],
})
export class UserLoginComponent implements OnDestroy {
  public form: FormGroup;
  public is_login_spinning = false;
  public error = '';


  constructor(
    // public utils: ToolService,
    public loginService: LoginService,
    fb: FormBuilder,
    modalSrv: NzModalService,
    private router: Router,
    private settingsService: SettingsService,
    private socialService: SocialService,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private startupSrv: StartupService,
    public http: _HttpClient,
    public msg: NzMessageService,
  ) {
    this.form = fb.group({
      userName: [null, [Validators.required, Validators.minLength(4)]],
      password: [null, Validators.required],
      mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
      captcha: [null, [Validators.required]],
      remember: [true],
    });
    modalSrv.closeAll();
  }

  // #region fields

  get userName() {
    return this.form.controls.userName;
  }
  get password() {
    return this.form.controls.password;
  }
  get mobile() {
    return this.form.controls.mobile;
  }
  get captcha() {
    return this.form.controls.captcha;
  }






  // #endregion

  submit() {
    this.error = '';

    this.userName.markAsDirty();
    this.userName.updateValueAndValidity();
    this.password.markAsDirty();
    this.password.updateValueAndValidity();
    if (this.userName.invalid || this.password.invalid) return;
    this.is_login_spinning = true;
    setTimeout(() => {
      if (this.is_login_spinning) {
        this.is_login_spinning = false;
        this.error = '登录超时';
      }
    }, 60000)

    // 默认配置中对所有HTTP请求都会强制 [校验](https://ng-alain.com/auth/getting-started) 用户 Token
    // 然一般来说登录请求不需要校验，因此可以在请求URL加上：`/login?_allow_anonymous=true` 表示不触发用户 Token 校验
    this.loginService
      .login({
        email: this.userName.value,
        password: this.password.value,
      })
      .subscribe((res: any) => {
        if (res.success) {
          this.is_login_spinning = false;
          // 清空路由复用信息
          this.reuseTabService.clear();
          // 设置用户Token信息
          // this.utils.storage.set('tokens', res.data.access_token);
          this.tokenService.set({
            token: res.data.access_token,
            name: this.userName.value,
            email: this.userName.value,
            time: +new Date(),
          });
          window.localStorage['token'] = res.data.access_token;
          // 重新获取 StartupService 内容，我们始终认为应用信息一般都会受当前用户授权范围而影响
          this.startupSrv.load().then(() => {
            let url = this.tokenService.referrer.url || '/';
            if (url.includes('/passport')) url = '/';
            // this.router.navigateByUrl(url);
            this.router.navigateByUrl('/operasyon/manager-character');
          });
        } else {
          this.error = res.message;
          this.is_login_spinning = false;
          return;
        }
      });
  }
  // #endregion

  ngOnDestroy(): void {

  }


}
