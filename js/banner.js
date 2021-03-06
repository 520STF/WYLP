define(['jquery','dataBase'],function($,arr){

    function banner(){
        var iNow = 0;
        var content = $('#banner .content')
        var imgWidth = $('.content img').eq(1).width()
        var pages = null
        var timer = null;
        if(!pages){
            pages = $('#banner .pages span')
            // console.log(pages);
        }
        
        pages.click(function(){
            // clearInterval(timer)
            iNow = $(this).index()
            tab()
        })

        timer = setInterval(()=>{
            iNow++
            tab()
        },3000)

        function tab(){
            // if(iNow == 4){
            //     iNow =0
            // }
            pages.attr('class','').eq(iNow).attr('class','show')
            if(iNow == pages.size()){
                pages.eq(0).attr('class','show')
            }

            content.animate({
                left : iNow * -imgWidth
            },500,function(){
                if(iNow==pages.size()){
                    iNow = 0
                    content.css({
                        left : 0
                    })
                }
            })
        }

        $('#banner .prev,#banner .next').click(function(){
            if(this.className == 'prev'){
                iNow--
                if(iNow == -1){
                    iNow = 3
                }
            }else{
                iNow++
            }
            tab()
        })
        
    }
    function list(){
        $.ajax({
            url : './data/index.json',
            type : 'get',
            success : function(result){
                for(var i=0;i<result.length;i++){
                    $(`
                    <div class="item">
                        <div class="img">
                            <a href="./list.html"  target="_blank"><img src="${result[i].url}" alt=""></a>
                            <div class="text">${result[i].text}</div>
                        </div>
                        <div class="info">
                            <p>${result[i].text}</p>
                        </div>
                    </div>
                    `).appendTo('#list')
                }
                // console.log(result);
            },
            error : function(msg){
                console.log(msg);
            }
        })
    }
    
    let data = function () {
        /* newShop数据渲染 */
        let $newShop_bottom = $('.newShop_bottom')
        let str = ""
        for (let i = 0, len = arr.newShopObj.newShop.length; i < len; i++) {
            str += `<div class="newShop_bottom_box">
                <div>
                    <a href="./list.html"><img src="${arr.newShopObj.newShop[i].imgUrl}" alt="单击查看图片详情"></a>
                </div>
                <p>${arr.newShopObj.newShop[i].text}</p>
                <span>${arr.newShopObj.newShop[i].price} <span>${arr.newShopObj.newShop[i].linePrice}</span></span>
                <span>${arr.newShopObj.newShop[i].sales}</span>
            </div>`
        }
        $newShop_bottom.html(str)
        /* goods 数据渲染 */
        let $goods_bootom = $('.goods_bottom')
        let obj = {array: [], one: "", two: "", three: ""}
        let str1 = ""
        obj.one = "<p class='goods_bottom_p1'>衣服·杂货</p>"
        obj.two = "<p class='goods_bottom_p2 clearfix'>生活·杂货</p>"
        obj.three = "<p class='goods_bottom_p3'>食品</p>"
        // console.log(arr.goods.length);
        for (var i = 0, len = arr.goods.length; i < len; i++) {
            str1 = `<div class="goods_bottom_box">
                    <a href="#">
                    <div class="clearfix">
                        <img src="${arr.goods[i].imgUrl}" alt="单击查看图片详情">
                        <span>${arr.goods[i].text}</span>
                    </div>
                    </a>
                </div>`
            if (obj.array.length <= arr.goods.length) {
                obj.array.push(str1)
            }
        }
        obj.array.unshift(obj.one)
        obj.array.splice(8, 0, obj.two)
        obj.array.splice(18, 0, obj.three)
        $goods_bootom.html(obj.array.join(""))
        /* newShop数据渲染 */
        let $salesRanking_bottom = $('.salesRanking_bottom')
        let str2 = ""
        for (let i = 0, len = arr.newShopObj.salesRanking.length; i < len; i++) {
            str2 += `<div class="salesRanking_bottom_box">
                <div>
                    <a href="#"><img src="${arr.newShopObj.salesRanking[i].imgUrl}" alt="单击查看图片详情"></a>
                </div>
                <p>${arr.newShopObj.salesRanking[i].text}</p>
                <span>${arr.newShopObj.salesRanking[i].price} <span>${arr.newShopObj.salesRanking[i].linePrice}</span></span>
                <span>${arr.newShopObj.salesRanking[i].sales}</span>
            </div>`
        }
        $salesRanking_bottom.html(str2)
    }

    return{
        banner : banner,
        list : list,
        data : data,
    }
})