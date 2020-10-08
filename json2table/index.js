const fs=require("fs")
const mustache=require("mustache")

format=(o=[],output="readme.md")=>{
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
        {x:11,y:21},
        {x:12,y:22},
        {x:13,y:23},
        {x:14,y:24},
    ]
    format(o)
}

test()


