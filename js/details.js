define(function(){
    function details(){
        var id = location.search
        id = id.slice(1)
        // console.log(id);
        $.ajax({
            url : '../data/details.json',
            type : 'get',
            success : function(result){
                // console.log(result);
                // console.log(result[0].id);
                for(var i=0;i<result.length;i++){
                    if(result[i].id == id){
                        $(`
                        <div class="Img">
                            <div class="img">
                                <img src="${result[i].url[0]}" alt="" class="detail_img">
                                <div class="mask"></div>
                                <img class="details_img" src="./image/shopList/img%20(1).jpg" alt="网络错误，图片未能加载">
                            </div>
                            <div class="detail_box">
                                <div class="prev"></div>
                                <div class="detail_box_content">
                                    <div>
                                        
                                    </div>
                                </div>
                                <div class="next"></div>
                            </div>
                        </div>
                        <div class="introduce">
                            <div class="title">
                                <span>${result[i].title}</span>
                            </div>
                            <div class="price">
                                <span class="page">价格</span>
                                <span class="new">￥${result[i].new}</span>
                                <span class="old">￥${result[i].old}</span>
                            </div>
                            <div class="all">
                                <span class="all_title">活动</span>
                                <span class="inner">两件及以上10%OFF</span>
                                <span class="right">更多</span>
                                <div class="sale">
                                    <ul>
                                        两件及以上10%OFF
                                        <li><a href="./list.html">2021-01-29至2021-02-04期间特惠</a></li>
                                        <li><a href="./list.html">仅限部分商品</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="Size">
                                <div class="size">
                                    <div class="size_title">尺码</div>
                                    <ul>
                                        <li></li>
                                    </ul>
                                </div>
                                <div class="color">
                                    <div class="size_title">颜色</div>
                                    <ul>
                                        <li></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="mode">
                                <div class="size_title">配送方式</div>
                                <ul>
                                    <li><a href="#">快递寄送</a></li>
                                </ul>
                            </div>
                            <div class="number">
                                <div class="size_title">数量</div>
                                <div class="right">
                                    <span class="del">-</span>
                                    <input type="text" class="ipt" value="1">
                                    <span class="add">+</span>
                                    <i>件</i>
                                </div>
                            </div>
                            <div class="btn">
                                <a href="#">立即购买</a>
                                <a href="#" class="active" data-id="${result[i].id}">加入购物车</a>
                            </div>
                        </div>
                            `).appendTo('#details')
                            // console.log(result[i].size);
                            for(var j =0;j<result[i].size.length;j++){
                                // console.log(result[i].size[j]);
                                $(`
                                    <a href="#">${result[i].size[j]}</a>
                                `).appendTo('#details .size ul li')
                            }
                            // console.log(result[i].color);
                            for(var k =0;k<result[i].color.length;k++){
                                $(`
                                    <a href="#">${result[i].color[k]}</a>
                                `).appendTo('#details .color ul li')
                            }

                            console.log(result[i].one_img);
                            for(var l=0;l<result[i].one_img.length;l++){
                                $(`<img src=${result[i].one_img[l]} alt="网络错误，图片未加载">`).appendTo('.detail_box_content>div')
                            }
                            magnifier()
                    }
                        
                }
            },
            error : function(msg){
                console.log(msg);
            }
        })
        
    }

    function shopping(){

        var flagsize = false
        var flagcolor = false

        $('#details').on('click','.size a',function(){
            // console.log(123455);
            if($(this).hasClass('actived')){
                $(this).removeClass('actived')
                flagsize = false
            }else{
                $(this).addClass('actived').siblings().removeClass('actived')
                flagsize = true
                console.log($(this).attr('class'));
            }
            
            
            // console.log(flagsize);
        })

        $('#details').on('click','.color a',function(){
            // console.log(123455);

            if($(this).hasClass('actived')){
                $(this).removeClass('actived')
                flagcolor = false
            }else{
                $(this).addClass('actived').siblings().removeClass('actived')
                flagcolor = true
            }
            
            // console.log(flagcolor);
        })


        // console.log(123);

        $('#details').on('click','.btn .active',function(){
            if(flagsize==true && flagcolor==true){
                var id = $(this).attr('data-id')
                var num = parseInt($('.number .ipt').val())
                console.log(num);
                // console.log(id);
                var goodArr = []

                if(localStorage.getItem('goods')){
                    goodArr = JSON.parse( localStorage.getItem('goods') )
                }

                var flag = false
                

                $.each(goodArr,function(index,item){
                    if(item.id === id){
                        item.num+=num
                        flag =  true
                    }
                })

                if(!flag){
                    goodArr.push({"id":id,"num":num})
                }

                localStorage.setItem('goods',JSON.stringify(goodArr))
                alert('加入购物车成功')
            }else{
                alert('未选择颜色,或者尺寸')
            }
        })
        

        $('#details').on('click','.right .del',function(){
            console.log(123);
            var text = parseInt($('#details .ipt').val())
            text--
            if(text <=0){
                return
            }
            // console.log(text);
            $('#details .ipt').val(text)

        })

        $('#details').on('click','.right .add',function(){
            console.log(123);
            var text = parseInt($('#details .ipt').val())
            text++
            if(text <=0){
                return
            }
            // console.log(text);
            $('#details .ipt').val(text)

        })

    }

    function magnifier() {
        /*放大镜*/
        let minBox = $('.img')
        let $mask = $('.mask')//遮罩层
        let maxImg = $('.details_img')//大图
        minBox.mousemove(function (ev) {
            let e = window.event || ev
            e.preventDefault()
            let maskLeft = e.pageX - minBox.offset().left - ($mask.width() / 2)
            let maskTop = e.pageY - minBox.offset().top - ($mask.height() / 2)
            //临界值判断
            if (maskLeft <= 0) {
                maskLeft = 0
            }
            if (maskLeft >= minBox.width() - $mask.width()) {
                maskLeft = minBox.width() - $mask.width()
            }
            if (maskTop <= 0) {
                maskTop = 0
            }
            if (maskTop >= minBox.height() - $mask.height()) {
                maskTop = minBox.height() - $mask.height()
            }
            //比例计算
            let scaleX = maskLeft / (maxImg.width() - minBox.width() * 1.5)
            let scaleY = maskTop / (maxImg.height() - minBox.height() * 1.5)
            let left = -((maxImg.width() - minBox.width()) * scaleX)
            let top = -((maxImg.height() - minBox.height()) * scaleY)
            $mask.css("left", maskLeft + "px")
            $mask.css("top", maskTop + "px");

            maxImg.css("left", left + "px")
            maxImg.css("top", top + "px")
        })

        /*点击图片切换*/
        let $imgs = $('.detail_box_content>div img')
        let minImg = $('.detail_img')//小图
        let src = ""
        let currentImgIndex = 0
        $.each($imgs, function (index, item) {
            $(item).click(function () {
                currentImgIndex = $(this).index()
                replaceIndex(currentImgIndex)
            })
        })

        /*点击按钮切换图片*/
        let $detail_box_content = $('.detail_box_content')
        let $prev = $('.prev')
        let $next = $('.next')

        $prev.click(function () {
            currentImgIndex = (currentImgIndex + $imgs.length - 1) % $imgs.length
            replaceIndex(currentImgIndex)
            movePrev(currentImgIndex)
        })


        let imageScorll = ($imgs.width() + 15) / 2 // 15是外边距
        $next.click(function () {
            currentImgIndex = (currentImgIndex + 1) % $imgs.length
            replaceIndex(currentImgIndex)
            moveNext(currentImgIndex)
        })

        // 移动到上一张
        function movePrev(index) {
            if (index < 0) {
                index = $imgs.length
                $detail_box_content.stop().animate({'scrollLeft': index * imageScorll})
            }
            $detail_box_content.stop().animate({'scrollLeft': index * imageScorll})
        }

        // 移动到下一张
        function moveNext(index) {
            if (index > $imgs.length) {
                index = 0
                $detail_box_content.scrollLeft(0)//滚动条设置到0的位置
            }
            console.log($detail_box_content.scrollLeft());
            // $detail_box_content.stop().animate({'scrollLeft': index * 80})
            $detail_box_content.stop().animate({'scrollLeft': index * imageScorll})
        }

        //更换图片索引方法
        function replaceIndex(Index) {
            $imgs.eq(Index).css('border', '1px solid #7f0019').siblings().css('border', 0)
            src = $imgs.eq(Index).attr('src')
            minImg.stop().animate({'left': -518, 'dispaly': 'none'}, function () {
                minImg.css({'display': 'block', 'left': 0,'opacity':0})
                minImg.stop().animate({'opacity':1},300)
                minImg.attr('src', src)
                maxImg.attr('src', src)
            })
        }
    }
    return{
        details :details,
        shopping : shopping,
    }
})