import { Lazyload, ImgPreview, Loading, Tabbar, TabbarItem, Search, InfiniteLoad,} from 'wot-design'

const UIComponents = [Lazyload, ImgPreview, Loading, Tabbar, TabbarItem, Search, InfiniteLoad,]


const WotUIPlugin = {};

WotUIPlugin.install = function (Vue) {

    UIComponents.forEach(Component => {

        Vue.use(Component)

    })

}

export default WotUIPlugin