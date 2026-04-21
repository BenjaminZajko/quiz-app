interface Otazka {
    otazka: string
    odpovede: string[]
    spravna: number
}

const otazky: Otazka[] = [
    { otazka: 'Aké je hlavné mesto Francúzska?', odpovede: ['Berlín', 'Paríž', 'Madrid', 'Rím'], spravna: 1 },
    { otazka: 'Koľko má klavír kláves?', odpovede: ['76', '88', '92', '100'], spravna: 1 },
    { otazka: 'Čo je H2O?', odpovede: ['Kyslík', 'Vodík', 'Voda', 'Soľ'], spravna: 2 },
    { otazka: 'Kto napísal Romeo a Júlia?', odpovede: ['Dickens', 'Shakespeare', 'Hemingway', 'Tolstoj'], spravna: 1 },
    { otazka: 'Koľko strán má kocka?', odpovede: ['4', '6', '8', '12'], spravna: 1 }
]

let aktualnaOtazka = 0
let skore = 0
let timer: number
let casNaOtazku = 10

function spustiTimer() {
    casNaOtazku = 10
    document.getElementById('timer')!.textContent = '⏱ ' + casNaOtazku

    timer = setInterval(() => {
        casNaOtazku--
        document.getElementById('timer')!.textContent = '⏱ ' + casNaOtazku

        if (casNaOtazku === 0) {
            clearInterval(timer)
            dalšiaOtazka()
        }
    }, 1000)
}

function zobrazOtazku() {
    const o = otazky[aktualnaOtazka]
    document.getElementById('otazka')!.textContent = o.otazka

    const odpovede = document.getElementById('odpovede')!
    odpovede.innerHTML = ''

    o.odpovede.forEach((text, index) => {
        const btn = document.createElement('button')
        btn.className = 'odpoved'
        btn.textContent = text
        btn.addEventListener('click', () => skontrolujOdpoved(index))
        odpovede.appendChild(btn)
    })

    spustiTimer()
}

function skontrolujOdpoved(index: number) {
    clearInterval(timer)
    const btns = document.querySelectorAll('.odpoved')

    btns.forEach((btn, i) => {
        if (i === otazky[aktualnaOtazka].spravna) {
            btn.classList.add('spravna')
        } else {
            btn.classList.add('nespravna')
        }
    })

    if (index === otazky[aktualnaOtazka].spravna) skore++

    setTimeout(() => dalšiaOtazka(), 1000)
}

function dalšiaOtazka() {
    aktualnaOtazka++
    if (aktualnaOtazka < otazky.length) {
        zobrazOtazku()
    } else {
        zobrazVysledok()
    }
}

function zobrazVysledok() {
    document.getElementById('otazka')!.textContent = ''
    document.getElementById('odpovede')!.innerHTML = ''
    document.getElementById('timer')!.textContent = ''
    document.getElementById('vysledok')!.textContent = `Skóre: ${skore} / ${otazky.length}`
}

zobrazOtazku()