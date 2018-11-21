define(["language/common"],function(i18n){"use strict";var messageService=function(){this.errorMsgBox=function(code,desc){var content=[(i18n.common_term_errorCode_label||"异常码")+":"+$.encoder.encodeForHTML(code),(i18n.common_term_errorDescrip_label||"异常描述")+":"+$.encoder.encodeForHTML(desc)],options={"type":"error","content":content.join("<br/>"),"width":"360px"},msg=new window.tinyWidget.Message(options);msg.show()};this.okMsgBox=function(message){var options={"type":"prompt","content":message,"width":"360px","height":"200px"},msg=new window.tinyWidget.Message(options);msg.show()};this.warnMsgBox=function(options){var configs={"type":"warn","content":options.content,"width":"360px","height":"200px","buttons":[{"label":i18n.common_term_ok_button||"确定","focused":!1,"handler":function(){msg.destroy();"function"==typeof options.callback&&options.callback()}},{"label":i18n.common_term_cancle_button||"取消","focused":!0,"handler":function(){msg.destroy()}}]},msg=new window.tinyWidget.Message(configs);msg.show()};this.failMsgBoxs=function(message){var options={"type":"confirm","content":message,"width":"360px","height":"200px"},msg=new window.tinyWidget.Message(options);msg.show()};this.failMsgBox=function(message,type,callback){var options={"type":type||"error","content":message,"width":"360px","height":"200px","buttons":[{"label":i18n.common_term_ok_button||"确定","focused":!1,"handler":function(){msg.destroy();"function"==typeof callback&&callback()}}]},msg=new window.tinyWidget.Message(options);msg.on("close",function(){"function"==typeof callback&&callback()});msg.show()};this.promptErrorMsgBox=function(message,height,width){var msg=new window.tinyWidget.Message({"type":"error","content":message||"","height":height||"150px","width":width||"350px","buttons":[{"label":i18n.common_term_ok_button||"确定","accessKey":"2","key":"okBtn","majorBtn":!0,"default":!0},{"label":i18n.common_term_cancle_button||"取消","accessKey":"3","key":"cancelBtn","default":!1}]});msg.setButton("okBtn",function(){msg.destroy()});msg.setButton("cancelBtn",function(){msg.destroy()});msg.show()};this.okBtn=function(options){var msg=new window.tinyWidget.Message({"type":"error","content":options.content,"width":options.width||"330px","height":options.height||"120px","buttons":[{"label":i18n.common_term_ok_button||"确定","accessKey":"2","key":"okBtn","majorBtn":!0,"default":!0}]});msg.setButton("okBtn",function(){msg.destroy()});msg.show()};this.exceptionMsg=function(code,desc){var options={"type":"error","content":(i18n.common_term_errorCode_label||"异常码")+":"+encoder.encodeForHTML(code)+"<br/>"+(i18n.common_term_errorDescrip_label||"异常描述")+":"+encoder.encodeForHTML(desc),"width":"360px","height":"200px"},msg=new tinyWidget.Message(options);msg.show()};this.oneBtnMsg=function(options){var configs={"type":options.type||"prompt","content":$.encoder.encodeForHTML(options.message),"width":"360px","height":"200px","buttons":[{"label":i18n.common_term_ok_button||"确定","focused":!0,"handler":function(){msg.destroy();options.callback&&options.callback()}}],"close":function(){options.callback&&options.callback()}},msg=new tinyWidget.Message(configs);msg.show()};this.twoBtnMsg=function(options){var configs={"type":options.type||"warn","content":$.encoder.encodeForHTML(options.message),"width":"360px","height":"200px","buttons":[{"label":i18n.common_term_ok_button||"确定","focused":!1,"handler":function(){msg.destroy();options.callback&&options.callback()}},{"label":i18n.common_term_cancle_button||"取消","focused":!0,"handler":function(){msg.destroy()}}]},msg=new tinyWidget.Message(configs);msg.show()};this.confirmMsgBox=function(options){var configs={"type":"confirm","content":options.content,"width":options.width||"330px","title":options.title,"height":options.height||"120px","buttons":[{"label":i18n.common_term_ok_button||"确定","focused":!1,"majorBtn":!0,"handler":function(){msg.destroy();"function"==typeof options.callback&&options.callback()}},{"label":i18n.common_term_cancle_button||"取消","focused":!0,"handler":function(){msg.destroy();"function"==typeof options.cancel&&options.cancel()}}]},msg=new window.tinyWidget.Message(configs);msg.show()};this.confirmMsgBoxFocusOKBtn=function(options){var configs={"type":"confirm","content":options.content,"width":options.width||"330px","height":options.height||"120px","buttons":[{"label":i18n.common_term_ok_button||"确定","focused":!0,"majorBtn":!0,"handler":function(){msg.destroy();"function"==typeof options.callback&&options.callback()}},{"label":i18n.common_term_cancle_button||"取消","focused":!1,"handler":function(){msg.destroy();"function"==typeof options.cancel&&options.cancel()}}]},msg=new window.tinyWidget.Message(configs);msg.show()};this.focusOKBtn=function(options){var configs={"type":options.type,"title":options.title,"content":options.content,"width":options.width||"330px","height":options.height||"120px","buttons":[{"label":i18n.common_term_ok_button||"确定","focused":!0,"handler":function(){msg.destroy();"function"==typeof options.callback&&options.callback()}},{"label":i18n.common_term_cancle_button||"取消","handler":function(){msg.destroy();"function"==typeof options.cancel&&options.cancel()}}]},msg=new window.tinyWidget.Message(configs);msg.show()};this.focusCancelBtn=function(options){var configs={"type":options.type,"title":options.title,"content":options.content,"width":options.width||"330px","height":options.height||"120px","buttons":[{"label":i18n.common_term_ok_button||"确定","focused":!1,"handler":function(){msg.destroy();"function"==typeof options.callback&&options.callback()}},{"label":i18n.common_term_cancle_button||"取消","focused":!0,"handler":function(){msg.destroy();"function"==typeof options.cancel&&options.cancel()}}]},msg=new window.tinyWidget.Message(configs);msg.show()};this.deleteConfirmMsgBox=function(options){var configs={"type":"confirm","content":options.content,"width":options.width||"330px","height":options.height||"120px","title":options.title,"buttons":[{"label":i18n.common_term_ok_button||"确定","focused":!1,"handler":function(){msg.destroy();"function"==typeof options.callback&&options.callback()}},{"label":i18n.common_term_cancle_button||"取消","focused":!0,"majorBtn":!0,"handler":function(){msg.destroy();"function"==typeof options.cancel&&options.cancel()}}]},msg=new window.tinyWidget.Message(configs);msg.show()};this.serviceCreateMsgBox=function(options){var configs={"type":"prompt","content":options.content,"width":options.width||"330px","height":options.height||"120px","buttons":[{"label":i18n.services_term_continueCreateService_button,"focused":!1,"majorBtn":!0,"handler":function(){msg.destroy();"function"==typeof options.callback&&options.callback()}},{"label":i18n.services_term_returnToList_button,"focused":!0,"handler":function(){msg.destroy();"function"==typeof options.callback1&&options.callback1()}}]},msg=new window.tinyWidget.Message(configs);msg.show();msg.on("close",function(){options.serviceClose()})};this.serviceModifyMsgBox=function(options){var configs={"type":"prompt","content":options.content,"width":options.width||"330px","height":options.height||"120px","buttons":[{"label":i18n.services_term_returnToList_button,"focused":!1,"majorBtn":!0,"handler":function(){msg.destroy();"function"==typeof options.callback&&options.callback()}}]},msg=new window.tinyWidget.Message(configs);msg.show();msg.on("close",function(){options.serviceClose()})};this.approveMsgBox=function(message,type,callback){var options={"type":type,"content":message,"width":"360px","height":"200px","buttons":[{"label":i18n.common_term_ok_button||"确定","focused":!1,"majorBtn":!0,"handler":function(){msg.destroy();"function"==typeof callback&&callback()}}]},msg=new window.tinyWidget.Message(options);msg.on("close",function(){"function"==typeof callback&&callback()});msg.show()}};return messageService});