export default {
    // 这个情况是直接在actions里面改state，也是可以，不过不推荐，因为actions最好是通过mutations
        // addCart(context, payload) {
        //     let oldProduct = context.state.cartList.find(item => { item.iid === payload.iid })
        //     if (oldProduct) {
        //         oldProduct.count += 1
        //     } else {
        //         payload.count = 1
        //         context.state.cartList.push(payload)
        //     }
        // }
        addCart(context, payload) {
            // 这里搞个promis是为了告诉Detail里的dispatch调用函数，说我这里已经加了新商品了，从而可以做toast
            // 一般来说，我们在vuex里面做了什么操作，要让外面知道我做成功了没有
           return new Promise ((resolve,reject) =>{
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
            if (oldProduct) {
                // oldProduct.count += 1
                context.commit('addCounter',oldProduct)
                resolve('商品数量加一')
            } else {
                payload.count = 1
                // context.state.cartList.push(payload)
                context.commit("addToCart",payload)
                resolve('添加了新商品')
            }
           })
        }
}