define(['jquery'],function($){
    
    function shoppingCar(){
        // console.log(1233);
        if(localStorage.getItem('goods')){
            var goodArr = JSON.parse( localStorage.getItem('goods') )

            $.ajax({
                url : '../data/details.json',
                type : 'get',
                success : function(result){
                    var str = ''
                    // console.log(result);
                    $.each(result,function(index,item){
                        $.each(goodArr,function(ind,ite){
                            if(item.id == ite.id){
                                // console.log(item,index);
                                // console.log(ite,ind);
                                // console.log(item.url);
                                // console.log($('#details .size ul li a').attr('class'));
                                $(
                                `
                                    <div class="list">
                                        <input type="checkbox" class="check">
                                        <img src="${item.url}" alt="">
                                        <div class="info">
                                            ${item.title}
                                        </div>
                                        <div class="attribute">
                                            <div class="size">尺寸：${item.size}</div>
                                            <div class="color">颜色规格：${item.color}</div>
                                            <div class="size">配送方式：快递配送</div>
                                        </div>
                                        <div class="price">
                                            <p class="old">￥${item.old}</p>
                                            <p class="new">￥<i>${item.new}</i></p>
                                        </div>
                                        <div class="number">
                                            <span class="del" data-less="${item.id}">-</span>
                                            <input type="text" class="ipt" value="${ite.num}" data-number="${item.id}">
                                            <span class="add" data-add="${item.id}">+</span>
                                        </div>
                                        <div class="money">
                                            <span>￥<i>${item.new*ite.num}</i></span>
                                        </div>
                                        <div class="delete" data-del="${item.id}">
                                            删除
                                        </div>
                                    </div>
                                
                                `).appendTo('#Shopping .product')
                            }
                        })
                    })
                    
                },
                error : function(msg){
                    console.log(msg);
                }
            })

            // 删除
            $('.product').on('click','.list .delete',function(){
                var id = $(this).attr('data-del')
                $.each(goodArr,function(index,item){
                    if(item.id == id){
                        goodArr.splice(index,1)
                        return false
                    }
                })

                $(this).parent().remove()
                localStorage.setItem('goods',JSON.stringify(goodArr))
                if(goodArr.length==0){
                    localStorage.removeItem('goods')
                    var info = '<li>购物车暂无数据</li>'
                    $('#Shopping .product').html(info)
                }
            })
            // 全选
            var num1 = 0
            var sum1 = 0
            $('.left').on('click','.ipt',function(){

                // var num2 =0;
                var input = $('.list .check')
                for(var j=0;j<input.length;j++){
                    var i = parseInt($(input).eq(j).siblings('.number').find('input').val())
                    var k = parseInt($(input).eq(j).siblings('.money').find('i').text())
                    // console.log(k);
                    if($(input).eq(j).prop('checked') == true){
                        
                    }else{
                        num1 += i
                        sum1 += k
                    }
                    
                }
                
                if($(this).prop('checked')){
                    $('.list input').prop('checked',true)
                }else{
                    $('.list input').prop('checked',false)
                    num1 = 0
                    sum1 = 0
                }
                $('.right .num i').text(num1)
                $('.right .sum i').text(sum1)

            })
            
            // num1 = parseInt(num1)
            $('.product').on('click','.list .check',function(){
                
                var input = $('.list .check')
                var i = parseInt($(this).siblings('.number').find('input').val())
                var k = parseInt($(this).siblings('.money').find('i').text())
                // console.log(k);

                // if($(this)[0].checked == false){
                //     num1 -=i
                // }else{
                //     num1 +=i
                // }

                if($(this).prop('checked')){
                    num1 += i
                    sum1 += k
                }else{
                    num1 -= i
                    sum1 -= k
                }
                // console.log();
                // console.log(num1);

                // for(var j=0;j<input.length;j++){
                //     var i = parseInt($(this).siblings('.number').find('input').val())
                //     if(input[j].checked == true){
                //         // num++
                //         num += i
                //     }
                // }
                $('.right .num i').text(num1)
                $('.right .sum i').text(sum1)
                
                for(var i=0;i<input.length;i++){
                    if(input[i].checked == false){
                        $('.left .ipt').prop('checked',false)
                        
                        return
                    }
                    $('.left .ipt').prop('checked',true)
                    // console.log(input[i].checked);
                }
                
                
            })
            
            // 添加商品
            $('.product').on('click','.list .add',function(){
                var id = $(this).attr('data-add')
                var _this = this
                $.each(goodArr,function(index,item){
                    if(item.id == id){
                        item.num++

                        
                        $(_this).siblings('input').val(item.num)
                        var price = parseInt($(_this).parent().siblings('.price').find('.new').find('i').text())
                        // console.log(price);
                        // var num = $(_this).siblings('input').val()
                        var num = item.num
                        var sum = parseInt(price) * parseInt(num)
                        $(_this).parent().siblings('.money').find('i').text(sum)
                        // console.log(sum);

                        // console.log($(_this).parent().siblings('input'));

                        if($(_this).parent().siblings('input')[0].checked == true){
                            num1++
                            sum1+=price
                            $('.right .num i').text(num1)
                            $('.right .sum i').text(sum1)
                        }
                        var i = parseInt($(this).siblings('.number').find('input').val())

                        // if($(this)[0].checked == false){
                        //     num1 -=i
                        // }else{
                        //     num1 +=i
                        // }
                    }
                })
                localStorage.setItem('goods',JSON.stringify(goodArr))
            })
            // 减少商品
            $('.product').on('click','.list .del',function(){
                var id = $(this).attr('data-less')
                // console.log(id);
                var _this = this
                $.each(goodArr,function(index,item){
                    
                    if(item.id == id){
                        item.num--
                        if(item.num <= 1){
                            $(_this).siblings('input').val(1)
                            item.num =1
                            $(_this).parent().siblings('.money').find('i').text($(_this).parent().siblings('.price').find('.new').find('i').text())
                            return
                            // $(_this).attr('click','')
                        }
                        $(_this).siblings('input').val(item.num)
                        var price = $(_this).parent().siblings('.price').find('.new').find('i').text()
                        // var num = $(_this).siblings('input').val()
                        var num =  item.num
                        
                        // price = price.splice(1)
                        // console.log(price);
                        // console.log(num);
                        var sum = parseInt(price) * parseInt(num)
                        $(_this).parent().siblings('.money').find('i').text(sum)
                        // console.log(sum);

                        if($(_this).parent().siblings('input')[0].checked == true){
                            num1--
                            sum1-=price
                            $('.right .num i').text(num1)
                            $('.right .sum i').text(sum1)
                        }
                        
                        
                        

                    }
                })
                localStorage.setItem('goods',JSON.stringify(goodArr))

            })
            // 输入的数量
            var oldNumner = 0
            $('.product').on('focus','.number .ipt',function(){
                oldNumner = parseInt($(this).val())
                // console.log(oldNumner);
            })
            $('.product').on('blur','.number .ipt',function(){
                var id = $(this).attr('data-number')
                // console.log(id);
                var newNumber = $(this).val()
                $(this).val(newNumber)
                var _this = this

                var price = parseInt($(this).parent().siblings('.price').find('.new').find('i').text())
                // console.log(price);
                $(this).parent().siblings('.money').find('i').text(newNumber*price)
                $.each(goodArr,function(index,item){
                    if(item.id == id){
                        item.num = newNumber
                        if($(_this).parent().siblings('input')[0].checked == true){
                            if(newNumber-oldNumner > 0){
                                num1 += (newNumber - oldNumner)
                                sum1 += (newNumber - oldNumner)*price
                            }else{
                                // num1 -+ (oldNumner - newNumber)
                                num1 += (newNumber - oldNumner)
                                sum1 += (newNumber - oldNumner)*price
                            }
                            $('.right .num i').text(num1)
                            $('.right .sum i').text(sum1)
                        }
                        

                    }
                })
                localStorage.setItem('goods',JSON.stringify(goodArr))
            })

            // 结算
            $('#add').on('click','.right .result',function(){
                // console.log($('.list input'));
                // var input = $('.list .check')
                // var result = 0
                // $.each(input,function(index,item){
                //     if(input.eq(index).prop('checked')){
                //         console.log(input.eq(index).siblings('.money').find('i').text());
                //         result += parseInt(input.eq(index).siblings('.money').find('i').text())
                //         // console.log(input.eq(index).siblings('.number').find('.ipt').val());
                //     }
                //     // if(input[index])
                // })
                // console.log(result);
                var result = $('.right .sum i').text()
                if(result==0){
                    alert("未选取商品")
                }else{
                    alert("商品一共的价格："+result)
                }
            })

            // 删除
            $('#add').on('click','.left .delAll',function(){
                // console.log(1231);
                var input = $('.list .check:checked')
                console.log(input);
                $.each(input,function(index,item){
                    // console.log(index,item);
                    var id = $(this).eq(index).siblings('.delete').attr('data-del')
                    // console.log(id);
                    var _this = this
                    $.each(goodArr,function(ind,ite){
                        // console.log(ind,ite);
                        if(id == ite.id){
                            // console.log('cs');
                            goodArr.splice(ind,1)
                            return false
                        }
                    })
                    $(_this).eq(index).siblings('.delete').parent().remove()
                    localStorage.setItem('goods',JSON.stringify(goodArr))
                    if(goodArr.length==0){
                        localStorage.removeItem('goods')
                        var info = '<li>购物车暂无数据</li>'
                        $('#Shopping .product').html(info)
                    }
                })
            })
        }   


    }

    return {
        shoppingCar : shoppingCar
    }
})