console.log('加载成功');

/*
    配置当前这个项目用到了哪些模块
    遵从AMD规范
*/ 

require.config({
    paths:{
        'jquery':'jquery-1.11.3',
        'jquery-cookie': 'jquery.cookie',
        'banner' : 'banner',
        'list' : 'list',
        'details' : 'details',
        'dataBase' : 'dataBase',
        'login' : 'login',
        'shoppingCar' : 'shoppingCar'
    },
    shim:{
        'jquery-cookie' : ['jquery']
    }
})

require(['banner','list','details','login','shoppingCar'],function(banner,list,details,login,shoppingCar){
    banner.banner()
    banner.list()
    banner.data()

    list.list()
    list.header()
    list.clickCar()
    list.footer()

    details.details()
    details.shopping()

    login.verificationCode()

    shoppingCar.shoppingCar()
})
