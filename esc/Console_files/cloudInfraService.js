define([],function(){"use strict";var service=function($q,camel){this.queryCloudInfras=function(option){var promise=camel.get({"url":{"s":"/goku/rest/v1.5/{vdc_id}/cloud-infras","o":{"vdc_id":option.vdcId}},"timeout":6e4,"params":{"connect-status":"connected","service-status":"normal"}});return promise};this.queryCloudInfraDetail=function(option){var promise=camel.get({"url":{"s":"/goku/rest/v1.5/{vdc_id}/cloud-infras/{id}","o":{"vdc_id":option.vdcId,"id":option.id}},"params":{}});return promise};this.getCloudInfra=function(allCloudInfra,specId){var cloudInfra={};allCloudInfra&&allCloudInfra.length>0&&_.each(allCloudInfra,function(item){String(item.id)===String(specId)&&(cloudInfra=item)});return cloudInfra};this.queryAzs=function(tenantId,userId,cloudInfraId,azName){var promise=camel.get({"url":{"s":"/goku/rest/v1.5/{vdc_id}/available-zones","o":{"vdc_id":tenantId}},"params":{"cloud-infra":cloudInfraId,"manage-status":"occupied","service-status":"normal","name":azName},"userId":userId});return promise};this.queryAzDetail=function(options){var promise=camel.get({"url":{"s":"/goku/rest/v1.5/{vdc_id}/available-zones/{id}","o":{"vdc_id":options.user.vdcId,"id":options.azId}},"params":{"cloud-infra":options.cloudInfraId},"userId":options.user.id});return promise};this.getSpecAz=function(azs,specId){var az={};azs&&azs.length>0&&_.each(azs,function(item){String(item.id)===String(specId)&&(az=item)});return az};this.queryTemplatesBySearch=function(options){var promise=camel.get({"url":{"s":"/goku/rest/v1.5/{tenant_id}/vmtemplates","o":{"tenant_id":options.user.vdcId}},"timeout":3e4,"params":options.params,"userId":options.user.id});return promise};this.queryTemplateDetail=function(options){var promise=camel.get({"url":{"s":"/goku/rest/v1.5/{vdc_id}/vmtemplates/{id}","o":{"vdc_id":options.user.vdcId,"id":options.templateId}},"params":{"cloud-infra":options.cloudInfraId},"userId":options.user.id});return promise};this.queryFlavors=function(options){var promise=camel.get({"url":{"s":"/goku/rest/v1.5/{vdc_id}/vm-flavors","o":{"vdc_id":options.user.vdcId}},"timeout":3e4,"params":{"cloud-infra":options.cloudInfraId,"azid":options.azId,"virtualEnvType":options.virtualEnvType,"hypervisorType":options.hypervisorType},"userId":options.user.id});return promise};this.querySlaTags=function(options){var promise=camel.get({"url":{"s":"/goku/rest/v1.5/{vdc_id}/available-zones/{id}/tags","o":{"vdc_id":options.user.vdcId,"id":options.azId}},"params":{"cloud-infra":options.cloudInfraId},"userId":options.user.id});return promise};this.getSelCloudInfra=function(allCloudInfra){var cloudInfra=allCloudInfra;cloudInfra&&cloudInfra.length>0&&_.each(cloudInfra,function(item,index){item.checked=0===index?!0:!1});return cloudInfra}};return service});