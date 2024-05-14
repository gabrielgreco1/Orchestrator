import puppeteer from 'puppeteer';
import Jimp from 'jimp';
import XLSX from 'xlsx';
import sendEmail from './Email.js';
import deletePngFiles from './Delete_file.js';
import 'dotenv/config';

export async function startAutomation() {
    

function paths(){
    const directory1 = 'C:\\Users\\ggreco\\Documents\\Automações\\Code\\Node\\Multas\\PRD\\01 - Multas\\images';
    const directory2 = 'S:\\Automacoes\\Multas\\01 - Multas Arval Nic Nao\\Retorno'

    deletePngFiles(directory1);
    deletePngFiles(directory2);
}

// paths();

console.log(`${new Date().toLocaleString()} - Realizando leitura do Excel`)

// Ler o arquivo Excel
const workbook = XLSX.readFile('S:\\Automacoes\\Multas\\01 - Multas Arval Nic Nao\\Arval_valida.xlsx');
const sheet_name_list = workbook.SheetNames;
const dados = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);

console.log(`${new Date().toLocaleString()} - Registros lidos com sucesso`)

const email = dados[0]['User Process']

console.log('--------------------------//--------------------------//--------------------------');
console.log('--------------------------//--------------------------//--------------------------');
console.log(`--------------------------//     START AUTOMATION - USER:  ${email}    //-----`);
console.log('--------------------------//--------------------------//--------------------------');
console.log('--------------------------//--------------------------//--------------------------');

    let i = 0
    let value = 0
    let browser;
    try {
  // Iniciar o navegador
    browser = await puppeteer.launch({ headless: false,
                                       protocolTimeout: 60000  }); // 'new' para rodar em background
    // Abrir uma nova página
    const page = await browser.newPage();

    // Definir a resolução da janela
    await page.setViewport({ width: 1280, height: 1024 });

    // Navegar até o URL especificado
    await page.goto(process.env.process);

    // Inserir login, senha e logar
    await page.type('#TxtLogin', process.env.user);
    await page.type('#TxtPassword', process.env.password);
    await page.keyboard.press('Enter');


    let contador_inicio = 0;
    await new Promise(resolve => setTimeout(resolve, 5000));

    while (contador_inicio < 21){
        const xinicio = 148;
        const yinicio = 418;
        await page.screenshot({ path: 'images/screenshot_inicio.png' });
        const img_inicio = await Jimp.read('images/screenshot_inicio.png');
        const corPixel = Jimp.intToRGBA(img_inicio.getPixelColor(xinicio, yinicio));
        let cor = corPixel.r === 70 && corPixel.g === 83 && corPixel.b === 123;
        if (cor) {
            console.log(`${new Date().toLocaleString()} - Sistema carregou`);
            contador_inicio = 21;
        } else {
            await new Promise(resolve => setTimeout(resolve, 2000));
            contador_inicio = contador_inicio + 1;

            if (contador_inicio > 20) {
                console.log(`${new Date().toLocaleString()} - Não foi possível entrar no sistema`);
                await browser.close();
            }
    }}

    console.log(`--------------------------//------ ${dados.length} Registros ------//--------------------------`)
    

    for (i = value; i < dados.length; i++){
        
        console.log()
        console.log(`\n--------------------------//------Linha ${i}------//--------------------------`);

        const AIT = dados[i]['AIT Process'];
        const ModoEnvio = dados[i]['Modo de Envio'];
        const CarimboLumma = dados[i]['Carimbo Lumma'];
        const CarimboCliente = dados[i]['Carimbo Cliente'];
        const NIC = dados[i]['NIC'];
        const Orgao = dados[i]['Orgao'];
        const Valor = dados[i]['Valor integral'];
        const ValorDesc = dados[i]['Valor com desconto'];
        const Locatario = dados[i]['Loc'];
        const Banco = dados[i]['Banco'];

        // Clica em Validar dados
        const frameElement = await page.$('#ifrcontent');
        const frame_out = await frameElement.contentFrame();
        // Clica em validar dados
        await frame_out.click('#divBoxUsers > a:nth-child(8)')
        await new Promise(resolve => setTimeout(resolve, 5000));

        // Verifica se o sistema está no local certo para começar o loop

        while (contador_inicio < 11){
            const xinicio = 148;
            const yinicio = 418;
            await page.screenshot({ path: 'images/screenshot_inicio.png' });
            const img_inicio = await Jimp.read('images/screenshot_inicio.png');
            const corPixel = Jimp.intToRGBA(img_inicio.getPixelColor(xinicio, yinicio));
            let cor = corPixel.r === 70 && corPixel.g === 83 && corPixel.b === 123;
            if (cor) {
                console.log(`${new Date().toLocaleString()} - Indo para AIT: `, AIT);
                await new Promise(resolve => setTimeout(resolve, 3000));
                contador_inicio = 11;
            } else {
                await new Promise(resolve => setTimeout(resolve, 2000));
                contador_inicio = contador_inicio + 1;
    
                if (contador_inicio > 10) {
                    console.log(`${new Date().toLocaleString()} - Não foi possível carregar o sistema`);
                    console.log('--------------------------//--------------------------//--------------------------');
                    await browser.close();
                }
        }}
        
        await new Promise(resolve => setTimeout(resolve, 5000));

        // AIT 
        await page.mouse.click(295, 345, { clickCount: 2 });
        // Pega dados da coluna no excel 
        await page.keyboard.type(AIT.toString());  
        await page.keyboard.press('Tab');
        await page.keyboard.press('Enter');
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Verifica se a AIT inserida foi encontrada
        let flagReiniciar = false
        let contador_mais = 0;
        while (contador_mais < 4){
            const xmais = 285;
            const ymais = 589;
            await page.screenshot({ path: 'images/screenshot_+.png' });
            const img_mais = await Jimp.read('images/screenshot_+.png');
            const corPixelmais = Jimp.intToRGBA(img_mais.getPixelColor(xmais, ymais));
            let cor_mais = corPixelmais.r === 255 && corPixelmais.g === 255 && corPixelmais.b === 255;
            if (cor_mais) {
                console.log(`${new Date().toLocaleString()} - Encontrou AIT: `, AIT);
                contador_mais = 4;
            } else {
                await new Promise(resolve => setTimeout(resolve, 2000));
                contador_mais = contador_mais + 1;
                if (contador_mais > 3) {
                    console.log(`${new Date().toLocaleString()} - Ait não encontrado: `, AIT);
                    console.log('--------------------------//--------------------------//--------------------------');
                    dados[i]['STATUS'] = 'AIT não encontrada';
                    // Converta o array de objetos atualizado de volta para um worksheet
                    const ws = XLSX.utils.json_to_sheet(dados);
                    // Substitua o worksheet antigo pelo novo no workbook
                    workbook.Sheets[sheet_name_list[0]] = ws;
                    // Escreva o workbook atualizado de volta para o arquivo
                    XLSX.writeFile(workbook, "S:\\Automacoes\\Multas\\01 - Multas Arval Nic Nao\\Retorno\\Validacao_retorno.xlsx"); 
                    flagReiniciar = true;
                }
        }}
        if(flagReiniciar) continue;

        // Click +
        await page.mouse.click(260, 578);

        // Verifica se o formulário abriu 
        let flagReload = false
        let contador_abriu = 0;
        while (contador_abriu < 20){
            const xabriu = 140;
            const yabriu = 943;
            await page.screenshot({ path: 'images/screenshot_abriu.png' });
            const img_abriu = await Jimp.read('images/screenshot_abriu.png');
            const corPixel_abriu = Jimp.intToRGBA(img_abriu.getPixelColor(xabriu, yabriu));
            let cor_abriu = corPixel_abriu.r === 255 && corPixel_abriu.g === 255 && corPixel_abriu.b === 255;
            if (!cor_abriu) {
                console.log(`${new Date().toLocaleString()} - Entrou na tela de validação`);
                await new Promise(resolve => setTimeout(resolve, 3500));
                contador_abriu = 20;
            } else {
                await new Promise(resolve => setTimeout(resolve, 2000));
                contador_abriu = contador_abriu + 1;
                if (contador_abriu > 19) {
                    console.log(`${new Date().toLocaleString()} - Não foi possível abrir o formulário`);
                    console.log('--------------------------//--------------------------//--------------------------');
                    await page.reload();
                    flagReload = true
                }
    }}
        if (flagReload) continue;

        // Leitura do Iframe
        const frameElementform = await page.$('#frameDetails');
        const frame = await frameElementform.contentFrame();
            
        // NIC
        await frame.click('#cmbTipoNIC');
        await page.keyboard.type(NIC.toString()); 
        await page.keyboard.press('Enter');

        // Tipo contrato
        await frame.click('#cmbTipoContrato');
        await new Promise(resolve => setTimeout(resolve, 500));
        await page.keyboard.type('FLT'); 
        await new Promise(resolve => setTimeout(resolve, 500));
        await page.keyboard.press('Enter');

        
        // Modo de envio
        await new Promise(resolve => setTimeout(resolve, 2000));
        await page.keyboard.press('Tab');
        await page.keyboard.type(ModoEnvio.toString()); 
        await page.keyboard.press('Enter');


        // Carimbo da lumma
        await new Promise(resolve => setTimeout(resolve, 500));
        await frame.click('.DriverNameClass.datepicker');
        await page.keyboard.type(CarimboLumma.toString(), {delay: 100}); 
        await page.keyboard.press('Tab');

        // Carimbo do Cliente
        await new Promise(resolve => setTimeout(resolve, 500));
        await page.keyboard.type(CarimboCliente.toString()); 
        await page.keyboard.press('Enter');
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Locatario 1
        await frame.click('#cmbLocatarioNot');
        if (Locatario !== undefined) {
            await page.keyboard.type(Locatario.toString());
            await new Promise(resolve => setTimeout(resolve, 1000));
            await page.keyboard.press('Enter');
        }
        await new Promise(resolve => setTimeout(resolve, 250));
        await page.mouse.click(594, 391)

        // Locatario 2
        if (Locatario !== undefined) {
            await frame.click('.campoLocatarioBoleto.inputLong.grupoAtual');
            await page.keyboard.type(Locatario.toString());
            await page.keyboard.press('Enter');
        } 
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Órgão
        if (Orgao !== undefined) {
        await new Promise(resolve => setTimeout(resolve, 500));
        await frame.click('#cmbOrgaoBol_chosen');
        await page.keyboard.type(Orgao.toString()); 
        await new Promise(resolve => setTimeout(resolve, 500));
        await page.keyboard.press('Enter');
        }   
        // Valor
        await new Promise(resolve => setTimeout(resolve, 500));
        await frame.click('#txtValorBol');
        await new Promise(resolve => setTimeout(resolve, 500));
        await page.keyboard.press('Tab');
        await new Promise(resolve => setTimeout(resolve, 500.));
        await page.keyboard.type(Valor.toString()); 
        await new Promise(resolve => setTimeout(resolve, 500));
        await page.keyboard.press('Tab');


        // Valor comd desconto
        await new Promise(resolve => setTimeout(resolve, 500));
        await page.keyboard.type(ValorDesc.toString()); 
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Banco
        await frame.evaluate((textToSelect) => {
            let selectElement = document.querySelector("#cmbBancoBol");
            for(let i = 0; i < selectElement.options.length; i++) {
              if(selectElement.options[i].text === textToSelect) {
                selectElement.selectedIndex = i;
                break;
              }
            }
          }, Banco);          
        await new Promise(resolve => setTimeout(resolve, 2000));
    // Limpa campos de email

        await frame.click('#txtEmailGestorBol')
        await page.keyboard.down('Control');
        await page.keyboard.press('KeyA');
        await page.keyboard.up('Control');
        await page.keyboard.press('Backspace')
        await new Promise(resolve => setTimeout(resolve, 500));
        for (let j=0; j<7; j++) {
          await page.keyboard.press('Tab')
          await page.keyboard.down('Control');
          await page.keyboard.press('KeyA');
          await page.keyboard.up('Control');
          await page.keyboard.press('Backspace')
          await new Promise(resolve => setTimeout(resolve, 500));
        }
        await new Promise(resolve => setTimeout(resolve, 1000));
        await frame.click('#FineProcessCCEmails')
        await page.keyboard.down('Control');
        await page.keyboard.press('KeyA');
        await page.keyboard.up('Control');
        await page.keyboard.press('Backspace')

        // Salvar 1
        await frame.click('.btn.btn-primary ');
        await new Promise(resolve => setTimeout(resolve, 2000));

         // Verificação de erros ao salvar
        let flagRestart = false;
        const xfinal = 1026;
        const yfinal = 403;
        await page.screenshot({ path: `images/screenshot_salvou.png` });
        await new Promise(resolve => setTimeout(resolve, 2000));
        const img_final = await Jimp.read('images/screenshot_salvou.png');
        const corPixel_final = Jimp.intToRGBA(img_final.getPixelColor(xfinal,yfinal));
        let cor_final = corPixel_final.r === 46 && corPixel_final.g === 46 && corPixel_final.b === 46;
        await new Promise(resolve => setTimeout(resolve, 2000))
             if (cor_final) {
                let erro = "S:\\Automacoes\\Multas\\01 - Multas Arval Nic Nao\\Retorno\\Erro_AIT_ " + AIT + ".png";
                await page.screenshot({ path: erro})
                await new Promise(resolve => setTimeout(resolve, 1000));
                await page.keyboard.press("Tab");
                await new Promise(resolve => setTimeout(resolve, 1000));
                await page.keyboard.press("Enter");
                await page.mouse.click(199,940);
                console.log(`${new Date().toLocaleString()} - Erro ou falta de informações: `, AIT);
                console.log('--------------------------//--------------------------//--------------------------');
                dados[i]['STATUS'] = 'Erro ou falta de informações';
                const ws = XLSX.utils.json_to_sheet(dados);
                workbook.Sheets[sheet_name_list[0]] = ws;
                XLSX.writeFile(workbook, 'S:\\Automacoes\\Multas\\01 - Multas Arval Nic Nao\\Retorno\\Validacao_retorno.xlsx');
                await page.reload();
                flagRestart = true;
             } 

        if(flagRestart) continue;

        // Salvar 2
        await page.keyboard.press('Tab');
        await new Promise(resolve => setTimeout(resolve, 250));
        await page.keyboard.press('Tab');
        await new Promise(resolve => setTimeout(resolve, 250));
        await page.keyboard.press('Tab');
        await new Promise(resolve => setTimeout(resolve, 250));
        await page.keyboard.press('Tab');
        await new Promise(resolve => setTimeout(resolve, 250));
        await page.keyboard.press('Enter');
        

        // Verifica se salvou ou ainda está carregando
        let flagReiniciar2 = false
        let contador_salvou = 0
        while(contador_salvou < 6) {
            const xsalvou = 957;
            const ysalvou = 325;
            await page.screenshot({ path: 'images/screenshot_salvou.png' });
            await new Promise(resolve => setTimeout(resolve, 5000));
            const img_salvou = await Jimp.read('images/screenshot_salvou.png');
            const corPixel_salvou = Jimp.intToRGBA(img_salvou.getPixelColor(xsalvou,ysalvou));
            let cor_salvou = corPixel_salvou.r === 245 && corPixel_salvou.g === 245 && corPixel_salvou.b === 245;
            if (cor_salvou){  
                await page.keyboard.press('Tab');
                await new Promise(resolve => setTimeout(resolve, 250));
                await page.keyboard.press('Enter');
                    contador_salvou = 6;
            } else{
                await new Promise(resolve => setTimeout(resolve, 2000));
                contador_salvou++;

                if (contador_salvou > 5){
                    let erro = "S:\\Automacoes\\Multas\\01 - Multas Arval Nic Nao\\Retorno\\Erro_AIT_ " + AIT + ".png";
                    await page.screenshot({ path: erro})
                    await page.keyboard.press('Tab')
                    await new Promise(resolve => setTimeout(resolve, 500));
                    await page.keyboard.press('Enter')
                    await new Promise(resolve => setTimeout(resolve, 500));
                    await page.mouse.click(199,940);
                    await new Promise(resolve => setTimeout(resolve, 500));
                    console.log(`${new Date().toLocaleString()} - Não salvou por erro do sistema, validar manualmente AIT:`, AIT)
                    console.log('--------------------------//--------------------------//--------------------------');
                    dados[i]['STATUS'] = 'Erro no Process';
                    flagReiniciar2 = true;
                    // Converta o array de objetos atualizado de volta para um worksheet
                    const ws = XLSX.utils.json_to_sheet(dados);
                    // Substitua o worksheet antigo pelo novo no workbook
                    workbook.Sheets[sheet_name_list[0]] = ws;
                    // Escreva o workbook atualizado de volta para o arquivo
                    XLSX.writeFile(workbook, "S:\\Automacoes\\Multas\\01 - Multas Arval Nic Nao\\Retorno\\Validacao_retorno.xlsx"); 
    

                }
            }}

        if (flagReiniciar2) continue;
        console.log(`${new Date().toLocaleString()} - Validação concluída, AIT: `, AIT)
        console.log('--------------------------//--------------------------//--------------------------');
        // No final de cada iteração do loop
        dados[i]['STATUS'] = 'OK'; // Assume que 'dados' é o array de objetos que você leu do Excel
        // Converta o array de objetos atualizado de volta para um worksheet
         const ws = XLSX.utils.json_to_sheet(dados);
         // Substitua o worksheet antigo pelo novo no workbook
         workbook.Sheets[sheet_name_list[0]] = ws;
         // Escreva o workbook atualizado de volta para o arquivo
         XLSX.writeFile(workbook, "S:\\Automacoes\\Multas\\01 - Multas Arval Nic Nao\\Retorno\\Validacao_retorno.xlsx"); 
    
        // Tirar um screenshot e salvar na mesma pasta do script
        await new Promise(resolve => setTimeout(resolve, 2000));
        await page.screenshot({ path: 'images/screenshot_recomeço.png' });
    }
    console.log('--------------------------//--------------------------//--------------------------');
    console.log('--------------------------//--------------------------//--------------------------');
    console.log(`--------------------------//     END AUTOMATION - USER:  ${email}    //------`);
    console.log('--------------------------//--------------------------//--------------------------');
    console.log('--------------------------//--------------------------//--------------------------');

    
    // Fechar o navegador 
    await browser.close();
    // Enviar email ao usuário 
    sendEmail(email, `Este email é enviado automaticamente.\n A automação 01 - Multas Arval Nic Nao, finalizou! \n Cheque a pasta retorno na rede para visualizar o resultado.`) 
    console.error("Processo finalizado com sucesso.")
    } catch (error) {
        console.error('Ocorreu um erro:', error);
        if (browser) {
            await browser.close();
        }
        // Reiniciar a automação em caso de erro
        await new Promise(resolve => setTimeout(resolve, 10000));
        console.log(`${new Date().toLocaleString()} - Um erro foi apresentado, reiniciando...`)
        value = i + 1
        // startAutomation();
    }
}; 

// startAutomation()