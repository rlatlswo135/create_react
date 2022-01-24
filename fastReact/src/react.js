/*
React팀은 배열로 상태를 저장할 아이디어를 떠올린것같다 useState등 hook함수를 호출하면
초기화되서 실행되기때문에 '상태'를 만들어내서 유지보수한다는것이 안되는거다. 그렇기때문에 전역변수로써 hook을만들고
관리를하는 개념 => 하지만공식문서에서 반복문, if문 등에서 훅을 호출하면 정상적인 상태관리를 보장하지 못한다는데 이유는? => 아래쪽 hook관리코드에
*/

const hooks = [];
let currentComponent = 0; //hooks의 index를 제어하기위한 변수

export class Component{
    constructor(props){
        this.props = props
    }
}

export function createDOM(node){
    if(typeof node === 'string'){
        return document.createTextNode(node)
    }
    const element = document.createElement(node.tag); //p  h1

    // if(node.props.length !== 0){ //내가짠코드 훨씬 지저분하다;
    //     let props = node.props
    //     for(let key in props){
    //         element.setAttribute(key,props[key])
    //     }
    // }

    Object.entries(node.props) //key value가 배열로 튀어나옴
        .forEach(([name,value]) => element.setAttribute(name,value))

    node.children
        .map(createDOM) //결국 map안에 있는것도 함수니까. item => 여기서 item인자가 node이란 이름으로 되겟지 왜. createDOM이 node을 인자로 받으니까
        //결국 마지막 string이 map이니까 배열에 담겨서 리턴될거고 그걸또 forEach돌겟지

        //결국 map forEach둘다 배열안에담긴 각 item에 인자로 받은 함수를 실행시키는거다 그니까
        .forEach(document.appendChild.bind(element))
        //forEach문을 item => element.appendChild(item) 해줘도 결과는 같은데 뭔가가 다를려나?

        //여기서도 내가아는 item => 이런 애로우형식이 아니더라도 map결과로 리턴된 [node] 배열에 각 인자마다 document.appendChild함수가 실행되는거고.
        //element변수는 현재 forEach단에 컨텍스트에 존재하지않기때문에 bind로 컨텍스트를 정해준거고.
        
    return element
    //이함수를 뜯어보자 이해가안됨 => 완료'
    //그후 쌓은 element를 리턴후 root에 append 
}
function makeProps(props,children){
     /*
    props는 속성에 넣을 키 값을 정의하는거기때문에 있다면 어쨋든 카피해서 그것도 넘겨주고,
     => 즉 속성에넣을 키 밸류를 props로 받으니 상태를 넘겨받을것도 이렇게 넘겨주면 props안에 담기겟지!!!
    추가로 자식요소까지 넘겨줘야하는데 react팀은 자식요소가 1개일때는 단값으로 리턴하는것으로 디자인되었기때문에
     이런식으로 짯다
     */
    return {
        ...props,
        children:children.length === 1 ? children[0] : children
    }
     
}

