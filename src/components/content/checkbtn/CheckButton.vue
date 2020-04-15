<template>
  <div class="check-btn" :class="{check:isChecked}">
    <img src="~assets/images/cart/tick.svg" alt />
  </div>
</template>

<script>
export default {
    props:{
        isChecked:{
            type:Boolean,
            default:true
        }
    }
};
</script>

<style scoped>
.check-btn {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #aaa;
}
.check-btn img{
    width: 100%;
    height: 100%;
}
.check{
    border-color:red;
    background-color: red;
}
</style>