if (self.CavalryLogger) { CavalryLogger.start_js(["LSkZL"]); }

__d("UFIRange",[],(function a(b,c,d,e,f,g){"use strict";__p&&__p();function h(){var i=arguments.length<=0||arguments[0]===undefined?0:arguments[0],j=arguments.length<=1||arguments[1]===undefined?0:arguments[1];this.offset=i;this.length=j;this.requestedOffset=this.offset;this.requestedLength=this.length}h.prototype.getOffset=function(){return this.offset};h.prototype.getLength=function(){return this.length};h.prototype.getRequestedOffset=function(){return this.requestedOffset};h.prototype.getRequestedLength=function(){return this.requestedLength};h.prototype.updateRequestedRange=function(i,j){this.requestedOffset=i;this.requestedLength=j;return this};h.prototype.isLoadingNext=function(){var i=this.requestedOffset+this.requestedLength,j=this.offset+this.length;return i>j};h.prototype.isLoadingPrev=function(){return this.requestedOffset<this.offset};h.combine=function(i,j){if(!j)return i;var k=Math.min(i.getOffset(),j.getOffset()),l=Math.max(i.getLength(),j.getLength()),m=new h(k,l);if(j.getRequestedLength()>0){var n=Math.min(k,j.getRequestedOffset()),o=Math.max(k+l,j.getRequestedOffset()+j.getRequestedLength());m.updateRequestedRange(n,o-n)}return m};f.exports=h}),null);
__d("UFIInstanceActionType",[],(function a(b,c,d,e,f,g){f.exports=Object.freeze({CHANGE_ORDER_MODE:"story_change_order_mode",CHANGE_VISIBILITY:"story_change_visibility",INIT:"instance_init",PLAY_LIVE_VOD_HIGHLIGHTS:"play_live_vod_highlights",RECEIVED_VOD_COMMENTS:"received_vod_comments",REMOVE:"story_remove",REQUESTED_VOD_COMMENTS:"requested_vod_comments",TOGGLE_COMMENTS:"story_toggle_comments",TOGGLE_COMMERCIAL_BREAK:"story_toggle_commercial_break",TRANSLATE_ALL:"translate_all"})}),null);
__d("UFIFeedbackStore",["FluxReduceStore","UFIDispatcherBase","UFIInstanceActionType"],(function a(b,c,d,e,f,g){"use strict";__p&&__p();var h,i;h=babelHelpers.inherits(j,c("FluxReduceStore"));i=h&&h.prototype;j.prototype.getInitialState=function(){return{}};j.prototype.reduce=function(k,l){var m;switch(l.type){case c("UFIInstanceActionType").INIT:var n=l.payload,o=n.feedbacktarget?n.feedbacktarget:n.feedbacktargets&&n.feedbacktargets[0];if(!o)return k;return babelHelpers["extends"]({},k,(m={},m[l.ftentidentifier]=babelHelpers["extends"]({orderingmodes:[],defaultcommentorderingmode:""},o),m))}return k};function j(){h.apply(this,arguments)}f.exports=new j(c("UFIDispatcherBase"))}),null);
__d("WebCommentViewOption",[],(function a(b,c,d,e,f,g){f.exports=Object.freeze({CHRONOLOGICAL:"chronological",RANKED_THREADED:"ranked_threaded",TOPLEVEL:"toplevel",RECENT_ACTIVITY:"recent_activity",FEATURED:"featured",FILTERED:"filtered",LIVE_STREAMING:"live_streaming"})}),null);
__d("UFIOrderingModeStore",["invariant","FluxReduceStore","Map","UFIDispatcherBase","UFIFeedbackStore","UFIInstanceActionType","WebCommentViewOption"],(function a(b,c,d,e,f,g,h){"use strict";__p&&__p();var i,j;function k(m,n){return m.filter(function(o){return o.selected}).map(function(o){return o.value}).pop()||n}i=babelHelpers.inherits(l,c("FluxReduceStore"));j=i&&i.prototype;l.prototype.getInitialState=function(){return new(c("Map"))()};l.prototype.areEqual=function(m,n){return m===n};l.prototype.isLiveStreaming=function(m){return this.getState().get(m)==c("WebCommentViewOption").LIVE_STREAMING};l.prototype.isInverted=function(m){switch(m){case c("WebCommentViewOption").RECENT_ACTIVITY:case c("WebCommentViewOption").RANKED_THREADED:case c("WebCommentViewOption").FILTERED:case c("WebCommentViewOption").LIVE_STREAMING:return true}return false};l.prototype.getOrderingMode=function(m){var n=this.getState().get(m);n!==undefined||h(0);return n};l.prototype.reduce=function(m,n){__p&&__p();switch(n.type){case c("UFIInstanceActionType").INIT:if(m.has(n.instanceID))return m;c("UFIDispatcherBase").waitFor([c("UFIFeedbackStore").getDispatchToken()]);var o=c("UFIFeedbackStore").getState()[n.ftentidentifier];m=new(c("Map"))(m);return m.set(n.instanceID,k(o.orderingmodes,o.defaultcommentorderingmode));case c("UFIInstanceActionType").CHANGE_ORDER_MODE:if(!m.has(n.instanceID)||m.get(n.instanceID)!==n.mode){m=new(c("Map"))(m);m.set(n.instanceID,n.mode)}return m}return m};function l(){i.apply(this,arguments)}f.exports=new l(c("UFIDispatcherBase"))}),null);
__d("NumberFormat",["intlNumUtils","NumberFormatConfig"],(function a(b,c,d,e,f,g){__p&&__p();var h=/(\d{3})(?=\d)/g;function i(l){return(""+l).split("").reverse().join("")}function j(l,m){if(Math.abs(l).toString().length<c("NumberFormatConfig").minDigitsForThousandsSeparator)return l.toString();var n=i(""+l);return i(n.replace(h,"$1"+m))}var k={formatIntegerWithDelimiter:j,formatInteger:function l(m){return c("intlNumUtils").formatNumberWithThousandDelimiters(m)}};f.exports=k}),null);
__d("UFIPager.react",["cx","LeftRight.react","React","SutroPhase2GatingConfig","UFIImageBlock.react","XUISpinner.react","joinClasses"],(function a(b,c,d,e,f,g,h){"use strict";__p&&__p();var i,j;i=babelHelpers.inherits(k,c("React").Component);j=i&&i.prototype;function k(){var l,m;for(var n=arguments.length,o=Array(n),p=0;p<n;p++)o[p]=arguments[p];return m=(l=j.constructor).call.apply(l,[this].concat(o)),this.onPagerClick=function(q){!this.props.isLoading&&this.props.onPagerClick&&this.props.onPagerClick();q.nativeEvent.prevent()}.bind(this),m}k.prototype.render=function(){var l=this.onPagerClick,m=c("SutroPhase2GatingConfig").enabled_bling_above_ufi,n=c("joinClasses")("UFIRow"+(this.props.isUnseen?" UFIUnseenItem":"")+" UFIPagerRow _4oep"+(this.props.isFirstCommentComponent?" _48pi":"")+(this.props.isLastCommentComponent?" UFILastCommentComponent":"")+(this.props.isFirstComponent||m&&this.props.isFirstCommentComponent?" _4204":"")+(this.props.isLastComponent?" _2o9m":"")),o=null;if(this.props.isLoading)o=c("React").createElement(c("XUISpinner.react"),{className:"mls",background:"light",size:"small"});var p=c("React").createElement("a",{className:"UFIPagerLink",onClick:l,href:"#",role:"button"},this.props.pagerLabel,o),q="fcg UFIPagerCount",r=m&&c("React").createElement("span",{className:q},this.props.countSentence),s=void 0;if(this.props.contextArgs.entstream||!this.props.isReply)s=c("React").createElement(c("LeftRight.react"),{direction:c("LeftRight.react").DIRECTION.right},p,r);else s=c("React").createElement(c("UFIImageBlock.react"),null,c("React").createElement("a",{className:"UFIPagerIcon",onClick:l,href:"#",role:"button"}),p,r);return c("React").createElement("div",{className:n,"data-ft":this.props["data-ft"]},s)};f.exports=k}),null);
__d("UFIPagerLabel",["fbt","NumberFormat","intlList"],(function a(b,c,d,e,f,g,h){"use strict";__p&&__p();function i(k){return c("NumberFormat").formatInteger(k.count)}var j={VIEW_ONE:"view_one",VIEW_ONE_MORE:"view_one_more",VIEW_ALL:"view_all",VIEW_MORE_EXPLICIT:"view_more_explicit",VIEW_MORE:"view_more",VIEW_PREVIOUS:"view_previous",VIEW_PREVIOUS_EXPLICIT:"view_previous_explicit",_getReplyLabel:function k(l,m){switch(l){case j.VIEW_ONE:return h._("View 1 reply");case j.VIEW_ONE_MORE:return h._("View 1 more reply");case j.VIEW_ALL:return h._({"*":"View all {count} replies"},[h.param("count",i(m),[0,m.count])]);case j.VIEW_MORE_EXPLICIT:return h._({"*":{"*":"View {count} more replies","_1":"View {count} more reply"}},[h.param("count",i(m),[0,m.count]),h.plural(m.count)]);case j.VIEW_MORE:return h._("View more replies");case j.VIEW_PREVIOUS:return h._("View previous replies");case j.VIEW_PREVIOUS_EXPLICIT:return h._({"*":{"*":"View {count} previous replies","_1":"View {count} previous reply"}},[h.param("count",i(m),[0,m.count]),h.plural(m.count)]);default:return null}},_getCommentLabel:function k(l,m){switch(l){case j.VIEW_ONE:return h._("View 1 comment");case j.VIEW_ONE_MORE:return h._("View 1 more comment");case j.VIEW_ALL:return h._({"*":"View all {count} comments"},[h.param("count",i(m),[0,m.count])]);case j.VIEW_MORE_EXPLICIT:return h._({"*":{"*":"View {count} more comments","_1":"View {count} more comment"}},[h.param("count",i(m),[0,m.count]),h.plural(m.count)]);case j.VIEW_MORE:return h._("View more comments");case j.VIEW_PREVIOUS_EXPLICIT:return h._({"*":{"*":"View {count} previous comments","_1":"View {count} previous comment"}},[h.param("count",i(m),[0,m.count]),h.plural(m.count)]);case j.VIEW_PREVIOUS:return h._("View previous comments");default:return null}},_getCommentLabelWithCommentSentence:function k(l,m){__p&&__p();var n=c("intlList")(m.commenters),o=m.othersCount,p=c("NumberFormat").formatInteger(o);switch(l){case j.VIEW_ONE:return h._("View 1 comment from {names}",[h.param("names",n)]);case j.VIEW_ONE_MORE:return h._("View 1 more comment from {names}",[h.param("names",n)]);case j.VIEW_ALL:switch(o){case 0:return h._({"*":"View all {count} comments from {names}"},[h.param("count",i(m),[0,m.count]),h.param("names",n)]);case 1:return h._({"*":"View all {count} comments from {names} and 1 other person"},[h.param("count",i(m),[0,m.count]),h.param("names",n)]);default:return h._({"*":{"*":"View all {count} comments from {names} and {othersCount} others"}},[h.param("count",i(m),[0,m.count]),h.param("names",n),h.param("othersCount",p,[0,o])])}case j.VIEW_MORE_EXPLICIT:case j.VIEW_MORE:switch(o){case 0:return h._("View more comments from {names}",[h.param("names",n)]);case 1:return h._("View more comments from {names} and 1 other person",[h.param("names",n)]);default:return h._({"*":"View more comments from {names} and {othersCount} others"},[h.param("names",n),h.param("othersCount",p,[0,o])])}case j.VIEW_PREVIOUS:case j.VIEW_PREVIOUS_EXPLICIT:switch(o){case 0:return h._("View previous comments from {names}",[h.param("names",n)]);case 1:return h._("View previous comments from {names} and 1 other person",[h.param("names",n)]);default:return h._({"*":"View previous comments from {names} and {othersCount} others"},[h.param("names",n),h.param("othersCount",p,[0,o])])}default:return null}},_getQuestionLabel:function k(l,m){switch(l){case j.VIEW_ONE:return h._("View 1 question");case j.VIEW_ONE_MORE:return h._("View 1 more question");case j.VIEW_ALL:return h._({"*":"View all {count} questions"},[h.param("count",i(m),[0,m.count])]);case j.VIEW_MORE_EXPLICIT:return h._({"*":{"*":"View {count} more questions","_1":"View {count} more question"}},[h.param("count",i(m),[0,m.count]),h.plural(m.count)]);case j.VIEW_MORE:return h._("View more questions");case j.VIEW_PREVIOUS:return h._("View previous questions");case j.VIEW_PREVIOUS_EXPLICIT:return h._({"*":{"*":"View {count} previous questions","_1":"View {count} previous question"}},[h.param("count",i(m),[0,m.count]),h.plural(m.count)]);default:return null}},_getAnswerLabel:function k(l,m){switch(l){case j.VIEW_ONE:return h._("View 1 answer");case j.VIEW_ONE_MORE:return h._("View 1 more answer");case j.VIEW_ALL:return h._({"*":"View all {count} answers"},[h.param("count",i(m),[0,m.count])]);case j.VIEW_MORE_EXPLICIT:return h._({"*":{"*":"View {count} more answers","_1":"View {count} more answer"}},[h.param("count",i(m),[0,m.count]),h.plural(m.count)]);case j.VIEW_MORE:return h._("View more answers");case j.VIEW_PREVIOUS_EXPLICIT:return h._({"*":{"*":"View {count} previous answers","_1":"View {count} previous answer"}},[h.param("count",i(m),[0,m.count]),h.plural(m.count)]);case j.VIEW_PREVIOUS:return h._("View previous answers");default:return null}},getLabel:function k(l,m,n,o,p){__p&&__p();if(m)return j._getReplyLabel(l,p);else if(n)return j._getQuestionLabel(l,p);else if(o)return j._getAnswerLabel(l,p);else{if(p.commenters)return this._getCommentLabelWithCommentSentence(l,p);return j._getCommentLabel(l,p)}}};f.exports=j}),null);
__d("UFIPagerGenerator",["fbt","NumberFormat","React","TrackingNodes","UFIConstants","UFIOrderingModeStore","UFIPager.react","UFIPagerLabel","UFIRange"],(function a(b,c,d,e,f,g,h){"use strict";__p&&__p();var i=c("UFIConstants").UFIPaging,j={isBottomPager:function k(l,m){return c("UFIOrderingModeStore").isInverted(m)&&!l},needsStartOfRangePager:function k(l){return l>0},renderPagers:function k(l){__p&&__p();var m,n,o,p=l.commentCount,q=l.contextArgs,r=l.currentLength,s=l.currentOffset,t=l.deletedCount,u=l.feedback,v=l.onPageCallback,w=l.orderingMode,x=l.range,y=l.targetID,z=p-t,A=r-t,B=y!==q.ftentidentifier,C=this.isBottomPager(B,w),D={topPager:null,bottomPager:null},E=false;if(q.isaskquestion)E=q.isaskquestion;var F=x.isLoadingPrev(),G=x.isLoadingNext(),H={count:0},I=u.commentsentenceinfo;if(I){H.commenters=I.explicit_commenter_names;H.othersCount=I.other_commenter_count}var J=s+r==p;if(p<q.pagesize&&J||A===0){var m=function(){__p&&__p();var M=Math.min(p,q.pagesize),N=function N(){return v(C?i.BOTTOM:i.TOP,new(c("UFIRange"))(p-M,M))},O=void 0;if(A===0)if(z==1)O=c("UFIPagerLabel").VIEW_ONE;else{H.count=z;O=c("UFIPagerLabel").VIEW_ALL}else if(z-A==1)O=c("UFIPagerLabel").VIEW_ONE_MORE;else{O=c("UFIPagerLabel").VIEW_MORE_EXPLICIT;H.count=z-A}var P=c("TrackingNodes").getTrackingInfo(c("TrackingNodes").types.VIEW_ALL_COMMENTS),Q=c("UFIPagerLabel").getLabel(O,B,Boolean(u.isqanda),Boolean(E),H),R=c("React").createElement(c("UFIPager.react"),{key:"allPager"+y,ref:C?"topLevelBottomPager":null,contextArgs:q,isUnseen:u.hasunseencollapsed,isLoading:C?G:F,isReply:B,pagerLabel:Q,onPagerClick:N,"data-ft":P});if(C)D.bottomPager=R;else D.topPager=R;return{v:D}}();if(typeof m==="object")return m.v}var K=c("UFIPagerLabel").getLabel(c("UFIPagerLabel").VIEW_MORE,B,Boolean(u.isqanda),Boolean(E),H),L=c("UFIPagerLabel").getLabel(c("UFIPagerLabel").VIEW_PREVIOUS,B,Boolean(u.isqanda),Boolean(E),H);if(this.needsStartOfRangePager(s))(function(){__p&&__p();var M=Math.max(s-q.pagesize,0),N=s+r-M,O=void 0;if(!B||A>1){var P=c("NumberFormat").formatInteger(A),Q=c("NumberFormat").formatInteger(z);O=h._("{countshown} of {totalcount}",[h.param("countshown",P),h.param("totalcount",Q)])}var R=function R(){return v(C?i.BOTTOM:i.TOP,new(c("UFIRange"))(M,N))};if(C)D.bottomPager=c("React").createElement(c("UFIPager.react"),{key:"bottomPager"+y,ref:!B?"topLevelBottomPager":null,contextArgs:q,isLoading:F,isReply:B,pagerLabel:K,onPagerClick:R,countSentence:O});else D.topPager=c("React").createElement(c("UFIPager.react"),{key:"topPager"+y,contextArgs:q,isLoading:F,isReply:B,pagerLabel:L,onPagerClick:R,countSentence:O})})();if(s+r<p)(function(){var M=Math.min(r+q.pagesize,p-s),N=function N(){return v(C?i.TOP:i.BOTTOM,new(c("UFIRange"))(s,M))};if(C)D.topPager=c("React").createElement(c("UFIPager.react"),{key:"topPager"+y,contextArgs:q,isLoading:G,isReply:B,pagerLabel:L,onPagerClick:N});else D.bottomPager=c("React").createElement(c("UFIPager.react"),{key:"bottomPager",ref:!B?"topLevelBottomPager":null,contextArgs:q,isLoading:G,isReply:B,pagerLabel:K,onPagerClick:N})})();return D}};f.exports=j}),null);
__d("distinctArrayBy",["Set"],(function a(b,c,d,e,f,g){"use strict";__p&&__p();function h(j){return j}function i(j){__p&&__p();var k=arguments.length<=1||arguments[1]===undefined?h:arguments[1],l=[],m=new(c("Set"))();for(var n=j,o=Array.isArray(n),p=0,n=o?n:n[typeof Symbol==="function"?Symbol.iterator:"@@iterator"]();;){var q;if(o){if(p>=n.length)break;q=n[p++]}else{p=n.next();if(p.done)break;q=p.value}var r=q,s=k(r);if(!m.has(s)){m.add(s);l.push(r)}}return l}f.exports=i}),null);
__d("UFICommentFilterFallbackWarning.react",["cx","fbt","React","UFIPagerGenerator","UFIPaging","WebCommentViewOption","distinctArrayBy"],(function a(b,c,d,e,f,g,h,i){"use strict";__p&&__p();var j,k;function l(n,o,p){var q=o.availableComments,r=o.repliesMap,s=void 0;if(p)s=r[n]||[];else s=q||[];s=c("distinctArrayBy")(s,function(t){return t.id});return s.length}j=babelHelpers.inherits(m,c("React").Component);k=j&&j.prototype;m.shouldRender=function(n,o,p,q){__p&&__p();if(!n)return false;var r=n.availableComments,s=n.commentCounts,t=n.deletedCounts,u=n.hasPagedToplevel,v=n.orderingMode,w=n.ranges,x=n.repliesExpandedMap,y=n.repliesMap;if(!r||!s||!t||!v||!w||!x||!y)return false;var z=Math.max((s[o]||0)-(t[o]||0),0),A=w[o];if(!A||!z||v!==c("WebCommentViewOption").FILTERED||q&&!x[o]||!q&&!u)return false;var B=l(o,n,q),C=A.isLoadingPrev(),D=A.isLoadingNext(),E=A.getOffset(),F=A.getLength(),G=c("UFIPagerGenerator").isBottomPager(q,v),H=Math.min(F,z);if(p===c("UFIPaging").ALL)return!C&&!D&&E===0&&F>=z&&B<H;else if(!G&&p===c("UFIPaging").TOP||G&&p===c("UFIPaging").BOTTOM)return!C&&E===0&&B<H;else if(!G&&p===c("UFIPaging").BOTTOM||G&&p===c("UFIPaging").TOP)return!D&&E+F>=z&&B<H;return false};m.prototype.$UFICommentFilterFallbackWarning1=function(){var n=this.props,o=n.asReplyWarning,p=n.ufiProps,q=p||{},r=q.feedback,s=q.orderingMode,t=r&&r.orderingmodes||[],u=t.find(function(w){return w&&w.value===s}),v=u&&u.name;if(o)if(v)return i._("{ordering mode name} is selected, so some replies may have been filtered out.",[i.param("ordering mode name",v)]);else return i._("Some replies may have been filtered out by the selected ordering mode.");else if(v)return i._("{ordering mode name} is selected, so some comments may have been filtered out.",[i.param("ordering mode name",v)]);else return i._("Some comments may have been filtered out by the selected ordering mode.")};m.prototype.render=function(){var n=this.props,o=n.ufiProps,p=n.targetID,q=n.pagingDirection,r=n.asReplyWarning;if(!this.constructor.shouldRender(o,p,q,r))return null;return c("React").createElement("div",{className:"_2ah8 _4oep UFIRow"},c("React").createElement("div",{className:"_2ah9"},this.$UFICommentFilterFallbackWarning1()))};function m(){j.apply(this,arguments)}f.exports=m}),null);
__d("UFIReactionIconImpl.react",["cx","Image.react","React","SutroStoryHeaderUFIGatingConfig","UFIConfig","UFIReactionTypes","joinClasses"],(function a(b,c,d,e,f,g,h){__p&&__p();var i,j,k=c("React").PropTypes;i=babelHelpers.inherits(l,c("React").Component);j=i&&i.prototype;l.prototype.shouldComponentUpdate=function(m,n){"use strict";return m.className!==this.props.className||m.reaction!==this.props.reaction||m.size!==this.props.size||m.grayscale!==this.props.grayscale};l.prototype.renderImage=function(){"use strict";var m=c("UFIReactionTypes").reactions[this.props.reaction].name,n=c("SutroStoryHeaderUFIGatingConfig").enabled_for_ufi;return c("React").createElement("i",{className:c("joinClasses")(c("UFIReactionTypes").reactions[this.props.reaction].class_name,"_2p78"+(this.props.size==="13"?" _9-y":"")+(this.props.size==="16"?" _9--":"")+(this.props.size==="18"?" _19kl":"")+(this.props.size==="48"?" _9-_":"")+(this.props.size==="96"?" _9_0":"")+(this.props.grayscale?" _pxi":"")+(n?" _hly":""))})};l.prototype.render=function(){"use strict";return c("React").createElement("span",{className:c("joinClasses")("_9zc"+(this.props.size==="13"?" _2p79":"")+(this.props.size==="16"?" _2p7a":"")+(this.props.size==="18"?" _19km":"")+(this.props.size==="48"?" _2p7b":"")+(this.props.size==="96"?" _9-w":""),this.props.className,"_3uet _4e-m")},this.renderImage())};function l(){"use strict";i.apply(this,arguments)}l.propTypes={className:k.string,grayscale:k.bool,reaction:k.number.isRequired,size:k.oneOf(["13","16","18","48","96"])};l.defaultProps={className:null,grayscale:false,size:"16"};f.exports=l}),null);
__d("XUFIReactionProfileBrowserController",["XController"],(function a(b,c,d,e,f,g){f.exports=c("XController").create("/ufi/reaction/profile/browser/",{ft_ent_identifier:{type:"String",required:true}})}),null);
__d("XUFIReactionProfileDialogController",["XController"],(function a(b,c,d,e,f,g){f.exports=c("XController").create("/ufi/reaction/profile/dialog/",{reaction_type:{type:"Enum",enumType:0},ft_ent_identifier:{type:"String",required:true},__asyncDialog:{type:"Int"}})}),null);
__d("UFIReactionsProfileBrowserUtils",["ActorURI","XUFIReactionProfileBrowserController","XUFIReactionProfileDialogController"],(function a(b,c,d,e,f,g){var h={getDialogURI:function i(j,k){return c("ActorURI").create(c("XUFIReactionProfileDialogController").getURIBuilder().setString("ft_ent_identifier",j.entidentifier).setEnum("reaction_type",k).getURI(),j.actorforpost)},getPageURI:function i(j){return c("ActorURI").create(c("XUFIReactionProfileBrowserController").getURIBuilder().setString("ft_ent_identifier",j.entidentifier).getURI(),j.actorforpost)}};f.exports=h}),null);
__d("sortReactionTypes",["UFIReactionTypes"],(function a(b,c,d,e,f,g){__p&&__p();var h={};c("UFIReactionTypes").ordering.forEach(function(j,k){h[j]=k});function i(j,k){return Object.keys(j).map(function(l){return Number(l)}).sort(function(l,m){if(k&&l===c("UFIReactionTypes").LIKE)return-1;if(j[l]["default"]===j[m]["default"])return h[l]-h[m];return j[m]["default"]-j[l]["default"]})}f.exports=i}),null);
__d("UFIReactionsBlingTokens.react",["cx","fbt","Bootloader","Event","React","ReactDOM","RTLKeys","UFIReactionIconImpl.react","UFIReactionsProfileBrowserUtils","UFIReactionTypes","joinClasses","sortReactionTypes"],(function a(b,c,d,e,f,g,h,i){"use strict";__p&&__p();var j,k,l=null;j=babelHelpers.inherits(m,c("React").Component);k=j&&j.prototype;function m(){__p&&__p();var n,o;for(var p=arguments.length,q=Array(p),r=0;r<p;r++)q[r]=arguments[r];return o=(n=k.constructor).call.apply(n,[this].concat(q)),this.state={active:null,selectedIndex:-1,reactionTypes:this.getReactionTypes(this.props.feedback.reactioncountmap,this.props.max)},this.onFocusIn=function(event){if(!this.refs.tokens.contains(event.target)){this.setState({selectedIndex:-1});if(this.focusInListener){this.focusInListener.remove();this.focusInListener=null}}}.bind(this),this.onFocus=function(event){if(event.target===this.refs.tokens){this.setState({selectedIndex:0});if(!this.focusInListener)this.focusInListener=c("Event").listen(document.documentElement,"focusin",this.onFocusIn)}}.bind(this),this.onKeyDown=function(event){__p&&__p();switch(event.keyCode){case c("RTLKeys").RETURN:if(this.focusInListener){this.focusInListener.remove();this.focusInListener=null}break;case c("RTLKeys").TAB:this.setState({selectedIndex:0});break;case c("RTLKeys").getLeft():case c("RTLKeys").getRight():event.preventDefault();this.setState({selectedIndex:Math.max(0,Math.min(this.state.selectedIndex+(event.keyCode===c("RTLKeys").getLeft()?-1:1),this.state.reactionTypes.length-1))});break}}.bind(this),this.renderToken=function(s,t){var u=this.props.feedback,v=i._("{reduced_count} {reaction_type}",[i.param("reduced_count",u.reactioncountmap[s].reduced),i.param("reaction_type",c("UFIReactionTypes").reactions[s].display_name)]),w=c("React").createElement(c("UFIReactionIconImpl.react"),{size:this.props.size,className:"_4-op",reaction:s}),x=c("React").createElement("span",{className:"_3chu"},u.reactioncountmap[s].reduced),y={"aria-label":v,className:"_3emk"+(this.props.size==="13"?" _26lk":"")+(this.props.size==="16"?" _401_":""),key:"reactionType-"+s,ref:t};if(this.props.noLinks)return c("React").createElement("span",y,w,x);y=babelHelpers["extends"]({},y,{ajaxify:c("UFIReactionsProfileBrowserUtils").getDialogURI(u,s),href:c("UFIReactionsProfileBrowserUtils").getPageURI(u),rel:"dialog",role:"button",tabIndex:this.state.selectedIndex===t?0:-1});if(l)return c("React").createElement(l,babelHelpers["extends"]({active:this.state.active===s,feedback:u,reaction:s},y),w,x);return c("React").createElement("a",babelHelpers["extends"]({onMouseEnter:this.onMouseEnter.bind(this,s)},y),w,x)}.bind(this),o}m.prototype.componentDidUpdate=function(){if(this.state.selectedIndex>-1){var n=c("ReactDOM").findDOMNode(this.refs[this.state.selectedIndex]);if(n)n.focus()}};m.prototype.componentWillReceiveProps=function(n){if(n.feedback.reactioncount!==this.props.feedback.reactioncount)this.setState({active:null});this.setState({reactionTypes:this.getReactionTypes(n.feedback.reactioncountmap,n.max)})};m.prototype.getReactionTypes=function(n,o){var p=c("sortReactionTypes")(n,false).filter(function(q){return c("UFIReactionTypes").reactions[q]&&n[q]["default"]});if(o)p=p.slice(0,o);return p};m.prototype.onMouseEnter=function(n){if(!l)c("Bootloader").loadModules(["UFIReactionsTooltipImpl.react"],function(o){l=o;this.forceUpdate()}.bind(this),"UFIReactionsBlingTokens.react");this.setState({active:n})};m.prototype.render=function(){var n=this.props.noLinks?{}:{onFocus:this.onFocus,onKeyDown:this.onKeyDown,role:"toolbar",tabIndex:this.state.selectedIndex>-1?-1:0};return c("React").createElement("div",{className:c("joinClasses")("_3t53",this.props.className)},c("React").createElement("span",babelHelpers["extends"]({"aria-label":i._("See who reacted to this"),className:"_3t54",ref:"tokens"},n),this.state.reactionTypes.map(this.renderToken,this)),this.props.children)};m.defaultProps={className:null,size:"16"};f.exports=m}),null);
__d("XUFIReactionsSocialSentenceTooltipController",["XController"],(function a(b,c,d,e,f,g){f.exports=c("XController").create("/ufi/reaction/sentence/tooltip/",{ft_ent_identifier:{type:"String",required:true},user_count:{type:"Int"},client_id:{type:"String"}})}),null);
__d("UFICommentReactionCount.react",["cx","ActorURI","ClientIDs","React","SutroPhase2GatingConfig","UFIReactionsBlingTokens.react","UFIReactionsProfileBrowserUtils","XUFIReactionsSocialSentenceTooltipController"],(function a(b,c,d,e,f,g,h){"use strict";__p&&__p();var i,j,k=c("React").PropTypes;i=babelHelpers.inherits(l,c("React").Component);j=i&&i.prototype;l.prototype.render=function(){var m=this.props.comment,n={entidentifier:m.id,reactioncount:m.reactioncount,reactioncountmap:m.reactioncountmap,actorforpost:this.props.actorForPost,supportedreactions:this.props.supportedReactions},o="UFICommentLikeButton"+(this.props.comment.hasviewerliked?" UFICommentLikedButton":"")+(c("SutroPhase2GatingConfig").enabled_ui40?" UFISutroLikeCount":""),p="UFICommentReactionsBling _4ar- _ipn",q=c("ActorURI").create(c("XUFIReactionsSocialSentenceTooltipController").getURIBuilder().setString("ft_ent_identifier",m.id).setString("client_id",c("ClientIDs").getNewClientID()).setInt("user_count",m.reactioncount).getURI(),this.props.actorForPost),r=c("UFIReactionsProfileBrowserUtils").getDialogURI(n),s=c("UFIReactionsProfileBrowserUtils").getPageURI(n),t=this.props.contextArgs.loggedOutLinkConfig;if(t&&t.showLikeLink){r=t.likeAjaxifyURI;s="#"}return c("React").createElement("a",{ajaxify:r,"data-hover":"tooltip","data-tooltip-alignh":"center","data-tooltip-uri":q,"data-tooltip-offsety":"-3",href:s,rel:"dialog",role:"button"},c("React").createElement(c("UFIReactionsBlingTokens.react"),{className:p,feedback:n,contextArgs:this.props.contextArgs,max:3,noLinks:true,size:"16"},c("React").createElement("span",{className:o},m.reactioncountreduced)))};function l(){i.apply(this,arguments)}l.propTypes={actorForPost:k.string,comment:k.object.isRequired,contextArgs:k.object.isRequired,supportedReactions:k.array};f.exports=l}),null);
__d("FBFeedLocations",[],(function a(b,c,d,e,f,g){f.exports=Object.freeze({NEWSFEED:1,GROUP:2,GROUP_PERMALINK:3,COMMUNITY:4,PERMALINK:5,SHARE_OVERLAY:6,PERMALINK_STREAM:7,GROUP_PINNED:8,FRIEND_LIST:9,TIMELINE:10,HASHTAG_FEED:11,TOPIC_FEED:12,PAGE:13,NOTIFICATION_FEED:14,GROUP_REPORTED:15,GROUP_PENDING:16,PAGES_FEED_IN_PAGES_MANAGER:17,TICKER_CLASSIC:18,PAGES_SUGGESTED_FEED_IN_PAGES_MANAGER:19,SEARCH:20,GROUP_SEARCH:21,NO_ATTACHMENT:22,EMBED:23,EMBED_FEED:24,ATTACHMENT_PREVIEW:25,STORIES_TO_SHARE:26,PROMPT_PERMALINK:27,TREND_HOVERCARD:28,OPEN_GRAPH_PREVIEW:30,HOTPOST_IN_PAGES_FEED:31,SCHEDULED_POSTS:32,TIMELINE_NOTES:33,PAGE_INSIGHTS:34,COMMENT_ATTACHMENT:35,PAGE_TIMELINE:36,GOODWILL_THROWBACK_PERMALINK:37,LIKE_CONFIRM:39,GOODWILL_THROWBACK_PROMOTION:40,BROWSE_CONSOLE:42,GROUP_FOR_SALE_COMPACT:43,ENTITY_FEED:44,GROUP_FOR_SALE_DISCUSSION:45,PAGES_CONTENT_TAB_PREVIEW:46,GOODWILL_THROWBACK_SHARE:47,TIMELINE_VIDEO_SHARES:48,EVENT:49,PAGE_PLUGIN:50,SRT:51,PAGES_CONTENT_TAB_INSIGHTS:52,ADS_PE_CONTENT_TAB_INSIGHTS:53,PAGE_ACTIVITY_FEED:54,VIDEO_CHANNEL:55,POST_TO_PAGE:56,GROUPS_GSYM_HOVERCARD:57,GROUP_POST_TOPIC_FEED:58,FEED_SURVEY:59,PAGES_MODERATION:60,SAVED_DASHBOARD:61,PULSE_SEARCH:62,GROUP_NUX:63,GROUP_NUX_POST_VIEW:64,EVENT_PERMALINK:65,FUNDRAISER_PAGE:66,EXPLORE_FEED:67,CRT:68,REVIEWS_FEED:69,VIDEO_HOME_CHANNEL:70,NEWS:71,TIMELINE_FRIENDSHIP:72,SAVED_REMINDERS:73,PSYM:74,ADMIN_FEED:75,CAMPFIRE_NOTE:76,PAGES_CONTEXT_CARD:77,ACTIVITY_LOG:78,WALL_POST_REPORT:79,TIMELINE_BREAKUP:80,POLITICIANS_FEED:81,PRODUCT_DETAILS:82,SPORTS_PLAY_FEED:83,GROUP_TOP_STORIES:84,PAGE_TIMELINE_PERMALINK:86,OFFERS_WALLET:87,INSTREAM_VIDEO_IN_LIVE:88,SPOTLIGHT:89,SEARCH_DERP:90,SOCIAL_BALLOT:91,GROUP_SUGGESTIONS_WITH_STORY:92,SOCIAL_BALLOT_PERMALINK:93,LOCAL_SERP:94,FUNDRAISER_SELF_DONATION_FEED:95,CONVERSATION_NUB:97,GROUP_TOP_SALE_STORIES:98,GROUP_LEARNING_COURSE_UNIT_FEED:99,SUPPORT_INBOX_READ_TIME_BLOCK:100,PAGE_POSTS_CARD:101,CRISIS_POST:102,SUPPORT_INBOX_GROUP_RESPONSIBLE:103,PAGE_POST_DIALOG:104,CRISIS_DIALOG_POST:105,PAGE_LIVE_VIDEOS_CARD:106,PAGE_POSTS_CARD_COMPACT:107,GROUP_MEMBER_BIO_FEED:108,LIVE_COMMENT_ATTACHMENT:109,GROUP_COMPOSER:110,GROUP_INBOX_GROUP:111,GROUP_INBOX_AGGREGATED:112,ENDORSEMENTS:113,EVENTS_DASHBOARD:114,CURATED_COLLECTIONS_PAGE:115,OYML:116,COLLEGE_HOMEPAGE:117,GROUP_LIVE_VIDEOS_CARD:118,COLLEGE_HIGHLIGHTS:119,VIDEO_PERMALINK:120,JOB_CAROUSEL_NETEGO:121,TOPIC_PAGE:122,USER_SCHEDULED_POSTS:123,GOODWILL_THROWBACK_ATTACHMENT_PREVIEW:124,INSTREAM_VIDEO_IN_WASLIVE:125,INSTREAM_VIDEO_IN_NONLIVE:126,SIGNAL_APP:127,ALBUM_FEED:128,TOP_MARKETPLACE_STORIES:129,CE_PII_STRIPPED_FEED:130,TAHOE:131,SAVE_COUNT_DIALOG:132,GROUP_POST_TAG_FEED:133,GOV_DIGEST:134,GROUP_SCHEDULED:135,GAMEROOM_FEED:136,WORKPLACE_HUB_PREVIEW:137,BRANDED_CONTENT_TRENDING_POSTS:138,GROUP_ANNOUNCEMENTS:139,GROUP_ANNOUNCEMENTS_FEED:140,EXTERN_CE_PII_STRIPPED_FEED:141,CRISIS_HUB_DESKTOP:142,GROUP_DRAFT_POSTS:143,TRENDING_ISSUES:144,GAME_HUB_FEED:145,LUMOS_POST_PREVIEW:146,BRANDED_CONTENT_PAGE_SETTINGS:147,PETITIONS:148,BC_MULTI_POST_REVIEW:149,ADS_TRANSPARENCY_SHOW_ADS:150,POLITICAL_POST_FEED:151,RECOMMENDATIONS_DASHBOARD:152,SEEN_CONTENT:153,AGGREGATED_FEED:154,GROUP_HOISTED:155,GROUP_MENTORSHIP_OVERVIEW_FEED:156})}),null);
__d("UFIReactionBadgeDecorator.react",["cx","FBFeedLocations","FeedbackSourceType","React","UFICommentReactionCount.react","idx","queryThenMutateDOM"],(function a(b,c,d,e,f,g,h){"use strict";__p&&__p();var i,j,k=300,l=180,m=200;i=babelHelpers.inherits(n,c("React").PureComponent);j=i&&i.prototype;function n(){var o,p;for(var q=arguments.length,r=Array(q),s=0;s<q;s++)r[s]=arguments[s];return p=(o=j.constructor).call.apply(o,[this].concat(r)),this.rootElement=null,this.renderAtBottomCanceller=null,this.state={renderAtBottom:true},p}n.prototype.componentDidMount=function(){__p&&__p();var o=k;if(this.props.contextArgs.source===c("FeedbackSourceType").PHOTOS_SNOWLIFT)o=l;else if(this.props.contextArgs.source===c("FeedbackSourceType").TAHOE)o=m;var p=true;this.renderAtBottomCanceller=c("queryThenMutateDOM")(function(){p=this.rootElement!==undefined&&this.rootElement!==null&&this.rootElement.offsetWidth>=o||this.props.isFullWidthAttachment===true}.bind(this),function(){this.renderAtBottomCanceller=null;if(!p)this.setState({renderAtBottom:false})}.bind(this))};n.prototype.componentWillUnmount=function(){this.renderAtBottomCanceller&&this.renderAtBottomCanceller.cancel()};n.prototype.render=function(){var o,p=this.props.comment.reactioncount>0&&this.props.contextArgs.feedLocationType!=c("FBFeedLocations").CE_PII_STRIPPED_FEED?c("React").createElement(c("UFICommentReactionCount.react"),{comment:this.props.comment,actorForPost:this.props.feedback.actorforpost,supportedReactions:this.props.feedback.supportedreactions,contextArgs:this.props.contextArgs}):null;return c("React").createElement("div",{className:"_10la"+(this.state.renderAtBottom?" _10lg":"")+(this.props.isFlexibleWidthAttachment?" _t-l":"")+(this.props.isFullWidthAttachment?" _3qr8":"")+("comment_place_info"===((o=this.props.comment)!=null?(o=o.attachment)!=null?o.type:o:o)?" _m_9":""),ref:function(q){this.rootElement=q}.bind(this)},this.props.children,c("React").createElement("div",{className:"_10lo"+(this.props.comment.reactioncount?" _10lp":"")},p))};f.exports=n}),null);
__d("FbtLoggerImpl",["BanzaiLogger","ScriptPath"],(function a(b,c,d,e,f,g){var h={logImpression:function i(j){c("BanzaiLogger").log("FbtImpressionsLoggerConfig",{hash:j,sample_rate:100,script_path:c("ScriptPath").getScriptPath()})}};f.exports=h}),null);