class JspTable{
    constructor(thead,tbody,methods,rule,tableText){
        this.thead = thead
        this.tbody = tbody
        this.methods = methods
        this.tableText = tableText //定义私有变量 table模板
        this.rule = rule
    }
    renderThead(){
        let headTxt = ''
        for(let key in this.thead){
            headTxt = headTxt + `<td>${this.thead[key]}</td>`
        }
        return headTxt
    }
    renderTbody(){
        let tbody = ''
        for (let item of this.tbody){
            let tbodyTr = '<tr>'
            for(let key in this.thead){
                if(!item[key]){
                    continue
                }
                tbodyTr = tbodyTr + `<td>${item[key]}</td>`
            }
            

            //此处判断显示按钮
            let buttonTxt = `<td>`
            for(let index in this.methods){
                let bool = this.rule[index] === null || this.rule[index] === undefined || this.eval(item,this.rule[index])
                buttonTxt = buttonTxt + `<button type="button" class="btnStyle${index}" style="display: ${bool?'':'none'}"
 onclick=jspTable.callFunc(${JSON.stringify(item)},${JSON.stringify(this.methods[index])})>${this.methods[index].name}</button>`
            }
            tbodyTr = tbodyTr + buttonTxt + `</td>` + `</tr>`
            tbody = tbody + tbodyTr
        }
        return tbody
    }
    //
    callFunc(data,method){
        for(let param in method.data){
            if(data[param]) method.data[param] = data[param]
        }
        window[method.method](method.data)
    }
    //
    eval(item,name){
        // debugger
        // let Func = Function
        // return new Func('return' + this.rule[index])
        return window[name](item)
    }

}
function renderTable(thead,tbody,methods,rule,tableText=`<table class="table table-bordered table-responsive table-striped table-hover" style="border:1px solid #BFDAF4;" id="jspTable"><thead class="text-center" style="background:#E9F2FB;" class="thead"></thead><tbody class="text-center" class="tbody"></tbody></table>`){
    jspTable = new JspTable(thead,tbody,methods,rule,tableText)
    tableText = tableText.replace('class="thead">','class="thead">' + jspTable.renderThead())
    tableText = tableText.replace('class="tbody">','class="tbody">' + jspTable.renderTbody())
    tableText = document.createRange().createContextualFragment(tableText)
    document.getElementById('jspTableDiv').append(tableText)
}