define(["language/common","language/serviceName","app/business/common/configures/commonConfig"],function(commonI18n,serviceName,CommonConfig){"use strict";var service=function(scException,$q,camel,commonService,$state,$http,mask){function stringToJson(params){var serviceInstaceQuota=htmlDecode.done(params);try{serviceInstaceQuota=JSON.parse(serviceInstaceQuota)}catch(e){}return"number"==typeof serviceInstaceQuota?params:serviceInstaceQuota}function queryServiceInstanceDetail(options){var promise=camel.get({"url":{"s":window.appWebPath+"/rest/goku/rest/v1.5/{tenant_id}/service-instances/{id}","o":{"tenant_id":options.user.vdcId,"id":options.id}}});return promise}function getApplyOrder(orders){var applyOrders=[];_.each(orders,function(item){"apply"===item.type&&applyOrders.push(item)});applyOrders.sort(function(a,b){return a.submitTime>b.submitTime?-1:1});return applyOrders&&applyOrders[0]}function isView(action){return"view"===action?!0:!1}function isApproval(action){return"approval"===action?!0:!1}var getAttrByPath,getImageByCloudType,i18n=_.extend(commonI18n,serviceName),i18nSubRegRex=/\{\s*([^\|\}]+?)\s*(?:\|([^\}]*))?\s*\}/g,i18nReplace=function(s,o){if(!s||!o)return;return s.replace?s.replace(i18nSubRegRex,function(match,key){return angular.isUndefined(o[key])?match:o[key]}):s},commonConfig=new CommonConfig,resource_type_map=this.resource_type_map=commonConfig.resource_type_map,orderActionView=this.orderActionView=commonConfig.orderActionView,resource_status_map=(this.statusViewStr=commonConfig.statusViewStr,this.resource_status_map=commonConfig.resource_status_map),resourceTypeView=(this.typeViewStr=commonConfig.typeViewStr,this.resourceTypeView=commonConfig.resourceTypeView);this.queryServiceList=function(options){var promise=camel.get({"url":{"s":window.appWebPath+"/rest/goku/rest/v1.5/{tenant_id}/services?cloudInfraId={cloudInfraId}","o":{"tenant_id":options.vdcId,"cloudInfraId":options.cloudInfraId}},"params":{"inputSearch":options.inputSearch,"catalog-id":options.catalogId,"start":options.start,"limit":options.limit,"serviceType":options.type}});return promise};this.queryCatalogServices=function(options){var promise=camel.get({"url":{"s":window.appWebPath+"/rest/goku/rest/v1.5/{vdc_id}/services","o":{"vdc_id":options.user.vdcId}},"params":{"inputSearch":options.searchString,"catalog-id":options.catalogId,"start":options.start,"limit":options.limit,"serviceType":options.type,"topService":options.topService,"fristpage":options.fristpage,"status":options.status},"userId":options.user.id});return promise};this.queryApprovals=function(options){var promise=camel.get({"url":{"s":window.appWebPath+"/rest/goku/rest/v2.0/orders"},"params":options.params,"autoRequest":options.autoRequestFlag});return promise};this.queryOrders=function(options){var promise=camel.get({"url":{"s":window.appWebPath+"/rest/goku/rest/v2.0/orders"},"params":options.params,"autoRequest":options.autoRequestFlag});return promise};this.queryServiceDetail=function(options){var promise=camel.get({"url":{"s":window.appWebPath+"/rest/goku/rest/v1.5/{vdc_id}/services/{id}","o":{"vdc_id":options.user.vdcId,"id":options.id}},"userId":options.user.id});return promise};this.queryOrder=function(options){var promise=camel.get({"url":{"s":window.appWebPath+"/rest/goku/rest/v2.0/orders/{order_id}","o":{"order_id":options.orderId}},"mask":!0});return promise};this.modifyOrder=function(options){var promise=camel.put({"url":{"s":window.appWebPath+"/rest/goku/rest/v2.0/orders/{order_id}","o":{"order_id":options.orderId}},"mask":!0,"params":options.params});return promise};this.resubmitOrder=function(options){return camel.put({"url":{"s":window.appWebPath+"/rest/goku/rest/v2.0/orders"},"params":options.params,"mask":!0})};this.createOrder=function(options){var promise=camel.post({"url":{"s":window.appWebPath+"/rest/goku/rest/v2.0/orders"},"params":JSON.stringify(options.params),"mask":!0});return promise};this.saveToServiceList=function(options){var promise=camel.post({"url":{"s":window.appWebPath+"/rest/goku/rest/v2.0/provisional-orders"},"params":options.params,"mask":!0});return promise};this.modifySaveOrder=function(options){return camel.put({"url":{"s":window.appWebPath+"/rest/goku/rest/v2.0/provisional-orders"},"params":options.params,"mask":!0})};this.adminActionOrder=function(options){var promise=camel.post({"url":{"s":window.appWebPath+"/rest/goku/rest/v2.0/orders-approval"},"params":options.params,"mask":!0});return promise};this.userActionOrder=function(options){var promise=camel.post({"url":{"s":window.appWebPath+"/rest/goku/rest/v2.0/orders/{orderId}/user-action","o":{"orderId":options.orderId}},"params":JSON.stringify(options.params),"mask":!0});return promise};this.processMultiLevelAppro=function(scope,orderAproverinfos,userId){if("approval"===scope.action){var approvers=orderAproverinfos||[];_.each(approvers,function(item){if(userId===item.serviceApprovalUsrId&&"0"===item.isEdit){scope.action="view";scope.multiLevelAppro=!0}})}};this.approvalOptions=[[{"key":"approve","text":i18n.common_term_agree_button,"checked":!0},{"key":"return","text":i18n.common_term_rejectModify_button},{"key":"reject","text":i18n.common_term_refuseClose_button}]];this.approvalExceptionOptions=[[{"key":"approve","text":i18n.common_term_agree_button,"disable":!0},{"key":"return","text":i18n.common_term_rejectModify_button,"disable":!0},{"key":"reject","text":i18n.common_term_refuseClose_button,"checked":!0}]];this.processOrderDetail=function(orderInfo){var approvers,lang=($("html").scope()||{},"zh-cn"===window.urlParams.lang?"zh":"en");_.each(orderInfo.history,function(item){var typeComments,comments,data,obj,i,exc;item.comments="submit"===item.action||"approved"===item.action||"rejected"===item.action||"returned"===item.action?htmlDecode.done(item.comments):stringToJson(item.comments);item.time=commonService.utc2Local(item.time);item.actionView=orderActionView[item.action];if("order_partial_succeed"==item.action){if(!item.comments)return;typeComments=[];comments="";for(data in item.comments){obj={"1":resource_type_map[data.toLowerCase()]||"","2":item.comments[data]&&item.comments[data].SUCCESS||"0","3":item.comments[data]&&item.comments[data].FAILED||"0"};typeComments.push(obj)}for(i=0;i<typeComments.length;i++)comments+=i18nReplace(i18n.common_term_succeedORfaile_value,typeComments[i]);item.comments=comments}"extend"===item.action&&(item.comments=item.comments?i18n.common_term_Extendedto_value+commonService.utc2Local(item.comments):i18n.common_term_Extendedto_value+i18n.common_term_neverExpires_label);item.errorCode&&(exc=scException.getException(item.errorCode))?item.reason=htmlDecode.done(exc.cause):"zh"===lang&&item.zhMessage?item.reason=htmlDecode.done(item.zhMessage):"en"===lang&&item.enMessage&&(item.reason=htmlDecode.done(item.enMessage))});approvers="";_.each(orderInfo.orderAproverinfos,function(item){item.serviceApprovalUsrName&&(approvers+=item.serviceApprovalUsrName+";")});orderInfo.approvers=approvers.substr(0,approvers.lastIndexOf(";"))};this.processResourceList=function(resources){_.each(resources,function(item){var exc,detail;item.resourceTypeView=item.resource_type&&resource_type_map[item.resource_type.toLowerCase()];item.statusView=item.status&&resource_status_map[item.status.toLowerCase()];detail=htmlDecode.done(item.error_code&&(exc=scException.getException(item.error_code))?exc.cause:item.error_detail);item.errorDetail=detail});return resources};this.getResourceListTable=function(){return{"id":"resourceListTableId"+(new Date).getTime(),"columns":[{"sTitle":i18n.common_term_serviceInstanceID_label,"mData":function(data){return $.encoder.encodeForHTML(data.resource_id)}},{"sTitle":i18n.common_term_serviceInstanceName_label,"mData":function(data){return $.encoder.encodeForHTML(data.resource_name)}},{"sTitle":i18n.common_term_serviceInstanceType_label,"mData":function(data){return $.encoder.encodeForHTML(data.resourceTypeView)}}],"data":[]}};this.queryTotalCost=function(options){var promise=camel.post({"url":{"s":window.appWebPath+"/rest/goku/rest/v1.5/{vdc_id}/meter-resource/list","o":{"vdc_id":options.vdcId}},"params":JSON.stringify({"resourceType":options.resourceType})});return promise};this.jump2ResourcePage=function(resourceUrl,resourceId,resourceName,cloudInfraId,vpcId){if(resourceUrl){var params={"id":resourceId,"diskId":resourceId,"condition":resourceName,"vmName":resourceName,"vmId":resourceId,"cloudInfraId":cloudInfraId,"vpcId":vpcId,"vlbName":resourceName,"vlbId":resourceId};params[resourceUrl.replace(/\./g,"_")]="ecs.storage.disk"===resourceUrl||"ecs.ironic"===resourceUrl?resourceName:resourceId;$state.go(resourceUrl,params)}};this.queryVdcDetail=function(options){var promise=camel.get({"url":{"s":window.appWebPath+"/rest/goku/rest/v1.5/vdcs/{id}","o":{"id":options.vdcId}},"params":{},"timeout":6e4,"userId":options.userId});return promise};this.dealUrl=function(url){switch(url){case"ecs.vm":return"ecs.manager.vmList";case"ecs.storage.disk":return"storage.manager.volumeList";case"ssp.approvalVmApply":case"ssp.approvalVmHuaweiHostApply":case"ssp.approvalCloudHostApply":return"ecs.approvalVm";case"ssp.approvalAppApply":case"ssp.approvalAppICTApply":return"vapp.approvalApp";case"ssp.applyVm":case"ssp.applyVM.navigate":case"ssp.applyVmCoreHost":case"ssp.applyCloudHost":case"ssp.applyVmHuaweiHost":return"ecs.applyVm";case"ssp.applyApp":return"vapp.applyApp";case"ssp.applyDisk":return"storage.applyVolume";case"ssp.applyAS":return"as.createAsGroup";case"ssp.approvalDiskApply":return"storage.approvalVolume";case"ssp.changeDisk":return"storage.changeVolume";case"ssp.approvalDiskChange":return"storage.approvalVolumeChange";case"ssp.changeVm":return"ecs.changeVm";case"ssp.applyImage":return"ims.applyIms";case"ssp.approvalASApply":return"as.approvalASCreate";case"ssp.approvalImageApply":return"ims.approvalIms";default:return url}};this.extendInstance=function(user,instanceId){var state=$("html").injector().get("$state"),instanceOptions={"id":instanceId,"user":user},orderOptions={"user":user,"params":{"service-instance-id":instanceId}},instanceDeferred=queryServiceInstanceDetail(instanceOptions),orderDeferred=queryOrders(orderOptions);$q.all([instanceDeferred,orderDeferred]).then(function(dataList){var instanceDetail=dataList[0],order=getApplyOrder(dataList[1].orders),winParam={"needRefresh":!1,"instanceId":instanceId,"order":order,"expireTime":"0"===instanceDetail.expireTime?i18n.common_term_neverExpires_label:commonService.utc2Local(instanceDetail.expireTime)},options={"winId":"sspExtendInstanceWinId","winParam":winParam,"title":i18n.common_term_delay_label,"width":"480px","height":"360px","content-type":"url","maximizable":!1,"minimizable":!1,"content":"src/app/business/common/views/extendInstance.html","buttons":null,"close":function(){var options,msg;if(winParam.needRefresh&&winParam.orderId){options={"type":"confirm","content":i18n.common_term_createdApplycation_msg,"height":"150px","width":"350px","buttons":[{"label":i18n.common_term_ok_button,"default":!0,"focused":!0,"majorBtn":!0,"handler":function(){state.go("userCenter.manager.myApply",{},{"reload":!0});msg.destroy()}},{"label":i18n.common_term_cancle_button,"default":!1,"focused":!1,"handler":function(){msg.destroy()}}]};msg=new tinyWidget.Message(options);msg.show()}}},win=new tinyWidget.Window(options);win.show()})};this.dealServiceInstanceDetail=function(user,data){if(!data||!data.id)return;_.each(data.resources,function(item){item.resourceTypeView=resourceTypeView[item.resourceType]});return data};this.queryServiceInstanceDetail=queryServiceInstanceDetail;getAttrByPath=this.getAttrByPath=function(obj,path){if(!obj||!path)return"";var index=path.indexOf(".");return 0>index?obj[path]:getAttrByPath(obj[path.substr(0,index)],path.substr(index+1))};this.updateSelectedValues=function(values,selected){var sel,selArr;if("string"==typeof selected){_.each(values,function(val){val.checked=!1;val.selectId==selected&&(sel=val)});if(!sel&&values.length){sel=values[0];sel.checked=!0}else sel&&(sel.checked=!0);return sel}if("object"==typeof selected&&void 0!==selected.length){selArr=[];_.each(values,function(val){val.checked=!1;_.find(selected,function(item){return val.selectId==item})&&(val.checked=!0)&&selArr.push(val)});return _.each(selArr,function(item){item.checked=!0})}return""};this.queryIcons=function(options){var defer=$q.defer(),promise=camel.get({"url":{"s":window.appWebPath+"/rest/goku/rest/v2.0/admin/service-icons","o":{"vdc_id":options.vdcId}},"params":options.params,"userId":options.userId});promise.then(function(data){_.each(data,function(item){item.imageUrl=window.appWebPath+item.imageUrl+"?"+asmCrypto.crypto(!0)});defer.resolve(data)},function(){defer.reject()});return defer.promise};this.deleteIcon=function(options){var promise=camel.deleter({"url":{"s":window.appWebPath+"/rest/goku/rest/v2.0/admin/service-icon/{icon_id}?"+asmCrypto.crypto(!0),"o":{"vdc_id":options.vdcId,"icon_id":options.iconId}},"mask":!0});return promise};this.queryCatalogs=function(options){var promise=camel.get({"mask":!0,"url":{"s":window.appWebPath+"/rest/goku/rest/v2.0/vdcs/{vdc_id}/catalogs","o":{"vdc_id":options.vdcId}},"params":options.params});return promise};getImageByCloudType=this.getImageByCloudType=function(type){var cloud_type,imagesUrl,typeMatch={"aws":["aws","AWS"],"toc":["toc","TOC"],"otc":["otc","OTC"],"hec":["hec","HPC"],"ctc":["ctc","eCloud"],"fs_cloud":["fs_cloud","DC2"],"private_cloud":["private_cloud","localcloud"],"fe":["FE"]};_.each(typeMatch,function(values,key){_.contains(values,type)&&(cloud_type=key)});imagesUrl=commonConfig.azTypeImageMap;return imagesUrl[cloud_type]||""};this.convertOrderRouter=function(serviceType,orderType,param,order){var map,stateParam={"action":param.action,"from":param.from,"applyUserNoExist":param.applyUserNoExist,"serviceId":order.serviceOffingId,"orderId":order.orderId,"instanceId":order.serviceInstanceId};if("rds"!==serviceType.toLowerCase()){if(!isView(param.action)&&!isApproval(param.action)){"modify"===orderType?$state.go(serviceType+".modify",stateParam):$state.go(serviceType+".apply",stateParam);return}map={"modify":serviceType+".approvalModify","release":"ssp.approvalReleaseInstance","apply":serviceType+".approvalOrder","extend":"userCenter.approvalOrder"};$state.go(map[orderType],stateParam)}else{mask.show();$http({"url":"/console/rest/goku/rest/v2.0/orders/"+order.orderId,"method":"get"}).success(function(data){var map,definationParams=JSON.parse(htmlDecode.done(data.definationParams)),params=JSON.parse(htmlDecode.done(data.params));mask.hide();if(isView(param.action)||isApproval(param.action)||!params.instance.replicaOf)if("apply"===orderType&&params.instance.replicaOf)$state.go("rds.approvalReadReplicaOrder",stateParam);else{if(!isView(param.action)&&!isApproval(param.action)){$state.go(serviceType+".apply",stateParam);return}map={"modify":serviceType+".approvalModify","release":"ssp.approvalReleaseInstance","apply":serviceType+".approvalOrder","extend":"userCenter.approvalOrder"};$state.go(map[orderType],stateParam)}else{_.extend(stateParam,{"resourceId":params.instance.replicaOf,"rdsType":definationParams.datastore.type,"rdsVersion":definationParams.datastore.version});$state.go("rds.createReadReplica",stateParam)}})}};this.convertVolumeType=function(type){return commonConfig.volumeTypeMap[type]||type||""};this.getImageByAzId=function(azId,regionId,regions){var region,az;if(!azId||!regionId||!regions)return"";region=_.find(regions,function(item){return item.region_id===regionId});if(!region)return"";az=_.find(region.available_zones,function(item){return item.available_zone===azId});if(!az)return"";return getImageByCloudType(az.cloud_type)}};return service});