// MOTOR DE PARTÍCULAS CANVAS (Copos Blancos)
(function iniciarCanvasParticulas() {
    const canvas = document.getElementById('canvasParticulas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let ancho = canvas.width = window.innerWidth;
    let alto = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        ancho = canvas.width = window.innerWidth;
        alto = canvas.height = window.innerHeight;
    });

    const particulas = [];
    const numParticulas = 120;

    for (let i = 0; i < numParticulas; i++) {
        particulas.push({
            x: Math.random() * ancho,
            y: Math.random() * alto,
            radio: Math.random() * 2.5 + 1,
            vx: (Math.random() - 0.5) * 0.5,
            vy: Math.random() * 1.2 + 0.4,
            alfa: Math.random() * 0.7 + 0.2
        });
    }

    function render() {
        ctx.clearRect(0, 0, ancho, alto);

        particulas.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.y > alto) {
                p.y = -10;
                p.x = Math.random() * ancho;
            }
            if (p.x > ancho) p.x = 0;
            if (p.x < 0) p.x = ancho;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radio, 0, Math.PI * 2);
            ctx.fillStyle = '#ffffff';
            ctx.globalAlpha = p.alfa;
            ctx.shadowBlur = 8;
            ctx.shadowColor = '#ffffff';
            ctx.fill();
        });

        requestAnimationFrame(render);
    }

    render();
})();

// REPRODUCTOR DE MÚSICA & LÓGICA PRINCIPAL
const inputNombre = document.getElementById('inputNombre');
const btnVerificar = document.getElementById('btnVerificar');
const mensajeRespuesta = document.getElementById('mensajeRespuesta');
const tarjetaPrincipal = document.getElementById('tarjetaPrincipal');
const pantallaAnimacion = document.getElementById('pantallaAnimacion');
const menuFlotante = document.getElementById('menuFlotante');
const modalDetalle = document.getElementById('modalDetalle');
const textoModal = document.getElementById('textoModal');
const btnCerrarSesion = document.getElementById('btnCerrarSesion');
const reproductorFlotante = document.getElementById('reproductorFlotante');

// ==========================================================================
// LÓGICA DE LA CUENTA REGRESIVA Y BLOQUEO TOTAL (HASTA EL 20 DE NOVIEMBRE DE 2026)
// ==========================================================================
const fechaObjetivo = new Date("November 20, 2026 00:00:00").getTime();
let regaloDesbloqueadoPorFecha = false;

function actualizarContadorRegresivo() {
    const ahora = new Date().getTime();
    const diferencia = fechaObjetivo - ahora;

    const elDias = document.getElementById('dias');
    const elHoras = document.getElementById('horas');
    const elMinutos = document.getElementById('minutos');
    const elSegundos = document.getElementById('segundos');
    const mensajeBloqueo = document.getElementById('mensajeBloqueo');

    if (diferencia <= 0) {
        // LLEGÓ EL DÍA - SE DESBLOQUEA TODO
        regaloDesbloqueadoPorFecha = true;
        if (elDias) elDias.innerText = "00";
        if (elHoras) elHoras.innerText = "00";
        if (elMinutos) elMinutos.innerText = "00";
        if (elSegundos) elSegundos.innerText = "00";

        if (mensajeBloqueo) {
            mensajeBloqueo.innerText = "🎉 ¡EL DÍA HA LLEGADO! Tu regalo está listo. 🎉";
            mensajeBloqueo.style.color = "#00dfd8";
        }

        if (btnVerificar) {
            btnVerificar.disabled = false;
            btnVerificar.innerText = "Abrir tu regalo 🎁";
            btnVerificar.style.background = "linear-gradient(45deg, var(--primary-neon), var(--secondary-neon))";
        }

        // Mostrar reproductor flotante al llegar la fecha
        if (reproductorFlotante) {
            reproductorFlotante.classList.remove('oculto-por-fecha');
        }
    } else {
        // AÚN NO LLEGA EL 20 DE NOVIEMBRE - TODO BLOQUEADO Y OCULTO
        regaloDesbloqueadoPorFecha = false;
        const d = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const h = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((diferencia % (1000 * 60)) / 1000);

        if (elDias) elDias.innerText = d < 10 ? '0' + d : d;
        if (elHoras) elHoras.innerText = h < 10 ? '0' + h : h;
        if (elMinutos) elMinutos.innerText = m < 10 ? '0' + m : m;
        if (elSegundos) elSegundos.innerText = s < 10 ? '0' + s : s;

        if (btnVerificar) {
            btnVerificar.disabled = true;
            btnVerificar.innerText = "🔒 Regalo Bloqueado 🔒";
        }

        // Mantener reproductor oculto y deshabilitar cualquier intento de abrir
        if (reproductorFlotante) {
            reproductorFlotante.classList.add('oculto-por-fecha');
        }
    }
}

// Actualizar cada segundo
setInterval(actualizarContadorRegresivo, 1000);
actualizarContadorRegresivo();

const listaCanciones = [
    { 
        titulo: "Amor Fugaz 💖", 
        archivo: "cancion1.mp3", 
        portada: "portada1.jpeg",
        significado: "💖 Amor Fugaz: Esta canción está aquí porque es una de tus favoritas y, con el tiempo, se ha convertido también en una de las mías al escucharla contigo."
    },
    { 
        titulo: "Hasta La Muerte ✨", 
        archivo: "cancion2.mpeg", 
        portada: "portada2.jpeg",
        significado: "✨ Hasta La Muerte: Porque representa exactamente lo que siento por ti, un amor sincero que trasciende cualquier obstáculo y que quiero que dure para siempre."
    },
    { 
        titulo: "Me Cambiaste 🎶", 
        archivo: "cancion3.mpeg", 
        portada: "portada3.jpg",
        significado: "🎶 Me Cambiaste: La elegí porque es la canción que nos unió, la que dio inicio a todo esto tan hermoso; es demasiado especial para mí y espero que para ti también lo sea."
    },
    { 
        titulo: "Soy Una Serpiente 🐍", 
        archivo: "cancion4.mpeg", 
        portada: "portada4.jpg",
        significado: "🐍 Soy Una Serpiente: Es súper especial porque ese día me sentía mal y tú lograste alegrar por completo mis ánimos, enamorándome aún más de ti."
    }
];

