<template>
  <div>
    <div v-if="Object.keys(commentInfo).length!==0" class="comment-info">
      <div class="info-header">
        <div class="head-title">用户评价</div>
        <div class="head-more">
          更多
          
        </div>
      </div>

      <div class="info-user">
        <img :src="commentInfo.user.avatar" alt />
        <span>{{commentInfo.user.uname}}</span>
      </div>

      <div class="info-detail">
        <p>{{commentInfo.content}}</p>
        <div class="info-other">
          <span class="date">{{commentInfo.created |showdate() }}</span>
          <span>{{commentInfo.style}}</span>
        </div>
        <div class="info-imgs">
          <img :src="item" alt v-for="(item,index) in commentInfo.images" :key="index" />
        </div>
      </div>
    </div>

    <div class="comment-info" v-else>用户暂无评论</div>
  </div>
</template>

<script>
import {formatDate} from 'common/utilis'
export default {
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters:{
      showdate(value){
          const date = new Date(value * 1000)
          return formatDate(date,'yyyy-MM-dd')
      }
  }
};
</script>

<style scoped>
.comment-info {
  padding: 5px 12px;
  color: #333333;
  border-bottom: 5px solid #f2f5f8;
}
.info-header {
  line-height: 50px;
  height: 50px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}
.head-title {
  font-size: 15px;
  float: left;
}
.head-more {
  font-size: 13px;
  float: right;
  margin-right: 10px;
}
.info-user {
  padding: 10px 0 5px;
}
.info-user img {
  width: 42px;
  height: 42px;
  border-radius: 50%;
}
.info-user span {
  font-size: 15px;
  position: relative;
  top: -15px;
  margin-left: 10px;
}
.info-detail {
  padding: 0 5px 15px;
}
.info-detail p {
  font-size: 14px;
  line-height: 1.5;
  color: #777777;
}
.info-detail .info-other {
  font-size: 12px;
  margin-top: 10px;
  color: #999999;
}
.info-other .date {
  margin-right: 8px;
}
.info-imgs {
  margin-top: 10px;
}
.info-imgs img {
  width: 70px;
  height: 70px;
  margin-right: 5px;
}
</style>