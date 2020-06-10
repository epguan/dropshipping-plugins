webpackJsonp([1],{GHGh:function(n,e,t){var i=t("z/+d");"string"==typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);t("rjj0")("08bac906",i,!1,{})},HKPI:function(n,e,t){(n.exports=t("FZ+f")(!0)).push([n.i,'\n.time[data-v-82b7485c] {\n  font-size: 13px;\n  color: #999;\n}\n.bottom[data-v-82b7485c] {\n  margin-top: 13px;\n  line-height: 12px;\n}\n.button[data-v-82b7485c] {\n  padding: 0;\n  float: right;\n}\n.image[data-v-82b7485c] {\n  /* width: 100%; */\n  height: 100px;\n  margin:0 auto;\n  display: block;\n}\n.clearfix[data-v-82b7485c]:before,\n.clearfix[data-v-82b7485c]:after {\n    display: table;\n    content: "";\n}\n.title[data-v-82b7485c]{\n  font-size: 10px;\n  display: -webkit-box;\n  overflow: hidden;\n  -webkit-line-clamp: 2;\n  text-overflow: ellipsis;\n  display: -webkit-box;\n  -webkit-box-orient: vertical;\n}\n.price[data-v-82b7485c]{\n  color: orange;\n}\n.product-id[data-v-82b7485c]{\n  font-size: 8px;\n  color: grey;\n}\n.clearfix[data-v-82b7485c]:after {\n    clear: both\n}\n',"",{version:3,sources:["/Users/ly.cai/work/code/aftership/dropshippping-plugins/dsp-collection/src/components/src/components/Index.vue"],names:[],mappings:";AAmNA;EACA,gBAAA;EACA,YAAA;CACA;AAEA;EACA,iBAAA;EACA,kBAAA;CACA;AAEA;EACA,WAAA;EACA,aAAA;CACA;AAEA;EACA,kBAAA;EACA,cAAA;EACA,cAAA;EACA,eAAA;CACA;AAEA;;IAEA,eAAA;IACA,YAAA;CACA;AACA;EACA,gBAAA;EACA,qBAAA;EACA,iBAAA;EACA,sBAAA;EACA,wBAAA;EACA,qBAAA;EACA,6BAAA;CACA;AACA;EACA,cAAA;CACA;AACA;EACA,eAAA;EACA,YAAA;CACA;AACA;IACA,WAAA;CACA",file:"Index.vue",sourcesContent:['<template>\n  <div class="hello">\n    <el-form>\n      <el-form-item>\n        <el-input\n     v-model="api_key"\n     type="password"\n     placeholder="请输入API KEY"\n     ></el-input>\n             <el-input\n     v-model="appData.app.key"\n     placeholder="请输入店铺app key"\n     ></el-input>\n    <el-input\n     v-model="input"\n     placeholder="搜索内容"\n     type="textarea"\n     ></el-input>\n      </el-form-item>\n      <el-form-item>\n    <el-button size="small" type="primary" @click="getProductsList">商品查询</el-button>\n    <el-button size="small" @click="pushProductsList" v-loading="publishLoading">推送选中的所有商品</el-button>\n    <span v-show="pushNumberShow">推送成功数量:{{pushNumber}}</span>\n      </el-form-item>\n  </el-form>\n  <div style="width:96%; margin:0 auto">\n<el-row >\n  <el-col :span="11" v-for="(o) in productList" :key="o" style="margin-right:6px;margin-bottom:6px">\n    <el-card :body-style="{ padding: \'0px\'}">\n      <img :src="o.image_urls[0]" class="image">\n      <div style="padding: 8px;">\n        <b class="title">{{o.title}}</b>\n        <div v-for="(ov) in o.variants.slice(0,1)" ><span class="price">${{ov.price.amount}}</span> <span class="product-id">{{o.external_vendor_product_id}}</span></div>\n        <div class="bottom clearfix">\n          <b style="color: red">{{o.requestErrorMsg}} </b>\n          <b style="color: green">{{o.requestSuccess}}</b>\n          \x3c!-- <el-button type="text" class="button">操作按钮</el-button> --\x3e\n        </div>\n      </div>\n    </el-card>\n  </el-col>\n</el-row>\n  </div>\n  \n  </div>\n</template>\n\n<script>\nexport default {\n  name: \'Index\',\n  data () {\n    return {\n      productList: [],\n      api_key: this.$cookies.get(\'am-api-key\'),\n      input: \'\',\n      currentDate: new Date(),\n      pushNumber: 0,\n      pushNumberShow:false,\n      publishLoading: false,\n      appData: {\n        app: {\n          key: "landon-test-01",\n          name: "aftership",\n          platform: "shopify"\n        },\n        organization: {\n          id: "9bba1ea4d5a144049772bef6b7a1841a"\n        }\n      },\n    }\n  },\n  created: function () {\n      const self = this;\n      // self.setApiKey()\n      // self.getProductsList();\n\t\t},\n  methods: {\n    getProductsList(){\n      const self = this;\n      \n      //api-key处理\n      let headers = {};\n      if(self.api_key){\n        self.$cookies.set(\'am-api-key\', self.api_key)\n        headers[\'am-api-key\'] = self.api_key\n      }\n\n      let data = self.input.split(/[\\s\\n]/);\n      let queryStr = \'\'\n      if(data){\n        queryStr = data.join(\',\')\n      }\n\n      let params = {limit:50}\n      params.external_vendor_product_ids = queryStr\n\n\t\t\tself.$axios.get(process.env.VUE_APP_API_URL_SUPPLIER + \'/suppliers/v1/products\',{params:params,  headers:headers}).then((response) => {\n        console.log(response.data.data.products)\n          self.productList = response.data.data.products;\n      })\n\n    },\n    pushProductsList(){\n      const self = this;\n\n      self.publishLoading = true;\n      self.pushNumberShow = true;\n      self.pushNumber = 0;\n      let headers = {\n        \'am-api-key\': self.api_key, \n        // "Content-Type": "application/json",\n      };\n\n      for (let o of self.productList){\n        //处理商品价格\n        // let pushProduct = o;\n        \n        let pushProduct = _.cloneDeepWith(o)\n        \n        pushProduct = self.productsPricesHandler(pushProduct);\n        // let product_id = o.id\n\n        pushProduct.app = self.appData.app;\n        pushProduct.organization = self.appData.organization;\n\n        self.$axios.post(process.env.VUE_APP_API_URL_DROPSHIPPING +\'/dropshipping/v1/products\',pushProduct, {headers:headers}).then((response) => {\n          self.pushNumber ++\n          let product_id = response.data.data.id\n          self.publishProduct(product_id, o)\n          \n          self.$set(o,"requestSuccess", \'推送中，请稍后~\')\n        }).catch(e => {\n          console.log(e);\n          if(e.message == \'Request failed with status code 409\'){\n            // self.publishProduct(product_id)\n            this.$set(o,"requestSuccess", \'此商品曾被推送成功\')\n          }else{\n            this.$set(o,"requestSuccess", \'\')\n            this.$set(o,"requestErrorMsg", \'推送失败: \' + e.message)\n          }\n        })\n      }\n     \n    },\n    publishProduct(product_id, o){\n      const self = this;\n      let headers = {\n        \'am-api-key\': self.api_key, \n        // "Content-Type": "application/json",\n      };\n\n      let publishData = self.appData\n\n      self.$axios.post(process.env.VUE_APP_API_URL_DROPSHIPPING +\'/dropshipping/v1/products/\' + product_id + \'/publish\',publishData, {headers:headers}).then((response) => {\n        self.publishLoading = false;\n        this.$set(o,"requestSuccess", \'推送成功\')\n      }).catch(e => {\n        self.publishLoading = false;\n        console.log(\'推送失败\');\n      })\n    },\n    productsPricesHandler(product){\n      // let shipping_prices = product.shipping_prices;\n      // let variants = product.variants;\n      if(product.shipping_prices.length == 0){\n        return product\n      }\n      // let variantsMap = _.key(variants, \'id\')\n\n      let shippingPriceMap = {}\n\n      for(let shipping_price of product.shipping_prices){\n        let shipping_options = shipping_price.shipping_options\n        let external_vendor_variant_ids = shipping_price.external_vendor_variant_ids\n        \n        let shippingOptionsMap = _.keyBy(shipping_options, function(o) {\n          return o.country + \'-\'+ o.shipping_method;\n        })   //读出所有物流方式，以国家+快递类型组合，如US-USPS\n\n        //判断哪个价格低：\n        let shippingOptionRes = null;\n        if(shippingOptionsMap["USA-USPS"]){\n          shippingOptionRes = _.cloneDeep(shippingOptionsMap["USA-USPS"])\n        }else if(shippingOptionsMap["USA-4PX"]){\n          shippingOptionRes = _.cloneDeep(shippingOptionsMap["USA-4PX"])\n        }\n\n        shippingOptionRes.prices = _.keyBy(shippingOptionRes.prices, \'unit\')\n\n        //TODO： 若此处没有运费价格，应该是要返回报错的。\n        if(!shippingOptionRes){\n          return product\n        }\n\n        for(let variant_universal_id of shipping_price.variant_universal_ids){\n          shippingPriceMap[variant_universal_id] = shippingOptionRes;\n        }\n      }\n\n      for(let variant of product.variants){\n        const variantShippingPrice = shippingPriceMap[variant.universal_id]\n        variant.price.amount = _.add(variant.price.amount, variantShippingPrice.prices[1].amount);\n      }\n      return product\n    }\n  }\n}\n<\/script>\n\n\x3c!-- Add "scoped" attribute to limit CSS to this component only --\x3e\n<style scoped>\n  .time {\n    font-size: 13px;\n    color: #999;\n  }\n  \n  .bottom {\n    margin-top: 13px;\n    line-height: 12px;\n  }\n\n  .button {\n    padding: 0;\n    float: right;\n  }\n\n  .image {\n    /* width: 100%; */\n    height: 100px;\n    margin:0 auto;\n    display: block;\n  }\n\n  .clearfix:before,\n  .clearfix:after {\n      display: table;\n      content: "";\n  }\n  .title{\n    font-size: 10px;\n    display: -webkit-box;\n    overflow: hidden;\n    -webkit-line-clamp: 2;\n    text-overflow: ellipsis;\n    display: -webkit-box;\n    -webkit-box-orient: vertical;\n  }\n  .price{\n    color: orange;\n  }\n  .product-id{\n    font-size: 8px;\n    color: grey;\n  }\n  .clearfix:after {\n      clear: both\n  }\n</style>\n'],sourceRoot:""}])},NHnr:function(n,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=t("/5sW"),s=t("BO1k"),a=t.n(s),o={name:"Index",data:function(){return{productList:[],api_key:this.$cookies.get("am-api-key"),input:"",currentDate:new Date,pushNumber:0,pushNumberShow:!1,publishLoading:!1,appData:{app:{key:"landon-test-01",name:"aftership",platform:"shopify"},organization:{id:"9bba1ea4d5a144049772bef6b7a1841a"}}}},created:function(){},methods:{getProductsList:function(){var n=this,e={};n.api_key&&(n.$cookies.set("am-api-key",n.api_key),e["am-api-key"]=n.api_key);var t=n.input.split(/[\s\n]/),i="";t&&(i=t.join(","));var s={limit:50};s.external_vendor_product_ids=i,n.$axios.get("https://release-incy-platform.automizelyapi.io/suppliers/v1/products",{params:s,headers:e}).then(function(e){console.log(e.data.data.products),n.productList=e.data.data.products})},pushProductsList:function(){var n=this,e=this;e.publishLoading=!0,e.pushNumberShow=!0,e.pushNumber=0;var t={"am-api-key":e.api_key},i=function(i){var s=_.cloneDeepWith(i);(s=e.productsPricesHandler(s)).app=e.appData.app,s.organization=e.appData.organization,e.$axios.post("https://release-incy-product.automizelyapi.io/dropshipping/v1/products",s,{headers:t}).then(function(n){e.pushNumber++;var t=n.data.data.id;e.publishProduct(t,i),e.$set(i,"requestSuccess","推送中，请稍后~")}).catch(function(e){console.log(e),"Request failed with status code 409"==e.message?n.$set(i,"requestSuccess","此商品曾被推送成功"):(n.$set(i,"requestSuccess",""),n.$set(i,"requestErrorMsg","推送失败: "+e.message))})},s=!0,o=!1,r=void 0;try{for(var p,l=a()(e.productList);!(s=(p=l.next()).done);s=!0){i(p.value)}}catch(n){o=!0,r=n}finally{try{!s&&l.return&&l.return()}finally{if(o)throw r}}},publishProduct:function(n,e){var t=this,i=this,s={"am-api-key":i.api_key},a=i.appData;i.$axios.post("https://release-incy-product.automizelyapi.io/dropshipping/v1/products/"+n+"/publish",a,{headers:s}).then(function(n){i.publishLoading=!1,t.$set(e,"requestSuccess","推送成功")}).catch(function(n){i.publishLoading=!1,console.log("推送失败")})},productsPricesHandler:function(n){if(0==n.shipping_prices.length)return n;var e={},t=!0,i=!1,s=void 0;try{for(var o,r=a()(n.shipping_prices);!(t=(o=r.next()).done);t=!0){var p=o.value,l=p.shipping_options,c=(p.external_vendor_variant_ids,_.keyBy(l,function(n){return n.country+"-"+n.shipping_method})),u=null;if(c["USA-USPS"]?u=_.cloneDeep(c["USA-USPS"]):c["USA-4PX"]&&(u=_.cloneDeep(c["USA-4PX"])),u.prices=_.keyBy(u.prices,"unit"),!u)return n;var d=!0,A=!1,h=void 0;try{for(var f,v=a()(p.variant_universal_ids);!(d=(f=v.next()).done);d=!0){e[f.value]=u}}catch(n){A=!0,h=n}finally{try{!d&&v.return&&v.return()}finally{if(A)throw h}}}}catch(n){i=!0,s=n}finally{try{!t&&r.return&&r.return()}finally{if(i)throw s}}var m=!0,g=!1,y=void 0;try{for(var b,x=a()(n.variants);!(m=(b=x.next()).done);m=!0){var k=b.value,C=e[k.universal_id];k.price.amount=_.add(k.price.amount,C.prices[1].amount)}}catch(n){g=!0,y=n}finally{try{!m&&x.return&&x.return()}finally{if(g)throw y}}return n}}},r=function(){var n=this,e=n.$createElement,t=n._self._c||e;return t("div",{staticClass:"hello"},[t("el-form",[t("el-form-item",[t("el-input",{attrs:{type:"password",placeholder:"请输入API KEY"},model:{value:n.api_key,callback:function(e){n.api_key=e},expression:"api_key"}}),n._v(" "),t("el-input",{attrs:{placeholder:"请输入店铺app key"},model:{value:n.appData.app.key,callback:function(e){n.$set(n.appData.app,"key",e)},expression:"appData.app.key"}}),n._v(" "),t("el-input",{attrs:{placeholder:"搜索内容",type:"textarea"},model:{value:n.input,callback:function(e){n.input=e},expression:"input"}})],1),n._v(" "),t("el-form-item",[t("el-button",{attrs:{size:"small",type:"primary"},on:{click:n.getProductsList}},[n._v("商品查询")]),n._v(" "),t("el-button",{directives:[{name:"loading",rawName:"v-loading",value:n.publishLoading,expression:"publishLoading"}],attrs:{size:"small"},on:{click:n.pushProductsList}},[n._v("推送选中的所有商品")]),n._v(" "),t("span",{directives:[{name:"show",rawName:"v-show",value:n.pushNumberShow,expression:"pushNumberShow"}]},[n._v("推送成功数量:"+n._s(n.pushNumber))])],1)],1),n._v(" "),t("div",{staticStyle:{width:"96%",margin:"0 auto"}},[t("el-row",n._l(n.productList,function(e){return t("el-col",{key:e,staticStyle:{"margin-right":"6px","margin-bottom":"6px"},attrs:{span:11}},[t("el-card",{attrs:{"body-style":{padding:"0px"}}},[t("img",{staticClass:"image",attrs:{src:e.image_urls[0]}}),n._v(" "),t("div",{staticStyle:{padding:"8px"}},[t("b",{staticClass:"title"},[n._v(n._s(e.title))]),n._v(" "),n._l(e.variants.slice(0,1),function(i){return t("div",[t("span",{staticClass:"price"},[n._v("$"+n._s(i.price.amount))]),n._v(" "),t("span",{staticClass:"product-id"},[n._v(n._s(e.external_vendor_product_id))])])}),n._v(" "),t("div",{staticClass:"bottom clearfix"},[t("b",{staticStyle:{color:"red"}},[n._v(n._s(e.requestErrorMsg)+" ")]),n._v(" "),t("b",{staticStyle:{color:"green"}},[n._v(n._s(e.requestSuccess))])])],2)])],1)}))],1)],1)};r._withStripped=!0;var p={render:r,staticRenderFns:[]},l=p;var c=!1;var u=t("VU/8")(o,l,!1,function(n){c||t("hzkk")},"data-v-82b7485c",null);u.options.__file="src/components/Index.vue";var d={name:"App",components:{Index:u.exports}},A=function(){var n=this.$createElement,e=this._self._c||n;return e("div",{attrs:{id:"app"}},[e("Index")],1)};A._withStripped=!0;var h={render:A,staticRenderFns:[]},f=h;var v=!1;var m=t("VU/8")(d,f,!1,function(n){v||t("GHGh")},null,null);m.options.__file="src/App.vue";var g=m.exports,y=t("mtWM"),b=t.n(y),x=(t("Rf8U"),t("mw3O")),k=t.n(x),C=t("zL8q"),P=t.n(C),w=(t("tvR6"),t("ppUw")),S=t.n(w),E=t("M4fF"),L=t.n(E);i.default.config.productionTip=!1,i.default.use(P.a),i.default.use(S.a),i.default.prototype.$axios=b.a,i.default.prototype.$qs=k.a,i.default.prototype._=L.a,b.a.defaults.headers.post["Content-Type"]="application/json",b.a.defaults.withCredentials=!0,new i.default({el:"#app",render:function(n){return n(g)}})},hzkk:function(n,e,t){var i=t("HKPI");"string"==typeof i&&(i=[[n.i,i,""]]),i.locals&&(n.exports=i.locals);t("rjj0")("8daf9ff6",i,!1,{})},tvR6:function(n,e){},"z/+d":function(n,e,t){(n.exports=t("FZ+f")(!0)).push([n.i,"\n#app {\n  font-family: 'Avenir', Helvetica, Arial, sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  /* text-align: center; */\n  color: #2c3e50;\n  /* margin-top: 60px; */\n}\n","",{version:3,sources:["/Users/ly.cai/work/code/aftership/dropshippping-plugins/dsp-collection/src/src/App.vue"],names:[],mappings:";AAmBA;EACA,oDAAA;EACA,oCAAA;EACA,mCAAA;EACA,yBAAA;EACA,eAAA;EACA,uBAAA;CACA",file:"App.vue",sourcesContent:["<template>\n  <div id=\"app\">\n    \x3c!-- <img src=\"./assets/logo.png\"> --\x3e\n    <Index/>\n  </div>\n</template>\n\n<script>\nimport Index from './components/Index'\n\nexport default {\n  name: 'App',\n  components: {\n    Index\n  }\n}\n<\/script>\n\n<style>\n#app {\n  font-family: 'Avenir', Helvetica, Arial, sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n  /* text-align: center; */\n  color: #2c3e50;\n  /* margin-top: 60px; */\n}\n</style>\n"],sourceRoot:""}])}},["NHnr"]);
//# sourceMappingURL=app.4ca73951e5e5d7f49ca0.js.map