let indiceCancionActual = 0;
let musicaSonando = false;
const audioPlayer = document.getElementById('reproductorAudio');
const discoViniloAnimado = document.getElementById('discoViniloAnimado');
const imgPortadaDisco = document.getElementById('imgPortadaDisco');
const btnPlayPausa = document.getElementById('btnPlayPausa');
const txtCancion = document.getElementById('txtCancion');

function cargarCancion(indice) {
    if (!regaloDesbloqueadoPorFecha) return; // Bloqueado si no es la fecha
    try {
        if (listaCanciones.length === 0) return;
        audioPlayer.src = listaCanciones[indice].archivo;
        txtCancion.innerText = listaCanciones[indice].titulo;
        if (imgPortadaDisco) {
            imgPortadaDisco.src = listaCanciones[indice].portada;
            imgPortadaDisco.onerror = function() { this.src = 'snoopy.jpg'; };
        }
    } catch (e) {
        console.log("Error cargando canción:", e);
    }
}

function conmutarMusica() {
    if (!regaloDesbloqueadoPorFecha) return; // Bloqueado si no es la fecha
    try {
        if (!audioPlayer.src) cargarCancion(indiceCancionActual);

        if (musicaSonando) {
            audioPlayer.pause();
            if (discoViniloAnimado) discoViniloAnimado.classList.remove('girando');
            if (btnPlayPausa) btnPlayPausa.innerText = "▶️";
            musicaSonando = false;
        } else {
            let promesaPlay = audioPlayer.play();
            if (promesaPlay !== undefined) {
                promesaPlay.then(() => {
                    if (discoViniloAnimado) discoViniloAnimado.classList.add('girando');
                    if (btnPlayPausa) btnPlayPausa.innerText = "⏸️";
                    musicaSonando = true;
                }).catch((err) => { console.log("Error reproduciendo audio:", err); });
            }
        }
    } catch (e) {
        console.log("Error reproductor:", e);
    }
}

function siguienteCancion() {
    if (!regaloDesbloqueadoPorFecha) return;
    indiceCancionActual = (indiceCancionActual + 1) % listaCanciones.length;
    cargarCancion(indiceCancionActual);
    musicaSonando = false;
    conmutarMusica();
}

function cancionAnterior() {
    if (!regaloDesbloqueadoPorFecha) return;
    indiceCancionActual = (indiceCancionActual - 1 + listaCanciones.length) % listaCanciones.length;
    cargarCancion(indiceCancionActual);
    musicaSonando = false;
    conmutarMusica();
}

function cambiarVolumen(valor) {
    if (audioPlayer) audioPlayer.volume = valor;
}

function mostrarSignificado() {
    if (!regaloDesbloqueadoPorFecha) return;
    const tarjeta = document.getElementById('tarjetaSignificado');
    const texto = document.getElementById('textoSignificado');
    if (tarjeta && texto) {
        texto.innerText = listaCanciones[indiceCancionActual].significado;
        tarjeta.classList.remove('oculto-significado');
    }
}

function ocultarSignificado() {
    const tarjeta = document.getElementById('tarjetaSignificado');
    if (tarjeta) tarjeta.classList.add('oculto-significado');
}

if (audioPlayer) {
    audioPlayer.addEventListener('ended', () => { siguienteCancion(); });
}

cargarCancion(0);

if (btnVerificar) {
    btnVerificar.addEventListener('click', () => {
        if (!regaloDesbloqueadoPorFecha) {
            mensajeRespuesta.className = 'respuesta error';
            mensajeRespuesta.innerHTML = '⏳ Paciencia mi amor, el regalo se abrirá el 20 de Noviembre ❤️';
            return;
        }

        let nombreIngresado = inputNombre.value.trim().toLowerCase();
        nombreIngresado = nombreIngresado.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

        if (nombreIngresado === 'fatima') {
            mensajeRespuesta.className = 'respuesta exito';
            mensajeRespuesta.innerHTML = '¡Hellow mi yucateca amor de mi vida, bombaaa! 💣❤️';
            
            if (!musicaSonando) conmutarMusica();

            setTimeout(() => {
                tarjetaPrincipal.style.display = 'none';
                pantallaAnimacion.classList.remove('oculto-transicion');
                ejecutarCinematicaAvanzada();
            }, 800);

        } else {
            mensajeRespuesta.className = 'respuesta error';
            mensajeRespuesta.innerHTML = '¿Tú quién eres? 🤨 ¡Largo del sistema de mi novia!';
        }
    });
}

