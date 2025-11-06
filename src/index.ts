import closedComponent from "./components/closedComponent";

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