<template>
  <div class="back-top">
      <img src="~assets/images/common/top.png" alt="">
  </div>
 <!-- 点击这个back-top然后上滑到顶部，可以在BackTop组件里面直接监听@click，但是这样一来，就是BackTop组件需要调用Scroll组件的上滑方法，就需先emit一下到home，然后home接收一下，再在home界面调用Scroll，比较麻烦。所以这里选择直接在home界面的BackTop组件上直接监听点击事件，但是BackTop是我们自定义的组件，不像button或者div可以被监听点击事件，所以需要在后面加一个修饰符 ".native",这样就可以监听了  -->
</template>



<script>
export default {

}
</script>

<style>
    .back-top{
        position: fixed;
        right: 8px;
        bottom: 55px;
        
    }
    .back-top img {
        width: 43px;
        height: 43px;
    }
</style>