function ejecutarCinematicaAvanzada() {
    const personajeOmar = document.getElementById('personajeOmar');
    const personajeFatima = document.getElementById('personajeFatima');
    const zonaAbrazo = document.getElementById('zonaAbrazo');
    const cajaRegalo = document.getElementById('cajaRegalo');
    const textoCinematico = document.getElementById('textoCinematico');
    const tituloCinematicoText = document.getElementById('tituloCinematicoText');
    const subtextoCinematicoText = document.getElementById('subtextoCinematicoText');

    setTimeout(() => { if (textoCinematico) textoCinematico.innerText = "ESTABLECIENDO CONEXIÓN..."; }, 600);

    setTimeout(() => {
        if (personajeOmar) personajeOmar.classList.add('abrazando-omar');
        if (personajeFatima) personajeFatima.classList.add('abrazando-fatima');
        if (zonaAbrazo) zonaAbrazo.classList.add('activar-abrazo');
        
        if (tituloCinematicoText) tituloCinematicoText.innerText = "¡Abrazo sellado con amor infinito! 🫂💖";
        if (subtextoCinematicoText) subtextoCinematicoText.innerText = "Preparando tus opciones especiales...";
        if (textoCinematico) textoCinematico.innerText = "DESBLOQUEANDO UNIVERSO...";
    }, 2200);

    setTimeout(() => {
        if (personajeOmar) personajeOmar.style.opacity = '0';
        if (personajeFatima) personajeFatima.style.opacity = '0';
        if (zonaAbrazo) zonaAbrazo.classList.remove('activar-abrazo');

        if (cajaRegalo) cajaRegalo.classList.add('mostrar-regalo');
        if (tituloCinematicoText) tituloCinematicoText.innerText = "🎁 ¡CAJA DE REGALO ABIERTA! 🎁";
        if (subtextoCinematicoText) subtextoCinematicoText.innerText = "Cargando detalles exclusivos para ti...";
        if (textoCinematico) textoCinematico.innerText = "¡SISTEMA LISTO!";
    }, 4600);

    setTimeout(() => {
        pantallaAnimacion.classList.add('oculto-transicion');
        menuFlotante.classList.remove('oculto-menu');
    }, 7500);
}

if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener('click', () => {
        menuFlotante.classList.add('oculto-menu');
        pantallaAnimacion.classList.remove('oculto-transicion');
        
        const escenaAmor = document.querySelector('.escena-amor');
        if (escenaAmor) {
            escenaAmor.innerHTML = `
                <div class="caja-regalo-3d mostrar-regalo animacion-cerrar-regalo" style="position:relative; margin: 40px auto;">
                    <div class="tapa-regalo"><div class="lazo-tapa"></div></div>
                    <div class="cuerpo-regalo">🎁</div>
                </div>
                <h2 class="texto-transicion">Guardando tu sorpresa... 💖</h2>
                <p class="subtexto-transicion">¡Hasta pronto, mi yucateca hermosa!</p>
            `;
        }

        setTimeout(() => {
            pantallaAnimacion.classList.add('oculto-transicion');
            inputNombre.value = '';
            mensajeRespuesta.innerHTML = '';
            mensajeRespuesta.className = 'respuesta';
            tarjetaPrincipal.style.display = 'block';
            location.reload(); 
        }, 1200);
    });
}

function abrirSeccion(seccion) {
    if (!regaloDesbloqueadoPorFecha) return;
    modalDetalle.classList.remove('oculto-modal');

    if (seccion === 'secCarta') {
        textoModal.innerHTML = `
            <div class="sobre-contenedor" id="sobreContenedor" onclick="abrirSobre()">
                <div class="sobre" id="sobre">
                    <div class="solapa" id="solapa"></div>
                    <div class="estampa-corazon" id="selloCorazon">💖</div>
                    <div class="texto-abrir">Toca el sello para abrir 💌</div>
                </div>
            </div>

            <div class="papel-carta oculto-carta" id="papelCarta">
                <div class="encabezado-carta">
                    <span>💌 De Omar para Fátima 💌</span><br>
                    <small class="subtitulo-carta">(Pareja yucateca)</small>
                </div>
                <div class="cuerpo-carta">
                    <p>Mi yucateca hermosa, quiero primero que nada que tengas un feliz cumpleaños corazón, que tu día sea hermoso y divertido. 🎉✨</p>
                    <p>Aún recuerdo la vez que nos conocimos mi amor, cuando hablé por micro y quería que te ligaras a Iván y empezamos a hablar. Desde ahí supe que había una conexión entre tú y yo, ese humor que nos caracteriza a ambos, que nos hizo estar juntos. 💖</p>
                    <p>Siempre guardo con amor los bellos recuerdos que aún no son físicos pero lo serán pronto. Amo cuando hablamos como yucatecos, amo tu manera de ser, amo todo, absolutamente todo. Para mí eres la rosa más bella y única en todo el mundo. 🌹✨</p>
                    <p>Jamás te quiero perder, es mi miedo que esto tan hermoso se vaya; eres el significado de mi vida y mi guía hacia la luz. Te amo igual que amo jugar basket 🏀, igual que amo jugar Free 🎮, igual que amo programar 💻.</p>
                    <p>Este es uno de mis muchos regalos que te haré mi amor, siempre los haré con todo mi amor como esta bella página. Sé que tal vez no es el mejor regalo, pero me sale de todo corazón. 🥹❤️</p>
                    <div class="firma-carta">
                        De tu yucateco favorito,<br>
                        <strong>Omar 👑✨</strong>
                    </div>
                </div>
            </div>

            <button class="btn-regresar" onclick="cerrarSeccion()">⬅️ Regresar al Menú</button>
        `;
    } else if (seccion === 'secFlores') {
        mostrarBienvenidaSnoopy();
    } else if (seccion === 'secDiario') {
        textoModal.innerHTML = `
            <div class="libro-contenedor" id="libroContenedor" onclick="abrirLibro()">
                <div class="libro" id="libro">
                    <div class="portada-libro" id="portadaLibro">
                        <div class="broche-dorado">👑</div>
                        <h3 class="titulo-portada">Diario Mágico de Fátima</h3>
                        <p class="subtitulo-portada">Toca para abrir 📖✨</p>
                    </div>
                </div>
            </div>

            <div class="papel-diario oculto-diario" id="papelDiario">
                <div class="encabezado-diario">
                    <span>📖 Tu Diario Personal de Recuerdos</span>
                </div>
                <p class="explicacion-diario">
                    ✨ <strong>Mi yucateca hermosa:</strong> Este espacio es 100% tuyo. Aquí puedes escribir todas tu notas diarias, secretos o pensamientos bonitos de nosotros. ❤️
                </p>
                <div class="contenedor-escribir">
                    <textarea id="textoNuevaNota" placeholder="Escribe tu nota de hoy aquí mi amor... ✨" rows="3"></textarea>
                    <button id="btnGuardarNota" onclick="guardarNotaDiario()">Guardar Nota 📝</button>
                </div>
                <div class="lista-notas" id="listaNotas"></div>
            </div>

            <button class="btn-regresar" onclick="cerrarSeccion()">⬅️ Regresar al Menú</button>
        `;
    } else if (seccion === 'secMemorama') {
        mostrarMemorama();
    } else if (seccion === 'secLibro') {
        iniciarCargaLibroModal();
    }
}

