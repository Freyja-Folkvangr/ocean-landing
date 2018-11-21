define(["language-remote/framework","app-remote/framework/localization/config","app-remote/framework/configures/servicesConfig"],function(i18n,localization,servicesConfig){"use strict";var ctrl=function($rootScope,$state,$stateParams,mask,storage){function showBrowserTips(){var messageTemplate=$('<div id="frame-os-check">                                                                                             <span class="frame-os-check-hint-display common-font-size-big1">                                                                           <span class="frame-os-check-tips-icon hwsicon-frame-image-tip"></span>                                                 <span class="frame-os-check-tips" ng-bind="i18n.console_term_tipInfo_label"></span>     <span class="frame-os-check-link-info">                                                                                 <a ng-if="i18n.console_term_learnMore_link" ng-href="{{i18n.console_term_learnMore_link}}"                class="learn-more-link-info" ng-bind="i18n.console_term_learnMore_label" target="_blank">    </a>                                                                                                          </span>                                                                                                       <a class="frame-os-check-close-icon hwsicon-frame-image-close" ng-click="tipInfoClose()">                                    </a>                                                                                                          </span>                                                                                                   </div>                                                                                                        ');messageTemplate.prependTo($(document.body));setMenuTop(62);if("TSI"!==localization.x_domain_type){$("#service-content").css("padding-top","122px");$(".framework-scrolling").css("top","122px")}else{$("#service-content").css("padding-top","202px");$(".framework-scrolling").css("top","202px")}}function setCookie(cname,cvalue){document.cookie=cname+"="+cvalue+";path=/;domain="+window.cloudCookieDomain}function setContentMinHeight(){var height3,height1=$(window).height();600>height1&&(height1=600);height3=$("#service-footer").height();$("#service-content").css("min-height",height1-height3)}function setMenuLeft(){var scrollTop,top,scrollLeft=$window.scrollLeft(),$serviceFooter=$("#service-footer");$("#service-menus,#frame-os-check").css("left",-scrollLeft);"fixed"===$serviceFooter.css("position")&&$serviceFooter.css("left",-scrollLeft);$(".console-menu-nav-list-wrapper").css("left",-scrollLeft+20);if("none"===$("#service-menus .menu-top-content").css("display")||!$("#service-menus .menu-top-content").css("display"))return;scrollTop=$window.scrollTop();scrollTop=scrollTop>78?78:0;top=0;$("#frame-os-check")&&(top=$("#frame-os-check").height());setMenuTop(top-scrollTop);$(".framework-scrolling").css("top",140+top-scrollTop+"px")}function getLanguageName(key,languages){if(languages)for(var i=0;i<languages.length;i++)if(key===languages[i][0])return languages[i][1];return null}function getKeyFromServicesConfig(value,type){if(!value||!type)return void 0;return _.findKey(servicesConfig,function(config){return config[type]===value})}function getValueFromServicesConfig(key,type){if(!key||!type)return void 0;return servicesConfig[key]&&servicesConfig[key][type]}var setMenuTop,$window;$rootScope.supportLanguage=[["en-us","English"]];$rootScope.i18n=i18n;$rootScope.language=window.urlParams.lang;$rootScope.languageName=getLanguageName($rootScope.language,$rootScope.supportLanguage);$rootScope.offsets={"leftMenuWidth":240};mask.pageInitShow();$rootScope.menus={"url":"/static/framework/src/app/framework/views/menus.html"};$rootScope.footer={"url":"/static/framework/src/app/framework/views/footer.html"};$rootScope.changeLanguage=function(language){window.location.href=$rootScope.addOrReplaceUrlParameter(window.location.href,"locale",language)};$rootScope.$state=$state;$rootScope.$stateParams=$stateParams;angular.element(window).bind("resize",function(){setContentMinHeight()});$rootScope.$on("$viewContentLoaded",function(){mask.pageInitHide()});$rootScope.$on("$includeContentLoaded",function(event,target){if(target===$rootScope.menus.url&&"B"===storage.cookieStorage.getItem("browserCheckResult")&&"true"!==storage.cookieStorage.getItem("browserCheckClose")){showBrowserTips();angular.element(document).injector().invoke(function($compile){var scope=$("#frame-os-check").scope();$compile($("#frame-os-check"))(scope);scope.$evalAsync()})}});setMenuTop=function(offset){var $serviceMenus=$("#service-menus");$rootScope.offsets.headerHeight=offset+$serviceMenus.height();$serviceMenus.css("top",offset);$(".console-menu-nav-list-wrapper").css("border-top-width",$rootScope.offsets.headerHeight)};$rootScope.tipInfoClose=function(){$("#frame-os-check").remove();setMenuTop(0);if("TSI"!==localization.x_domain_type){$("#service-content").css("padding-top","60px");$(".framework-scrolling").css("top","60px")}else{$("#service-content").css("padding-top","140px");$(".framework-scrolling").css("top","140px")}setCookie("browserCheckClose","true")};$window=$(window);$window.scroll(setMenuLeft);$rootScope.genHWSHref=function(href,flag){if(!href||""===href||"#"===href)return href;if(flag)"locale"===flag&&(href=$rootScope.addOrReplaceUrlParameter(href,"locale",window.urlParams.lang));else{href=$rootScope.addOrReplaceUrlParameter(href,"agencyId",$rootScope.getUrlParameter("agencyId",!0));var region=$rootScope.getUrlParameter("region",!0);region&&""!==region&&"null"!==region&&(href=$rootScope.addOrReplaceUrlParameter(href,"region",region));href=$rootScope.addOrReplaceUrlParameter(href,"locale",window.urlParams.lang)}return href};$rootScope.addOrReplaceUrlParameter=function(href,key,value){var hrefs,hrefPostfix;if(!href||!key)return href;hrefs=href.split("#/");hrefPostfix="";hrefs.length>1&&(hrefPostfix="#/"+hrefs[1]);hrefs[0]=$rootScope.delUrlParameter(hrefs[0],key);value&&(hrefs[0]=-1!==hrefs[0].indexOf("?")?hrefs[0]+"&"+key+"="+value:hrefs[0]+"?"+key+"="+value);return hrefs[0]+hrefPostfix};$rootScope.getUrlParameter=function(paramKey,scopeFlag){var sURLVariables,i,sParameterName,sPageURL=window.location.search.substring(1);if(sPageURL){sURLVariables=sPageURL.split("&");for(i=0;i<sURLVariables.length;i++){sParameterName=sURLVariables[i].split("=");if(sParameterName[0]===paramKey)return sParameterName[1]}}if(!scopeFlag)return null;if("agencyId"===paramKey)return $rootScope.userId;if("region"===paramKey)return encodeURIComponent($rootScope.projectName||"")};$rootScope.delUrlParameter=function(url,name){return url.replace(new RegExp("[?&]"+name+"=[^&#]*(#.*)?$"),"$1").replace(new RegExp("([?&])"+name+"=[^&]*&"),"$1")};$rootScope.getImageByCloudType=function(type){var cloud_type,imagesUrl,typeMatch={"aws":["aws","AWS"],"toc":["toc","TOC"],"otc":["otc","OTC"],"hec":["hec","HPC"],"ctc":["ctc","eCloud"],"fs_cloud":["fs_cloud","DC2"],"private_cloud":["private_cloud","localcloud"],"fe":["FE"]};window._.each(typeMatch,function(values,key){window._.contains(values,type)&&(cloud_type=key)});imagesUrl={"aws":{"url":"/static/framework/theme/default/images/aws.png"},"fs_cloud":{"url":"/static/framework/theme/default/images/fs_cloud.png"},"toc":{"url":"/static/framework/theme/default/images/toc.png"},"otc":{"url":"/static/framework/theme/default/images/otc.png"},"hec":{"url":"/static/framework/theme/default/images/hec.png"},"ctc":{"url":"/static/framework/theme/default/images/ctc.png"},"private_cloud":{"url":"/static/framework/theme/default/images/private_cloud.png"},"fe":{"url":"/static/framework/theme/default/images/fe.png"}};return imagesUrl[cloud_type]&&imagesUrl[cloud_type].url||""};$rootScope.valueConvert=function(value,fromType,toType){if(fromType===toType)return value;if("key"===fromType)return getValueFromServicesConfig(value,toType);if("key"===toType)return getKeyFromServicesConfig(value,fromType);return getValueFromServicesConfig(getKeyFromServicesConfig(value,fromType),toType)};$rootScope.getEndpoint=function(key){var endpointId=getValueFromServicesConfig(key,"endpointId");return endpointId&&_.find($rootScope.serviceEndpointList,function(endpoint){return endpoint.id===endpointId})};$rootScope.compareProjectId=function(){var msgWidth,options,msg,defaultProjectId=_.find($rootScope.user.projects,function(proj){return proj.region_id==$rootScope.selectRegionId}).id,isCurrentProject=!(defaultProjectId!=$rootScope.projectId),currentRegionProjects=_.find($rootScope.regions,function(region){return region.id==$rootScope.selectRegionId}).projects,defaultProjectName=_.find(currentRegionProjects,function(proj){return defaultProjectId==proj.projectId}).displayName;if(!isCurrentProject){msgWidth="zh-cn"==$rootScope.language?350:420;options={"type":"warn","width":msgWidth,"buttons":[{"key":"btnId1","label":i18n.console_term_comfirm_button,"focused":!0,"handler":function(){msg.destroy()}}],"content":"<span style='font-size: 1.2em'>"+i18n.console_term_cannot_apply+"</span><div style='height: 10px;border-bottom: 1px solid #ccc'></div>"+i18n.console_term_available_project+"<br><span>"+defaultProjectName+"</span>"};msg=new tinyWidget.Message(options);msg.show()}return isCurrentProject}};ctrl.$injector=["$rootScope","$state","$stateParams"];return ctrl});
