import {debounce} from './utilis'
import BackTop from "components/content/backtop/BackTop";

export const itemListenerMixin = {
    data(){
        return{
            itemImgListener:null,
            newRefresh:null
        }
    },
    mounted(){
        this.newRefresh = debounce(this.$refs.scroll.refresh,100)
        this.itemImgListener = () =>{
            this.newRefresh()
        }
    }
}
// 封装backtop功能，但是我的home里的backtop并没有用混入，detail里的backtop用的是混入
export const backTopMixin = {
    components:{
        BackTop
    },
    data(){
        return {
            isShowBackTop: false
        }
    },
    methods:{
        BackClick() {
            this.$refs.scroll.scrollTo(0, 0, 800); 
          }
    }
}