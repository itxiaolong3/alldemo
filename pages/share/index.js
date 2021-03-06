var api = require("../../api.js"), app = getApp();

Page({
    data: {
        total_price: 0,
        price: 0,
        cash_price: 0,
        total_cash: 0,
        team_count: 0,
        order_money: 0
    },
    onLoad: function(t) {
        app.pageOnLoad(this);
        this.setData({
            custom: wx.getStorageSync("custom")
        });
    },
    onReady: function() {},
    onShow: function() {
        app.pageOnShow(this);
        var a = this, t = wx.getStorageSync("share_setting"), e = a.data.__user_info;
        a.setData({
            share_setting: t
        }), e && 1 == e.is_distributor ? (wx.showLoading({
            title: "正在加载",
            mask: !0
        }), app.request({
            url: api.share.get_info,
            success: function(t) {
                0 == t.code && (a.setData({
                    total_price: t.data.price.total_price,
                    price: t.data.price.price,
                    cash_price: t.data.price.cash_price,
                    total_cash: t.data.price.total_cash,
                    team_count: t.data.team_count,
                    order_money: t.data.order_money,
                    custom: t.data.custom,
                    order_money_un: t.data.order_money_un
                }), wx.setStorageSync("custom", t.data.custom)), 1 == t.code && (e.is_distributor = t.data.is_distributor, 
                a.setData({
                    __user_info: e
                }), wx.setStorageSync("user_info", e));
            },
            complete: function() {
                wx.hideLoading();
            }
        })) : (wx.showLoading({
            title: "正在加载",
            mask: !0
        }), app.request({
            url: api.share.index,
            success: function(t) {
                if (0 == t.code) {
                    if (t.data.share_setting) var e = t.data.share_setting; else e = t.data;
                    wx.setStorageSync("share_setting", e), a.setData({
                        share_setting: e
                    });
                }
            },
            complete: function() {
                wx.hideLoading();
            }
        }));
    },
    onHide: function() {},
    onUnload: function() {},
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    apply: function(e) {
        var a = wx.getStorageSync("share_setting"), o = wx.getStorageSync("user_info");
        1 == a.share_condition ? wx.navigateTo({
            url: "/pages/add-share/index"
        }) : 0 != a.share_condition && 2 != a.share_condition || (0 == o.is_distributor ? wx.showModal({
            title: "申请成为分销商",
            content: "是否申请？",
            success: function(t) {
                t.confirm && (wx.showLoading({
                    title: "正在加载",
                    mask: !0
                }), app.request({
                    url: api.share.join,
                    method: "POST",
                    data: {
                        form_id: e.detail.formId
                    },
                    success: function(t) {
                        0 == t.code && (0 == a.share_condition ? (o.is_distributor = 2, wx.navigateTo({
                            url: "/pages/add-share/index"
                        })) : (o.is_distributor = 1, wx.redirectTo({
                            url: "/pages/share/index"
                        })), wx.setStorageSync("user_info", o));
                    },
                    complete: function() {
                        wx.hideLoading();
                    }
                }));
            }
        }) : wx.navigateTo({
            url: "/pages/add-share/index"
        }));
    }
});