// MEMORAMA ACTUALIZADO (Frases del cuento + Palabras y Momentos de la Carta)
const frasesMemo = [
    "La Yucateca", "Me sanaste", "Exterminador", "Mi esposa", 
    "Rosa más bella", "Guía hacia la luz", "Tu yucateco", "Amor eterno"
];
let primeraCarta = null, segundaCarta = null, bloqueateMemo = false, paresEncontradosMemo = 0;

function mostrarMemorama() {
    textoModal.innerHTML = `
        <h2 style="color: var(--primary-neon);">🎮 Memorama de Nuestro Amor</h2>
        <p style="font-size: 0.85rem; color: #ffd1dc; margin-bottom: 10px;">Encuentra las parejas de nuestras frases y momentos especiales ❤️</p>
        <div class="game-board" id="boardMemo"></div>
        <div id="messageMemo"></div>
        <button class="btn-regresar" onclick="cerrarSeccion()">⬅️ Regresar al Menú</button>
    `;
    crearTableroMemo();
}

function crearTableroMemo() {
    const board = document.getElementById('boardMemo');
    if (!board) return;
    board.innerHTML = '';
    let cartas = [...frasesMemo, ...frasesMemo].sort(() => Math.random() - 0.5);
    primeraCarta = null; segundaCarta = null; bloqueateMemo = false; paresEncontradosMemo = 0;

    cartas.forEach(frase => {
        const card = document.createElement('div');
        card.classList.add('card-memo');
        card.dataset.frase = frase;
        card.innerText = '❓';
        card.addEventListener('click', function() {
            if (bloqueateMemo || this === primeraCarta || this.classList.contains('matched')) return;
            this.classList.add('flipped'); 
            this.innerText = this.dataset.frase;
            
            if (!primeraCarta) { primeraCarta = this; return; }
            
            segundaCarta = this;
            if (primeraCarta.dataset.frase === segundaCarta.dataset.frase) {
                primeraCarta.classList.add('matched'); 
                segundaCarta.classList.add('matched');
                primeraCarta = null; segundaCarta = null; paresEncontradosMemo++;
                
                if (paresEncontradosMemo === frasesMemo.length) {
                    document.getElementById('messageMemo').innerText = '💖 ¡Felicidades mi amor, nuestro destino ya está escrito! 💖';
                }
            } else {
                bloqueateMemo = true;
                setTimeout(() => {
                    if (primeraCarta) { primeraCarta.classList.remove('flipped'); primeraCarta.innerText = '❓'; }
                    if (segundaCarta) { segundaCarta.classList.remove('flipped'); segundaCarta.innerText = '❓'; }
                    primeraCarta = null; segundaCarta = null; bloqueateMemo = false;
                }, 1000);
            }
        });
        board.appendChild(card);
    });
}

