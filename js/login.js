define(function () {
    let verificationCode = function () {
        /*表单验证*/
        let $iptPhone = $('.ipt')//手机号
        let $yz = $('.yz')//验证码
        let $sendYZ = $('.sendYz')//发送验证码按钮
        let $go = $('.go')//登录按钮
        let $back = $('.back')//返回按钮
        let $tips1 = $('.tips1')
        let $tips2 = $('.tips2')
        let $mask = $('.login_mask')//遮罩层
        let $close = $('.close')//关闭遮罩层按钮
        let $login = $('.login')
        let arr = []//用于判断表单验证的数组

        /*选项卡切换*/
        let $loginNav = $('.loginNav>div')
        $loginNav.each(function (index, item) {
            $(item).click(function () {
                $(this).addClass("loginNav_show").siblings().removeClass()
            })
        })

        $iptPhone.focus(function () {
            $tips1.css('display', 'none')
        })
        $iptPhone.blur(function () {
            if (!$(this).val()) {
                return
            }
            let val = $(this).val().replace(/\s+/g, '');//去掉空格
            let reg = /^1[3456789]\d{9}$/
            if (reg.test(val)) {
                arr.length = 0
                $tips1.css('display', 'none')
            } else {
                $tips1.css('display', 'inline-block')
                arr.push(1)
            }
        })

        var verifyCode = {str: "", imgUrl: ""}//验证码接口验证对象
        $close.click(function () {
            $mask.css("display", "none")
            if (!$yz.val()) {
                return
            }
            $yz.focus()
        })
//图片点击发送请求
        $('.img').click(function () {
            //请求验证码
            code()
        })
//验证码按钮请求
        $sendYZ.click(function () {
            $yz.val("")
            code()//请求验证码
            $mask.css("display", "inline-block")
        })
        $login.on("focus", ".yz", function () {
            $tips2.css('display', 'none')
            if (!$yz.val()) {
                return
            }
            let reg = new RegExp('\\b' + verifyCode.str + '\\b', 'im');
            if ($(this).val().search(reg) === -1) {
                $tips2.css('display', 'inline-block')
                return
            }
            var txt = $yz.val()
            $yz.val(txt)
        })
        $login.on("blur", ".yz", function () {
            $tips2.css('display', 'none')
            if (!$yz.val()) {
                return
            }
            let reg = new RegExp('\\b' + verifyCode.str + '\\b', 'im')
            if ($(this).val().search(reg) === -1) {
                $tips2.css('display', 'inline-block')
                arr.push(1)
                return
            }
            arr.length = 0
        })
        $go.click(function () {
            if (!$iptPhone.val()) {
                $tips1.css('display', 'inline-block');
                return;
            } else {
                if (!$yz.val()) {
                    $tips2.css('display', 'inline-block');
                    return;
                }
            }
            //获取表单内容
            if (arr.length === 0) {
                location.href = "index.html?phone" + $iptPhone.val() + "&yz=" + $yz.val()
                //点击清空内容
                $iptPhone.val("")
                $yz.val("")
            }
        })
        $back.click(function () {
            if ($iptPhone.val() || $yz.val()) {
                //点击清空内容
                $iptPhone.val("")
                $yz.val("")
            } else {
                location.href = "index.html"
            }
        })

//验证码请求
        function code() {
            $.ajax({
                url: "https://www.mxnzp.com/api/verifycode/code?"
                // url: "https://www.mxnzp.com/api/verifycode/code?len=5&type=0&app_id=cgdhozkmnhjnpdsm&app_secret=cVBDWnBaalM2ajZaajNEVFgvRExPQT09"
                , type: "get"
                , data: {len: 5, type: 0, app_id: "qichmpihqowxmlie", app_secret: "ZHhQb1FIVDU0MDQ5YW5RRHFBWlAzQT09"}
                , dataType: "json"
                , timeout: 5000
                , success: function (json) {
                    verifyCode.str = json.data.verifyCode//验证文本
                    verifyCode.imgUrl = json.data.verifyCodeImgUrl
                    $('.img').attr("src", verifyCode.imgUrl)
                }
                , error: function (err) {
                    console.log(err.status);
                }
            })
        }
    }

    return {
        verificationCode: verificationCode
    }
})