export class Utils {
  static  httpIri: string;
  static  image_upload_iri_help:string='/api/sys/upload';
  static  image_upload_iri_announcement:string='/api/content/upload-pic';
  static  acl_route_list: Array<any>=[];
  static  acl_id_list: Array<any>=[];
  static  white_route: Array<any>=[
    '/personal/personal_center',
    '/operasyon/operasyon-setting',
    '/passport/login'
  ];
  static isDevelop: boolean =false;
  static  issue_format: Array<any>=[
    {
      value:'C6',
      eg:'735876'
    },
    {
      value:'C7',
      eg:'0294608'
    },
    {
      value:'Y|T3',
      eg:'2019001'
    },
    {
      value:'y|T3',
      eg:'19001'
    },
    {
      value:'ymd|N2',
      eg:'19070801'
    },
    {
      value:'ymd|N3',
      eg:'190701001'
    },
    {
      value:'ymd|N4',
      eg:'1907080001'
    },
    {
      value:'Ymd-|N2',
      eg:'2019070801'
    },
    {
      value:'Ymd|N3',
      eg:'20190708001'
    },
    {
      value:'Ymd|N4',
      eg:'201907080001'
    }
  ];
  constructor() {
    
  }
  
  /**
   *httpIri
   *
   * @static
   * @returns
   * @memberof Utils
   */
  static GethttpIri(){
      if (this.isDevelop) {
      // this.httpIri = 'http://www.lottery.com';
      this.httpIri = 'http://local.multisites.com';
    } else {
    
      this.httpIri = 'http://api.9170ttt.com';
    }
    return this.httpIri;
  }

  static get_upload_iri(type){
    if(type==='help'){
    return this.httpIri+this.image_upload_iri_help;

    }else if(type==='announcement'){
      return this.httpIri+this.image_upload_iri_announcement;
      
    }
    
  }
  static GetFreezeType(num){
    let type;
    switch(num){
      case 0:
      type='开放用户'
      break;
      case 1:
      type='禁止登录'
      break;
      case 2:
      type='禁止投注'
      break;
      case 3:
      type='禁止提现'
      break;
      case 4:
      type='禁止资金操作'
      break;
    }
  
  return type;
}

/**
 * 金额输入框验证
 */
static account_check(value,max_num?){
  //正整数，小于最大限额
  let prize=Number(value);
  prize=parseInt(String(prize));
  if(max_num&&prize>max_num){
    prize=max_num;
  }
  if(prize<=0){
    prize=null;
  }
  return prize?prize:null;
}

/**
 * 验证是否合法http链接
 */
static link_check(value){
  var reg=/http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
  var objExp=new RegExp(reg);
  if(objExp.test(value)){
    return true;
  }else{
    return false;
  }
}

/**
 *处理文本中img请求头
 *
 * @static
 * @param {*} str
 * @memberof Utils
 */
static get_img_iri(str,type){
  var imgReg = /<img.*?(?:>|\/>)/gi;
  var srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
  var arr = str.match(imgReg);  // arr 为包含所有img标签的数组
  var st=str;
  var pic_path=[];
  var pic_name=[];
  if(arr){
      for (var i = 0; i < arr.length; i++) {
    var src = arr[i].match(srcReg);
    if(type=='remove'){
      var replace_src=src[1].replace(Utils.httpIri,'')
      st=st.replace(src[1],replace_src);
      pic_path.push(replace_src);
      pic_name.push(replace_src.split('/')[replace_src.split('/').length-1]);
    }else if(type=='add'){
      st=st.replace(src[1],Utils.httpIri+src[1]);
    }
 

   }
  }
    return {
      content:st,
      pic_path:pic_path,
      pic_name:pic_name,
    }
}

  /**
   * GmT转时间格式 
   * */
  static change_date(time,type) {
    let date = new Date(time);
    let mouth = (date.getMonth() + 1) < 10 ? '0' + ((date.getMonth() + 1)) : (date.getMonth() + 1);
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
    let minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    let second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    let Str
  if(type=='date'){
     Str = date.getFullYear() + '-' + mouth + '-' + day;
  }else if(type=='time'){
     Str = date.getFullYear() + '-' + mouth + '-' + day + ' ' +hour + ':' +minute + ':' +second;
  }
   
    return Str;
  }

}
