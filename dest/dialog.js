/*
 * Created with Sublime Text 2.
 * license: http://www.lovewebgames.com/jsmodule/index.html
 * User: 田想兵
 * Date: 2015-03-16
 * Time: 20:27:54
 * Contact: 55342775@qq.com
 */

(function(e,t){typeof define=="function"&&define.amd?define(["$"],t):typeof exports=="object"?module.exports=t():e.Dialog=t(window.Zepto||window.jQuery||$)})(this,function(e){e.fn.Dialog=function(n){var r=[];return e(this).each(function(){var i=new t,s=e.extend({trigger:e(this)},n);i.init(s),r.push(i)}),r},e.Dialog=function(n){if(n.type==="alert"){var r=new t,i='<div class="ui-alert-title">'+n.content+"</div>",s="",o="ui-alert";n.button?(typeof n.button=="boolean"&&(n.button="确定"),s='<p class="ui-dialog-action"><button class="ui-alert-submit  js-dialog-close">'+n.button+"</button></p>"):n.timer||(o+=" ui-alert-tip"),i+=s;var u=e.extend({target:i,animate:!0,show:!0,mask:!0,className:o,afterHide:function(e){this.dispose(),n.callback&&n.callback()}},n);r.init(u),n.timer&&setTimeout(function(){r.dispose(),n.callback&&n.callback()},n.timer),r.touch(r.mask,function(){r.hide(),n.callback&&n.callback()})}if(n.type==="confirm"){var a=new t,i='<div class="ui-confirm-title">'+n.content+"</div>",s="";n.buttons||(n.buttons=[{yes:"确定"},{no:"取消"}]);var f="";for(var l=0,c=n.buttons.length;l<c;l++){var h=n.buttons[l];h.yes&&(f+='<td><button class="ui-confirm-submit " data-type="yes">'+h.yes+"</button></td>"),h.no&&(f+='<td><button class="ui-confirm-no" data-type="no">'+h.no+"</button></td>"),h.close&&(f+='<td><button class="ui-confirm-close js-dialog-close" data-type="close">'+h.close+"</button></td>")}s='<table class="ui-dialog-action"><tr>'+f+"</tr></table>",n.position=="bottom"?i=s+i:i+=s;var p=e.extend({target:i,animate:!0,show:!0,fixed:!0,mask:!0,className:"ui-alert",afterHide:function(e){this.dispose()},beforeShow:function(t){a.touch(e(".ui-confirm-submit",t),function(){n.callback&&n.callback.call(a,"yes",t)}),a.touch(e(".ui-confirm-no",t),function(){n.callback&&n.callback.call(a,"no",t)}),a.touch(e(".ui-confirm-close",t),function(){n.callback&&n.callback.call(a,"close",t)})}},n);a.init(p)}},e.alert=function(t,n,r,i,s){var o={},u={zIndex:100,type:"alert"};typeof t=="object"?o=e.extend(u,t):o=e.extend(u,{content:t,button:n,timer:i,callback:r,width:283,height:"auto"}),e.Dialog(e.extend(o,s))},e.confirm=function(t,n,r,i){var s={},o={zIndex:100,type:"confirm"};typeof t=="object"?s=e.extend(o,t):s=e.extend(o,{content:t,buttons:n,width:283,callback:r}),e.Dialog(e.extend(s,i))};var t=function(){var t=Math.random().toString().replace(".","");this.id="dialog_"+t,this.settings={},this.settings.closeTpl=e('<span class="ui-dialog-close js-dialog-close">x</span>'),this.settings.titleTpl=e('<div class="ui-dialog-title"></div>'),this.timer=null,this.showed=!1,this.mask=e()};return t.prototype={init:function(t){var n=this;this.settings=e.extend({fixed:!1},this.settings,t),this.settings.mask&&(this.mask=e('<div class="ui-dialog-mask"/>'),e("body").append(this.mask)),e("body").append('<div class="ui-dialog" id="'+this.id+'"></div>'),this.dialogContainer=e("#"+this.id);var r=this.settings.zIndex||10;this.dialogContainer.css({zIndex:r}),this.settings.className&&this.dialogContainer.addClass(this.settings.className),this.mask.css({zIndex:r-1}),this.settings.closeTpl&&this.dialogContainer.append(this.settings.closeTpl),this.settings.title&&(this.dialogContainer.append(this.settings.titleTpl),this.settings.titleTpl.html(this.settings.title)),this.bindEvent(),this.settings.show&&this.show()},touch:function(t,n){function i(e){return n.call(this,e)}var r;e(t).on("click",i),e(t).on("touchmove",function(e){r=!0}).on("touchend",function(e){e.preventDefault();if(!r){var t=n.call(this,e,"touch");t||(e.preventDefault(),e.stopPropagation())}r=!1})},bindEvent:function(){var t=this;this.settings.trigger&&(e(this.settings.trigger).click(function(){t.show()}),t.touch(e(this.settings.trigger),function(){t.show()})),e(this.dialogContainer).on("click",".js-dialog-close",function(){return t.hide(),!1}),e(document).keydown(function(e){e.keyCode===27&&t.showed&&t.hide()}),e(this.dialogContainer).on("hide",function(){t.hide()})},dispose:function(){this.dialogContainer.remove(),this.mask.remove(),this.timer&&clearInterval(this.timer)},hide:function(){var t=this;t.settings.beforeHide&&t.settings.beforeHide.call(t,t.dialogContainer),this.showed=!1,this.mask.hide(),this.timer&&clearInterval(this.timer),this.settings.animate?(this.dialogContainer.removeClass("zoomIn").addClass("zoomOut"),setTimeout(function(){t.dialogContainer.hide(),typeof t.settings.target=="object"&&e("body").append(t.dialogContainer.hide()),t.settings.afterHide&&t.settings.afterHide.call(t,t.dialogContainer)},500)):(this.dialogContainer.hide(),typeof this.settings.target=="object"&&e("body").append(this.dialogContainer),this.settings.afterHide&&this.settings.afterHide.call(this,this.dialogContainer))},show:function(){typeof this.settings.target=="string"?/^(\.|\#\w+)/gi.test(this.settings.target)?this.dailogContent=e(this.settings.target):this.dailogContent=e("<div>"+this.settings.target+"</div>"):this.dailogContent=this.settings.target,this.mask.show(),this.dailogContent.show(),this.height=this.settings.height||"auto",this.width=this.settings.width||"auto",this.dialogContainer.append(this.dailogContent).show().css({height:this.height,width:this.width}),this.settings.beforeShow&&this.settings.beforeShow.call(this,this.dialogContainer),this.showed=!0,e(this.settings.trigger).blur(),this.setPosition();var t=this;this.timer&&clearInterval(this.timer),this.settings.fixed&&(this.timer=setInterval(function(){t.setPosition()},1e3)),this.settings.animate&&this.dialogContainer.addClass("zoomIn").removeClass("zoomOut").addClass("animated")},setPosition:function(){if(this.showed){var t=this;this.dialogContainer.show(),this.height=this.settings.height,this.width=this.settings.width,isNaN(this.height)&&(this.height=this.dialogContainer.outerHeight&&this.dialogContainer.outerHeight()||this.dialogContainer.height()),isNaN(this.width)&&(this.width=this.dialogContainer.outerWidth&&this.dialogContainer.outerWidth()||this.dialogContainer.width());var n=e(window).height(),r=e(window).width(),i=this.width/2,s=this.height/2,o=r/2-i,u=n/2-s;o=Math.floor(Math.max(0,o)),u=Math.floor(Math.max(0,u)),console.log("ch:"+n,"cw:"+r,"left:"+o,"top:"+u,"w:"+this.width,"h:"+this.height);var a="absolute";t.settings.fixed&&(a="fixed");var f="auto";t.settings.position=="bottom"&&(u="auto",f=0),t.dialogContainer.css({position:a,top:u,left:o,bottom:f})}}},t});