// LIBRO DIGITAL CON ANIMACIÓN DE CARGA Y 10 CAPÍTULOS EN MODAL
const storyPagesModal = [
    {
        chapter: "Capítulo 1",
        title: "Un Destino en la Pantalla de Free Fire",
        svg: `<svg viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg"><path d="M40,40 Q100,10 160,40 Q100,70 40,40 Z" fill="none" stroke="#ff7675" stroke-width="2" stroke-dasharray="5,5"></path><circle cx="60" cy="40" r="12" fill="#d63031"/><circle cx="140" cy="40" r="12" fill="#6c5ce7"/><text x="55" y="44" fill="#fff" font-size="10">🎮</text><text x="135" y="44" fill="#fff" font-size="10">✨</text></svg>`,
        content: `<p>Todo comenzó un día cualquiera conectándonos a una partida de Free Fire junto a mi gran amigo Iván. Entre risas, pláticas y bromas, decidimos mandar una invitación al mundo en general sin imaginar lo que vendría.</p><div class="highlight-quote">"Y fue justo en ese instante cuando la magia hizo su entrada triunfal: entre los jugadores que se unieron, apareció ella, mi amada Fátima."</div><p>Su presencia comenzó a cambiarlo todo desde el primer segundo en que su voz cruzó la pantalla.</p>`
    },
    {
        chapter: "Capítulo 2",
        title: "La Chica de Guadalajara y la 'Yucateca'",
        svg: `<svg viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg"><circle cx="100" cy="40" r="25" fill="#ffeaa7" stroke="#fdcb6e" stroke-width="2"/><path d="M90,35 Q100,25 110,35" fill="none" stroke="#2d3436" stroke-width="2"/><circle cx="93" cy="35" r="2" fill="#2d3436"/><circle cx="107" cy="35" r="2" fill="#2d3436"/><path d="M95,48 Q100,53 105,48" fill="none" stroke="#d63031" stroke-width="2"/><text x="75" y="20" font-size="14">🌴</text><text x="115" y="20" font-size="14">🎙️</text></svg>`,
        content: `<p>Fátima encendió su micrófono y nos habló. Al preguntarle de dónde era, respondió que de Guadalajara. Con mi chispa juguetona, le dije que su tono sonaba como el de una yucateca, bautizándola con ese apodo tan especial.</p><div class="highlight-quote">"Desde ese momento, ese apodo se convirtió en nuestro sello especial y en nuestra primera complicidad."</div><p>Intercambiamos Instagram y sentí una curiosidad inmensa por conocerla más.</p>`
    },
    {
        chapter: "Capítulo 3",
        title: "Un Mensaje y un Giro Inesperado",
        svg: `<svg viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg"><rect x="60" y="25" width="80" height="40" rx="8" fill="#74b9ff"/><polygon points="70,65 65,75 80,65" fill="#74b9ff"/><text x="85" y="50" font-size="18">💌</text></svg>`,
        content: `<p>El primer mensaje que le mandé tenía el propósito de ayudar a mi amigo Iván, haciéndoles bromas sobre un traje en conjunto en el juego. Sin embargo, el destino tenía otros planes para nosotros.</p><div class="highlight-quote">"La conversación fluyó sin parar, convirtiendo las charlas en un puente invisible entre su mundo y el mío."</div><p>Primero fuimos grandes amigos, riendo y compartiendo momentos inolvidables.</p>`
    },
    {
        chapter: "Capítulo 4",
        title: "El Abrazo Invisible que Sanó mi Alma",
        svg: `<svg viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg"><path d="M100,20 C80,5 50,30 70,60 C85,75 100,65 100,65 C100,65 115,75 130,60 C150,30 120,5 100,20 Z" fill="#ff7675"></path></svg>`,
        content: `<p>Yo venía cargando con el peso de una pequeña depresión por una relación anterior, una herida que no le conté a nadie. Pero pasar tiempo con Fátima, escucharla y reír juntos se convirtió en mi medicina.</p><div class="highlight-quote">"Su calidez y la comodidad a su lado empezaron a sanar mi alma. Con ella volví a sentirme yo mismo."</div><p>Fue el abrazo cálido que tanto necesitaba para despertar de nuevo.</p>`
    },
    {
        chapter: "Capítulo 5",
        title: "Corazones en el Campo de Batalla",
        svg: `<svg viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg"><circle cx="70" cy="40" r="15" fill="#fab1a0"/><circle cx="130" cy="40" r="15" fill="#81ecec"/><text x="92" y="45" font-size="16">💖</text></svg>`,
        content: `<p>Las bromas de ser novios se volvieron frecuentes. Me confesó que en una partida me había hecho corazones virtuales para ver mi reacción. Yo vine a ayudar a un amigo, pero terminé enamorado totalmente de ella.</p><div class="highlight-quote">"Fátima se había adueñado por completo de mis pensamientos y de mi vida entera."</div>`
    },
    {
        chapter: "Capítulo 6",
        title: "La Tormenta y el Arrepentimiento",
        svg: `<svg viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg"><path d="M90,20 L100,50 L110,20 Z" fill="#fdcb6e"/><circle cx="100" cy="60" r="5" fill="#ff7675"/></svg>`,
        content: `<p>En un intento absurdo por ponerla celosa, busqué a una chica en la Isla Social. La broma se salió de las manos y lastimé profundamente a Fátima. Verla dolida me destrozó por dentro.</p><div class="highlight-quote">"Ese día aprendí una lección muy dolorosa sobre el valor de cuidar un corazón sincero. Aún hoy me arrepiento."</div>`
    },
    {
        chapter: "Capítulo 7",
        title: "El Desafío del Exterminador",
        svg: `<svg viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg"><rect x="70" y="30" width="60" height="30" rx="5" fill="#2d3436"/><circle cx="85" cy="45" r="8" fill="#00b894"/><circle cx="115" cy="45" r="8" fill="#d63031"/></svg>`,
        content: `<p>Fátima me puso una condición: si quería una oportunidad, tenía que lograr un "exterminador" en Free Fire, matando a la escuadra enemiga yo solo. Me costó intentos y frustración, pero jamás me rendí.</p><div class="highlight-quote">"Lo hacía por ella y por el tamaño gigante de mi amor."</div>`
    },
    {
        chapter: "Capítulo 8",
        title: "La Gloria y mi Motor de Vida",
        svg: `<svg viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg"><polygon points="100,15 110,35 130,40 115,55 120,75 100,65 80,75 85,55 70,40 90,35" fill="#fdcb6e"/></svg>`,
        content: `<p>¡Por fin lo logré! Sentí una paz y calma absoluta no solo por la victoria, sino porque logré mi objetivo con mi motor de vida: el amor de mi Fátima. Le pregunté si se sentía lista, y me dijo que sí.</p><div class="highlight-quote">"Así comenzó oficialmente nuestro camino juntos."</div>`
    },
    {
        chapter: "Capítulo 9",
        title: "Promesa de Cuidado y Refugio",
        svg: `<svg viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg"><path d="M60,50 Q100,10 140,50" fill="none" stroke="#74b9ff" stroke-width="3"/><circle cx="100" cy="35" r="10" fill="#a29bfe"/></svg>`,
        content: `<p>Quiero ser todo para ella, jamás abandonarla y estar a su lado hasta que me lo permita. Este regalo es mi agradecimiento por haberme sanado y mostrarme que amar es lo más bello.</p><div class="highlight-quote">"Prometo ser el mejor hombre posible para ella en cada amanecer."</div>`
    },
    {
        chapter: "Capítulo 10",
        title: "Un Futuro Eterno: Vives en Mí",
        svg: `<svg viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg"><text x="70" y="45" font-size="28">💍</text><text x="110" y="45" font-size="28">♾️</text></svg>`,
        content: `<p>Más que amarla, Fátima vive en mí. Jamás quisiera soltarla. Quiero todo mi futuro a su lado, que sea mi esposa y madre de mis hijos.</p><div class="highlight-quote">"Te amo con cada fibra de mi alma, Fátima, y te prometo que nuestro amor será verdaderamente eterno."</div>`
    }
];

let paginaActualLibroModal = 0;

