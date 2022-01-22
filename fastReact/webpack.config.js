const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path') //마찬가지로 node문법이기때문에 import가 아닌 require를 쓰는거고

module.exports = { //webpack은 번들러지? 그럼. entry에 있는 입력파일을가지고 output 출력을 하는데(파일) 그과정사이에 번들링이 일어나는거다.
    mode:'development', //배포단계냐 개발단계냐?
    entry:'./src/DOM을간단하게.js',
    output:{
        path:path.resolve(__dirname, 'dist'), //out 즉 출력에있는 옵션은 path어느 디렉토리에 출력? filename 말그대로. 즉 우리가 정해주는거겟지?
        //근데 다른 컴퓨터에서도 이 번들링한 파일이 잘 동작되게하려면 경로를 안전하게 다룰필요가있어서 node가 제공하는 path라는 기능을쓰는거고'
        //현재 디렉토리라는 뜻인 __dirname, 에 dist라는 디렉토리를 만들어서 거기다 넣어줄거다 
        filename:'bundle.js'
    },

    devServer:{
        compress:true,
        port:9999
    }
    ,
    module:{ //webpack에서 entry가 output으로 나올때 그 번들링과정에서 추가적인 기능을 넣거나 하고싶을때 사용자가 세팅을 해주는거다 그후 추가적인 기능을 거친 최종출력파일들이
        rules:[ //webpack이 바라는대로 틀을 짜줘야겟지? => 공식문서 어쨋든. rules안에 들어가는걸 loader라고 하는데 그 loader도 use라는 키워드를 이용해 어떻게 동작할지 옵션을 넣어줄수있다
            {
                test:/\.js$/, //이렇게 test옵션을주는데 . 정규식으로준다 => 이옵션의 해석은 저 정규식에 걸리는 애들만 use에 들어가게 해줘 라는뜻같다.
                exclude:/node_modules/, //node_modules에 있는 js파일까지 트랜스파일링 할필욘없으니 제외시키는거다
                use:{
                    //하지만 실제 작업에서는 js파일뿐만아니라 jpg파일 등 온갖파일이 들어올텐데 그런것까지 babel-loader가 처리할수는 없으니
                    loader:'babel-loader',
                    options:{
                        presets:["@babel/preset-env","@babel/preset-react"]
                    }
                }
            }

        ]
    },
    plugins:[// 플러그인에서 또 추가로 세팅할것이 필요할땐 넣어주고 최종적으로 Output된다
        new HtmlWebPackPlugin({
            title:'setup webpack & babel',
            template:'DOM을간단하게.html'
        }) //이런 사용법은 해당 패키지의공식문서를 보면 알겟지? -> npm 에서 검색해보던지 해보자
    ]
}

//이 config.js는 node파일이기때문에 node문법을써줘서 export해야한다 es6랑은 좀 다름. module.exports