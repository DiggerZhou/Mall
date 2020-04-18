// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {},
    // 把px单位准化为vw单位
    // "postcss-px-to-viewport": {
    //   viewportWidth: 375, //对应开发时设备的高度，一般设计稿都是针对iphone678的
    //   viewportHeight: 667,
    //   unitPrecision: 5,
    //   viewportUnit: 'vw',
    //   selectorBlackList: ['ignore', 'tab-bar', 'tab-bar-item'],//把加了这些类名的里面的px不用转化
    //   minPixelValue: 1,//最小转化像素
    //   mediaQuery: false //媒体查询禁用
    // }
  }
}