function iniciarCargaLibroModal() {
    if (!regaloDesbloqueadoPorFecha) return;
    textoModal.innerHTML = `
        <div style="padding: 40px 20px; text-align: center;">
            <div class="loader-heart">💖</div>
            <div class="loading-text">Abriendo las páginas de nuestra historia...</div>
            <p style="color: #ffd1dc; font-size: 0.9rem; margin-top: 5px;">Preparando cada recuerdo para ti, mi amor.</p>
        </div>
    `;
    setTimeout(() => {
        paginaActualLibroModal = 0;
        mostrarContenidoLibroModal();
    }, 2000);
}

function mostrarContenidoLibroModal() {
    if (!regaloDesbloqueadoPorFecha) return;
    const data = storyPagesModal[paginaActualLibroModal];
    const progressPercent = ((paginaActualLibroModal + 1) / storyPagesModal.length) * 100;

    textoModal.innerHTML = `
        <div class="book-wrapper">
            <div class="book">
                <div class="page-header">
                    <span class="chapter-tag">${data.chapter}</span>
                    <span class="page-number">Página ${paginaActualLibroModal + 1} de ${storyPagesModal.length}</span>
                </div>
                <div class="illustration-container">${data.svg}</div>
                <h2 class="page-title">${data.title}</h2>
                <div class="page-body">${data.content}</div>
                <div class="progress-bar-libro">
                    <div class="progress-fill-libro" style="width: ${progressPercent}%;"></div>
                </div>
            </div>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:15px;">
            <button class="btn-regresar" onclick="cambiarPaginaLibroModal(-1)" ${paginaActualLibroModal === 0 ? 'disabled style="opacity:0.4; cursor:not-allowed;"' : ''} style="margin:0;">← Anterior</button>
            <span style="font-size:0.9rem; color:#ffd1dc; font-weight:bold;">${paginaActualLibroModal + 1} / ${storyPagesModal.length}</span>
            <button class="btn-regresar" onclick="cambiarPaginaLibroModal(1)" style="margin:0;">${paginaActualLibroModal === storyPagesModal.length - 1 ? 'Fin ❤️' : 'Siguiente →'}</button>
        </div>
        <button class="btn-regresar" onclick="cerrarSeccion()" style="margin-top: 15px;">⬅️ Volver al Menú</button>
    `;
}

function cambiarPaginaLibroModal(dir) {
    if (!regaloDesbloqueadoPorFecha) return;
    if (paginaActualLibroModal + dir >= 0 && paginaActualLibroModal + dir < storyPagesModal.length) {
        paginaActualLibroModal += dir;
        mostrarContenidoLibroModal();
    }
}

// Funciones auxiliares carta, diario y snoopy
function abrirSobre() {
    if (!regaloDesbloqueadoPorFecha) return;
    const solapa = document.getElementById('solapa');
    const selloCorazon = document.getElementById('selloCorazon');
    const sobreContenedor = document.getElementById('sobreContenedor');
    const papelCarta = document.getElementById('papelCarta');

    if (solapa) solapa.style.transform = 'rotateX(180deg)';
    if (selloCorazon) selloCorazon.style.transform = 'scale(0)';

    setTimeout(() => {
        if (sobreContenedor) sobreContenedor.style.display = 'none';
        if (papelCarta) papelCarta.classList.remove('oculto-carta');
    }, 600);
}

function abrirLibro() {
    if (!regaloDesbloqueadoPorFecha) return;
    const portadaLibro = document.getElementById('portadaLibro');
    const libroContenedor = document.getElementById('libroContenedor');
    const papelDiario = document.getElementById('papelDiario');

    if (portadaLibro) portadaLibro.style.transform = 'rotateY(-160deg)';

    setTimeout(() => {
        if (libroContenedor) libroContenedor.style.display = 'none';
        if (papelDiario) papelDiario.classList.remove('oculto-diario');
        cargarNotasDiario();
    }, 700);
}

function guardarNotaDiario() {
    if (!regaloDesbloqueadoPorFecha) return;
    const textarea = document.getElementById('textoNuevaNota');
    if (!textarea) return;
    const textoNota = textarea.value.trim();

    if (textoNota === '') {
        alert('Escribe algo bonito primero antes de guardar tu nota mi amor ✨');
        return;
    }

    const ahora = new Date();
    const opcionesFecha = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const fechaFormateada = ahora.toLocaleDateString('es-ES', opcionesFecha);

    const nuevaNota = { id: Date.now(), fecha: fechaFormateada, texto: textoNota };
    let notas = JSON.parse(localStorage.getItem('diarioFatimaCinematic')) || [];
    notas.unshift(nuevaNota);
    localStorage.setItem('diarioFatimaCinematic', JSON.stringify(notas));

    textarea.value = '';
    cargarNotasDiario();
}

function cargarNotasDiario() {
    if (!regaloDesbloqueadoPorFecha) return;
    const listaNotas = document.getElementById('listaNotas');
    if (!listaNotas) return;

    let notas = JSON.parse(localStorage.getItem('diarioFatimaCinematic')) || [];

    if (notas.length === 0) {
        listaNotas.innerHTML = '<p class="sin-notas">Aún no hay notas guardadas. ¡Sé la primera en escribir una! ✍️💖</p>';
        return;
    }

    listaNotas.innerHTML = '';
    notas.forEach(nota => {
        const divNota = document.createElement('div');
        divNota.className = 'tarjeta-nota';
        divNota.innerHTML = `
            <div class="fecha-nota">📅 ${nota.fecha}</div>
            <div class="texto-nota">${nota.texto}</div>
            <button class="btn-borrar-nota" onclick="eliminarNotaDiario(${nota.id})">🗑️ Borrar</button>
        `;
        listaNotas.appendChild(divNota);
    });
}

function eliminarNotaDiario(idNota) {
    if (!regaloDesbloqueadoPorFecha) return;
    let notas = JSON.parse(localStorage.getItem('diarioFatimaCinematic')) || [];
    notas = notas.filter(n => n.id !== idNota);
    localStorage.setItem('diarioFatimaCinematic', JSON.stringify(notas));
    cargarNotasDiario();
}

