define(["app"],function(app){app.filter("defaultHeadImg",function(){return function(input,sex){return null!==input&&""!==input||(input="男"===sex||null===sex||""===sex||void 0===sex?"../contents/img/men-head.png":"../contents/img/women-head.png"),input}}),app.filter("defaultImg",function(){return function(input,type){return null!=input&&""!=input||("doc"===type&&(input="../contents/img/doc-head.png"),"pro"===type&&(input="../contents/img/p_default.png")),input}})});