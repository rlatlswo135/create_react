function createElement(type,props){
    switch(type){
        case 'h1':
            return [document.createElement('h1')] //ele를 배열에담아서
            .map(ele => {
                Object //맵을 도는데 entries => 키 , value쌍으로 배열을 만들어러 뱉는데 구조분해할당을통해 props와 거기에 추가로 key value가 'data-id','title'인 문자열을 추가로해서 배열로 뱉은다음
                .entries({...props,'data-id':'title'})
                .forEach(([name,value]) => ele.setAttribute(name,value)) //배열로 뱉엇으니 forEach가 가능하고 구조분해할당을통해 key value를 name,value라는 변수에 담고 element하나마다 setAttribute해준다 속성과 값을.
                return ele
            })[0]; //즉 이해하면 element에 속성을 추가해서 뱉는 그런형태의 함수인듯? => ex <h1 ${name}=${value}></h1>이런느낌이겟지?
        
        case 'div':
            return [document.createElement('div')]
            .map(ele => {
                Object
                .entries({...props, 'data-id':'layout'})
                .forEach(([name,value])=> ele.setAttribute(name,value))
                return ele;
            })[0];
    }
}

//(전)위 (후)아래

function createH1(props){
    return [document.createElement('h1')] 
    .map(ele => {
        Object 
        .entries({...props,'data-id':'title'})
        .forEach(([name,value]) => ele.setAttribute(name,value)) 
        return ele
    })[0]; 
}

function createDiv(props){
        return [document.createElement('div')] 
        .map(ele => {
            Object
            .entries({...props, 'data-id':'layout'})
            .forEach(([name,value])=> ele.setAttribute(name,value))
            return ele;
        })[0];
}

const creatorMap = { // type에 따라 호출할 함수를 추가할때 용이하도록
    h1:createH1,
    div:createDiv
}

const coupler = map => (type,props) => map[type](props) //이렇게 클로저로 함으로써 createElement가 creatorMap에 종속되지 않도록.

const createElement = coupler(creatorMap)

//기존 switch문에 h1 div일때 나눈 그 함수는 추가 / 변화에 취약하기때문에 코드를 리팩토링했다 => 소프트웨어는 항상 변화기때문에 변화 / 추가에 용이하도록 코드를 짜는 습관을 길러야한다.

//중요한건 소프트웨어는 항상 변하는데 그 변경을 어떻게 확실하고,안전하게 잡을것인가. -=> 리액트를통해 알아보자
