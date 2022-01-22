/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./DOM을간단하게.js":
/*!*********************!*\
  !*** ./DOM을간단하게.js ***!
  \*********************/
/***/ (() => {

eval("//리액트의 컨셉 => dom을 쓰는건 복잡하니. 그 걸 간단하게 하는걸 react가 해줄테니 그 간단하게 만들어진걸 너네가 다뤄라 라는컨셉\n//그러니 한번 dom을 간단한 객체로 우리가 만들어보자\nfunction createDOM(node) {\n  if (typeof node === 'string') {\n    return document.createTextNode(node);\n  }\n\n  var element = document.createElement(node.tag); //p  h1\n\n  node.children.map(createDOM) //결국 map안에 있는것도 함수니까. item => 여기서 item인자가 node이란 이름으로 되겟지 왜. createDOM이 node을 인자로 받으니까\n  //결국 마지막 string이 map이니까 배열에 담겨서 리턴될거고 그걸또 forEach돌겟지\n  //결국 map forEach둘다 배열안에담긴 각 item에 인자로 받은 함수를 실행시키는거다 그니까\n  .forEach(document.appendChild.bind(element)); //forEach문을 item => element.appendChild(item) 해줘도 결과는 같은데 뭔가가 다를려나?\n  //여기서도 내가아는 item => 이런 애로우형식이 아니더라도 map결과로 리턴된 [node] 배열에 각 인자마다 document.appendChild함수가 실행되는거고.\n  //element변수는 현재 forEach단에 컨텍스트에 존재하지않기때문에 bind로 컨텍스트를 정해준거고.\n\n  return element; //이함수를 뜯어보자 이해가안됨 => 완료'\n  //그후 쌓은 element를 리턴후 root에 append \n}\n\nvar vdom = {\n  tag: 'p',\n  props: {},\n  //dom에서 attribute(속성)을 props property라고도 부른다 => 리액트는 props를 채택햇지? 그리고 그 속성은 name:value 쌍이니까 이름을 가질수있는 obj로\n  children: [{\n    tag: 'h1',\n    props: {},\n    children: [\"React 만들기\"]\n  }, {\n    tag: 'ul',\n    props: {},\n    children: [{\n      tag: 'li',\n      props: {},\n      children: [\"첫번째 아이템\"]\n    }, {\n      tag: 'li',\n      props: {},\n      children: [\"두번째 아이템\"]\n    }, {\n      tag: 'li',\n      props: {},\n      children: [\"세번째 아이템\"]\n    } //자식노드가 많아졋을때 재귀 위에서 비교해보며 느껴보기\n    ]\n  }] //일반적은 tag는 부모 - 자식요소가있으니 자식요소를 담을것. 여러개의 자식이 있을수있으니까 array로 자식node는 태그일수도있지만 그냥 data일수도있겟지? \n\n};\ndocument.querySelector('#root').appendChild(createDOM(vdom));\n\n//# sourceURL=webpack://fastreact/./DOM%EC%9D%84%EA%B0%84%EB%8B%A8%ED%95%98%EA%B2%8C.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./DOM을간단하게.js"]();
/******/ 	
/******/ })()
;