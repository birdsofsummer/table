const fs=require("fs")
const mustache=require("mustache")

const format=(o=[],output="readme.md")=>{
    const t="./table.mustache"
    const template=fs.readFileSync(t).toString()
    const o1=o.map((v,k)=>({"#":k+1,...v}))
    const title=Object.keys(o1[0])
    const d={
        title,
        data:o1,
        kk:function(){
           return Object.values(this).join("|")
        },
    }
    const r=mustache.render(template,d)
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


