define([],function(){"use strict";var service=function($q,camel){this.getInstanceNum=function(options){var reqParam,promise;options=options||{};reqParam={"url":{"s":window.appWebPath+"/rest/{serviceId}/v1.0/{tenantId}/instances","o":{"serviceId":options.serviceId,"tenantId":options.tenantId}},"timeout":1e4};options.params&&(reqParam.params=options.params);promise=camel.get(reqParam);return promise};this.getOracleDbNum=function(options){var reqParam,promise;options=options||{};reqParam={"url":{"s":window.appWebPath+"/rest/oracle/v1.0/{tenantId}/dbinstances","o":{"serviceId":options.serviceId,"tenantId":options.tenantId}},"timeout":1e4};options.params&&(reqParam.params=options.params);promise=camel.get(reqParam);return promise};this.getOraclePdbNum=function(options){var reqParam,promise;options=options||{};reqParam={"url":{"s":window.appWebPath+"/rest/oracle/v1.0/{tenantId}/pdbinstances","o":{"serviceId":options.serviceId,"tenantId":options.tenantId}},"timeout":1e4};options.params&&(reqParam.params=options.params);promise=camel.get(reqParam);return promise};this.getQuotaList=function(options){options=options||{};var promise=camel.get({"url":{"s":window.appWebPath+"/rest/goku/rest/v2.0/vdcs/{vdc_id}/regions","o":{"vdc_id":options.vdcId}},"timeout":1e4});return promise};this.queryOrders=function(options){var promise=camel.get({"url":{"s":window.appWebPath+"/rest/goku/rest/v2.0/orders","o":{"vdc_id":options.vdcId}},"params":options.params});return promise};this.queryProducts=function(options){var params={"status":options.status,"cloudInfraId":options.cloudInfraId,"start":options.start||0,"limit":options.limit||0,"productType":options.type,"inputSearch":options.inputSearch};"isHana"in options&&(params.isHana=options.isHana);return camel.get({"url":{"s":window.appWebPath+"/rest/goku/rest/v2.0/{vdc_id}/products","o":{"vdc_id":options.vdcId}},"params":params,"userId":options.userId})};this.queryQuotaIndicators=function(){return camel.get({"url":{"s":window.appWebPath+"/rest/goku/rest/v2.0/quota-indicators"}})}};service.$injector=["$q","camel"];return service});