// SNOOPY Y FLORES
let nivelActual = 1;
let floresAtrapadas = 0;
let metaFlores = 5;
let intervaloJuego = null;
let velocidadFlor = 2200;

function mostrarBienvenidaSnoopy() {
    if (!regaloDesbloqueadoPorFecha) return;
    textoModal.innerHTML = `
        <div class="bienvenida-snoopy">
            <div class="marco-snoopy-imagen">
                <img src="snoopy.jpg" alt="Snoopy con Corazón" class="img-snoopy" onerror="this.src='https://via.placeholder.com/150?text=Snoopy'">
            </div>
            <h2 style="color: var(--primary-neon); margin: 10px 0;">¡Hola Fátima! ✨</h2>
            <div class="burbuja-dialogo-snoopy">
                "¡Yo te ayudaré a recoger las flores en las montañas! Tu novio Omar me pidió que viniera a acompañarte para conseguir todos tus premios especiales." ❤️🌻
            </div>
            <button class="btn-siguiente-nivel" onclick="iniciarEstructuraJuego()" style="margin-top: 15px;">
                ¡Comenzar Cosecha con Snoopy! 🐾
            </button>
        </div>
        <button class="btn-regresar" onclick="cerrarSeccion()">⬅️ Regresar al Menú</button>
    `;
}

function iniciarEstructuraJuego() {
    if (!regaloDesbloqueadoPorFecha) return;
    nivelActual = 1;
    floresAtrapadas = 0;
    metaFlores = 5;
    velocidadFlor = 2200;

    textoModal.innerHTML = `
        <h2 style="color: var(--primary-neon); margin-bottom: 5px;">⛰️ Cosecha en la Montaña 🌻</h2>
        <p style="font-size: 0.9rem; color: #ffd1dc; margin-bottom: 12px;">Toca las flores que caen para que Snoopy las recoja 🐶🐾</p>

        <div class="marcador-juego">
            <span id="txtNivel">Nivel: 1 / 5</span>
            <span id="txtPuntos">Flores: 0 / 5</span>
        </div>

        <div class="escenario-juego" id="escenarioJuego"></div>
        <div id="zonaRecompensa"></div>

        <button class="btn-regresar" onclick="cerrarSeccion(); detenerJuego();">⬅️ Regresar al Menú</button>
    `;

    comenzarNivel();
}

function comenzarNivel() {
    if (!regaloDesbloqueadoPorFecha) return;
    detenerJuego();
    const escenario = document.getElementById('escenarioJuego');
    if (!escenario) return;

    escenario.innerHTML = `
        <div class="montanas-fondo"></div>
        <div class="snoopy-recolector-img" id="snoopyRecolector">
            <img src="snoopy.jpg" id="imgSnoopyJuego" alt="Snoopy" class="img-snoopy-juego" onerror="this.src='https://via.placeholder.com/60?text=Snoopy'">
        </div>
    `;

    intervaloJuego = setInterval(() => { crearFlorCaida(); }, velocidadFlor);
}

function detenerJuego() {
    if (intervaloJuego) {
        clearInterval(intervaloJuego);
        intervaloJuego = null;
    }
}

function crearFlorCaida() {
    if (!regaloDesbloqueadoPorFecha) return;
    const escenario = document.getElementById('escenarioJuego');
    if (!escenario) return;

    const flor = document.createElement('div');
    flor.className = 'flor-caida';
    const tiposFlores = ['🌸', '🌺', '🌻', '🌹', '🌷'];
    flor.innerHTML = tiposFlores[Math.floor(Math.random() * tiposFlores.length)];

    const posX = Math.floor(Math.random() * 75) + 10;
    flor.style.left = posX + '%';

    flor.addEventListener('click', () => {
        if (!regaloDesbloqueadoPorFecha) return;
        floresAtrapadas++;
        actualizarMarcador();
        
        const snoopy = document.getElementById('snoopyRecolector');
        const imgSnoopy = document.getElementById('imgSnoopyJuego');
        
        if (snoopy && imgSnoopy) {
            snoopy.style.left = (posX - 5) + '%';
            imgSnoopy.src = 'snoopy_flores.jpg';
            setTimeout(() => { if (imgSnoopy) imgSnoopy.src = 'snoopy.jpg'; }, 800);
        }

        flor.remove();
        verificarProgreso();
    });

    escenario.appendChild(flor);
    setTimeout(() => { if (flor.parentNode) flor.remove(); }, 3000);
}

function actualizarMarcador() {
    const txtPuntos = document.getElementById('txtPuntos');
    const txtNivel = document.getElementById('txtNivel');
    if (txtPuntos) txtPuntos.innerText = `Flores: ${floresAtrapadas} / ${metaFlores}`;
    if (txtNivel) txtNivel.innerText = `Nivel: ${nivelActual} / 5`;
}

function verificarProgreso() {
    if (floresAtrapadas >= metaFlores) {
        detenerJuego();
        mostrarPremioNivel();
    }
}

