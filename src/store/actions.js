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
            let oldProduct = context.state.cartList.find(item => { item.iid === payload.iid })
            if (oldProduct) {
                // oldProduct.count += 1
                context.commit('addCounter',payload)
            } else {
                payload.count = 1
                // context.state.cartList.push(payload)
                context.commit("addToCart",payload)
            }
        }
}