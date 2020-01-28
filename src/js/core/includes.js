import $ from 'jquery'

//arrays com várias funções
const loadHtmlSuccessCallbacks = [] //executar lista callbacks logo depois que a página for carregada

//essas funções são registradas a partir daqui
export function onLoadHtmlSuccess(callback) { //vai add uma nova callback
    if(!loadHtmlSuccessCallbacks.includes(callback)) { //se está callback não está nesse array
        loadHtmlSuccessCallbacks.push(callback) //função add uma única vez nesse array
    }
}

function loadIncludes(parent) { //vai ler todos os atributos de wm-include, parent é a tag que a envolve
    if(!parent) parent = 'body' //se tiver vazio, procure-o dentro do body
    $(parent).find('[wm-include]').each(function(i, e) { //procure dentro do parent, todos que tem wm
        const url = $(e).attr('wm-include')
        $.ajax({
            url,
            success(data) { //função callback que vai ser chamada quando a requisição for feita
                $(e).html(data) //coloco o resultado obtido dentro do elemento, data = dados
                $(e).removeAttr('wm-include') //excluo ela p/ que não aja nenhuma interpretação de novo

                loadHtmlSuccessCallbacks.forEach(callback => callback(data))
                loadIncludes(e) //usa até carregar todos os elementos
            }
        })
    })
}

loadIncludes() //chama pela primeira vez, passando vazio usa o body como ṕrimeiro parent