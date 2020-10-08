const superagent=require("superagent")
const cheerio=require("cheerio")
const fs=require("fs")
const R=require("ramda")
const utility=require('utility')

const map=(fn,o)=>R.range(0,o.length).map(x=>fn(o.eq(x)))
const format_link=(
    u="",
    base="https://github.com",
    fn=x=>x
) => /^http/.test(u) ? u : base + fn(u)


/*
如果链接和文本混着 会忽略掉文本。。
解决办法 正则
*/

const parse_table=(z)=>{
    let base="https://raw.githubusercontent.com"
    let kk=z.find("th").map(function(k,v){return $(this).text()}).get()
    let a=z.find('tr').slice(1).map(function(k1,v1){
       let r={}
       $(this).find("td").map(
           function(k2,v2){
               r["index"]=k1
               if ($(this).children().length > 0) {
                   r[kk[k2]]=map(x=>x.attr('href')
                       ? [
                           x.text(),
                          //format_link(x.attr('href'),base,x=>x.replace("blob/","")) ,
                          format_link(x.attr('href')) ,
                       ]
                       : x.text(),$(this).children())
               }else{
                   r[kk[k2]]=$(this).text()
               }
           }
       )
       return r
    }).get()
    return a
}

const parse=(html="")=>{
    const $=cheerio.load(html)
    const ts=$("table")
    const oo=map(parse_table,ts)
    oo.forEach((v,k)=> utility.writeJSON(k+".json",v))
    return oo
}


const start=async (
    a="https://github.com/birdsofsummer/table"
)=>{
    const r=await superagent.get(a)
    const html=r.text
    const tables=parse(html)
    return tables
}



z=start()
console.log(z)
