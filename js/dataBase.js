define(function () {
    /*新商品*/
    let newShopObj = {
        newShop: [
            {
                imgUrl: "./image/home/img%20(71).jpg"
                , text: "含耗牛绒羊毛 宽版毛衣"
                , price: "￥ 249"
                , linePrice: "￥498"
                , sales: "月销量57"
            }
            , {
                imgUrl: "./image/home/img%20(32).jpg"
                , text: "香味蜡烛·迷你 木质香"
                , price: "￥ 32"
                , linePrice: ""
                , sales: "月销量32"
            }
            , {
                imgUrl: "./image/home/img%20(57).jpg"
                , text: "轻量羽绒便携式 风帽夹克衫"
                , price: "￥ 418"
                , linePrice: "￥598"
                , sales: "月销量27"
            }
            , {
                imgUrl: "./image/home/img%20(58).jpg"
                , text: "羽绒 不易沾水风帽夹克"
                , price: "￥ 749"
                , linePrice: "￥1498"
                , sales: "月销量111"
            }
            , {
                imgUrl: "./image/home/img%20(52).jpg"
                , text: "新疆棉 法兰绒 立领寸衫"
                , price: "￥ 99"
                , linePrice: "￥198"
                , sales: "月销量164"
            }
            , {
                imgUrl: "./image/home/img%20(60).jpg"
                , text: "羊毛混双面 高领毛衣"
                , price: "￥ 299"
                , linePrice: "￥598"
                , sales: "月销量27"
            }
            , {
                imgUrl: "./image/home/img%20(66).jpg"
                , text: "羊毛混双面 开衫"
                , price: "￥ 299"
                , linePrice: "￥598"
                , sales: "月销量14"
            }
            , {
                imgUrl: "./image/home/img%20(26).jpg"
                , text: "粗细不均棉纱毛圈 拉链连帽衫"
                , price: "￥ 149"
                , linePrice: "￥298"
                , sales: "月销量36"
            }
        ]
        , salesRanking: [
            {
                imgUrl: "./image/home/img%20(79).jpg"
                , text: "黄麻简易收纳 A4"
                , price: "￥ 18"
                , linePrice: ""
                , sales: "月销量1164"
            }
            , {
                imgUrl: "./image/home/img%20(33).jpg"
                , text: "扫除用品系列地毯除尘滚轮替换纸"
                , price: "￥ 18"
                , linePrice: ""
                , sales: "月销量944"
            }
            , {
                imgUrl: "./image/home/img%20(81).jpg"
                , text: "黄麻简易收纳 A6"
                , price: "￥ 14"
                , linePrice: ""
                , sales: "月销量746"
            }
            , {
                imgUrl: "./image/home/img%20(77).jpg"
                , text: "山泉水"
                , price: "￥ 3"
                , linePrice: ""
                , sales: "月销量705"
            }
            , {
                imgUrl: "./image/home/img%20(75).jpg"
                , text: "迷你脆脆面 焦香酱油味"
                , price: "￥ 3"
                , linePrice: ""
                , sales: "月销量389"
            }
            , {
                imgUrl: "./image/home/img%20(52).jpg"
                , text: "新疆棉法绒 衬衫"
                , price: "￥ 79"
                , linePrice: "￥158"
                , sales: "月销量354"
            }
            , {
                imgUrl: "./image/home/img%20(45).jpg"
                , text: "凝胶中性墨水圆珠笔芯(浅)"
                , price: "￥ 4"
                , linePrice: ""
                , sales: "月销量324"
            }
            , {
                imgUrl: "./image/home/img%20(50).jpg"
                , text: "凝胶中性墨水圆珠笔芯(深)"
                , price: "￥ 4"
                , linePrice: ""
                , sales: "月销量285"
            }
        ]
    }
    /*产品*/
    let goods = [
        {
            imgUrl: "./image/home/img%20(83).jpg"
            , text: "女装"
        }
        , {
            imgUrl: "./image/home/img%20(13).jpg"
            , text: "男装"
        }
        , {
            imgUrl: "./image/home/img%20(9).jpg"
            , text: "内衣"
        }
        , {
            imgUrl: "./image/home/img%20(86).jpg"
            , text: "鞋包"
        }
        , {
            imgUrl: "./image/home/img%20(5).jpg"
            , text: "服饰杂货"
        }
        , {
            imgUrl: "./image/home/img%20(92).jpg"
            , text: "童装"
        }
        , {
            imgUrl: "./image/home/img%20(84).jpg"
            , text: "MUJI LABO"
        }
        , {
            imgUrl: "./image/home/img%20(84).jpg"
            , text: "卫生&美容用品"
        }, {
            imgUrl: "./image/home/img%20(84).jpg"
            , text: "纺织品"
        }
        , {
            imgUrl: "./image/home/img%20(84).jpg"
            , text: "文具"
        }, {
            imgUrl: "./image/home/img%20(84).jpg"
            , text: "居家用品"
        }
        , {
            imgUrl: "./image/home/img%20(84).jpg"
            , text: "家具"
        }, {
            imgUrl: "./image/home/img%20(84).jpg"
            , text: "电子产品"
        }, {
            imgUrl: "./image/home/img%20(84).jpg"
            , text: "户外用品"
        }
        , {
            imgUrl: "./image/home/img%20(84).jpg"
            , text: "MUJI IDEE"
        }, {
            imgUrl: "./image/home/img%20(84).jpg"
            , text: "MUJI BOOKS"
        }, {
            imgUrl: "./image/home/img%20(84).jpg"
            , text: "点心"
        }
        , {
            imgUrl: "./image/home/img%20(84).jpg"
            , text: "饮料·冷食"
        }, {
            imgUrl: "./image/home/img%20(84).jpg"
            , text: "调味加工"
        }
    ]

    /*图片*/
    let images = {
        one_img: [
            "./image/shopList/img%20(1).jpg"
            , "./image/shopList/img%20(269).jpg"
            , "./image/shopList/img%20(45).jpg"
            , "./image/shopList/img%20(70).jpg"
            , "./image/shopList/img%20(349).jpg"
            , "./image/shopList/img%20(325).jpg"
            , "./image/shopList/img%20(316).jpg"
            , "./image/shopList/img%20(291).jpg"
        ]
    }
    return {
        "newShopObj": newShopObj
        , "goods": goods
        , "images": images
    }


})
