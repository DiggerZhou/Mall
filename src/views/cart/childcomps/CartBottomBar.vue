<template>
  <div class="bottom-bar">
    <div class="check-content">
      <CheckButton class="check-btn" :isChecked="isSelectAll" @click.native="checkClick"></CheckButton>
      <span>全选</span>
    </div>

    <div class="price">合计：{{totalPrice}}</div>

    <div class="calculate">去计算:{{checkedLength}}</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkbtn/CheckButton";
export default {
  components: {
    CheckButton
  },
  computed: {
    totalPrice() {
      return (
        "¥" +
        this.$store.state.cartList
          .filter(item => {
            return item.isChecked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price.split("¥")[1] * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkedLength() {
      return this.$store.state.cartList.filter(item => {
        return item.isChecked;
      }).length;
    },
    isSelectAll() {
      if (this.$store.state.cartList.length === 0) return false;
      return !this.$store.state.cartList.find(item => !item.isChecked);
    }
  },
  methods:{
      checkClick(){
          if(this.isSelectAll){
              this.$store.state.cartList.forEach(item => {
                  item.isChecked = false
              });
          }else{
              this.$store.state.cartList.forEach(item => {
                  item.isChecked = true
              });
          }
      }
  }
};
</script>

<style scoped>
.bottom-bar {
  height: 40px;

  background-color: #eee;

  display: flex;
  align-items: center;
}

.check-content {
  width: 80px;
  margin-left: 10px;
  display: flex;
  align-items: center;
}
.check-btn {
  width: 18px;
  height: 18px;
}
.check-content span {
  margin-left: 10px;
}
.price {
  flex: 1;
}
.calculate {
  width: 90px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: red;
  color: #fff;
}
</style>