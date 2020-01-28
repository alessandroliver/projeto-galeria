import $ from 'jquery'

import { onLoadHtmlSuccess } from '../core/includes'

const duration = 300

function filterByCity(city) { //filtra parte dos elementos
    $('[wm-city]').each(function (i, e) {
        const isTarget = $(this).attr('wm-city') === city || city === null
        if (isTarget) {
            $(this).parent().removeClass('d-none') //reorganiza na hora de gerar as grids
            $(this).fadeIn(duration)
        } else {
            $(this).fadeOut(duration, () => {
                $(this).parent().addClass('d-none') //escondendo as divs dentro do sistema de grid
            })
        }
    })
}

$.fn.cityButtons = function () {
    const cities = new Set //Set não tem repetição
    $('[wm-city]').each(function (i, e) {
        cities.add($(e).attr('wm-city')) //pega o valor, o nome da cidade, e coloca dentro do Set cities
    })

    //converte cities p/ array, faz o map transformando em butão
    const btns = Array.from(cities).map(city => {
        //cria btn com classes e conteúdo com nome da city
        const btn = $('<button>').addClass(['btn', 'btn-info']).html(city)
        btn.click(e => filterByCity(city)) //click do butão filtra a cidade
        return btn //pra preencher o array com os botões e seus respectivos nomes
    })

    const btnAll = $('<button>').addClass(['btn', 'btn-info', 'active']).html('Todas') //html- label do btn
    btnAll.click(e => filterByCity(null))
    btns.push(btnAll) //add btnAll para o Array de botões

    const btnGroup = $('<div>').addClass(['btn-group']) //grupo de botões, todos juntos
    btnGroup.append(btns) //add no grupo de botão, todos os botões que estão dentro do Array

    $(this).html(btnGroup) //coloca btnGroup dentro de cityButtons
    return this
}

onLoadHtmlSuccess(function() { //página carregada de forma bem-sucedida
    $('[wm-city-buttons]').cityButtons() //neste elemento ejetarei os botões, aplica o plugin pra div
})