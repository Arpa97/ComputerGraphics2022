function genValue(){
    return Math.floor(Math.random() * (55 - (-55))) + (-55) 
}

var xz=[[
    genValue() 
],
[
    genValue() 
]]

var bar1xz=[
    genValue()
,
    genValue() 
]

var bar2xz=[
    genValue() 
,
    genValue() 
]

var bar3xz=[
    genValue() 
,
    genValue() 
]

function refreshBarels(){
    bar1xz=[
        genValue()
    ,
        genValue() 
    ]
    
    bar2xz=[
        genValue() 
    ,
        genValue() 
    ]
    
    bar3xz=[
        genValue() 
    ,
        genValue() 
    ]
}