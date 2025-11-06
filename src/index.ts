import closedComponent from "./components/closedComponent.js";

console.log(closedComponent({
    key: 'div',
    props: {
        'id': 'teste'
    },
    componentsOrText: [
        'teste',
        'teste',
        'teste',
    ]
}))