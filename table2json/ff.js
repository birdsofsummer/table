const map=(fn,o=[])=>[...o].map(fn)
const is_link=(x=>x.nodeName == "A")
const is_text=(x=>x.nodeName=="#text")

//td=document.querySelector("td")
const parse_td=(td)=>{
    if (td.children.length>0){
           let text=Array.from(td.childNodes)
             .filter(is_text)
             .map(x=>x.textContent)
             .filter(x=>x.length>3)

           let link=Array.from(td.childNodes)
             .filter(is_link)
             .map(x=>[
                x.innerText,
                x.href,
             ])
           // return {text,link}
           return link.concat(text.map(x=>[x,""]))
    }else{
        return td.innerText
    }
}

const parse_table=(z)=>{
    const head=map(x=>x.innerText,z.querySelectorAll('thead tr th'))
    const rows=map(x=>map(parse_td,x.children),z.querySelectorAll('tbody tr'))
    return rows.map(x=>x.map((y,i)=>[head[i],y])).map(Object.fromEntries)
}

const start=()=>{
    const ts=document.querySelectorAll('table')
    const oo=map(parse_table,ts)
    return oo
}

zz=start()
