define(function(){"use strict";var service=function($q,camel){this.queryCatalogTemplates=function(options){var promise=camel.get({"url":{"s":"/goku/rest/v1.5/{vdc_id}/service-templates","o":{"vdc_id":options.user.vdcId}},"params":options.params,"userId":options.user.id});return promise};this.queryCatalogs=function(options){var promise=camel.get({"url":{"s":"/goku/rest/v1.5/{vdc_id}/catalogs","o":{"vdc_id":options.user.vdcId}},"params":{},"userId":options.user.id});return promise};this.queryCatalogServices=function(options){var promise=camel.get({"url":{"s":"/goku/rest/v1.5/{vdc_id}/services?cloudInfraId={cloudInfraId}","o":{"vdc_id":options.user.vdcId,"cloudInfraId":options.cloudInfraId}},"params":{"inputSearch":options.searchString,"catalog-id":options.catalogId,"start":options.start,"limit":options.limit,"serviceType":options.type,"topService":options.topService,"fristpage":options.fristpage,"status":options.status},"userId":options.user.id});return promise};this.createService=function(options){var promise=camel.post({"url":{"s":"/goku/rest/v1.5/{vdc_id}/services","o":{"vdc_id":options.user.vdcId}},"params":JSON.stringify(options.params),"userId":options.user.id});return promise};this.saveSequence=function(options){var promise=camel.post({"url":{"s":"/goku/rest/v1.5/{vdc_id}/catalog-sequences","o":{"vdc_id":options.user.vdcId}},"params":JSON.stringify({"catalogSequences":options.catalogSequences}),"userId":options.user.id});return promise};this.modifyService=function(options){var promise=camel.put({"url":{"s":"/goku/rest/v1.5/{vdc_id}/services/{id}","o":{"vdc_id":options.user.vdcId,"id":options.serviceId}},"params":JSON.stringify(options.params),"userId":options.user.id});return promise};this.deleteServices=function(options){var promise=camel["delete"]({"url":{"s":"/goku/rest/v1.5/{vdc_id}/services/{id}","o":{"vdc_id":options.user.vdcId,"id":options.serviceId}},"userId":options.user.id});return promise};this.deleteCatalog=function(options){var promise=camel["delete"]({"url":{"s":"/goku/rest/v1.5/{vdc_id}/catalogs/{id}","o":{"vdc_id":options.user.vdcId,"id":options.catalogId}},"userId":options.user.id});return promise};this.createCatalog=function(options){var promise=camel.post({"url":{"s":"/goku/rest/v1.5/{vdc_id}/catalogs","o":{"vdc_id":options.user.vdcId}},"params":JSON.stringify({"name":options.catalog.name,"description":options.catalog.desc}),"userId":options.user.id});return promise};this.modifyCatalog=function(options){var promise=camel.put({"url":{"s":"/goku/rest/v1.5/{vdc_id}/catalogs/{id}","o":{"vdc_id":options.user.vdcId,"id":options.catalog.id}},"params":JSON.stringify({"name":options.catalog.name,"description":options.catalog.desc}),"userId":options.user.id});return promise};this.queryCatalog=function(options){var promise=camel.get({"url":{"s":"/goku/rest/v1.5/{vdc_id}/catalogs/{id}","o":{"vdc_id":options.user.vdcId,"id":options.catalogId}},"userId":options.user.id});return promise};this.refreshCatalog=function(options){var promise=camel.get({"url":{"s":"/goku/rest/v1.5/{vdc_id}/service-instances/{id}/action","o":{"vdc_id":options.user.vdcId,"id":options.catalogId}},"userId":options.user.id});return promise};this.operateServices=function(options){var promise=camel.post({"url":{"s":"/goku/rest/v1.5/{vdc_id}/services/{id}/action","o":{"vdc_id":options.user.vdcId,"id":options.serviceId}},"params":JSON.stringify({"modify":options.modify}),"userId":options.user.id});return promise};this.queryServiceInstances=function(options){var promise=camel.get({"url":{"s":"/goku/rest/v1.5/{vdc_id}/service-instances","o":{"vdc_id":options.user.vdcId}},"params":{"inputSearch":options.searchString,"status":options.status,"user_id":options.userId,"start":options.start,"groupId":options.groupId,"limit":options.limit},"userId":options.user.id});return promise};this.queryServiceOffering=function(options){var promise=camel.get({"url":{"s":"/goku/rest/v1.5/{vdc_id}/services/{id}","o":{"vdc_id":options.user.vdcId,"id":options.id}},"userId":options.user.id});return promise};this.queryServiceInstanceDetail=function(options){var promise=camel.get({"url":{"s":"/goku/rest/v1.5/{vdc_id}/service-instances/{id}","o":{"vdc_id":options.user.vdcId,"id":options.id}},"params":{"azId":options.azId,"cloudInfraId":options.user.cloudInfras[0].id,"resource_type":options.resourceType,"resource_id":options.resourceId,"resource_name":options.resourceName,"applyUserName":options.applyUserName,"vpc_id":options.vpcId},"userId":options.user.id});return promise};this.modifyServiceInstance=function(options){var promise=camel.put({"url":{"s":"/goku/rest/v1.5/{vdc_id}/service-instances/{id}","o":{"vdc_id":options.user.vdcId,"id":options.instanceId}},"params":JSON.stringify({"name":options.name}),"userId":options.user.id});return promise};this.transferServiceInstance=function(options){var promise=camel.post({"url":{"s":"/goku/rest/v1.5/{vdc_id}/service-instances/{id}/user/{targetuserid}","o":{"vdc_id":options.user.vdcId,"id":options.instanceId,"targetuserid":options.targetUserId}},"userId":options.user.id});return promise}};service.$injector=["$q","camel"];return service});