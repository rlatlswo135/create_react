/* @jsx createElement */

//default는 @jsx react.createElement인데 react패키지를 지금 써보진않을거니 디폴트를 바꿔준다

import {createDOM,render,createElement,Component} from './react'
/*
지금 현재 createElement코드를 쓰지않는데 import해야돼? => 실제 실행되는 코드는 보이는 코드가아닌
트랜스파일 과정에서 babel이 createElement코드를 가져다 쓰기때문에 잇어야하나부다
함수형 컴포넌트를 쓸때 react패키지를 코드상으로는 쓰지않지만. 빌드시에 빌드한 파일이 react코드를 쓰기때문에
컴파일 단에서는 오류가 없더라도 런타임에서 오류가뜨기때문에 import를 해와야하는거지
*/

/*
리액트의 컨셉 => dom을 쓰는건 복잡하니. 그 걸 간단하게 하는걸 react가 해줄테니 그 간단하게 만들어진걸 너네가 다뤄라 라는컨셉
그러니 한번 dom을 간단한 객체로 우리가 만들어보자
*/

//  const vdom = {
//     tag:'p',
//     props:{}, //dom에서 attribute(속성)을 props property라고도 부른다 => 리액트는 props를 채택햇지? 그리고 그 속성은 name:value 쌍이니까 이름을 가질수있는 obj로
//     children:[] 
//}

//children을 배열로 받아야하니까 createElement함수쪽에서 가변인자로써 받아주자
// const vdom2 = createElement('p',{},
//     createElement('h1',{},'React 만들기'),
//     createElement('ul',{},
//         createElement('li',{style:"color:red"},'첫번째 아이템'),
//         createElement('li',{style:"color:blue"},'두번째 아이템'),
//         createElement('li',{style:"color:green"},'세번째 아이템')
//         )
//     )
    //리액트는 dom을 안만지는대신 이런식으로 접근했다

    /*
    아래title컴포넌트가 들어간 코드를 뜯으면 createElement(Title,props,...children)일텐데
    'react 잘만들기'문자열이 chidrend인자가 가변인자기때문에 배열안에 들어갈건데
    이건 결국 createElement(h1,props,['props.children']) 즉 아무 처리를안해주면 그대로 문자열로 들어갈거다
    즉 js코드기때문에 {}로 감싸주는 형태를 취하게된거지
    */

class Title extends Component{
    render(){
        return <h1>{this.props.children}</h1>
    }
}

// function Title(props){
//     return <h1>{props.children}</h1>;
// }

/*
createElement함수를 보면 tag를 현재 문자열로만 받는데.
결국 Title이라는 함수가 리턴하는 Jsx만 필요한거니 tag가 string으로 들어올때랑 함수로 들어올때(즉 컴포넌트로) 그 구분이 필요했는데
react팀은 첫번째가 대문자일경우 함수로, 소문자일경우는 일반 html처럼 string으로 받는걸로 디자인되있다
즉 만약 컴포넌트의 맨앞이 소문자라면 createElement('title',props,...chidren)처럼 문자열로 인자를(tag부분) 받고
대문자라면 createElement(Title,props,...children)처럼 함수가 인자로 들어가는
그래서 컴포넌트라면 꼭 앞에가 대문자여야지 오류가 안나는거다
*/

function Item(props){
    return <li style={`color:${props.color}`}>{props.children}</li>
}
const App = () => <p>
    {/* Title() ? no! 이러면 뭐하러 jsx구문으로 사용자가 html 마크업하듯이 작업할수있다했나? 밑에처럼 정말 마크업하듯이*/}
    <Title>React 잘 만들기</Title>
    <ul>
        <Item color="red">첫번째 아이템</Item>
        <Item color="blue">첫번째 아이템</Item>
        <Item color="green">첫번째 아이템</Item>
        {/* createElement와 함께 비교해보면서 맛을보자 이러니까 컴포넌트에 상태를 넘길때 props={Component}하면 넘어가는게
        createElement함수를 보면 단박에 이해가가지. 결국 createElement쪽에 props인자가 {color:red , props:Component} 이런식으로
        넘어가니까 그 넘어간부분을 또 컴포넌트화한 함수가 인자로 받으니까. => 소름; */}
    </ul>
</p>
//흔한 jsx문법 => 코드상으로 저거지만 실제론 createElement함수를 쓰고있는거

/*
결론. react가 엘리먼트를 쉽게만들기위해 createElement함수를 만들었는데 vdom2처럼 저런 형태로 써야하면
아무도 안쓸테니. => 작업량이 많아졋다고 생각해봐라 저코드는 어떤모습일까?
그러니 우리가 쉽게사용할수있는 형태(html markup형태)로 쓰되, 트랜스파일 과정에서 createElement함수가 저런식으로 받아서 결과를 보여주는모습
*/

render(<App/>,`#root`) 
console.log(<App/>)
//render(App()'#root') 해도 마찬가지겟지?