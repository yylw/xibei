define(['jquery'],function($){
    var Dialog=function(){
        var dBox=$("<div class='dBox'></div>");
        var mark=$("<div class='mark'></div>");
        var modules=$("<div class='modules'></div>");
        dBox.append(mark)
        dBox.append(modules);
        this.mark=mark;
        this.dBox=dBox;
        this.modules=modules;
    }
    Dialog.prototype={
        init:function(){
            $(".container").append(this.dBox)

        },
        alert:function(data){
            this.modules.append("<p class='dialogtext'></p><div class='buttonBox'><span></span><button class='sure rights' value='1'>确定</button></div>")
            this.init()
            this.data=data;
            this.modules.find(".dialogtext").html(this.data.text)
            this.bindEvent();
        },
        confirm:function(data){
            this.modules.append("<p class='dialogtext'></p><div class='buttonBox'><button class='sure lefts' value='1'>确定</button><button class='cancel rights' value='0'>取消</button></div>")
            this.init();
            this.data=data;
            this.modules.find(".dialogtext").html(this.data.text)
            this.bindEvent();
        },
        hide:function(){
            this.dBox.remove();
        },
        bindEvent:function(){
            var that=this;
            this.mark.on("click",function(){
                that.hide();
                that.modules.html("")
            })
            this.modules.find(".sure").on("click",function(){
                that.hide()
                that.modules.html("")
            })
            this.modules.find(".cancel").on("click",function(){
                that.hide()
                that.modules.html("")
                return;
            })
        }
    }
    return Dialog;
})