function useState(initValue){
    /*
    const [state,setState] = useState(initValue)의 형태로 쓰지? 지금 함수를 분석해서 알아보자
    */ 
    let position = currentComponent - 1;
    /*
    createElement 단에서 hooks 배열에 해당 인덱스에 null로 초기값을 준후 index를 ++해주기때문에
    그 전인덱스(--)에서 찾아야지 원래 본인의 state와 비교를 할수있을거다
    */
    if(hooks[position] === null){
        hooks[position] = initValue
    }

    const modifier = (nextValue) => {
        hooks[position] = nextValue
    }

    return [hooks[position],modifier];
}
export function createElement(tag,props,...children){ //children을 배열로 받기위해 가변인자로 받는 모오습
    /*
    실제로 트랜스파일 과정에서 빈객체가아닌 null값이오기때문에 props를 축약형으로 객체에 꽃을려니 null이와서 에러가뜸
    그렇다고 디폴트인자 props={}하면 이것도안됨, 저건 undefined로만 받을때만 작동하기때문
    그 트랜스파일링되는 과정을보면 tag에 컴포넌트가 들어오면 함수가 그대로 들어간다 그러니 type검사로 함수일경우 그 리턴값을 박아주게 하는것.
    */
    props = props || {} //결론
    /*
    Object.getPrototypeOf(obj) 해당 obj의 proto를 보여주는데 인스턴스객체의 proto와
    해당 인스턴스객체의 class의 proto가 같겟지? 
    */
    
    /*
    class형으로 왓는지 function형으로 왓는지는 typeof로는 판단이 불가하다 => 같은타입으로나오기때문에
    instanceof 즉 class는 인스턴스객체를 만드는데 tag의 prototype이 Component의 인스턴스객체냐 를 묻는것인듯
    */

   if(tag.prototype instanceof Component){
       /*
       하지만 render될때마다 instance객체를 만들게되니까 원래 리액트는 훨씬더 복잡한 매커니즘의 코드로 되있는데 이런느낌이다라고만 알자.
       결국, class형 컴포넌트는 인스턴스객체를 생성함으로써 컴포넌트가 지워질때까지 인스턴스 객체를 유지하면서
       함수형과는 다르게 state(상태)를 가질수있는거다 하지만 hook이 생기면서 함수형 컴포넌트역시
       상태를 가질수있게 된듯? => 함수는 실행되면 초기화되니까 상태를가질수없는개념이었는데 말이다
       */
      const instance = new tag(makeProps(props,children))
      console.log(instance)
      return instance.render()
    } 
    
    if(typeof tag === 'string'){
        return {tag,props,children}
    }
    
    else{
        /*
        Hook은 함수형컴포넌트에만 쓰기때문에 위 if문 2개는 string, class일때니까 저때 hook에관한 로직이 발동되면 안되니
        함수형 컴포넌트가 생성되기 바로직전에 로직에 순서를 넣어줬다,
        일반함수에서 hook이 발동안되는이유? => react의 createElement함수 안에서 hooks배열을 조작하니까 당연히 일반함수는 안되겟지?
        class Component는 인스턴스객체 자체가 업데이트되는거기때문에 hook의 호출시점을 잡을수없으니 hook을 사용을 못하는거다
        */
        hooks[currentComponent] = null;
        currentComponent ++;
        /*
        만약 이 Hook 관리 코드가 if문 반복문 등안에있다고 생각하면 정확한 순서가 없이(조건에따라 분기되는 코드니까) 코드가 진행되서
        인덱스(currentComponent)를 원활하게 관리하지 못할가능성이있어서 완벽한 상태관리를 보장하지 못하는듯하다
        */
        if(children.length === 0) {
            console.log(tag) //여기서 이미 트랜스파일링될때 createElement구문으로 바뀌어서 들어왓네 => 그러니 호출하면 위와같은 형태의 {}가나오지 
            return tag() //중요. 넘어올때 이미 트랜스파일링되서 createElement구문으로 넘어왓다
        }
        else{
            return tag(makeProps(props,children))//DOM을간단하게.js부분에 Title부분에 props와 비교해보자
        }
    }

}
// export function render(vdom,element){
//     const container = document.querySelector(element)
//     container.appendChild(createDOM(vdom))
// }

export const render = (function(){
    let preDom = null;
    //closer => 밖에서 preDom을 못참조함,전역변수가 아니니까
    return function(vdom,container){
        if(preDom === null){
            preDom = vdom
        }
        
        //diff 즉 이전 dom과 새로 렌더할 dom이 다를때 비교후 업데이트된부분만 렌더해야함. 그로직은 생각만해보자
        const CONTAINER = document.querySelector(container)
        CONTAINER.appendChild(createDOM(vdom))
    }
})()

/*
render함수를 실행하면 vdom,container를 받는함수가 튀어나올거고 또 그함수를 실행한(appendChild)한 결과가 export해야하니 (fun())() 이런식
*/

/* 여기까지 함수형 Component의 정의 */