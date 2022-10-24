
# 业务组件

::: tip 简介

业务组件的相关安装与配置
:::

## 导出pdf

  项目的导出pdf使用的是经过封装处理的htmlToPdf

  ### 安装插件

  ```ts
  import html2canvas from 'html2canvas'
  import JsPDF from 'jspdf'
  ```

  ::: tip 提示
  htmlToPdf文件在子项目模板中的utils里，可以直接复制到新项目中，其次，导出的表格效果可能线条比较粗
  :::


  ### 代码引入

  ```ts
  // 引用组件
  import htmlToPdf from '@/utils/htmlToPdf'
  //导出pdf
  const getExportPDF = () => {
    let pdfName = state.form.name ? state.form.name : '导出的PDF';//---->state.form.name 为项目中的返回数据
    htmlToPdf.downloadPDF(document.querySelector("#drawerPdf"), pdfName)
  }
  const showHtml=()=>{
    //此处放置需要渲染的html内容
  }
  ```
  ### 页面引入

  ```vue
  <el-button size="mini" @click="getExportPDF" :icon="Download">导出pdf</el-button>
  <div class="printer-box" id="drawerPdf">
    <div ref="printContent">
      <div v-html="showHtml()"></div>
    </div>
  </div>
  ```



  ## 材料打包下载

  项目的材料打包下载使用的是经过封装处理的fetch

  ::: tip 提示
  因为项目中涉及到私密文件的下载，需要权限才可以，其次，axios-mapper的封装不支持blob，所以换了一种方法
  :::


  ### 安装插件

  ```ts
  //不需要安装fetch，fetch是node自带的
  ```

  ::: tip 提示
  fetchRequest.ts与headers.ts文件在子项目模板中的utils里，可以直接复制到新项目中utils里
  :::


  ### 代码引入

  ```ts
  // api里增加请求方法
  import fetchs from '@/utils/fetchRequest'
  export const reportedUploadDownloadSingle = (params: any,fileName:string|undefined) => {//--->fileName文件名
    return fetchs.fRequest(`/notice-message/reported-upload-batch-download`,  Method.POST, params, ContentType.form,fileName)
  }

  //页面ts调用
  const downLoad=()=>{
    let temp={};
    reportedUploadDownloadSingle(temp,state.detail.noticeTitle+'_下载选中的材料').catch(res=>{
      if(!res){
        ElMessage.error("选中下载的材料下载失败")
      }
    })
  }
  ```


  ## 自定义打印

  项目的自定义打印使用的是Lodop

  ::: tip 提示
  Lodop在子项目模板里已经经过了处理，只需要将utils里LodopFuncs.js复制到新项目的utils里就可以，同时需要将public里面的printer文件夹拷贝到新项目的public里
  :::


  ### 代码引入

  ```ts
  // @ts-expect-error
  import { getLodop ,needCLodop,loadCLodop}  from '@/utils/LodopFuncs.js'
  //检查是否支持Lodop
  const checkLodop=()=>{
    if(!needCLodop()){
      ElMessage.error("当前浏览器不支持Lodop打印")
    }else{
      loadCLodop();
    }
  }
  //只打印一次
  const CreateOneFormPage=(s:any) =>{
    const LODOP = getLodop()
    //样式
    // var olstyle1 = '<style>' + document.getElementById('drawerPdf')!.innerHTML + '</style>'
    // var body = olstyle1 + '<body>' + document.getElementById('drawerPdf')!.innerHTML + '</body>'
    var body ='<body>' + showHtml() + '</body>'
    let pdfName = state.form.name ? state.form.name : ''
    LODOP.PRINT_INIT(pdfName) //打印初始化
    LODOP.SET_PRINT_STYLE("FontSize",10);
    LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT",'Width:100%')
    LODOP.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW",true)
    LODOP.SET_PRINT_STYLEA(1, "Stretch", 3)
    LODOP.ADD_PRINT_HTML("10px", "20px", "100%", "100%", body) //html方式打印
    // LODOP.ADD_PRINT_HTM(intTop,intLeft,intWidth,intHeight,strHtml);//增加超文本项
    // LODOP.ADD_PRINT_TEXT(intTop,intLeft,intWidth,intHeight,strContent);//增加纯文本项
    // LODOP.ADD_PRINT_TABLE(intTop,intLeft,intWidth,intHeight,strHtml);//增加表格项
    if (s == 0) {
      LODOP.PRINT() //直接打印
    }
    if (s == 1) {
      LODOP.PREVIEW() //打印预览
    }
    if (s == 2) {
      LODOP.PRINT_SETUP() //打印维护
    }
    if (s == 3) {
      LODOP.PRINT_DESIGN() //打印设计
    }
  }
  //更多的分页打印
  const CreateMoreFormPage=(s:any)=>{
    const LODOP = getLodop()
    for (let i = 0; i < 4; i++) {//-----》4表示分页的次数，后面可以根据项目情况处理
      LODOP.NewPage();
      var body ='<body>' + showHtml() + '</body>' //此处showHtml()数据每次要拿取新的
      LODOP.SET_PRINT_STYLE("FontSize",10)
      LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT",'Width:100%')
      LODOP.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW",true)
      LODOP.SET_PRINT_STYLEA(1, "Stretch", 3)
      LODOP.ADD_PRINT_HTML("10px", "20px", "100%", "100%", body)	//html方式打印
      // LODOP.ADD_PRINT_HTM(intTop,intLeft,intWidth,intHeight,strHtml);//增加超文本项
      // LODOP.ADD_PRINT_TEXT(intTop,intLeft,intWidth,intHeight,strContent);//增加纯文本项
      // LODOP.ADD_PRINT_TABLE(intTop,intLeft,intWidth,intHeight,strHtml);//增加表格项
    }			
    if (s == 0) {
      LODOP.PRINT() //直接打印
    }
    if (s == 1) {
      LODOP.PREVIEW() //打印预览
    }
    if (s == 2) {
      LODOP.PRINT_SETUP() //打印维护
    }
    if (s == 3) {
      LODOP.PRINT_DESIGN() //打印设计
    }
  }
  const showHtml=()=>{
    //此处放置需要渲染的html内容
  }
  ```

  ### 页面引入

  ```vue
  <el-button size="mini" @click="printPreview(0)" :icon="Printer">lodop直接打印</el-button>
  <el-button size="mini" @click="CreateOneFormPage(1)" :icon="Printer">lodop打印预览</el-button>
  <el-button size="mini" @click="CreateMoreFormPage(1)" :icon="Printer">lodop多页打印预览</el-button>
  <el-button size="mini" @click="CreateOneFormPage(2)" :icon="Printer">lodop打印维护</el-button>
  <el-button size="mini"  @click="CreateOneFormPage(3)" :icon="Printer">lodop打印设计</el-button> 
  ```
