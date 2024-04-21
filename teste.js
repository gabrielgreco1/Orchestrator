import puppeteer from 'puppeteer'

class cadastro {
    constructor(page, dados){
        this.page = page
        this.dados = dados
    }

    async open() {
        await this.page.goto('https://google.com.br')

    }
    async protocolo_bradesco(){
        await this.page.goto('https://bradesco.com.br')
        this.page.type('#login', process.env.login)
        this.page.type('#password', process.env.pass)

        for (let i = 0; i < this.dados.length; i++){
            this.page.type('#placa', this.dados.placa)
            let protocolo = {}
            protocolo.push({
                status: 'success'
            })
        }
        return protocolo
    }

    async lumma_contact(){
        await this.page.goto('https://lumma_contact.com.br')
        this.page.type('#login', process.env.login)
        this.page.type('#password', process.env.pass)
        return placa
    }

    async login(){

    }
}

async function main() {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    const objeto = new cadastro(page, dados)

    for (let i = 0; i < dados.length; i++) {
        const protocolo_bradesco = objeto.protocolo_bradesco()
        console.log(protocolo_bradesco)
    }
    await objeto.login()
}