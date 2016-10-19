define(['jquery','js/city','js/dialog'],function($,city,dialog){
    if(location.href.indexOf('message.html')==-1) return;
$(".choiseCity").on('click',function(){
    city.show($('.adderss'));
})
    var dialogs=new dialog()
    $(".submit").on('click',function(){
        var address=$('.adderss').val();
        var per=$(".person").val();
        var phone=$('.phone').val();
        if(address==""){
            dialogs.alert({
                text:"请选择地址"
            })
            return;
        }else if(per==""){
            dialogs.alert({
                text:"请输入姓名"
            })
            return;
        }else if(phone==''){
            dialogs.alert({
                text:"请输入电话"
            })
            return;
        }else{
            dialogs.alert({
                text:"保存成功"
            })
        }
       location.href='message.html?address='+address+'&per='+per+'&phone='+phone+'';


})
})