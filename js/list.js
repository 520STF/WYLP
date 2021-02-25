define(['jquery'],function($){
    function list(){

        $.ajax({
            url : './data/list.json',
            type : 'get',
            success : function(result){
                // console.log(result);
                for(var i=0;i<result.length;i++){
                    $(`
                    <div class="item">
                    <a href="./details.html?${result[i].id}" target="_blank"><img src="${result[i].url}" alt=""></a>
                        <p>${result[i].p}</p>
                        <span class="new">${result[i].new}</span><span class="old">${result[i].old}</span><i>${result[i].number}</i>
                    </div>
                    `).appendTo('#shopping .Item')
                }
            },
            error : function(msg){
                console.log(msg);
            }
        })

    }
    function header(){
        $('.header').load('./header.html')
    }
    function footer(){
        $('.footer').load('./footer.html')
    }
    function clickCar(){
        // console.log(123);
        $('.header').on('click','.seach .shopping',function(){
            location.assign('./shoppingCar.html')
        })
    }
    return {
        list : list,
        header : header,
        clickCar : clickCar,
        footer : footer
    }
})