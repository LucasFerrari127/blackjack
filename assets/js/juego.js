/**
 * 2C = 2 Clubs / Tréboles
 * 2D = 2 Diamonds / Diamantes
 * 2H = 2 Hearts / Corazones
 * 2S = 2 Spades / Rombos
 */


(() => { // patron modulo, funcion anonima autoinvocada.

    'use strict' // js más estricto para la lectura del código. Revisar.

    let deck = [],
        puntosJugadores = [];


    const tipos = ['C', 'D', 'H', 'S'],
          especiales = ['A', 'J', 'Q', 'K'];
     
    // referencias de HTML

    const btnPedir = document.querySelector('#btnPedir'),
          btnNuevo = document.querySelector('#btnNuevo'),
          btnDetener = document.querySelector('#btnDetener');

    const puntosHTML = document.querySelectorAll('small'),
          divCartas = document.querySelectorAll('.divCartas');


    // Funcion para inicializar el juego

    const inicializarJuego = ( numJugadores ) => {
        deck = crearDeck();
        puntosJugadores = [];
        for ( let i = 0; i < numJugadores; i++){
            puntosJugadores.push(0);
        }

         //reseteo botones
         btnPedir.disabled = false;
         btnDetener.disabled = false;
 
         //reseteo puntajes
         puntosHTML.forEach( elem => elem.innerText = 0 );

 
         // //reseteo las cartas
         divCartas.forEach( elem => elem.innerHTML = '');

    }

    
    // Funcion para crear el mazo

    const crearDeck = () => {


        deck = [];
        for ( let i = 2; i <= 10; i++ ) {
        for( let tipo of tipos ) {
            deck.push( i + tipo );
        }
    }

        for ( let especial of especiales ) {
            for( let tipo of tipos ) {
                deck.push( especial + tipo );
        }
    }
    
        return _.shuffle(deck);

    }

    // Funcion para pedir una carta.

    const pedirCarta = () => { // PedirCarta recibe un arreglo de cartas
        
        if ( deck.length === 0) {
            throw 'No hay más cartas en la baraja';
        }

        return deck.pop(); // devuelve la carta
    }

    // Extraer el valor de cada carta

    const valorCarta = ( carta ) => {
        
        const valor = carta.substring( 0, carta.length - 1 );
    

        return ( isNaN( valor ) ) ? 
            ( ( valor === 'A') ? 11 :  10) 
            : valor * 1; // Forma reducida de los IF anidados
                    

    }

    // turno: 0 primer jugador, y el último va  ser el de la pc.
    const acumularPuntos = ( carta, turno ) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta( carta );
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];

    }

    // Turno compu

    const turnoComputadora = ( puntosMinimos ) => {
    
        let puntosCompu = 0;
        do {
            const carta = pedirCarta();
            puntosCompu = acumularPuntos( carta, puntosJugadores.length - 1 );
            crearCarta(carta, puntosJugadores.length - 1  );

            if (puntosMinimos > 21) {
                break;
            }
        }
        
        while( puntosMinimos > puntosCompu && puntosCompu <= 21 ) 

        setTimeout( () => {

            mensajeFinal( puntosCompu );

        }, 250);

    }

    // funcion agregar carta

    const crearCarta = ( unaCarta, turno ) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `./assets/cartas/${ unaCarta }.png`;
        imgCarta.classList.add('carta');
        divCartas[turno].append ( imgCarta );
        
    }


    // evento click pedir carta

    btnPedir.addEventListener('click', () => { // existe el click, dbclick, focus, etc

        const carta = pedirCarta();

        const puntosJugador = acumularPuntos( carta, 0 );
        crearCarta(carta, 0);

        if ( puntosJugador > 21 ) {

            setTimeout( () => {

                alert('Perdiste, intentalo de nuevo');
        
            }, 250);
            
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );
            return;

        } else if (puntosJugador === 21 ){ 
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );
            setTimeout( () => {

                mensajeFinal();
        
            }, 250);
        }

    });

    // Evento click detener


    btnDetener.addEventListener('click', () => {

        turnoComputadora( puntosJugadores[0] );
        btnPedir.disabled = true;
        btnDetener.disabled = true;


        
    });


    const mensajeFinal = (  ) => {
        
        const [ puntosJugador, puntosCompu ] = puntosJugadores;

        if ( (puntosCompu > puntosJugador && puntosCompu <= 21) || puntosJugador >= 21 ){
            alert('Perdiste, intentalo de nuevo');
        } else if( puntosCompu === puntosJugador ) {
            alert('Empate, intentalo de nuevo');
        } else  {
            alert('Ganaste');
        }
    };


    // Evento Boton nuevo

    btnNuevo.addEventListener('click', () => {

        inicializarJuego(2);
    });

    inicializarJuego(2);

})();







