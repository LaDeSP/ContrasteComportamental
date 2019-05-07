/* 
    distinguir se o componente possui vi constante ou alternado
    VIs usado no teste
    numero de respostas pra cada componete(numeros de cliques/tempo de sessao em minutos)
 */


module.exports = {

    gera_relatorio: function(){
        const fs = require('fs')
        const PDFDocument = require('pdfkit')//chama as funcoes do modulo pdfkit

        const doc = new PDFDocument;

        doc.pipe(fs.createWriteStream('./PDF/test.pdf'));// aqui troca o local aonde o aquivo sera salvo //createWriteStream - cria um arquivo editavel no local especificado

        var jsonText = [
            {'1': 'novo'},
            {'2': 'novo2'}
        ]

        jsonText.forEach(function(item){
            doc.text(JSON.stringify(item));
        })

        doc.end()
    }
};