
// 同时异步获取数据的次数
let ajaxCount = 0;

export const request = (params) => { // 最简单的微信请求代码
    // 判断 url中是否带有 /my/ 请求的是私有的路径 带上请求头header token
    let header = { ...params.header }; // 克隆新的，避免下次有其他要带header的搞混
    if (params.url.includes("/my/")) {
        // 拼接header 带上token
        header["Authorization"] = wx.getStorageSync("token");
    }

    ajaxCount++;
    // 显示加载中 效果
    wx.showLoading({
        title: '加载中',
        mask: true
    });

    // 定义公共的url
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            header,
            url: baseUrl + params.url,
            success: (result) => {
                resolve(result.data.message);
            },
            fail: (err) => {
                reject(err);
            },
            complete: () => {
                ajaxCount--;
                if (ajaxCount === 0) { // 当全部请求成功或失败，关闭
                    // 关闭正在加载中图标
                    wx.hideLoading()
                }
            }
        });
    })
}