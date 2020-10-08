const fs=require("fs")
const mustache=require("mustache")

const format=(o=[],output="readme.md")=>{
    t="./table.mustache"
    template=fs.readFileSync(t).toString()
    o1=o.map((v,k)=>({"#":k+1,...v}))
    let title=Object.keys(o1[0])
    d={
        title,
        data:o1,
        kk:function(){
           return Object.values(this).join("|")+"|"
        },
    }
    r=mustache.render(template,d)
    fs.writeFileSync(output,r)
    console.log(output,"done")
}


test=()=>{
    o=[
        {x:11,y:21,url:"www.baidu.com"},
        {x:12,y:22,url:"www.baidu.com"},
        {x:13,y:23,url:"www.baidu.com"},
        {x:14,y:24,url:"www.baidu.com"},
    ]
    format(o)
}

test()


