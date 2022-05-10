// module.exports = {
//   devServer: {
//     proxy: {
//       '/dq': {// 随便写的
//         target: 'ws://localhost:12138', // 目标接口
//         ws: true, // 是否使用websocket
//         secure: false, // 是否是http接口
//         changeOrigin: true, // 是否跨域
//         pathRewrite: {
//           '^/dq': '' // 重定向 将/dq换为空
//         }
//       }
//     }
//   }
// }