<template>
  <div id="category">
    <NavBar class="nav-bar">
      <div slot="center">商品分类</div>
    </NavBar>

    <div class="content">
      <TabMenu :categories="categories" @selectItem="selectItem"></TabMenu>
      <Scroll class="tab-content" ref="scroll">
        <div>
          <TabContentCategory :subcategories="categoryData.subcategories"></TabContentCategory>
          <TabControl :titles="['综合', '新品', '销量']" @tabClick="tabClick"></TabControl>
          <TabContentDetail :categoryDetail="categoryData.categoryDetail[this.currentType]"></TabContentDetail>
        </div>
      </Scroll>
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabMenu from "./childcomps/TabMenu";
import TabContentCategory from "./childcomps/TabContentCategory";
import TabControl from "components/content/TabControl/TabControl";
import TabContentDetail from "./childcomps/TabContentDetail";

import Scroll from "components/common/scroll/Scroll";

import {
  getCategory,
  getSubCategory,
  getCategoryDetail
} from "network/category";

import { itemListenerMixin } from "common/mixin";
export default {
  mixins: [itemListenerMixin],
  data() {
    return {
      categories: [],
      currentIndex: -1,
      categoryData: {
        subcategories: {},
        categoryDetail: {
          pop: [],
          new: [],
          sell: []
        }
      },
      currentTypeOptions: ["pop", "new", "sell"],
      currentType: "pop"
    };
  },
  components: {
    NavBar,
    TabMenu,
    TabContentCategory,
    TabControl,
    TabContentDetail,
    Scroll
  },
  created() {
    // 请求分类的数据
    this._getCategory();
    this.$bus.$on("TabContentCategoryImageLoad", () => {
      this.$refs.scroll.refresh();
    });
    this.$bus.$on("itemImageLoad", () => {
      this.$refs.scroll.refresh()
    });
  },
  methods: {
    _getCategory() {
      getCategory().then(res => {
        this.categories = res.data.category.list;
        console.log(res.data.category.list);

        this._getSubCategory(0);
      });
    },
    _getSubCategory(index) {
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;
      getSubCategory(mailKey).then(res => {
        console.log(res.data);
        this.categoryData.subcategories = res.data;
        this._getCategoryDetail("pop");
        this._getCategoryDetail("sell");
        this._getCategoryDetail("new");
      });
    },
    _getCategoryDetail(type) {
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      getCategoryDetail(miniWallkey, type).then(res => {
        console.log(res);

        this.categoryData.categoryDetail[type] = res;
      });
    },
    selectItem(index) {
      this._getSubCategory(index);
    },
    tabClick(index) {
      this.currentType = this.currentTypeOptions[index];
    }
  }
};
</script>

<style scoped>
#category {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  font-weight: 700;
  color: #fff;
}
.content {
  display: flex;

  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
}
.tab-content {
  flex: 1;
  height: 100%;
}
</style>