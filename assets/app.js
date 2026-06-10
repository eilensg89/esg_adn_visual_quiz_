(function(global){
'use strict';
const CONFIG={
  mapa:'https://esg-mapa-inicial-quiz.vercel.app/',
  json:'https://protocolo-json-ancla.vercel.app/',
  bratz:'https://mini-guia-bratz-esg.vercel.app/',
  brujula:'https://esg-brujula-quiz-publico.vercel.app/',
  landing:'https://esg-experience-landing.vercel.app/',
  instagram:'https://www.instagram.com/eilensg/'
};
const MAP_RESULTS={
  none:{label:'No hice el Mapa Inicial',short:'Sin Mapa Inicial',reminder:'No estás usando una dirección estratégica previa. Este ADN Visual puede darte una primera lectura visual, pero si no tienes tema o público claro, primero necesitas hacer el Mapa Inicial o la Brújula ESG.',weights:{}},
  directora:{label:'Marca Directora',short:'Directora',reminder:'Una Marca Directora transmite decisión, estructura, criterio y liderazgo. Visualmente necesita presencia firme, líneas claras, autoridad tranquila y señales de control.',weights:{directora:2,editorial:1}},
  educadora:{label:'Marca Educadora',short:'Educadora',reminder:'Una Marca Educadora transmite claridad, utilidad, pasos simples y confianza. Visualmente necesita orden, aire, estructura y recursos que faciliten comprender.',weights:{guia:2,refugio:1}},
  visual:{label:'Marca Visual',short:'Visual',reminder:'Una Marca Visual se recuerda por estética, coherencia, composición y criterio visual. Necesita textura, repetición, estilo reconocible y calidad sostenida.',weights:{editorial:2,magnetica:1}},
  universo:{label:'Universo / Personaje',short:'Universo / Personaje',reminder:'Una Marca Universo o Personaje transmite mundo propio, símbolos, narrativa visual y memoria de personaje. Necesita señales repetibles, avatar o recurso visual constante.',weights:{universo:2,chispa:1}}
};
const PRESENCES={
  guia:{name:'Presencia Guía',inspires:'claridad, conocimiento y dirección',visual:'orden visual, fondos de trabajo, gestos pausados y estructura limpia',styling:['blazer suave o camisa lisa','neutros cálidos','accesorios discretos','cabello y maquillaje pulido pero natural'],colors:['Crema claridad #F8F4EC','Beige piedra #C8B49A','Marrón criterio #7B4F24','Dorado guía #C9A646'],ia:['carruseles educativos','videos faceless con textos precisos','escenas de escritorio','motion control lento con documentos o pantallas'],avoid:['sobrecargar slides','parecer demasiado fría','usar colores sin jerarquía','dar imagen de teoría sin experiencia']},
  refugio:{name:'Presencia Refugio',inspires:'paz, empatía, seguridad y contención',visual:'luz cálida, hogar/editorial, encuadres cercanos y sensación humana',styling:['tejidos suaves','crema, beige, rosa apagado o tierra suave','joyería fina','peinado natural cuidado'],colors:['Crema calma #F8F4EC','Arena suave #EFE6D8','Rosa tierra #C9A6A0','Dorado sutil #C9A646'],ia:['faceless de calma','escenas de diario visual','fondos cálidos sin mostrar toda la casa','voz o subtítulos cercanos'],avoid:['perfección inalcanzable','lujo frío','fondos caóticos','mostrar intimidad sin intención']},
  directora:{name:'Presencia Directora',inspires:'autoridad, decisión y estructura',visual:'líneas fuertes, contraste editorial, postura firme y control visual',styling:['blazer negro, marrón o beige estructurado','piezas limpias con forma','joyería discreta con intención','maquillaje definido sin exceso'],colors:['Negro editorial #0A0A0A','Marrón cuero #5C2E0E','Beige piedra #C8B49A','Dorado autoridad #8B6914'],ia:['videos de proceso','documentos, pantallas y comandos visuales','motion control con cámara lenta','mockups de dirección'],avoid:['verse inaccesible para un público sensible','usar demasiada oscuridad','posar rígida sin humanidad','prometer autoridad sin prueba']},
  editorial:{name:'Presencia Editorial',inspires:'sofisticación, criterio y estética',visual:'textura, composición limpia, espacio negativo y dirección visual pulida',styling:['piezas neutras pulidas','siluetas simples','accesorios de diseño','peinado intencional'],colors:['Piedra editorial #C8B49A','Crema premium #F8F4EC','Cuero suave #A0622A','Oro controlado #F5D78E'],ia:['moodboards','covers premium','mockups de marca','fotos de apoyo con textura y coherencia'],avoid:['parecer plantilla Canva','sobredecorar','usar dorado en exceso','crear estética bonita sin mensaje']},
  magnetica:{name:'Presencia Magnética',inspires:'profundidad, atracción e intensidad controlada',visual:'sombras suaves, mirada fuerte, colores profundos y luz lateral',styling:['vino, marrón oscuro o negro como acento','siluetas cuidadas','texturas con peso','maquillaje más definido si encaja con el público'],colors:['Vino profundo #6F2E2E','Marrón sombra #3D2010','Negro editorial #0A0A0A','Dorado bajo #8B6914'],ia:['retratos editoriales','clips lentos','close-ups emocionales','fondos con profundidad sin falsificar lujo'],avoid:['hipersexualizar sin estrategia','oscurecer demasiado la marca','verse distante del público','usar drama visual sin propósito']},
  chispa:{name:'Presencia Chispa',inspires:'energía, humor, movimiento y simpatía',visual:'gestos vivos, ritmo rápido, contraste controlado y expresión reconocible',styling:['prenda o accesorio con personalidad','color acento controlado','peinado con movimiento','looks repetibles con un detalle propio'],colors:['Crema base #F8F4EC','Marrón cálido #A0622A','Acento energía #D6803A','Dorado ligero #C9A646'],ia:['loops visuales','trends reinterpretados','motion control rápido pero limpio','escenas con expresiones y objetos propios'],avoid:['romper la identidad con cada trend','parecer infantil si no corresponde','usar colores sin control','hacer humor sin conexión con la oferta']},
  universo:{name:'Presencia Universo',inspires:'imaginación, personaje y mundo propio',visual:'símbolos, avatar, escenas repetibles, pieza icónica y narrativa visual',styling:['vestuario conceptual pero usable','paleta reconocible','pieza icónica repetida','accesorios o props propietarios'],colors:['Base mundo #C8B49A','Color firma elegido por la marca','Marrón ancla #5C2E0E','Dorado símbolo #C9A646'],ia:['avatares','personajes visuales','Bratz o muñeca como ejemplo adaptable','motion control y escenas de mundo'],avoid:['usar personaje sin estrategia','cambiar de avatar cada semana','confundir entretenimiento con marca','copiar una referencia sin adaptarla a identidad']}
};
const ZODIAC={
  none:{label:'Sin capa zodiacal',element:'No aplica',note:'No se usará signo como matiz creativo. El resultado se basará solo en presencia visual, público, objetivo y recursos reales.'},
  aries:{label:'Aries',element:'Fuego',note:'Matiz simbólico de impulso visual, entrada en escena y energía activa. Puede traducirse en movimiento, contraste cálido y presencia más visible.'},
  tauro:{label:'Tauro',element:'Tierra',note:'Matiz simbólico de estabilidad sensorial, textura y confianza material. Puede traducirse en lino, cuero, beige, objetos reales y cámara estable.'},
  geminis:{label:'Géminis',element:'Aire',note:'Matiz simbólico de comunicación versátil, ideas y ligereza. Puede traducirse en texto, gestos, formatos cambiantes pero coherentes y espacio visual.'},
  cancer:{label:'Cáncer',element:'Agua',note:'Matiz simbólico de refugio emocional, memoria y cuidado. Puede traducirse en luz suave, hogar curado, close-ups y presencia protectora.'},
  leo:{label:'Leo',element:'Fuego',note:'Matiz simbólico de visibilidad, brillo y seguridad creativa. Puede traducirse en una pieza protagonista, luz cálida y presencia frontal.'},
  virgo:{label:'Virgo',element:'Tierra',note:'Matiz simbólico de precisión, limpieza y orden. Puede traducirse en fondos limpios, estructuras, listas visuales y detalles cuidados.'},
  libra:{label:'Libra',element:'Aire',note:'Matiz simbólico de armonía estética, proporción y belleza equilibrada. Puede traducirse en composición simétrica, paletas suaves y elegancia accesible.'},
  escorpio:{label:'Escorpio',element:'Agua',note:'Matiz simbólico de profundidad magnética e intensidad. Puede traducirse en sombras suaves, mirada fuerte, tonos profundos y misterio controlado.'},
  sagitario:{label:'Sagitario',element:'Fuego',note:'Matiz simbólico de expansión, libertad y visión. Puede traducirse en espacios abiertos, movimiento, viajes o metáforas visuales de camino.'},
  capricornio:{label:'Capricornio',element:'Tierra',note:'Matiz simbólico de autoridad estructurada, oficio y ambición sobria. Puede traducirse en blazers, documentos, escritorio, cuero y líneas firmes.'},
  acuario:{label:'Acuario',element:'Aire',note:'Matiz simbólico de innovación, diferencia y mirada futura. Puede traducirse en recursos visuales inesperados, avatar, tecnología cálida y composición no común.'},
  piscis:{label:'Piscis',element:'Agua',note:'Matiz simbólico de sensibilidad imaginativa, intuición y mundo emocional. Puede traducirse en fades, reflejos suaves, escenas poéticas y atmósfera visual.'}
};
const QUIZ_QUESTIONS=[
  {t:'¿Qué quieres que la gente sienta cuando te ve?',h:'Elige la energía visual que te gustaría sostener sin actuar ni fingir.',o:[['guia','Confianza en tu criterio y en tu forma de guiar.'],['refugio','Paz, empatía y sensación de acompañamiento.'],['directora','Seguridad, estructura y autoridad.'],['editorial','Estética, criterio y sofisticación visual.'],['magnetica','Profundidad, magnetismo e intensidad controlada.'],['chispa','Energía, simpatía y movimiento.'],['universo','Curiosidad por un mundo visual o personaje propio.']]},
  {t:'¿Qué estilo de escena representa mejor tu marca?',h:'No pienses en lo más bonito. Piensa en lo que comunica mejor tu rol.',o:[['guia','Escritorio, libreta, laptop, explicación clara.'],['refugio','Rincón cálido, casa curada, café, luz suave.'],['directora','Pantallas, documentos, proceso, decisión visual.'],['editorial','Textura, espacio negativo, composición limpia.'],['magnetica','Luz lateral, close-up, sombras suaves, mirada.'],['chispa','Movimiento, gestos, objetos vivos, clips rápidos.'],['universo','Avatar, símbolos, personaje, escenario repetible.']]},
  {t:'¿Qué ropa o presencia se siente más alineada?',h:'La ropa no es disfraz. Funciona como señal visual del rol que quieres ocupar.',o:[['guia','Blazer suave, camisa lisa, neutros cálidos.'],['refugio','Tejidos suaves, crema, beige, piezas cómodas cuidadas.'],['directora','Blazer estructurado, negro o marrón, líneas firmes.'],['editorial','Piezas pulidas, neutros, accesorios de diseño.'],['magnetica','Siluetas cuidadas, tonos profundos, joyería discreta.'],['chispa','Un detalle expresivo, color acento o accesorio memorable.'],['universo','Pieza icónica, vestuario conceptual o estilo de personaje.']]},
  {t:'¿Para qué usarías IA visual primero?',h:'La IA aquí no es para engañar. Es para crear apoyo visual, consistencia y dirección.',o:[['guia','Para reforzar explicaciones, carruseles y escenas de trabajo.'],['refugio','Para crear escenas cálidas sin exponer toda mi vida privada.'],['directora','Para mostrar procesos, comandos, pantallas y dirección.'],['editorial','Para crear moodboards, mockups y visuales premium.'],['magnetica','Para crear retratos o clips con atmósfera y profundidad.'],['chispa','Para crear loops, trends reinterpretados o videos cortos.'],['universo','Para crear avatar, Bratz, personaje o mundo visual.']]},
  {t:'¿Qué te impide verte como quieres hoy?',h:'El resultado debe adaptarse a tu realidad, no a una versión perfecta de internet.',o:[['refugio','No tengo tiempo ni energía para verme arreglada todos los días.'],['editorial','No tengo fondos, ropa o producción visual como quisiera.'],['guia','No sé cómo ordenar visualmente lo que sé.'],['directora','No siento suficiente autoridad visual todavía.'],['magnetica','Me cuesta verme fuerte sin sentirme exagerada.'],['chispa','Me cuesta verme natural, viva o con energía en cámara.'],['universo','Tengo ideas creativas, pero no sé fijar un personaje o mundo.']]},
  {t:'¿Qué resultado visual quieres obtener?',h:'Esto define el matiz final de tu ADN Visual.',o:[['guia','Una imagen clara, confiable y útil.'],['refugio','Una imagen cercana, humana y segura.'],['directora','Una imagen fuerte, profesional y con decisión.'],['editorial','Una imagen premium, coherente y reconocible.'],['magnetica','Una imagen intensa, elegante y memorable.'],['chispa','Una imagen dinámica, expresiva y fácil de recordar.'],['universo','Una imagen con mundo propio, avatar o sistema visual.']]}
];
const STEPS=[
  {type:'map',title:'¿Vienes del Mapa Inicial de Marca?',help:'Esto conecta tu resultado anterior con tu dirección visual. Si no lo hiciste, puedes continuar, pero el ADN no reemplaza ese paso estratégico.'},
  {type:'foundation',title:'Datos mínimos para que el ADN no sea estética vacía',help:'El ADN Visual necesita saber de qué hablas, a quién quieres atraer y qué quieres lograr. Si no tienes tema ni público, primero te conviene hacer el Mapa Inicial o la Brújula.'},
  {type:'reality',title:'Tu realidad visual actual',help:'No vamos a recomendar una imagen imposible. La idea es adaptar presencia, ropa, fondos e IA a lo que sí puedes sostener hoy.'},
  {type:'quiz',idx:0},{type:'quiz',idx:1},{type:'quiz',idx:2},{type:'quiz',idx:3},{type:'quiz',idx:4},{type:'quiz',idx:5},
  {type:'zodiac',title:'Capa simbólica opcional',help:'Tu signo no define tu marca ni reemplaza tu estrategia. Si quieres, se usa solo como referencia cultural para matizar energía, colores y movimiento visual.'}
];
const REQUIRED_FOUNDATION=['name','topic','audience','objective'];
const REQUIRED_REALITY=['projection','obstacle','resources','limits','taste'];
const defaultState=()=>({mapResult:'none',name:'',topic:'',experience:'',audience:'',objective:'',projection:'',obstacle:'',resources:'',limits:'',taste:'',zodiac:'none',quizAnswers:Array(QUIZ_QUESTIONS.length).fill(null)});
let state=defaultState();let current=0;
function esc(s){return String(s||'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));}
function firstLine(s,fallback){return String(s||'').trim()||fallback;}
function calculateResult(st){let scores={guia:0,refugio:0,directora:0,editorial:0,magnetica:0,chispa:0,universo:0};Object.entries(MAP_RESULTS[st.mapResult||'none'].weights||{}).forEach(([k,v])=>scores[k]+=v);(st.quizAnswers||[]).forEach(k=>{if(scores[k]!==undefined)scores[k]+=1;});let ordered=Object.entries(scores).sort((a,b)=>b[1]-a[1]);let primary=ordered[0][0];let secondary=ordered.find(x=>x[0]!==primary && x[1]>0)?.[0] || ordered[1][0];return {primary,secondary,scores};}
function profileSummary(st,res){const p=PRESENCES[res.primary],s=PRESENCES[res.secondary],m=MAP_RESULTS[st.mapResult||'none'],z=ZODIAC[st.zodiac||'none'];return `Tu marca sobre ${firstLine(st.topic,'[tu tema]')}, dirigida a ${firstLine(st.audience,'[tu público]')}, necesita proyectarse como ${p.name} con matiz ${s.name}. ${m.label!=='No hice el Mapa Inicial'?'Vienes de '+m.label+', así que la presencia visual debe respetar esa dirección estratégica.':'Como no usaste Mapa Inicial, este resultado es una primera dirección visual y no una arquitectura completa de marca.'} ${z.label!=='Sin capa zodiacal'?'Tu capa zodiacal opcional agrega un matiz simbólico: '+z.label+' / '+z.element+'.':''}`.trim();}
function buildPrompt1(st,res){const p=PRESENCES[res.primary],s=PRESENCES[res.secondary],m=MAP_RESULTS[st.mapResult||'none'],z=ZODIAC[st.zodiac||'none'];return `Actúa como estratega de marca personal, dirección visual y comunicación visual para redes sociales.

No asumas que conoces ningún sistema externo. No dependas de ningún nombre de sistema o método externo. No inventes una identidad falsa para mí. Quiero una recomendación visual realista, práctica y aplicable a mi situación actual.

IMPORTANTE:
Este análisis debe enfocarse en presencia visual. No me des calendario de contenido, estrategia de monetización completa ni arquitectura profunda de negocio. Quiero saber cómo debe verse mi marca para atraer al público correcto, generar confianza y prepararme para vender en el futuro.

MI INFORMACIÓN

Nombre o nombre de marca:
${firstLine(st.name,'[escribe aquí]')}

Tema del que quiero hablar:
${firstLine(st.topic,'[escribe aquí]')}

Mi experiencia con este tema:
${firstLine(st.experience,'[escribe aquí con tus palabras naturales]')}

Público al que quiero atraer:
${firstLine(st.audience,'[escribe aquí]')}

Lo que quiero vender, recomendar o lograr en el futuro:
${firstLine(st.objective,'[escribe aquí]')}

Resultado del Mapa Inicial de Marca:
${m.label}

Recordatorio de ese resultado:
${m.reminder}

Resultado de ADN Visual:
${p.name} con matiz ${s.name}

Qué significa este resultado visual:
- ${p.name}: inspira ${p.inspires}; visualmente se apoya en ${p.visual}.
- Matiz ${s.name}: agrega ${s.inspires}; ayuda a que la presencia no se quede plana.

Capa zodiacal opcional:
${z.label === 'Sin capa zodiacal' ? 'No aplica. No uses signo zodiacal en el análisis.' : z.label + ' · ' + z.element + '. Úsalo solo como referencia simbólica opcional, no como ciencia ni diagnóstico. ' + z.note}

Cómo me gustaría proyectarme:
${firstLine(st.projection,'[escribe aquí]')}

Qué me impide hoy proyectarme de esa manera:
${firstLine(st.obstacle,'[escribe aquí]')}

Recursos actuales que sí tengo:
${firstLine(st.resources,'[escribe aquí]')}

Límites de exposición:
${firstLine(st.limits,'[escribe aquí]')}

Colores, ropa o estilos que me gustan:
${firstLine(st.taste,'[escribe aquí]')}

QUIERO QUE HAGAS EL ANÁLISIS PENSANDO EN:
1. mi público objetivo
2. mi tema y mi experiencia real
3. lo que quiero vender o lograr en el futuro
4. mi resultado del Mapa Inicial, si aplica
5. mi Presencia Visual principal y su matiz
6. lo que hoy me impide proyectarme así
7. mis recursos actuales
8. mis límites de exposición
9. cómo usar IA sin engañar ni fingir una vida falsa

ENTRÉGAME:

1. RESUMEN VISUAL DE MI MARCA EN 5 LÍNEAS
Explica quién soy visualmente, a quién debo atraer, qué debo transmitir, qué nivel de cercanía/autoridad necesito y por qué esa presencia ayuda a generar confianza.

2. INTERPRETACIÓN DE MI RESULTADO
Explica qué significa para mí tener ${p.name} con matiz ${s.name}. Conéctalo con mi tema, mi público y mi objetivo futuro.

3. DIRECCIÓN DE PRESENCIA PERSONAL
Dime cómo debería verme: nivel de arreglo, energía corporal, expresión, tipo de fotos, poses, gestos, cercanía, autoridad y aspiración. No me recomiendes una imagen inalcanzable si mi situación actual no lo permite.

4. PALETA VISUAL RECOMENDADA
Toma en cuenta mis gustos, pero ajústalos a mi público y objetivo. Dame 5 a 7 colores con nombres emocionales, códigos HEX aproximados y uso específico:
- color para calma
- color para confianza
- color para vender o destacar
- color para fondos
- color para textos
- color para detalles o botones
Aclara que los colores no tienen significado universal absoluto, pero sí pueden funcionar como asociaciones visuales dentro de un contexto de marca, contraste y repetición.

5. ROPA, ACCESORIOS, CABELLO Y MAQUILLAJE / PRESENCIA
Dame recomendaciones realistas según mi público, tema y recursos. Incluye opciones de bajo presupuesto, piezas que puedo repetir, colores de ropa, qué evitar y cómo verme coherente sin comprar un guardarropa nuevo.

6. FONDOS Y ESCENARIOS
Dime qué espacios reales puedo usar ahora y qué escenarios puedo crear con IA sin fingir una vida falsa. Incluye opciones para rostro, cuerpo, manos, faceless, escritorio, casa, exterior simple o fondos generados.

7. CÓMO USAR IA SIN ENGAÑAR
Explícame cómo usar IA para apoyar mi presencia visual: fondos, mockups, escenas de apoyo, motion control, videos sin hablar, imágenes educativas o aspiracionales honestas. Aclara qué no debería fingir: resultados, casa, cuerpo, testimonios, vida o logros.

8. SOLUCIONES PARA MI OBSTÁCULO ACTUAL
Analiza lo que hoy me impide proyectarme así y dame alternativas concretas para empezar con lo que tengo.

9. QUÉ DEBO EVITAR
Dime errores de ropa, color, fondos, fotos, IA o estilo que podrían hacer que mi marca se vea genérica, falsa, inaccesible o desconectada de mi público.

10. RESUMEN VISUAL FINAL PARA USAR EN UN GENERADOR DE IMÁGENES
Dame un bloque breve y limpio que resuma mi marca visualmente. Ese bloque debe incluir: tipo de presencia, público, colores, ropa, escenarios, energía, nivel de realismo, límites éticos y estilo visual.

11. FUNDAMENTO BREVE DE LAS DECISIONES
Explica en lenguaje sencillo la lógica detrás de tus recomendaciones. Puedes mencionar principios generales de personalidad de marca, asociaciones de marca, color en marketing, presentación personal y ropa como señal simbólica. No presentes nada como diagnóstico clínico. Si mencionas fuentes como Aaker, Keller, Labrecque & Milne, Goffman o Adam & Galinsky, hazlo solo como referencia conceptual y no inventes citas exactas.

Formato de respuesta:
Claro, concreto, accionable y organizado. No uses relleno. No me des teoría suelta. Dame decisiones que pueda aplicar.`;}
function buildPrompt2(st,res){const p=PRESENCES[res.primary],s=PRESENCES[res.secondary],z=ZODIAC[st.zodiac||'none'];return `ANTES DE USAR ESTE PROMPT:
1. Sube una foto clara de tu rostro.
2. Sube una foto de cuerpo completo.
3. Pega también el RESUMEN VISUAL FINAL que te dio la IA en el Prompt 1.

PROMPT PARA GENERADOR DE IMÁGENES:

Create two professional visual mockups based on the uploaded face photo and full-body photo of the same person.

IMPORTANT:
Image A is the face reference.
Image B is the full-body reference.
Use the pasted brand visual summary from the previous text analysis as the strategic direction.

Preserve the person's real identity with strong fidelity:
- same face
- same skin tone
- same facial harmony
- same hair color
- same hair texture
- same overall recognizable appearance

Do not turn the person into someone else.
Do not beautify so much that the person becomes unrecognizable.
Do not change body proportions unrealistically.
Do not create a fake luxury lifestyle.
Do not make it look like a generic influencer account.

BRAND STRATEGY TO APPLY:
Brand topic: ${firstLine(st.topic,'[topic]')}
Audience: ${firstLine(st.audience,'[audience]')}
Future goal / offer: ${firstLine(st.objective,'[future offer or goal]')}
Visual result: ${p.name} with secondary nuance ${s.name}
Desired projection: ${firstLine(st.projection,'[desired projection]')}
Current limitation to respect: ${firstLine(st.obstacle,'[current limitation]')}
Exposure limits: ${firstLine(st.limits,'[exposure limits]')}
Preferred colors / clothing style: ${firstLine(st.taste,'[preferred colors and clothing]')}
Optional zodiac symbolic layer: ${z.label === 'Sin capa zodiacal' ? 'not used' : z.label + ' / ' + z.element + ' — only as optional symbolic visual energy, not as science'}

PASTE HERE THE FINAL VISUAL SUMMARY FROM PROMPT 1:
[PASTE THE FINAL VISUAL SUMMARY HERE]

OUTPUT 1: PERSONAL BRAND VISUAL IDENTITY MOCKUP
Create a premium personal brand board that visually summarizes this brand identity.
Include:
- one main hero portrait of the person styled according to the brand direction
- one secondary full-body styling direction
- color palette swatches with elegant neutral labels
- clothing and accessory cues
- hair / makeup or personal presence cues if relevant
- textures, props and environment suggestions
- 3 small scene previews aligned with the brand
- a clear feeling of what this brand should look like visually

The result must feel aspirational but believable, elegant but human, strategic, realistic and useful for content creation.
The visual direction must align with the audience, topic, future offer, colors, wardrobe direction, current limitations and ethical use of AI.

OUTPUT 2: INSTAGRAM PROFILE MOCKUP
Create a realistic Instagram profile preview for this personal brand.
Include:
- profile picture suggestion using the same person
- bio area suggestion
- story highlight style suggestions
- 9 to 12 post grid preview
- covers and thumbnails aligned with the brand
- a balance of personal presence, educational authority, emotional connection, visual consistency and future offer positioning

The Instagram mockup should help the person understand:
- how her face, colors, clothing and content could work together
- how the feed could feel visually
- what kind of visual repetition would make the brand recognizable

ETHICAL AI RULE:
Use AI to visualize brand direction, not to fake results, wealth, a body, a home, testimonials or a life the person does not have. Keep everything believable and aligned with the person's real situation.

Visual style:
clean, premium, editorial, realistic, warm, coherent, modern personal brand direction, soft depth, refined typography areas if needed, not cluttered, not overdecorated, not generic.`;}
function buildResult(st){const res=calculateResult(st),p=PRESENCES[res.primary],s=PRESENCES[res.secondary],m=MAP_RESULTS[st.mapResult||'none'],z=ZODIAC[st.zodiac||'none'];const title=`${p.name} con matiz ${s.name}`;const note=profileSummary(st,res);return {res,title,note,mapReminder:m.reminder,zodiacNote:z.note,prompt1:buildPrompt1(st,res),prompt2:buildPrompt2(st,res)};}
function missingKeys(keys){return keys.filter(k=>!String(state[k]||'').trim());}
function showError(msg){const el=document.getElementById('errorBox');if(!el)return;el.textContent=msg;el.style.display='block';}
function hideError(){const el=document.getElementById('errorBox');if(el){el.style.display='none';el.textContent='';}}
function updateProgress(){const bar=document.getElementById('bar'), step=document.getElementById('stepText');if(bar)bar.style.width=(current/(STEPS.length)*100)+'%';if(step)step.textContent=`Paso ${current+1} de ${STEPS.length}`;}
function optionButton(value,text,selected,handler){const b=document.createElement('button');b.className='option'+(selected?' selected':'');b.type='button';b.textContent=text;b.onclick=()=>handler(value,b);return b;}
function selectSingle(container,value,b){container.querySelectorAll('.option').forEach(x=>x.classList.remove('selected'));b.classList.add('selected');return value;}
function renderMap(area){const div=document.createElement('div');div.className='options';Object.entries(MAP_RESULTS).forEach(([k,m])=>{div.appendChild(optionButton(k,m.label,state.mapResult===k,(val,b)=>{state.mapResult=selectSingle(div,val,b);render();}));});area.appendChild(div);const note=document.createElement('div');note.className='map-note';note.innerHTML=`<b>${esc(MAP_RESULTS[state.mapResult].label)}</b><br>${esc(MAP_RESULTS[state.mapResult].reminder)}<br><br>Si este resultado ya no te representa, vuelve atrás, repite el Mapa Inicial o selecciona que no lo hiciste.`;area.appendChild(note);}
function fieldHTML(k,label,type='input',hint=''){let v=esc(state[k]||'');let tag=type==='textarea'?`<textarea id="f_${k}" data-key="${k}">${v}</textarea>`:`<input id="f_${k}" data-key="${k}" value="${v}" />`;return `<div class="field ${type==='textarea'?'full':''}"><label for="f_${k}">${label}</label>${tag}${hint?`<div class="hint">${hint}</div>`:''}</div>`;}
function bindFields(area){area.querySelectorAll('[data-key]').forEach(el=>{el.addEventListener('input',()=>{state[el.dataset.key]=el.value;});});}
function renderFoundation(area){area.innerHTML=`<div class="form-grid">
${fieldHTML('name','Nombre o nombre de marca')}
${fieldHTML('topic','Tema del que quieres hablar')}
${fieldHTML('experience','Qué experiencia tienes con este tema','textarea','Escríbelo natural. No tiene que sonar profesional.')}
${fieldHTML('audience','Público al que quieres atraer','textarea','No uses nicho sofisticado si no quieres. Ejemplo: madres ocupadas, dueñas de negocio, mujeres que quieren organizarse.')}
${fieldHTML('objective','Qué quieres vender, recomendar o lograr en el futuro','textarea','Ejemplo: guía digital, consulta, servicio, comunidad, producto, afiliado o autoridad para vender después.')}
</div>`;bindFields(area);}
function renderReality(area){area.innerHTML=`<div class="form-grid">
${fieldHTML('projection','Cómo te gustaría proyectarte','textarea','Ejemplo: cercana pero profesional, elegante pero real, segura sin verme inalcanzable.')}
${fieldHTML('obstacle','Qué te impide hoy proyectarte así','textarea','Ejemplo: no tengo tiempo, no tengo ropa, no tengo fondos, no quiero mostrar mi casa, me cuesta salir en cámara.')}
${fieldHTML('resources','Qué recursos sí tienes ahora','textarea','Ejemplo: celular, luz natural, una pared, laptop, mesa, ropa neutra, IA, fotos propias.')}
${fieldHTML('limits','Qué no quieres mostrar o límites de exposición','textarea','Ejemplo: hijos, casa completa, vida privada, cuerpo completo, voz, rutina diaria.')}
${fieldHTML('taste','Colores, ropa o estilos que te gustan','textarea','Esto se usará como punto de partida, no como única decisión. Se adapta a tu público y objetivo.')}
</div>`;bindFields(area);}
function renderQuiz(area,idx){const q=QUIZ_QUESTIONS[idx];const div=document.createElement('div');div.className='options';q.o.forEach(([val,text])=>{div.appendChild(optionButton(val,text,state.quizAnswers[idx]===val,(v,b)=>{state.quizAnswers[idx]=selectSingle(div,v,b);}));});area.appendChild(div);}
function renderZodiac(area){const html=`<div class="field full"><label for="zodiac">Signo zodiacal opcional</label><select id="zodiac">${Object.entries(ZODIAC).map(([k,z])=>`<option value="${k}" ${state.zodiac===k?'selected':''}>${z.label}${z.element==='No aplica'?'':' · '+z.element}</option>`).join('')}</select><div class="hint">Esta capa no define tu marca. Solo ayuda a traducir energía simbólica en estilo visual si conectas con ella.</div></div><div class="map-note"><b>${esc(ZODIAC[state.zodiac].label)}</b><br>${esc(ZODIAC[state.zodiac].note)}</div>`;area.innerHTML=html;area.querySelector('#zodiac').addEventListener('change',e=>{state.zodiac=e.target.value;render();});}
function render(){if(typeof document==='undefined')return;hideError();const step=STEPS[current];const title=document.getElementById('qTitle'),help=document.getElementById('qHelp'),area=document.getElementById('dynamicArea'),back=document.getElementById('backBtn'),next=document.getElementById('nextBtn');updateProgress();area.innerHTML='';if(step.type==='quiz'){const q=QUIZ_QUESTIONS[step.idx];title.textContent=q.t;help.textContent=q.h;renderQuiz(area,step.idx);}else{title.textContent=step.title;help.textContent=step.help;if(step.type==='map')renderMap(area);if(step.type==='foundation')renderFoundation(area);if(step.type==='reality')renderReality(area);if(step.type==='zodiac')renderZodiac(area);}back.style.visibility=current===0?'hidden':'visible';next.textContent=current===STEPS.length-1?'Ver mi ADN Visual':'Continuar';}
function validateStep(){const step=STEPS[current];if(step.type==='foundation'){const miss=missingKeys(REQUIRED_FOUNDATION);if(miss.length){showError('Completa por lo menos nombre, tema, público y objetivo. Sin eso el ADN Visual no puede adaptar la marca a las personas que quieres atraer.');return false;}}if(step.type==='reality'){const miss=missingKeys(REQUIRED_REALITY);if(miss.length){showError('Completa tu proyección, obstáculo, recursos, límites y gustos visuales. Esto permite que el prompt final sea realista.');return false;}}if(step.type==='quiz'&&!state.quizAnswers[step.idx]){showError('Selecciona una opción para continuar.');return false;}return true;}
function copyText(id,btn){const el=document.getElementById(id);if(!el)return;navigator.clipboard.writeText(el.textContent).then(()=>{const old=btn.textContent;btn.textContent='Copiado';setTimeout(()=>btn.textContent=old,1200);});}
function showResult(){const out=buildResult(state),p=PRESENCES[out.res.primary],s=PRESENCES[out.res.secondary],z=ZODIAC[state.zodiac||'none'];document.getElementById('bar').style.width='100%';document.getElementById('quizBody').classList.add('hidden');const result=document.getElementById('result');result.innerHTML=`<span class="badge">Tu resultado</span><h2 class="result-title">${esc(out.title)}</h2><p class="lead">${esc(out.note)}</p><div class="map-note"><b>Recordatorio de Mapa Inicial</b><br>${esc(out.mapReminder)}</div><div class="result-grid"><div class="result-box"><h4>Qué debes transmitir</h4><p>${esc(p.inspires)}. Visualmente: ${esc(p.visual)}.</p></div><div class="result-box"><h4>Matiz secundario</h4><p>${esc(s.name)} agrega ${esc(s.inspires)} para que la presencia no se quede plana.</p></div><div class="result-box"><h4>Ropa / presencia</h4><ul>${p.styling.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div><div class="result-box"><h4>Colores base sugeridos</h4><ul>${p.colors.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div><div class="result-box"><h4>IA visual recomendada</h4><ul>${p.ia.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div><div class="result-box"><h4>Qué evitar</h4><ul>${p.avoid.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div><div class="result-box"><h4>Capa zodiacal opcional</h4><p>${esc(z.note)}</p></div><div class="result-box"><h4>Límite importante</h4><p>Este resultado no reemplaza una arquitectura completa de marca. Traduce tu dirección inicial a presencia visual.</p></div></div><div class="prompt-wrap"><div class="prompt-head"><h4>Prompt 1 · Dirección visual estratégica</h4><button class="btn secondary copy" onclick="ESG_ADN.copyText('prompt1',this)">Copiar prompt 1</button></div><div class="prompt" id="prompt1">${esc(out.prompt1)}</div></div><div class="prompt-wrap"><div class="prompt-head"><h4>Prompt 2 · Mockup de marca + perfil de Instagram</h4><button class="btn secondary copy" onclick="ESG_ADN.copyText('prompt2',this)">Copiar prompt 2</button></div><div class="prompt" id="prompt2">${esc(out.prompt2)}</div></div><div class="actions"><a class="btn primary" href="${CONFIG.brujula}" target="_blank" rel="noopener">Hacer Brújula ESG</a><a class="btn secondary" href="${CONFIG.mapa}" target="_blank" rel="noopener">Rehacer Mapa Inicial</a><a class="btn secondary" href="${CONFIG.landing}" target="_blank" rel="noopener">Conocer ESG Experience</a><a class="btn secondary" href="${CONFIG.instagram}" target="_blank" rel="noopener">Instagram @eilensg</a></div>`;result.classList.remove('hidden');result.scrollIntoView({behavior:'smooth',block:'start'});}
function next(){if(!validateStep())return;if(current<STEPS.length-1){current++;render();document.getElementById('quiz').scrollIntoView({behavior:'smooth',block:'start'});}else showResult();}
function back(){if(current>0){current--;render();}}
function init(){if(typeof document==='undefined')return;document.getElementById('nextBtn').addEventListener('click',next);document.getElementById('backBtn').addEventListener('click',back);render();const io=new IntersectionObserver((entries)=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('in')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>io.observe(el));}
function testState(mapResult,primary,zodiac){const st=defaultState();st.mapResult=mapResult;st.name='Laura';st.topic='organización del hogar para madres';st.experience='soy mamá de dos y organizo mi casa con rutinas simples';st.audience='madres ocupadas que quieren orden sin perfección';st.objective='vender una guía digital de organización';st.projection='cercana, limpia, confiable y real';st.obstacle='no tengo tiempo para arreglarme ni casa perfecta';st.resources='celular, luz natural, mesa, canastas y ropa neutra';st.limits='no quiero mostrar a mis hijos ni toda mi casa';st.taste='beige, crema, marrón claro, blanco cálido y verde oliva';st.zodiac=zodiac;st.quizAnswers=Array(QUIZ_QUESTIONS.length).fill(primary);return st;}
function runSelfTest(){let total=0,errors=[];const bad=['vengo de ESG','según ESG','usa el Master Brand','actúa como Cory','actúa como Story'];for(const map of Object.keys(MAP_RESULTS)){for(const presence of Object.keys(PRESENCES)){for(const sign of Object.keys(ZODIAC)){total++;const st=testState(map,presence,sign);const out=buildResult(st);if(out.res.primary!==presence)errors.push(`primary mismatch ${map}/${presence}/${sign} -> ${out.res.primary}`);const joined=(out.prompt1+'\n'+out.prompt2).toLowerCase();bad.forEach(b=>{if(joined.includes(b.toLowerCase()))errors.push(`forbidden phrase ${b}`);});['Laura','organización del hogar','madres ocupadas','guía digital','no tengo tiempo','celular','no quiero mostrar'].forEach(req=>{if(!joined.includes(req.toLowerCase()))errors.push(`missing ${req} in ${map}/${presence}/${sign}`);});if(map!=='none'&&!joined.includes(MAP_RESULTS[map].label.toLowerCase()))errors.push(`missing map label ${map}`);if(sign!=='none'&&!joined.includes(ZODIAC[sign].label.toLowerCase()))errors.push(`missing zodiac ${sign}`);if(!out.prompt2.includes('OUTPUT 1')||!out.prompt2.includes('OUTPUT 2')||!out.prompt2.includes('Image A')||!out.prompt2.includes('Image B'))errors.push(`prompt2 structure missing ${map}/${presence}/${sign}`);if(out.prompt1.length<3000||out.prompt2.length<2500)errors.push(`prompt too short ${map}/${presence}/${sign}`);}}
}
return {total,errors};}
const api={CONFIG,MAP_RESULTS,PRESENCES,ZODIAC,QUIZ_QUESTIONS,STEPS,defaultState,calculateResult,buildPrompt1,buildPrompt2,buildResult,testState,runSelfTest,copyText};global.ESG_ADN=api;if(typeof document!=='undefined'){document.addEventListener('DOMContentLoaded',init);}if(typeof module!=='undefined'&&module.exports){module.exports=api;}
})(typeof window!=='undefined'?window:globalThis);
