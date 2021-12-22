import Vue from "vue";

export function componentFn() {
    const componentList = require.context('../components/common', false, /(.vue)$/)
    componentList.keys().forEach(fileName => {
        const ComS = componentList(fileName)
        let componentName = fileName.substring(fileName.indexOf('/') + 1, fileName.lastIndexOf('.'))
        // console.log(componentName);
        Vue.component(
            componentName,
            ComS.default || ComS
        )
    })
}
