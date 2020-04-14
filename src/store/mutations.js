export default {
            // mutations里面最好是做单一的事情，逻辑等东西尽量都放到actions里面去，也就是说不仅仅是一步操作才要放到actions
        // addCart(state,payload){
        //     let oldProduct = state.cartList.find(item =>{item.iid === payload.iid})
        //     if(oldProduct){
        //         oldProduct.count +=1
        //     }else{
        //         payload.count =1
        //         state.cartList.push(payload)
        //     }
        // }

        addCounter(state,payload){
            payload.count++
        },
        addToCart(state,payload){
            state.cartList.push(payload)
        }
}