function mostrarPremioNivel() {
    if (!regaloDesbloqueadoPorFecha) return;
    const zonaRecompensa = document.getElementById('zonaRecompensa');
    const escenario = document.getElementById('escenarioJuego');
    if (escenario) escenario.innerHTML = '<div class="montanas-fondo"></div>';

    if (nivelActual === 1) {
        zonaRecompensa.innerHTML = `
            <div class="caja-premio">
                <div class="marco-snoopy-imagen-pequena">
                    <img src="snoopy_flores.jpg" alt="Snoopy Flores" class="img-snoopy" onerror="this.src='https://via.placeholder.com/90?text=Snoopy'">
                </div>
                <h3 style="color: var(--primary-neon);">¡Snoopy junta tus flores en el Nivel 1! 🎉</h3>
                <p><strong>Premio #1: El Micro de la Conexión 🎙️✨</strong></p>
                <div class="icono-premio">🎙️</div>
                <p style="font-size: 0.95rem; color: #e0f2fe;">
                    "Snoopy te entrega el micrófono donde todo empezó... cuando Omar habló para que te ligaras a Iván y nació su amor."
                </p>
                <button class="btn-siguiente-nivel" onclick="avanzarNivel(2)">Ir al Nivel 2 ➡️</button>
            </div>
        `;
    } else if (nivelActual === 2) {
        zonaRecompensa.innerHTML = `
            <div class="caja-premio">
                <div class="marco-snoopy-imagen-pequena">
                    <img src="snoopy_flores.jpg" alt="Snoopy Flores" class="img-snoopy" onerror="this.src='https://via.placeholder.com/90?text=Snoopy'">
                </div>
                <h3 style="color: var(--secondary-neon);">¡Snoopy te entrega el Nivel 2! 💣</h3>
                <p><strong>Premio #2: La Bomba Yucateca de Amor ❤️</strong></p>
                <div class="mensaje-motivador">
                    "¡Hellow mi yucateca hermosa! Amo como hablamos y nuestro humor único. ¡Snoopy dice que vas increíble, a por el siguiente nivel! ✨"
                </div>
                <button class="btn-siguiente-nivel" onclick="avanzarNivel(3)">Ir al Nivel 3 ➡️</button>
            </div>
        `;
    } else if (nivelActual === 3) {
        zonaRecompensa.innerHTML = `
            <div class="caja-premio">
                <div class="marco-snoopy-imagen-pequena">
                    <img src="snoopy_flores.jpg" alt="Snoopy Flores" class="img-snoopy" onerror="this.src='https://via.placeholder.com/90?text=Snoopy'">
                </div>
                <h3 style="color: var(--accent-purple);">¡Snoopy Gamer Nivel 3! 🏀🎮</h3>
                <p><strong>Premio #3: Trofeo de Mis Pasiones 🏆✨</strong></p>
                <div class="flor-virtual-brillante">🏀🎮💻</div>
                <p style="font-size: 0.95rem; color: #ffd1dc;">
                    "Snoopy te recuerda que Omar te ama igual que ama jugar basket, jugar Free y programar esta página para ti."
                </p>
                <button class="btn-siguiente-nivel" onclick="avanzarNivel(4)">Ir al Nivel 4 ➡️</button>
            </div>
        `;
    } else if (nivelActual === 4) {
        zonaRecompensa.innerHTML = `
            <div class="caja-premio">
                <div class="marco-snoopy-imagen-pequena">
                    <img src="snoopy_flores.jpg" alt="Snoopy Flores" class="img-snoopy" onerror="this.src='https://via.placeholder.com/90?text=Snoopy'">
                </div>
                <h3 style="color: var(--primary-neon);">¡Snoopy con tu Ramo de Rosas! 🌹</h3>
                <p><strong>Premio #4: La Rosa Mágica Única 🌹✨</strong></p>
                <div class="flor-virtual-brillante">🌹</div>
                <p style="font-size: 0.98rem; color: #ff99c8; font-weight: bold;">
                    "Para Omar eres la rosa más bella y única de todo el mundo mundial."
                </p>
                <div class="mensaje-motivador">
                    "¡Snoopy está listo para el desafío final! ¿Lista Fátima? 🏆"
                </div>
                <button class="btn-siguiente-nivel" onclick="avanzarNivel(5)">🔥 ¡Desafío Final Nivel 5! 🔥</button>
            </div>
        `;
    } else if (nivelActual === 5) {
        zonaRecompensa.innerHTML = `
            <div class="caja-premio gran-premio-magico">
                <div class="marco-snoopy-imagen-pequena">
                    <img src="snoopy_flores.jpg" alt="Snoopy Flores" class="img-snoopy" onerror="this.src='https://via.placeholder.com/90?text=Snoopy'">
                </div>
                <div class="corona-reina-animada">👑✨</div>
                <h3 class="titulo-gran-premio">🏆 ¡SNOOPY Y TÚ GANARON EL GRAN PREMIO SUPREMO! 🏆</h3>
                <div class="ticket-dorado-contenedor">
                    <div class="ticket-encabezado">
                        <span>🎟️ VALE OFICIAL E INTRANSFERIBLE 🎟️</span>
                    </div>
                    <div class="ticket-cuerpo">
                        <div class="paisaje-campo-animado">
                            <div class="atardecer-sol">🌅</div>
                            <div class="casita-campo">🏡⛰️</div>
                        </div>
                        <p class="texto-promesa">
                            "Válido por una vida juntos, un día en nuestra propia casita en el campo entre las montañas al atardecer, y por todas las citas inolvidables para ver el atardecer y darte miles de abrazos." ❤️
                        </p>
                    </div>
                </div>
                <p class="mensaje-final-amor">
                    "Eres la reina de mi vida, mi guía hacia la luz y mi persona favorita en todo el universo. Con todo mi amor, de tu yucateco favorito Omar." ✨👑💖
                </p>
            </div>
        `;
    }
}

function avanzarNivel(siguienteNivel) {
    if (!regaloDesbloqueadoPorFecha) return;
    nivelActual = siguienteNivel;
    floresAtrapadas = 0;
    const zona = document.getElementById('zonaRecompensa');
    if (zona) zona.innerHTML = '';

    if (nivelActual === 2) { metaFlores = 8; velocidadFlor = 1800; }
    else if (nivelActual === 3) { metaFlores = 12; velocidadFlor = 1500; }
    else if (nivelActual === 4) { metaFlores = 15; velocidadFlor = 1200; }
    else if (nivelActual === 5) { metaFlores = 20; velocidadFlor = 900; }

    actualizarMarcador();
    comenzarNivel();
}

function cerrarSeccion() {
    detenerJuego();
    if (modalDetalle) modalDetalle.classList.add('oculto-modal');
}