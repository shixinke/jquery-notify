## jQuery notify

## 使用步骤

1 加载jquery.notify.css样式

    <link href="/jquery-notify/src/notify.css" rel="stylesheet">

2 在HTML底部添加jquery.notify.js类包文件(当然先要加载jquery库)

    <script src="/jquery-notify/src/jquery.notify.js"></script>
    
3 调用

    $.notify({title :'提示', content:'３秒后自动关闭', timeout:3000});
    
## 效果

![效果图片](https://github.com/shixinke/jquery-notify/blob/master/snapshot/nofity.png)    
    
## 主要参数

* timeout 自动关闭时间，默认值为4500毫秒
* title 提示标题
* content 提示内容
* icon 使用的主要字体类，如iconfont
* iconType 使用的字体图标类，如icon-success
* closeIcon 关闭的图标
* position 位置，可使用 top-left/top-right/bottom-left/bottom-right
* onClose 点击关闭按钮触发的函数
* onClick 点击内容触发的函数
* offset 多个提示框的间隔像素
* url 点击内容跳转的URL

## 演示

[演示](https://shixinke.github.io/jquery-notify/examples/basic.html)

### author

shixinke 

email:ishixinke@qq.com

website:http://www.shixinke.com


