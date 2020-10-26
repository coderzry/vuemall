<template>
  <div class="bottom-bar">
    <div class="check-content" >
      <check-button 
              :is-checked="isSelectAll" 
              class="check-button" 
              @click.native="checkClick"/>
      <span>全选</span>
    </div>

    <div class="price">
      合计:{{totalPrice}}
    </div>

    <div class="calculate" @click="calcClick">
      去计算({{checkedLength}})
    </div>
  </div>
</template>

<script>
  import CheckButton from '@/components/content/checkButton/CheckButton'

  import { mapGetters } from 'vuex'

  export default {
    name: 'CartButtomBar',
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return '￥' + this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        },0).toFixed(2)
      },
      checkedLength() {
        return this.cartList.filter(item => item.checked).length
      },
      isSelectAll() {
         // 如果购物车没有数据 直接false
        if (this.cartList.length === 0) return false

        // 1.使用filter
        // 有length 说明有不被选中的 对其取反 即为false 不全选
        // return !(this.cartList.filter(item => !item.checked).length)
        
        // 2.使用find
        // 找到一个没选中的 就置weifalse
        return !this.cartList.find(item => !item.checked)

        // 3.普通遍历
        for (let item of this.cartList) {
          if (!item.checked) {
            return false
          }
        }
        return true
      }
    },
    methods: {
      checkClick() {
        if (this.isSelectAll) {  // 如果全部选中 则让它全部不选中
          this.cartList.forEach(item => item.checked = false)
        } else {  // 有部分或全部不选中 则让它全选 
          this.cartList.forEach(item => item.checked = true)
        }
      },
      calcClick() {
        if (this.checkedLength == 0){
          this.$toast.show('请选择购买的商品', 2000)
        }
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;
  
    bottom: 40px;
    height: 40px;
    line-height: 40px;

    background-color: #eee;

    font-size: 14px;
    
  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }

  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
  }

  .price {
    margin-left: 30px;
    flex: 1;
  }

  .calculate {
    width: 90px;
    background-color: red;
    color: #fff;
    text-align: center;
  }
</style>