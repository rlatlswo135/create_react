
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

export function createElement(tag,props,...children){ //children을 배열로 받기위해 가변인자로 받는 모오습
    /*
    실제로 트랜스파일 과정에서 빈객체가아닌 null값이오기때문에 props를 축약형으로 객체에 꽃을려니 null이와서 에러가뜸
    그렇다고 디폴트인자 props={}하면 이것도안됨, 저건 undefined로만 받을때만 작동하기때문
    그 트랜스파일링되는 과정을보면 tag에 컴포넌트가 들어오면 함수가 그대로 들어간다 그러니 type검사로 함수일경우 그 리턴값을 박아주게 하는것.
    */
    props = props || {} //결론

    if(typeof tag === 'string'){
        return {tag,props,children}
    }
    else{
        if(children.length === 0) {
            console.log(tag) //여기서 이미 트랜스파일링될때 createElement구문으로 바뀌어서 들어왓네 => 그러니 호출하면 위와같은 형태의 {}가나오지 
            return tag() //중요. 넘어올때 이미 트랜스파일링되서 createElement구문으로 넘어왓다
        }
        else{
            return tag({ //DOM을간단하게.js부분에 Title부분에 props와 비교해보자
                ...props,
                children:children.length === 1 ? children[0] : children
                /*
                props는 속성에 넣을 키 값을 정의하는거기때문에 있다면 어쨋든 카피해서 그것도 넘겨주고,
                => 즉 속성에넣을 키 밸류를 props로 받으니 상태를 넘겨받을것도 이렇게 넘겨주면 props안에 담기겟지!!!
                추가로 자식요소까지 넘겨줘야하는데 react팀은 자식요소가 1개일때는 단값으로 리턴하는것으로 디자인되었기때문에
                이런식으로 짯다
                */
            })
        }
    }

}
export function render(vdom,element){
    const container = document.querySelector(element)
    container.appendChild(createDOM(vdom))
}

/* 여기까지 함수형 Component의 정의 */