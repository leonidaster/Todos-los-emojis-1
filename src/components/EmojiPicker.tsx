import React, { useState, useRef, useEffect } from 'react';
import { Search, Smile } from 'lucide-react';

interface EmojiPickerProps {
  onEmojiSelect: (emoji: string) => void;
}

interface EmojiCategory {
  name: string;
  emojis: Array<{ emoji: string; name: string; shortcode: string }>;
}

const categories: EmojiCategory[] = [
  {
    name: "Emoticonos y personas",
    emojis: [ 
      // Caras sonrientes y positivas
      { emoji: "😀", name: "Cara feliz", shortcode: ":grinning:" },
      { emoji: "😂", name: "Cara con lágrimas de alegría", shortcode: ":joy:" },
      { emoji: "🤣", name: "Rodando de risa", shortcode: ":rofl:" },
      { emoji: "😊", name: "Cara sonrojada sonriente", shortcode: ":blush:" },
      { emoji: "😇", name: "Cara sonriente con halo", shortcode: ":innocent:" },
      { emoji: "😍", name: "Cara sonriente con ojos de corazón", shortcode: ":heart_eyes:" },
      { emoji: "🥰", name: "Cara sonriente con corazones", shortcode: ":smiling_face_with_hearts:" },
      { emoji: "😘", name: "Cara lanzando un beso", shortcode: ":kissing_heart:" },
      // Caras con lentes
      { emoji: "😎", name: "Cara sonriente con lentes de sol", shortcode: ":sunglasses:" },
      { emoji: "🤓", name: "Cara nerd", shortcode: ":nerd:" },
      // Caras traviesas
      { emoji: "😜", name: "Cara guiñando con lengua", shortcode: ":stuck_out_tongue_winking_eye:" },
      { emoji: "🤪", name: "Cara loca", shortcode: ":zany_face:" },
      { emoji: "😝", name: "Cara con lengua y ojos cerrados", shortcode: ":stuck_out_tongue_closed_eyes:" },
      // Caras emocionales
      { emoji: "😭", name: "Cara llorando", shortcode: ":sob:" },
      { emoji: "😢", name: "Cara llorando", shortcode: ":cry:" },
      { emoji: "😩", name: "Cara cansada", shortcode: ":weary:" },
      { emoji: "😤", name: "Cara con vapor", shortcode: ":triumph:" },
      { emoji: "🥺", name: "Cara suplicante", shortcode: ":pleading:" },
      { emoji: "😫", name: "Cara cansada", shortcode: ":tired_face:" },
      { emoji: "😰", name: "Cara ansiosa con sudor", shortcode: ":cold_sweat:" },
      // Caras pensativas y escépticas
      { emoji: "😳", name: "Cara sonrojada", shortcode: ":flushed:" },
      { emoji: "🤔", name: "Cara pensativa", shortcode: ":thinking:" },
      { emoji: "🤨", name: "Cara con ceja levantada", shortcode: ":raised_eyebrow:" },
      { emoji: "😏", name: "Cara sonriente con suficiencia", shortcode: ":smirk:" },
      // Caras dormidas
      { emoji: "😴", name: "Cara dormida", shortcode: ":sleeping:" },
      { emoji: "😪", name: "Cara somnolienta", shortcode: ":sleepy:" },
      // Caras enfermas
      { emoji: "🤒", name: "Cara con termómetro", shortcode: ":thermometer_face:" },
      { emoji: "🤮", name: "Cara vomitando", shortcode: ":vomiting:" },
      { emoji: "🤧", name: "Cara estornudando", shortcode: ":sneezing:" },
      // Caras con accesorios
      { emoji: "🤠", name: "Cara con sombrero vaquero", shortcode: ":cowboy:" },
      // Gestos y manos
      { emoji: "👍", name: "Pulgar hacia arriba", shortcode: ":thumbs_up:" },
      { emoji: "👎", name: "Pulgar hacia abajo", shortcode: ":thumbs_down:" },
      { emoji: "✊", name: "Puño levantado", shortcode: ":fist:" },
      { emoji: "👊", name: "Puño hacia adelante", shortcode: ":punch:" },
      { emoji: "🤛", name: "Puño izquierdo", shortcode: ":left_facing_fist:" },
      { emoji: "🤜", name: "Puño derecho", shortcode: ":right_facing_fist:" },
      { emoji: "👏", name: "Aplausos", shortcode: ":clap:" },
      { emoji: "🙌", name: "Manos levantadas", shortcode: ":raised_hands:" },
      { emoji: "🤲", name: "Manos juntas hacia arriba", shortcode: ":palms_up_together:" },
      { emoji: "🙏", name: "Manos en oración", shortcode: ":pray:" },
      { emoji: "🤝", name: "Manos dándose la mano", shortcode: ":handshake:" },
      { emoji: "✌️", name: "Señal de paz", shortcode: ":v:" },
      { emoji: "🤟", name: "Te amo en lenguaje de señas", shortcode: ":love_you_gesture:" },
      { emoji: "🤘", name: "Señal de cuernos", shortcode: ":metal:" },
      { emoji: "👌", name: "Señal de OK", shortcode: ":ok_hand:" },
      { emoji: "👈", name: "Mano señalando a la izquierda", shortcode: ":point_left:" },
      { emoji: "👉", name: "Mano señalando a la derecha", shortcode: ":point_right:" },
      { emoji: "👆", name: "Mano señalando hacia arriba", shortcode: ":point_up:" },
      { emoji: "👇", name: "Mano señalando hacia abajo", shortcode: ":point_down:" },
      { emoji: "☝️", name: "Dedo índice hacia arriba", shortcode: ":point_up_2:" },
      { emoji: "✋", name: "Mano levantada", shortcode: ":raised_hand:" },
      { emoji: "🤚", name: "Reverso de mano levantada", shortcode: ":raised_back_of_hand:" },
      { emoji: "🖐️", name: "Mano extendida con dedos abiertos", shortcode: ":hand_with_fingers_splayed:" },
      { emoji: "🖖", name: "Saludo vulcano", shortcode: ":vulcan_salute:" },
      { emoji: "👋", name: "Mano saludando", shortcode: ":wave:" },
      { emoji: "✍️", name: "Mano escribiendo", shortcode: ":writing_hand:" },
      // Personas y edades
      { emoji: "👶", name: "Bebé", shortcode: ":baby:" },
      { emoji: "🧒", name: "Niño", shortcode: ":child:" },
      { emoji: "👦", name: "Niño varón", shortcode: ":boy:" },
      { emoji: "👧", name: "Niña", shortcode: ":girl:" },
      { emoji: "🧑", name: "Persona", shortcode: ":adult:" },
      { emoji: "👱", name: "Persona rubia", shortcode: ":blond_hair:" },
      // Características físicas y estilos
      { emoji: "👨", name: "Hombre", shortcode: ":man:" },
      { emoji: "🧔", name: "Hombre con barba", shortcode: ":bearded_person:" },
      { emoji: "👩", name: "Mujer", shortcode: ":woman:" },
      // Mayores y específicos
      { emoji: "🧓", name: "Persona mayor", shortcode: ":older_adult:" },
      { emoji: "👴", name: "Anciano", shortcode: ":older_man:" },
      { emoji: "👵", name: "Anciana", shortcode: ":older_woman:" },
      // Caras negativas
      { emoji: "😠", name: "Cara enojada", shortcode: ":angry:" },
      { emoji: "🤬", name: "Cara maldiciendo", shortcode: ":cursing:" },
      { emoji: "😱", name: "Cara gritando de miedo", shortcode: ":scream:" },
      { emoji: "😉", name: "Cara guiñando", shortcode: ":wink:" },
      { emoji: "🤫", name: "Cara pidiendo silencio", shortcode: ":shushing:" },
      { emoji: "🤭", name: "Cara con mano en boca", shortcode: ":hand_over_mouth:" },
      // Profesiones
      { emoji: "👨‍⚕️", name: "Hombre profesional de la salud", shortcode: ":man_health_worker:" },
      { emoji: "👩‍⚕️", name: "Mujer profesional de la salud", shortcode: ":woman_health_worker:" },
      { emoji: "👨‍🎓", name: "Hombre graduado", shortcode: ":man_student:" },
      { emoji: "👩‍🎓", name: "Mujer graduada", shortcode: ":woman_student:" },
      { emoji: "👨‍🏫", name: "Hombre profesor", shortcode: ":man_teacher:" },
      { emoji: "👩‍🏫", name: "Mujer profesora", shortcode: ":woman_teacher:" },
      { emoji: "👨‍⚖️", name: "Hombre juez", shortcode: ":man_judge:" },
      { emoji: "👩‍⚖️", name: "Mujer juez", shortcode: ":woman_judge:" },
      { emoji: "👨‍🌾", name: "Hombre agricultor", shortcode: ":man_farmer:" },
      { emoji: "👩‍🌾", name: "Mujer agricultora", shortcode: ":woman_farmer:" },
      { emoji: "👨‍🍳", name: "Hombre cocinero", shortcode: ":man_cook:" },
      { emoji: "👩‍🍳", name: "Mujer cocinera", shortcode: ":woman_cook:" },
      // Servicios de emergencia y seguridad
      { emoji: "👮", name: "Oficial de policía", shortcode: ":police_officer:" },
      { emoji: "👮‍♂️", name: "Hombre oficial de policía", shortcode: ":male_police_officer:" },
      { emoji: "👮‍♀️", name: "Mujer oficial de policía", shortcode: ":female_police_officer:" },
      { emoji: "👨‍🚒", name: "Hombre bombero", shortcode: ":man_firefighter:" },
      { emoji: "👩‍🚒", name: "Mujer bombero", shortcode: ":woman_firefighter:" },
      // Deportes y actividades
      { emoji: "🏃", name: "Persona corriendo", shortcode: ":runner:" },
      { emoji: "🚴", name: "Persona montando en bicicleta", shortcode: ":biking:" },
      { emoji: "🏊", name: "Persona nadando", shortcode: ":swimming:" },
      { emoji: "🧘", name: "Persona en posición de loto", shortcode: ":person_in_lotus_position:" },
      // Familias
      { emoji: "👨‍👩‍👦", name: "Familia: hombre, mujer, niño", shortcode: ":family_man_woman_boy:" },
      { emoji: "👨‍👩‍👧", name: "Familia: hombre, mujer, niña", shortcode: ":family_man_woman_girl:" },
      { emoji: "👩‍👦", name: "Familia: mujer, niño", shortcode: ":family_woman_boy:" },
      { emoji: "👨‍👧", name: "Familia: hombre, niña", shortcode: ":family_man_girl:" },
      // Personajes fantásticos
      { emoji: "🧙", name: "Mago/Maga", shortcode: ":mage:" },
      { emoji: "🧚", name: "Hada", shortcode: ":fairy:" },
      { emoji: "🦸", name: "Superhéroe", shortcode: ":superhero:" },
      { emoji: "👼", name: "Ángel bebé", shortcode: ":angel:" },
      { emoji: "🎅", name: "Papá Noel santa", shortcode: ":santa:" },
      { emoji: "🤶", name: "Mamá Noel santa", shortcode: ":mrs_claus:" },
      // Partes del cuerpo
      { emoji: "👂", name: "Oreja", shortcode: ":ear:" },
      { emoji: "🦻", name: "Oreja con audífono", shortcode: ":ear_with_hearing_aid:" },
      { emoji: "👃", name: "Nariz", shortcode: ":nose:" },
      // Actividades
      { emoji: "💃", name: "Mujer bailando", shortcode: ":dancer:" },
      // Partes del cuerpo adicionales
      { emoji: "👣", name: "Huellas", shortcode: ":footprints:" },
      { emoji: "🧠", name: "Cerebro", shortcode: ":brain:" },
      { emoji: "🦷", name: "Diente", shortcode: ":tooth:" },
      { emoji: "🦴", name: "Hueso", shortcode: ":bone:" },
      { emoji: "👀", name: "Ojos", shortcode: ":eyes:" },
      { emoji: "👁️", name: "Ojo", shortcode: ":eye:" }
    ]
  },
  {
    name: "Animales y Naturaleza",
    emojis: [
      // Mamíferos
      { emoji: "🐶", name: "Cara de perro", shortcode: ":dog:" },
      { emoji: "🐱", name: "Cara de gato", shortcode: ":cat:" },
      { emoji: "🐭", name: "Cara de ratón", shortcode: ":mouse:" },
      { emoji: "🐹", name: "Cara de hámster", shortcode: ":hamster:" },
      { emoji: "🐰", name: "Cara de conejo", shortcode: ":rabbit:" },
      { emoji: "🦊", name: "Cara de zorro", shortcode: ":fox_face:" },
      { emoji: "🐻", name: "Cara de oso", shortcode: ":bear:" },
      { emoji: "🐼", name: "Cara de panda", shortcode: ":panda_face:" },
      { emoji: "🐨", name: "Cara de koala", shortcode: ":koala:" },
      { emoji: "🐯", name: "Cara de tigre", shortcode: ":tiger:" },
      { emoji: "🦁", name: "Cara de león", shortcode: ":lion:" },
      { emoji: "🐮", name: "Cara de vaca", shortcode: ":cow:" },
      { emoji: "🐷", name: "Cara de cerdo", shortcode: ":pig:" },
      { emoji: "🐽", name: "Hocico de cerdo", shortcode: ":pig_nose:" },
      { emoji: "🐸", name: "Cara de rana", shortcode: ":frog:" },
      { emoji: "🐵", name: "Cara de mono", shortcode: ":monkey_face:" },
      { emoji: "🙈", name: "No ver el mal mono", shortcode: ":see_no_evil:" },
      { emoji: "🙉", name: "No oír el mal mono", shortcode: ":hear_no_evil:" },
      { emoji: "🙊", name: "No hablar el mal mono", shortcode: ":speak_no_evil:" },
      { emoji: "🐒", name: "Mono", shortcode: ":monkey:" },
      // Aves
      { emoji: "🐔", name: "Pollo", shortcode: ":chicken:" },
      { emoji: "🐧", name: "Pingüino", shortcode: ":penguin:" },
      { emoji: "🐦", name: "Pájaro", shortcode: ":bird:" },
      { emoji: "🐤", name: "Pollito de frente", shortcode: ":baby_chick:" },
      { emoji: "🐣", name: "Pollito saliendo del cascarón", shortcode: ":hatching_chick:" },
      { emoji: "🐥", name: "Pollito", shortcode: ":hatched_chick:" },
      // Otros mamíferos
      { emoji: "🐺", name: "Lobo", shortcode: ":wolf:" },
      { emoji: "🐗", name: "Jabalí", shortcode: ":boar:" },
      { emoji: "🐴", name: "Caballo", shortcode: ":horse:" },
      { emoji: "🦄", name: "Unicornio", shortcode: ":unicorn:" },
      // Insectos
      { emoji: "🐝", name: "Abeja", shortcode: ":bee:" },
      { emoji: "🐛", name: "Oruga", shortcode: ":bug:" },
      { emoji: "🦋", name: "Mariposa", shortcode: ":butterfly:" },
      { emoji: "🐌", name: "Caracol", shortcode: ":snail:" },
      { emoji: "🐞", name: "Mariquita", shortcode: ":ladybug:" },
      { emoji: "🐜", name: "Hormiga", shortcode: ":ant:" },
      { emoji: "🦟", name: "Mosquito", shortcode: ":mosquito:" },
      { emoji: "🦗", name: "Grillo", shortcode: ":cricket:" },
      { emoji: "🕷️", name: "Araña", shortcode: ":spider:" },
      { emoji: "🕸️", name: "Telaraña", shortcode: ":spider_web:" },
      // Reptiles y anfibios
      { emoji: "🐢", name: "Tortuga", shortcode: ":turtle:" },
      { emoji: "🐍", name: "Serpiente", shortcode: ":snake:" },
      { emoji: "🦎", name: "Lagarto", shortcode: ":lizard:" },
      { emoji: "🦂", name: "Escorpión", shortcode: ":scorpion:" },
      // Vida marina
      { emoji: "🦀", name: "Cangrejo", shortcode: ":crab:" },
      { emoji: "🦑", name: "Calamar", shortcode: ":squid:" },
      { emoji: "🐙", name: "Pulpo", shortcode: ":octopus:" },
      { emoji: "🦐", name: "Camarón", shortcode: ":shrimp:" },
      { emoji: "🦞", name: "Langosta", shortcode: ":lobster:" },
      { emoji: "🐠", name: "Pez tropical", shortcode: ":tropical_fish:" },
      { emoji: "🐟", name: "Pez", shortcode: ":fish:" },
      { emoji: "🐡", name: "Pez globo", shortcode: ":blowfish:" },
      { emoji: "🐬", name: "Delfín", shortcode: ":dolphin:" },
      { emoji: "🦈", name: "Tiburón", shortcode: ":shark:" },
      { emoji: "🐳", name: "Ballena", shortcode: ":whale:" },
      { emoji: "🐋", name: "Ballena", shortcode: ":whale2:" },
      // Otros animales
      { emoji: "🐊", name: "Cocodrilo", shortcode: ":crocodile:" },
      { emoji: "🐆", name: "Leopardo", shortcode: ":leopard:" },
      { emoji: "🦓", name: "Cebra", shortcode: ":zebra:" },
      { emoji: "🦍", name: "Gorila", shortcode: ":gorilla:" },
      { emoji: "🦧", name: "Orangután", shortcode: ":orangutan:" },
      { emoji: "🐘", name: "Elefante", shortcode: ":elephant:" },
      { emoji: "🦛", name: "Hipopótamo", shortcode: ":hippopotamus:" },
      { emoji: "🦏", name: "Rinoceronte", shortcode: ":rhinoceros:" },
      { emoji: "🐪", name: "Camello", shortcode: ":camel:" },
      { emoji: "🐫", name: "Camello bactriano", shortcode: ":dromedary_camel:" },
      { emoji: "🦒", name: "Jirafa", shortcode: ":giraffe:" },
      { emoji: "🦘", name: "Canguro", shortcode: ":kangaroo:" },
      // Animales de granja
      { emoji: "🐃", name: "Búfalo de agua", shortcode: ":water_buffalo:" },
      { emoji: "🐂", name: "Buey", shortcode: ":ox:" },
      { emoji: "🐄", name: "Vaca", shortcode: ":cow2:" },
      { emoji: "🐎", name: "Caballo de carreras", shortcode: ":racehorse:" },
      { emoji: "🐖", name: "Cerdo", shortcode: ":pig2:" },
      { emoji: "🐏", name: "Carnero", shortcode: ":ram:" },
      { emoji: "🐑", name: "Oveja", shortcode: ":sheep:" },
      { emoji: "🐐", name: "Cabra", shortcode: ":goat:" },
      // Animales salvajes adicionales
      { emoji: "🦌", name: "Ciervo", shortcode: ":deer:" },
      { emoji: "🐕", name: "Perro", shortcode: ":dog2:" },
      { emoji: "🐩", name: "Caniche", shortcode: ":poodle:" },
      { emoji: "🐈", name: "Gato", shortcode: ":cat2:" },
      // Aves adicionales
      { emoji: "🐓", name: "Gallo", shortcode: ":rooster:" },
      { emoji: "🦃", name: "Pavo", shortcode: ":turkey:" },
      { emoji: "🦚", name: "Pavo real", shortcode: ":peacock:" },
      { emoji: "🦜", name: "Loro", shortcode: ":parrot:" },
      { emoji: "🦢", name: "Cisne", shortcode: ":swan:" },
      { emoji: "🕊️", name: "Paloma", shortcode: ":dove:" },
      { emoji: "🦅", name: "Águila", shortcode: ":eagle:" },
      { emoji: "🦆", name: "Pato", shortcode: ":duck:" },
      { emoji: "🦉", name: "Búho", shortcode: ":owl:" },
      { emoji: "🦩", name: "Flamenco", shortcode: ":flamingo:" },
      // Mamíferos pequeños
      { emoji: "🦥", name: "Perezoso", shortcode: ":sloth:" },
      { emoji: "🦦", name: "Nutria", shortcode: ":otter:" },
      { emoji: "🦨", name: "Zorrillo", shortcode: ":skunk:" },
      { emoji: "🦡", name: "Tejón", shortcode: ":badger:" },
      { emoji: "🐾", name: "Huellas de garras", shortcode: ":paw_prints:" },
      { emoji: "🐿️", name: "Ardilla", shortcode: ":chipmunk:" },
      { emoji: "🐀", name: "Rata", shortcode: ":rat:" },
      { emoji: "🐁", name: "Ratón", shortcode: ":mouse2:" },
      { emoji: "🦇", name: "Murciélago", shortcode: ":bat:" },
      // Dinosaurios y criaturas míticas
      { emoji: "🦖", name: "T-Rex", shortcode: ":t-rex:" },
      { emoji: "🦕", name: "Saurópodo", shortcode: ":sauropod:" },
      { emoji: "🐉", name: "Dragón", shortcode: ":dragon:" },
      { emoji: "🐲", name: "Cara de dragón", shortcode: ":dragon_face:" },
      // Plantas y flores
      { emoji: "🌵", name: "Cactus", shortcode: ":cactus:" },
      { emoji: "🎄", name: "Árbol de Navidad", shortcode: ":christmas_tree:" },
      { emoji: "🌲", name: "Árbol de hoja perenne", shortcode: ":evergreen_tree:" },
      { emoji: "🌳", name: "Árbol de hoja caduca", shortcode: ":deciduous_tree:" },
      { emoji: "🌴", name: "Palmera", shortcode: ":palm_tree:" },
      { emoji: "🌱", name: "Plántula", shortcode: ":seedling:" },
      { emoji: "🌿", name: "Hierba", shortcode: ":herb:" },
      { emoji: "☘️", name: "Trébol", shortcode: ":shamrock:" },
      { emoji: "🍀", name: "Trébol de cuatro hojas", shortcode: ":four_leaf_clover:" },
      { emoji: "🎍", name: "Decoración de pino", shortcode: ":bamboo:" },
      { emoji: "🎋", name: "Árbol Tanabata", shortcode: ":tanabata_tree:" },
      { emoji: "🍃", name: "Hojas ondeando al viento", shortcode: ":leaves:" },
      { emoji: "🍂", name: "Hoja caída", shortcode: ":fallen_leaf:" },
      { emoji: "🍁", name: "Hoja de arce", shortcode: ":maple_leaf:" },
      { emoji: "🌾", name: "Espiga de arroz", shortcode: ":ear_of_rice:" },
      // Flores
      { emoji: "🌺", name: "Hibisco", shortcode: ":hibiscus:" },
      { emoji: "🌻", name: "Girasol", shortcode: ":sunflower:" },
      { emoji: "🌹", name: "Rosa", shortcode: ":rose:" },
      { emoji: "🥀", name: "Rosa marchita", shortcode: ":wilted_flower:" },
      { emoji: "🌷", name: "Tulipán", shortcode: ":tulip:" },
      { emoji: "🌼", name: "Flor", shortcode: ":blossom:" },
      { emoji: "🌸", name: "Flor de cerezo", shortcode: ":cherry_blossom:" },
      { emoji: "💐", name: "Ramo de flores", shortcode: ":bouquet:" },
      // Otros elementos naturales
      { emoji: "🍄", name: "Champiñón", shortcode: ":mushroom:" },
      { emoji: "🌰", name: "Castaña", shortcode: ":chestnut:" },
      // Elementos celestiales y meteorológicos
      { emoji: "🌍", name: "Globo terráqueo mostrando Europa-África", shortcode: ":earth_africa:" },
      { emoji: "🌎", name: "Globo terráqueo mostrando las Américas", shortcode: ":earth_americas:" },
      { emoji: "🌏", name: "Globo terráqueo mostrando Asia-Australia", shortcode: ":earth_asia:" },
      { emoji: "🌐", name: "Globo terráqueo con meridianos", shortcode: ":globe_with_meridians:" },
      { emoji: "🌑", name: "Luna nueva", shortcode: ":new_moon:" },
      { emoji: "🌒", name: "Luna creciente", shortcode: ":waxing_crescent_moon:" },
      { emoji: "🌓", name: "Luna en cuarto creciente", shortcode: ":first_quarter_moon:" },
      { emoji: "🌔", name: "Luna gibosa creciente", shortcode: ":waxing_gibbous_moon:" },
      { emoji: "🌕", name: "Luna llena", shortcode: ":full_moon:" },
      { emoji: "🌖", name: "Luna gibosa menguante", shortcode: ":waning_gibbous_moon:" },
      { emoji: "🌗", name: "Luna en cuarto menguante", shortcode: ":last_quarter_moon:" },
      { emoji: "🌘", name: "Luna menguante", shortcode: ":waning_crescent_moon:" },
      { emoji: "🌙", name: "Luna creciente", shortcode: ":crescent_moon:" },
      { emoji: "🌚", name: "Cara de luna nueva", shortcode: ":new_moon_with_face:" },
      { emoji: "🌝", name: "Cara de luna llena", shortcode: ":full_moon_with_face:" },
      { emoji: "🌛", name: "Cara de luna en cuarto creciente", shortcode: ":first_quarter_moon_with_face:" },
      { emoji: "🌜", name: "Cara de luna en cuarto menguante", shortcode: ":last_quarter_moon_with_face:" },
      { emoji: "☀️", name: "Sol", shortcode: ":sunny:" },
      { emoji: "🌝", name: "Cara de sol", shortcode: ":sun_with_face:" },
      { emoji: "🌟", name: "Estrella brillante", shortcode: ":star2:" },
      { emoji: "⭐️", name: "Estrella", shortcode: ":star:" },
      { emoji: "🌠", name: "Estrella fugaz", shortcode: ":stars:" },
      { emoji: "🌌", name: "Vía Láctea", shortcode: ":milky_way:" },
      // Clima
      { emoji: "☁️", name: "Nube", shortcode: ":cloud:" },
      { emoji: "⛅", name: "Sol detrás de una nube", shortcode: ":partly_sunny:" },
      { emoji: "⛈️", name: "Nube con relámpagos y lluvia", shortcode: ":thunder_cloud_and_rain:" },
      { emoji: "🌤️", name: "Sol detrás de una nube pequeña", shortcode: ":sun_behind_small_cloud:" },
      { emoji: "🌥️", name: "Sol detrás de una nube grande", shortcode: ":sun_behind_large_cloud:" },
      { emoji: "🌦️", name: "Sol detrás de una nube con lluvia", shortcode: ":sun_behind_rain_cloud:" },
      { emoji: "🌧️", name: "Nube con lluvia", shortcode: ":rain_cloud:" },
      { emoji: "🌨️", name: "Nube con nieve", shortcode: ":snow_cloud:" },
      { emoji: "🌩️", name: "Nube con relámpagos", shortcode: ":lightning_cloud:" },
      { emoji: "🌪️", name: "Tornado", shortcode: ":tornado:" },
      { emoji: "🌫️", name: "Niebla", shortcode: ":fog:" },
      { emoji: "🌬️", name: "Viento", shortcode: ":wind_blowing_face:" },
      { emoji: "🌈", name: "Arcoíris", shortcode: ":rainbow:" },
      { emoji: "☂️", name: "Paraguas", shortcode: ":umbrella2:" },
      { emoji: "☔", name: "Paraguas con gotas de lluvia", shortcode: ":umbrella:" },
      { emoji: "⚡", name: "Alto voltaje", shortcode: ":zap:" },
      { emoji: "❄️", name: "Copo de nieve", shortcode: ":snowflake:" },
      { emoji: "☃️", name: "Muñeco de nieve", shortcode: ":snowman2:" },
      { emoji: "⛄", name: "Muñeco de nieve sin nieve", shortcode: ":snowman:" },
      { emoji: "☄️", name: "Cometa", shortcode: ":comet:" },
      { emoji: "💧", name: "Gota", shortcode: ":droplet:" },
      { emoji: "🌊", name: "Ola", shortcode: ":ocean:" }
    ]
  },
  {
    name: "Alimentos y bebidas",
    emojis: [
      // Frutas
      { emoji: "🍎", name: "Manzana roja", shortcode: ":apple:" },
      { emoji: "🍏", name: "Manzana verde", shortcode: ":green_apple:" },
      { emoji: "🍐", name: "Pera", shortcode: ":pear:" },
      { emoji: "🍑", name: "Melocotón", shortcode: ":peach:" },
      { emoji: "🍒", name: "Cerezas", shortcode: ":cherries:" },
      { emoji: "🍓", name: "Fresa", shortcode: ":strawberry:" },
      { emoji: "🥝", name: "Kiwi", shortcode: ":kiwi_fruit:" },
      { emoji: "🍇", name: "Uvas", shortcode: ":grapes:" },
      { emoji: "🍈", name: "Melón", shortcode: ":melon:" },
      { emoji: "🍉", name: "Sandía", shortcode: ":watermelon:" },
      { emoji: "🍊", name: "Mandarina", shortcode: ":tangerine:" },
      { emoji: "🍋", name: "Limón", shortcode: ":lemon:" },
      { emoji: "🍌", name: "Plátano", shortcode: ":banana:" },
      { emoji: "🍍", name: "Piña", shortcode: ":pineapple:" },
      { emoji: "🥭", name: "Mango", shortcode: ":mango:" },
      { emoji: "🥥", name: "Coco", shortcode: ":coconut:" },
      // Verduras y hortalizas
      { emoji: "🍅", name: "Tomate", shortcode: ":tomato:" },
      { emoji: "🥑", name: "Aguacate", shortcode: ":avocado:" },
      { emoji: "🍆", name: "Berenjena", shortcode: ":eggplant:" },
      { emoji: "🥔", name: "Patata", shortcode: ":potato:" },
      { emoji: "🥕", name: "Zanahoria", shortcode: ":carrot:" },
      { emoji: "🌽", name: "Maíz", shortcode: ":corn:" },
      { emoji: "🌶️", name: "Chile", shortcode: ":hot_pepper:" },
      { emoji: "🥒", name: "Pepino", shortcode: ":cucumber:" },
      { emoji: "🥬", name: "Verdura de hoja verde", shortcode: ":leafy_green:" },
      { emoji: "🥦", name: "Brócoli", shortcode: ":broccoli:" },
      { emoji: "🧄", name: "Ajo", shortcode: ":garlic:" },
      { emoji: "🧅", name: "Cebolla", shortcode: ":onion:" },
      { emoji: "🥜", name: "Cacahuetes", shortcode: ":peanuts:" },
      // Pan y bollería
      { emoji: "🍞", name: "Pan", shortcode: ":bread:" },
      { emoji: "🥐", name: "Cruasán", shortcode: ":croissant:" },
      { emoji: "🥖", name: "Barra de pan", shortcode: ":baguette_bread:" },
      { emoji: "🥨", name: "Pretzel", shortcode: ":pretzel:" },
      { emoji: "🥯", name: "Bagel", shortcode: ":bagel:" },
      { emoji: "🥞", name: "Tortitas", shortcode: ":pancakes:" },
      { emoji: "🧇", name: "Gofre", shortcode: ":waffle:" },
      // Lácteos y proteínas
      { emoji: "🧀", name: "Queso", shortcode: ":cheese_wedge:" },
      { emoji: "🍖", name: "Carne en hueso", shortcode: ":meat_on_bone:" },
      { emoji: "🍗", name: "Muslo de ave", shortcode: ":poultry_leg:" },
      { emoji: "🥩", name: "Filete", shortcode: ":cut_of_meat:" },
      { emoji: "🥓", name: "Beicon", shortcode: ":bacon:" },
      { emoji: "🥚", name: "Huevo", shortcode: ":egg:" },
      { emoji: "🍳", name: "Huevo frito", shortcode: ":fried_egg:" },
      // Comida rápida y platos preparados
      { emoji: "🍔", name: "Hamburguesa", shortcode: ":hamburger:" },
      { emoji: "🍟", name: "Patatas fritas", shortcode: ":fries:" },
      { emoji: "🍕", name: "Pizza", shortcode: ":pizza:" },
      { emoji: "🌭", name: "Perrito caliente", shortcode: ":hotdog:" },
      { emoji: "🥪", name: "Sándwich", shortcode: ":sandwich:" },
      { emoji: "🌮", name: "Taco", shortcode: ":taco:" },
      { emoji: "🌯", name: "Burrito", shortcode: ":burrito:" },
      { emoji: "🥙", name: "Pan de pita relleno", shortcode: ":stuffed_flatbread:" },
      // Platos preparados y guisos
      { emoji: "🥘", name: "Paella", shortcode: ":shallow_pan_of_food:" },
      { emoji: "🍲", name: "Olla de comida", shortcode: ":stew:" },
      { emoji: "🥣", name: "Cuenco con cuchara", shortcode: ":bowl_with_spoon:" },
      { emoji: "🥗", name: "Ensalada", shortcode: ":green_salad:" },
      { emoji: "🍿", name: "Palomitas", shortcode: ":popcorn:" },
      { emoji: "🧂", name: "Sal", shortcode: ":salt:" },
      { emoji: "🥫", name: "Comida enlatada", shortcode: ":canned_food:" },
      // Comida asiática
      { emoji: "🍱", name: "Caja bento", shortcode: ":bento:" },
      { emoji: "🍘", name: "Galleta de arroz", shortcode: ":rice_cracker:" },
      { emoji: "🍙", name: "Bola de arroz", shortcode: ":rice_ball:" },
      { emoji: "🍚", name: "Arroz", shortcode: ":rice:" },
      { emoji: "🍛", name: "Arroz al curry", shortcode: ":curry:" },
      { emoji: "🍜", name: "Cuenco de fideos humeante", shortcode: ":ramen:" },
      { emoji: "🍝", name: "Espagueti", shortcode: ":spaghetti:" },
      { emoji: "🍠", name: "Boniatos asados", shortcode: ":sweet_potato:" },
      { emoji: "🍢", name: "Oden", shortcode: ":oden:" },
      { emoji: "🍣", name: "Sushi", shortcode: ":sushi:" },
      { emoji: "🍤", name: "Gamba frita", shortcode: ":fried_shrimp:" },
      { emoji: "🍥", name: "Pastel de pescado", shortcode: ":fish_cake:" },
      { emoji: "🥮", name: "Pastel de luna", shortcode: ":moon_cake:" },
      { emoji: "🍡", name: "Dango", shortcode: ":dango:" },
      { emoji: "🥟", name: "Dumpling", shortcode: ":dumpling:" },
      { emoji: "🥠", name: "Galleta de la fortuna", shortcode: ":fortune_cookie:" },
      { emoji: "🥡", name: "Caja de comida para llevar", shortcode: ":takeout_box:" },
      // Postres y dulces
      { emoji: "🥧", name: "Pastel", shortcode: ":pie:" },
      { emoji: "🍦", name: "Helado", shortcode: ":icecream:" },
      { emoji: "🍧", name: "Hielo picado", shortcode: ":shaved_ice:" },
      { emoji: "🍨", name: "Helado", shortcode: ":ice_cream:" },
      { emoji: "🍩", name: "Donut", shortcode: ":doughnut:" },
      { emoji: "🍪", name: "Galleta", shortcode: ":cookie:" },
      { emoji: "🎂", name: "Pastel de cumpleaños", shortcode: ":birthday:" },
      { emoji: "🍰", name: "Trozo de tarta", shortcode: ":cake:" },
      { emoji: "🧁", name: "Cupcake", shortcode: ":cupcake:" },
      { emoji: "🍫", name: "Tableta de chocolate", shortcode: ":chocolate_bar:" },
      { emoji: "🍬", name: "Caramelo", shortcode: ":candy:" },
      { emoji: "🍭", name: "Piruleta", shortcode: ":lollipop:" },
      { emoji: "🍮", name: "Flan", shortcode: ":custard:" },
      { emoji: "🍯", name: "Tarro de miel", shortcode: ":honey_pot:" },
      // Bebidas
      { emoji: "🍼", name: "Biberón", shortcode: ":baby_bottle:" },
      { emoji: "🥛", name: "Vaso de leche", shortcode: ":milk_glass:" },
      { emoji: "☕", name: "Taza de café caliente humeante", shortcode: ":coffee:" },
      { emoji: "🍵", name: "Taza de té sin asa", shortcode: ":tea:" },
      { emoji: "🍶", name: "Sake", shortcode: ":sake:" },
      { emoji: "🍾", name: "Botella descorchándose", shortcode: ":champagne:" },
      { emoji: "🍷", name: "Copa de vino", shortcode: ":wine_glass:" },
      { emoji: "🍸", name: "Copa de cóctel", shortcode: ":cocktail:" },
      { emoji: "🍹", name: "Bebida tropical", shortcode: ":tropical_drink:" },
      { emoji: "🍺", name: "Jarra de cerveza", shortcode: ":beer:" },
      { emoji: "🍻", name: "Jarras de cerveza brindando", shortcode: ":beers:" },
      { emoji: "🥂", name: "Copas brindando", shortcode: ":clinking_glasses:" },
      { emoji: "🥃", name: "Vaso", shortcode: ":tumbler_glass:" },
      { emoji: "🥤", name: "Vaso con pajita", shortcode: ":cup_with_straw:" },
      { emoji: "🧃", name: "Caja de jugo", shortcode: ":beverage_box:" },
      { emoji: "🧉", name: "Mate", shortcode: ":mate:" },
      { emoji: "🧊", name: "Cubo de hielo", shortcode: ":ice_cube:" },
      // Utensilios
      { emoji: "🥢", name: "Palillos chinos", shortcode: ":chopsticks:" },
      { emoji: "🍽️", name: "Plato con cubiertos", shortcode: ":plate_with_cutlery:" },
      { emoji: "🍴", name: "Tenedor y cuchillo", shortcode: ":fork_and_knife:" },
      { emoji: "🥄", name: "Cuchara", shortcode: ":spoon:" },
      { emoji: "🧂", name: "Salero", shortcode: ":salt:" }
    ]
  },
  {
    name: "Actividades",
    emojis: [
      // Deportes con pelota
      { emoji: "⚽", name: "Balón de fútbol", shortcode: ":soccer:" },
      { emoji: "🏀", name: "Balón de baloncesto", shortcode: ":basketball:" },
      { emoji: "🏈", name: "Balón de fútbol americano", shortcode: ":football:" },
      { emoji: "⚾", name: "Béisbol", shortcode: ":baseball:" },
      { emoji: "🥎", name: "Sóftbol", shortcode: ":softball:" },
      { emoji: "🎾", name: "Tenis", shortcode: ":tennis:" },
      { emoji: "🏐", name: "Voleibol", shortcode: ":volleyball:" },
      { emoji: "🏉", name: "Rugby", shortcode: ":rugby_football:" },
      { emoji: "🎱", name: "Bola 8", shortcode: ":8ball:" },
      { emoji: "🏓", name: "Ping pong", shortcode: ":ping_pong:" },
      { emoji: "🏸", name: "Bádminton", shortcode: ":badminton:" },
      // Deportes de palo y stick
      { emoji: "🏒", name: "Hockey sobre hielo", shortcode: ":hockey:" },
      { emoji: "🏑", name: "Hockey sobre césped", shortcode: ":field_hockey:" },
      { emoji: "🥍", name: "Lacrosse", shortcode: ":lacrosse:" },
      { emoji: "🏏", name: "Críquet", shortcode: ":cricket_game:" },
      { emoji: "⛳", name: "Golf", shortcode: ":golf:" },
      // Deportes de precisión y combate
      { emoji: "🏹", name: "Tiro con arco", shortcode: ":bow_and_arrow:" },
      { emoji: "🎣", name: "Pesca", shortcode: ":fishing_pole_and_fish:" },
      { emoji: "🥊", name: "Guante de boxeo", shortcode: ":boxing_glove:" },
      { emoji: "🥋", name: "Uniforme de artes marciales", shortcode: ":martial_arts_uniform:" },
      // Deportes de invierno y ruedas
      { emoji: "🎽", name: "Camiseta de correr", shortcode: ":running_shirt_with_sash:" },
      { emoji: "🛹", name: "Monopatín", shortcode: ":skateboard:" },
      { emoji: "🥌", name: "Curling", shortcode: ":curling_stone:" },
      { emoji: "🛷", name: "Trineo", shortcode: ":sled:" },
      // Juegos y entretenimiento
      { emoji: "🎯", name: "Dardo tiro al balco, diana", shortcode: ":dart:" },
      { emoji: "🪀", name: "Yo-yo", shortcode: ":yo-yo:" },
      { emoji: "🪁", name: "Cometa", shortcode: ":kite:" },
      // Instrumentos musicales
      { emoji: "🎤", name: "Micrófono", shortcode: ":microphone:" },
      { emoji: "🎧", name: "Auriculares", shortcode: ":headphones:" },
      { emoji: "🎼", name: "Partitura musical", shortcode: ":musical_score:" },
      { emoji: "🎹", name: "Teclado musical", shortcode: ":musical_keyboard:" },
      { emoji: "🎶", name: "Notas musicales", shortcode: ":notes:" },
      { emoji: "🥁", name: "Tambor", shortcode: ":drum:" },
      { emoji: "🎷", name: "Saxofón", shortcode: ":saxophone:" },
      { emoji: "🎺", name: "Trompeta", shortcode: ":trumpet:" },
      { emoji: "🎸", name: "Guitarra", shortcode: ":guitar:" },
      { emoji: "🪕", name: "Banjo", shortcode: ":banjo:" },
      { emoji: "🎻", name: "Violín", shortcode: ":violin:" },
      // Juegos de mesa y azar
      { emoji: "🎲", name: "Dado", shortcode: ":game_die:" },
      { emoji: "♟️", name: "Peón de ajedrez", shortcode: ":chess_pawn:" },
      { emoji: "🎳", name: "Bolos", shortcode: ":bowling:" },
      { emoji: "🎮", name: "Videojuego", shortcode: ":video_game:" },
      { emoji: "🎰", name: "Máquina tragamonedas", shortcode: ":slot_machine:" },
      { emoji: "🧩", name: "Pieza de rompecabezas", shortcode: ":jigsaw:" }
    ]
  },
  {
    name: "Viajes y Lugares",
    emojis: [
      // Transporte terrestre
      { emoji: "🚗", name: "Automóvil coche vehiculo", shortcode: ":car:" },
      { emoji: "🚕", name: "Taxi coche automovil", shortcode: ":taxi:" },
      { emoji: "🚙", name: "Vehículo utilitario deportivo", shortcode: ":blue_car:" },
      { emoji: "🚌", name: "Autobús camion", shortcode: ":bus:" },
      { emoji: "🚎", name: "Trolebús", shortcode: ":trolleybus:" },
      { emoji: "🏎️", name: "auto Coche de carreras deportivo", shortcode: ":racing_car:" },
      { emoji: "🚓", name: "auto Coche de policía", shortcode: ":police_car:" },
      { emoji: "🚑", name: "Ambulancia", shortcode: ":ambulance:" },
      { emoji: "🚒", name: "autobus Camión de bomberos", shortcode: ":fire_engine:" },
      { emoji: "🚐", name: "Minibús", shortcode: ":minibus:" },
      { emoji: "🚚", name: "Camión de reparto", shortcode: ":truck:" },
      { emoji: "🚛", name: "Camión articulado", shortcode: ":articulated_lorry:" },
      { emoji: "🚜", name: "Tractor", shortcode: ":tractor:" },
      { emoji: "🦯", name: "Bastón blanco", shortcode: ":white_cane:" },
      { emoji: "🦽", name: "Silla de ruedas manual", shortcode: ":manual_wheelchair:" },
      { emoji: "🦼", name: "Silla de ruedas motorizada", shortcode: ":motorized_wheelchair:" },
      { emoji: "🛴", name: "Patinete", shortcode: ":scooter:" },
      { emoji: "🚲", name: "Bicicleta", shortcode: ":bike:" },
      { emoji: "🛵", name: "Moto", shortcode: ":motor_scooter:" },
      { emoji: "🏍️", name: "Motocicleta deportiva carreras", shortcode: ":motorcycle:" },
      { emoji: "🛺", name: "Bicitaxi", shortcode: ":auto_rickshaw:" },
      { emoji: "🚨", name: "Luz de coche de policía", shortcode: ":rotating_light:" },
      { emoji: "🚔", name: "Coche de policía en dirección contraria", shortcode: ":oncoming_police_car:" },
      { emoji: "🚍", name: "Autobús en dirección contraria", shortcode: ":oncoming_bus:" },
      { emoji: "🚘", name: "Automóvil en dirección contraria", shortcode: ":oncoming_automobile:" },
      { emoji: "🚖", name: "Taxi en dirección contraria", shortcode: ":oncoming_taxi:" },
      // Transporte ferroviario
      { emoji: "🚃", name: "Vagón de tren", shortcode: ":railway_car:" },
      { emoji: "🚅", name: "metro Tren bala", shortcode: ":bullettrain_side:" },
      { emoji: "🚄", name: "metro Tren de alta velocidad", shortcode: ":bullettrain_front:" },
      { emoji: "🚆", name: "Tren", shortcode: ":train2:" },
      { emoji: "🚇", name: "Metro", shortcode: ":metro:" },
      { emoji: "🚈", name: "metro Tren ligero", shortcode: ":light_rail:" },
      { emoji: "🚉", name: "Estación", shortcode: ":station:" },
      { emoji: "🚊", name: "Tranvía", shortcode: ":tram:" },
      { emoji: "🚝", name: "Monorraíl", shortcode: ":monorail:" },
      { emoji: "🚞", name: "Tren de montaña", shortcode: ":mountain_railway:" },
      { emoji: "🚋", name: "Vagón de tranvía", shortcode: ":train:" },
      // Transporte aéreo y espacial
      { emoji: "✈️", name: "Avión aeronave aeroplano", shortcode: ":airplane:" },
      { emoji: "🛩️", name: "Avión aeronave aeroplano pequeño", shortcode: ":small_airplane:" },
      { emoji: "🛫", name: "Despegue de avión aeronave ", shortcode: ":airplane_departure:" },
      { emoji: "🛬", name: "Aterrizaje de avión aeronave ", shortcode: ":airplane_arriving:" },
      { emoji: "🪂", name: "Paracaídas", shortcode: ":parachute:" },
      { emoji: "💺", name: "Asiento", shortcode: ":seat:" },
      { emoji: "🛰️", name: "Satélite espacial", shortcode: ":artificial_satellite:" },
      { emoji: "🚀", name: "Cohete despega nave espacial astronave lanza impulsa", shortcode: ":rocket:" },
      { emoji: "🛸", name: "Platillo volante", shortcode: ":flying_saucer:" },
      { emoji: "🚁", name: "Helicóptero choper", shortcode: ":helicopter:" },
      { emoji: "🚟", name: "Ferrocarril suspendido", shortcode: ":suspension_railway:" },
      { emoji: "🚠", name: "Teleférico de montaña", shortcode: ":mountain_cableway:" },
      { emoji: "🚡", name: "Tranvía aéreo", shortcode: ":aerial_tramway:" },
      // Transporte acuático
      { emoji: "🛶", name: "Canoa", shortcode: ":canoe:" },
      { emoji: "⛵", name: "Velero", shortcode: ":boat:" },
      { emoji: "🚤", name: "Lancha motora", shortcode: ":speedboat:" },
      { emoji: "🛥️", name: "Barco a motor", shortcode: ":motor_boat:" },
      { emoji: "🛳️", name: "Barco de pasajeros", shortcode: ":passenger_ship:" },
      { emoji: "⛴️", name: "Ferry", shortcode: ":ferry:" },
      { emoji: "🚢", name: "Barco", shortcode: ":ship:" },
      { emoji: "⚓", name: "Ancla", shortcode: ":anchor:" },
      // Señalización y transporte
      { emoji: "⛽", name: "despachador Surtidor de gasolina", shortcode: ":fuelpump:" },
      { emoji: "🚧", name: "Barrera de obras", shortcode: ":construction:" },
      { emoji: "🚦", name: "alto siga Semáforo vertical", shortcode: ":vertical_traffic_light:" },
      { emoji: "🚥", name: "alto siga Semáforo horizontal", shortcode: ":traffic_light:" },
      { emoji: "🚏", name: "Señal de stop alto", shortcode: ":busstop:" },
      // Lugares, monumentos y edificios
      { emoji: "🗺️", name: "Mapamundi", shortcode: ":world_map:" },
      { emoji: "🗿", name: "Moái", shortcode: ":moyai:" },
      { emoji: "🗽", name: "Estatua de la Libertad", shortcode: ":statue_of_liberty:" },
      { emoji: "🗼", name: "Torre de Tokio", shortcode: ":tokyo_tower:" },
      { emoji: "🏰", name: "Castillo", shortcode: ":european_castle:" },
      { emoji: "🏯", name: "Castillo japonés", shortcode: ":japanese_castle:" },
      { emoji: "🏟️", name: "Estadio", shortcode: ":stadium:" },
      { emoji: "🏢", name: "Edificio de oficinas", shortcode: ":office:" },
      { emoji: "🏣", name: "Oficina de correos japonesa", shortcode: ":post_office:" },
      { emoji: "🏤", name: "Oficina de correos", shortcode: ":european_post_office:" },
      { emoji: "🏥", name: "Hospital", shortcode: ":hospital:" },
      { emoji: "🏦", name: "Banco", shortcode: ":bank:" },
      { emoji: "🏨", name: "Hotel", shortcode: ":hotel:" },
      { emoji: "🏪", name: "Tienda 24 horas", shortcode: ":convenience_store:" },
      { emoji: "🏫", name: "Escuela", shortcode: ":school:" },
      { emoji: "🏩", name: "Hotel del amor", shortcode: ":love_hotel:" },
      { emoji: "💒", name: "Boda", shortcode: ":wedding:" },
      { emoji: "🏛️", name: "Edificio clásico", shortcode: ":classical_building:" },
      { emoji: "⛪", name: "Iglesia", shortcode: ":church:" },
      { emoji: "🕌", name: "Mezquita", shortcode: ":mosque:" },
      { emoji: "🛕", name: "Templo hindú", shortcode: ":hindu_temple:" },
      { emoji: "🕍", name: "Sinagoga", shortcode: ":synagogue:" },
      { emoji: "🕋", name: "Kaaba", shortcode: ":kaaba:" },
      { emoji: "⛩️", name: "Santuario sintoísta", shortcode: ":shinto_shrine:" },
      // Paisajes y naturaleza
      { emoji: "🏕️", name: "Camping", shortcode: ":camping:" },
      { emoji: "🏖️", name: "Playa con sombrilla", shortcode: ":beach_with_umbrella:" },
      { emoji: "🏜️", name: "Desierto", shortcode: ":desert:" },
      { emoji: "🏝️", name: "Isla desierta", shortcode: ":desert_island:" },
      { emoji: "🏔️", name: "Montaña nevada", shortcode: ":snow_capped_mountain:" },
      { emoji: "⛰️", name: "Montaña", shortcode: ":mountain:" },
      { emoji: "🌋", name: "Volcán", shortcode: ":volcano:" },
      { emoji: "🗻", name: "Monte Fuji", shortcode: ":mount_fuji:" },
      { emoji: "🏞️", name: "Parque nacional", shortcode: ":national_park:" },
      // Entretenimiento y ocio
      { emoji: "🎡", name: "Noria", shortcode: ":ferris_wheel:" },
      { emoji: "🎢", name: "Montaña rusa", shortcode: ":roller_coaster:" },
      { emoji: "🎠", name: "Caballitos de tiovivo", shortcode: ":carousel_horse:" },
      { emoji: "⛲", name: "Fuente", shortcode: ":fountain:" },
      { emoji: "⛱️", name: "Sombrilla en el suelo", shortcode: ":parasol_on_ground:" },
      // Infraestructura y construcción
      { emoji: "🏠", name: "Casa", shortcode: ":house:" },
      { emoji: "🏡", name: "Casa con jardín", shortcode: ":house_with_garden:" },
      { emoji: "🏘️", name: "Casas", shortcode: ":house_buildings:" },
      { emoji: "🏚️", name: "Casa abandonada", shortcode: ":derelict_house_building:" },
      { emoji: "🏗️", name: "Grúa de construcción", shortcode: ":building_construction:" },
      { emoji: "🏭", name: "Fábrica", shortcode: ":factory:" },
      { emoji: "🛤️", name: "Vía de tren", shortcode: ":railway_track:" },
      { emoji: "🛣️", name: "Autopista", shortcode: ":motorway:" },
      // Vistas y momentos especiales
      { emoji: "🗾", name: "Silueta de Japón", shortcode: ":japan:" },
      { emoji: "🎑", name: "Ceremonia de la luna", shortcode: ":rice_scene:" },
      { emoji: "🌅", name: "Amanecer", shortcode: ":sunrise:" },
      { emoji: "🌄", name: "Amanecer en las montañas", shortcode: ":sunrise_over_mountains:" },
      { emoji: "🌠", name: "Estrella fugaz", shortcode: ":stars:" },
      { emoji: "🎇", name: "Bengala", shortcode: ":sparkler:" },
      { emoji: "🌌", name: "Vía Láctea", shortcode: ":milky_way:" },
      { emoji: "🎆", name: "Fuegos artificiales", shortcode: ":fireworks:" }
    ]
  },
  {
    name: "Corazones y amor",
    emojis: [
      { emoji: "❤️", name: "Corazón rojo", shortcode: ":heart:" },
      { emoji: "🧡", name: "Corazón naranja", shortcode: ":orange_heart:" },
      { emoji: "💛", name: "Corazón amarillo", shortcode: ":yellow_heart:" },
      { emoji: "💚", name: "Corazón verde", shortcode: ":green_heart:" },
      { emoji: "💙", name: "Corazón azul", shortcode: ":blue_heart:" },
      { emoji: "💜", name: "Corazón morado", shortcode: ":purple_heart:" },
      { emoji: "🖤", name: "Corazón negro", shortcode: ":black_heart:" },
      { emoji: "💕", name: "Dos corazones", shortcode: ":two_hearts:" },
      { emoji: "💞", name: "Corazones girando", shortcode: ":revolving_hearts:" },
      { emoji: "💓", name: "Corazón latiendo", shortcode: ":heartbeat:" },
      { emoji: "👄", name: "Boca", shortcode: ":lips:" },
      { emoji: "💋", name: "Marca de beso", shortcode: ":kiss:" }
    ]
  },
,{
  name: "Gestos y acciones",
  emojis: [
    // Gestos de frustración/caras cubiertas
    { emoji: "🤦", name: "Persona con la mano en la frente", shortcode: ":facepalm:" },
    { emoji: "🤦‍♂️", name: "Hombre con la mano en la frente", shortcode: ":man_facepalming:" },
    { emoji: "🤦‍♀️", name: "Mujer con la mano en la frente", shortcode: ":woman_facepalming:" },
    { emoji: "🤷", name: "Persona encogiéndose de hombros", shortcode: ":shrug:" },
    { emoji: "🤷‍♂️", name: "Hombre encogiéndose de hombros", shortcode: ":man_shrugging:" },
    { emoji: "🤷‍♀️", name: "Mujer encogiéndose de hombros", shortcode: ":woman_shrugging:" },
    // Gestos con manos
    { emoji: "🙋", name: "Persona levantando la mano", shortcode: ":raising_hand:" },
    { emoji: "🙋‍♂️", name: "Hombre levantando la mano", shortcode: ":man_raising_hand:" },
    { emoji: "🙋‍♀️", name: "Mujer levantando la mano", shortcode: ":woman_raising_hand:" },
    { emoji: "🙍", name: "Persona frunciendo el ceño", shortcode: ":person_frowning:" },
    { emoji: "🙍‍♂️", name: "Hombre frunciendo el ceño", shortcode: ":man_frowning:" },
    { emoji: "🙍‍♀️", name: "Mujer frunciendo el ceño", shortcode: ":woman_frowning:" },
    { emoji: "🙎", name: "Persona con expresión de disgusto", shortcode: ":person_pouting:" },
    { emoji: "🙎‍♂️", name: "Hombre con expresión de disgusto", shortcode: ":man_pouting:" },
    { emoji: "🙎‍♀️", name: "Mujer con expresión de disgusto", shortcode: ":woman_pouting:" },
    { emoji: "🙇", name: "Persona haciendo una reverencia", shortcode: ":bow:" },
    { emoji: "🙇‍♂️", name: "Hombre haciendo una reverencia", shortcode: ":man_bowing:" },
    { emoji: "🙇‍♀️", name: "Mujer haciendo una reverencia", shortcode: ":woman_bowing:" },
    { emoji: "💁", name: "Persona de mostrador de información", shortcode: ":information_desk_person:" },
    { emoji: "💁‍♂️", name: "Hombre en mostrador de información", shortcode: ":man_tipping_hand:" },
    { emoji: "💁‍♀️", name: "Mujer en mostrador de información", shortcode: ":woman_tipping_hand:" },
    { emoji: "🙅", name: "Persona haciendo un gesto de negación", shortcode: ":no_good:" },
    { emoji: "🙅‍♂️", name: "Hombre haciendo un gesto de negación", shortcode: ":man_gesturing_no:" },
    { emoji: "🙅‍♀️", name: "Mujer haciendo un gesto de negación", shortcode: ":woman_gesturing_no:" },
    { emoji: "🙆", name: "Persona haciendo un gesto de aprobación", shortcode: ":ok_person:" },
    { emoji: "🙆‍♂️", name: "Hombre haciendo un gesto de aprobación", shortcode: ":man_gesturing_ok:" },
    { emoji: "🙆‍♀️", name: "Mujer haciendo un gesto de aprobación", shortcode: ":woman_gesturing_ok:" },
    { emoji: "🧏", name: "Persona sorda", shortcode: ":deaf_person:" },
    { emoji: "🧏‍♂️", name: "Hombre sordo", shortcode: ":deaf_man:" },
    { emoji: "🧏‍♀️", name: "Mujer sorda", shortcode: ":deaf_woman:" },
    { emoji: "💆", name: "Persona recibiendo un masaje", shortcode: ":massage:" },
    { emoji: "💆‍♂️", name: "Hombre recibiendo un masaje", shortcode: ":man_getting_massage:" },
    { emoji: "💆‍♀️", name: "Mujer recibiendo un masaje", shortcode: ":woman_getting_massage:" },
    { emoji: "💇", name: "Persona cortándose el pelo", shortcode: ":haircut:" },
    { emoji: "💇‍♂️", name: "Hombre cortándose el pelo", shortcode: ":man_getting_haircut:" },
    { emoji: "💇‍♀️", name: "Mujer cortándose el pelo", shortcode: ":woman_getting_haircut:" }
  ]
},
{
    name: "Objetos y símbolos",
    emojis: [
      // Dispositivos electrónicos
      { emoji: "⌚", name: "Reloj de pulsera", shortcode: ":watch:" },
      { emoji: "📱", name: "Teléfono móvil", shortcode: ":iphone:" },
      { emoji: "📲", name: "Móvil con flecha", shortcode: ":calling:" },
      { emoji: "💻", name: "Ordenador portátil", shortcode: ":computer:" },
      { emoji: "🖮", name: "Teclado", shortcode: ":keyboard:" },
      { emoji: "🖥️", name: "Ordenador de sobremesa", shortcode: ":desktop_computer:" },
      { emoji: "🖨️", name: "Impresora", shortcode: ":printer:" },
      { emoji: "🖱️", name: "Ratón de ordenador", shortcode: ":three_button_mouse:" },
      { emoji: "🖲️", name: "Trackball", shortcode: ":trackball:" },
      // Almacenamiento
      { emoji: "💽", name: "Disco de computadora", shortcode: ":computer_disk:" },
      { emoji: "💾", name: "Disquete", shortcode: ":floppy_disk:" },
      { emoji: "💿", name: "Disco óptico", shortcode: ":cd:" },
      { emoji: "📀", name: "DVD", shortcode: ":dvd:" },
      { emoji: "📼", name: "Cinta de vídeo", shortcode: ":vhs:" },
      // Equipos audiovisuales
      { emoji: "📷", name: "Cámara", shortcode: ":camera:" },
      { emoji: "📸", name: "Cámara con flash", shortcode: ":camera_flash:" },
      { emoji: "📹", name: "Videocámara", shortcode: ":video_camera:" },
      { emoji: "🎥", name: "Cámara de cine", shortcode: ":movie_camera:" },
      { emoji: "📽️", name: "Proyector de cine", shortcode: ":film_projector:" },
      { emoji: "🎞️", name: "Fotogramas de película", shortcode: ":film_frames:" },
      // Comunicación
      { emoji: "📞", name: "Auricular de teléfono", shortcode: ":telephone_receiver:" },
      { emoji: "☎️", name: "Teléfono", shortcode: ":telephone:" },
      { emoji: "📟", name: "Buscapersonas", shortcode: ":pager:" },
      { emoji: "📠", name: "Fax", shortcode: ":fax:" },
      { emoji: "📺", name: "Televisor", shortcode: ":tv:" },
      { emoji: "📻", name: "Radio", shortcode: ":radio:" },
      { emoji: "🎙️", name: "Micrófono de estudio", shortcode: ":studio_microphone:" },
      { emoji: "🎚️", name: "Control de nivel", shortcode: ":level_slider:" },
      { emoji: "🎛️", name: "Botones de control", shortcode: ":control_knobs:" },
      // Tiempo y relojes
      { emoji: "⏱️", name: "Cronómetro", shortcode: ":stopwatch:" },
      { emoji: "⏲️", name: "Temporizador", shortcode: ":timer_clock:" },
      { emoji: "⏰", name: "Despertador", shortcode: ":alarm_clock:" },
      { emoji: "🕰️", name: "Reloj de sobremesa", shortcode: ":mantlepiece_clock:" },
      { emoji: "⏳", name: "Reloj de arena", shortcode: ":hourglass:" },
      { emoji: "⌛", name: "Reloj de arena con arena", shortcode: ":hourglass_flowing_sand:" },
      // Tecnología y energía
      { emoji: "📡", name: "Antena parabólica", shortcode: ":satellite_antenna:" },
      { emoji: "🔋", name: "Pila", shortcode: ":battery:" },
      { emoji: "🔌", name: "Enchufe eléctrico", shortcode: ":electric_plug:" },
      { emoji: "💡", name: "Bombilla foco luz", shortcode: ":bulb:" },
      { emoji: "🔦", name: "Linterna", shortcode: ":flashlight:" },
      { emoji: "🕯️", name: "Vela", shortcode: ":candle:" },
      { emoji: "🪔", name: "Lámpara de aceite", shortcode: ":diya_lamp:" },
      // Dinero y finanzas
      { emoji: "💸", name: "Dinero con alas", shortcode: ":money_with_wings:" },
      { emoji: "💵", name: "Billete de dólar", shortcode: ":dollar:" },
      { emoji: "💴", name: "Billete de yen", shortcode: ":yen:" },
      { emoji: "💶", name: "Billete de euro", shortcode: ":euro:" },
      { emoji: "💷", name: "Billete de libra", shortcode: ":pound:" },
      { emoji: "💰", name: "Bolsa de dinero", shortcode: ":moneybag:" },
      { emoji: "💳", name: "Tarjeta de crédito", shortcode: ":credit_card:" },
      { emoji: "💎", name: "Gema", shortcode: ":gem:" },
      { emoji: "⚖️", name: "Balanza", shortcode: ":balance_scale:" },
      // Herramientas
      { emoji: "🧰", name: "Caja de herramientas", shortcode: ":toolbox:" },
      { emoji: "🔧", name: "Llave inglesa", shortcode: ":wrench:" },
      { emoji: "🔨", name: "Martillo", shortcode: ":hammer:" },
      { emoji: "⚒️", name: "Martillo y pico", shortcode: ":hammer_and_pick:" },
      { emoji: "🛠️", name: "Martillo y llave inglesa", shortcode: ":hammer_and_wrench:" },
      { emoji: "⛏️", name: "Pico", shortcode: ":pick:" },
      { emoji: "🔩", name: "Tuerca y tornillo", shortcode: ":nut_and_bolt:" },
      { emoji: "⚙️", name: "Engranaje", shortcode: ":gear:" },
      { emoji: "🗜️", name: "Tornillo de banco", shortcode: ":compression:" },
      // Construcción y materiales
      { emoji: "🧱", name: "Ladrillo", shortcode: ":bricks:" },
      { emoji: "⛓️", name: "Cadenas", shortcode: ":chains:" },
      { emoji: "🧲", name: "Imán", shortcode: ":magnet:" },
      // Armas y seguridad
      { emoji: "🔫", name: "Pistola", shortcode: ":gun:" },
      { emoji: "💣", name: "Bomba", shortcode: ":bomb:" },
      { emoji: "🧨", name: "Petardo", shortcode: ":firecracker:" },
      { emoji: "🪓", name: "Hacha", shortcode: ":axe:" },
      { emoji: "🔪", name: "Cuchillo de cocina", shortcode: ":hocho:" },
      { emoji: "🗡️", name: "Daga", shortcode: ":dagger_knife:" },
      { emoji: "⚔️", name: "Espadas cruzadas", shortcode: ":crossed_swords:" },
      { emoji: "🛡️", name: "Escudo", shortcode: ":shield:" },
      // Objetos rituales y místicos
      { emoji: "🔮", name: "Bola de cristal", shortcode: ":crystal_ball:" },
      { emoji: "📿", name: "Cuentas de oración", shortcode: ":prayer_beads:" },
      { emoji: "🧿", name: "Nazar", shortcode: ":nazar_amulet:" },
      // Ciencia y medicina
      { emoji: "⚗️", name: "Alambique", shortcode: ":alembic:" },
      { emoji: "🔭", name: "Telescopio", shortcode: ":telescope:" },
      { emoji: "🔬", name: "Microscopio", shortcode: ":microscope:" },
      { emoji: "🕳️", name: "Agujero", shortcode: ":hole:" },
      { emoji: "🩹", name: "Tirita curita bandita", shortcode: ":adhesive_bandage:" },
      // Material de oficina y papelería
      { emoji: "📓", name: "Libreta", shortcode: ":notebook:" },
      { emoji: "📔", name: "Libreta con tapas decorativas", shortcode: ":notebook_with_decorative_cover:" },
      { emoji: "📕", name: "Libro cerrado", shortcode: ":closed_book:" },
      { emoji: "📗", name: "Libro verde", shortcode: ":green_book:" },
      { emoji: "📘", name: "Libro azul", shortcode: ":blue_book:" },
      { emoji: "📙", name: "Libro naranja", shortcode: ":orange_book:" },
      { emoji: "📚", name: "Libros", shortcode: ":books:" },
      { emoji: "📖", name: "Libro abierto", shortcode: ":book:" },
      { emoji: "🔖", name: "Etiqueta", shortcode: ":bookmark:" },
      { emoji: "📎", name: "Clip", shortcode: ":paperclip:" },
      { emoji: "🖇️", name: "Clips unidos", shortcode: ":linked_paperclips:" },
      { emoji: "🧷", name: "Imperdible", shortcode: ":safety_pin:" },
      { emoji: "🔗", name: "Enlace", shortcode: ":link:" },
      { emoji: "📐", name: "Escuadra", shortcode: ":triangular_ruler:" },
      { emoji: "📏", name: "Regla recta", shortcode: ":straight_ruler:" },
      { emoji: "🧮", name: "Ábaco", shortcode: ":abacus:" },
      { emoji: "📌", name: "Chincheta", shortcode: ":pushpin:" },
      { emoji: "📍", name: "Chincheta redonda", shortcode: ":round_pushpin:" },
      { emoji: "✂️", name: "Tijeras", shortcode: ":scissors:" },
      { emoji: "🖊️", name: "Bolígrafo", shortcode: ":pen_ballpoint:" },
      { emoji: "🖋️", name: "Bolígrafo", shortcode: ":fountain_pen:" },
      { emoji: "✒️", name: "Pluma estilográfica", shortcode: ":black_nib:" },
      { emoji: "🖌️", name: "Pincel", shortcode: ":paintbrush:" },
      { emoji: "🖍️", name: "Crayón", shortcode: ":crayon:" },
      { emoji: "📝", name: "Bloc de notas", shortcode: ":memo:" },
      { emoji: "✏️", name: "Lápiz", shortcode: ":pencil2:" },
      // Seguridad y cerraduras
      { emoji: "🔍", name: "Lupa orientada hacia la izquierda", shortcode: ":mag:" },
      { emoji: "🔎", name: "Lupa orientada hacia la derecha", shortcode: ":mag_right:" },
      { emoji: "🔏", name: "Candado cerrado con pluma", shortcode: ":lock_with_ink_pen:" },
      { emoji: "🔐", name: "Candado cerrado con llave", shortcode: ":closed_lock_with_key:" },
      { emoji: "🔒", name: "Candado", shortcode: ":lock:" },
      { emoji: "🔓", name: "Candado abierto", shortcode: ":unlock:" },
      // Símbolos y elementos decorativos
      { emoji: "🎉", name: "Fiesta", shortcode: ":tada:" },
      { emoji: "✨", name: "Brillos", shortcode: ":sparkles:" },
      { emoji: "🔥", name: "Fuego", shortcode: ":fire:" },
      { emoji: "💯", name: "100 puntos", shortcode: ":100:" },
      { emoji: "💪", name: "Bíceps", shortcode: ":muscle:" },
      // Personajes y criaturas
      { emoji: "🙈", name: "Mono no ver", shortcode: ":see_no_evil:" },
      { emoji: "🤡", name: "Payaso", shortcode: ":clown:" },
      { emoji: "👻", name: "Fantasma", shortcode: ":ghost:" },
      { emoji: "💩", name: "Caca", shortcode: ":poop:" },
      { emoji: "🤖", name: "Robot", shortcode: ":robot:" }
    ]
  },
];

export function EmojiPicker({ onEmojiSelect }: EmojiPickerProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [recentEmojis, setRecentEmojis] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [tooltipEmoji, setTooltipEmoji] = useState<{ emoji: string; name: string; shortcode: string; position: { x: number; y: number } } | null>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const messageTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Store reference to message textarea
  useEffect(() => {
    messageTextareaRef.current = document.querySelector('textarea');
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        messageTextareaRef.current?.focus();
      }
    };

    const handleEscKey = (event: KeyboardEvent) => {
      // Handle ESC key
      if (event.key === 'Escape') {
        setIsOpen(false);
        messageTextareaRef.current?.focus();
      }
    };

    if (isOpen) {
      // Focus search input when opening
      searchInputRef.current?.focus();
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen]);

  const handleEmojiSelect = (emoji: string) => {
    onEmojiSelect(emoji);
    setRecentEmojis(prev => {
      const newRecent = [emoji, ...prev.filter(e => e !== emoji)].slice(0, 8);
      return newRecent;
    });
    setIsOpen(false);
    messageTextareaRef.current?.focus();
  };

  const filteredCategories = categories.map(category => ({
    ...category,
    emojis: category.emojis.filter(({ emoji, name }) => 
      emoji.includes(searchTerm) || 
      name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.emojis.length > 0);

  return (
    <div className="relative" ref={pickerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 text-sm text-gray-700 group"
      >
        <div className="w-9 h-9 rounded-full bg-white/80 shadow-sm flex items-center justify-center group-hover:bg-white group-hover:shadow transition-all duration-300">
          <span className="text-[1.15rem] transform scale-85 transition-transform duration-300 group-hover:scale-95">😀</span>
        </div>
        <span>Agregar emoji</span>
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 w-[320px] max-h-[480px] overflow-hidden">
          <div className="p-2 border-b border-gray-200">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar emoji"
                ref={searchInputRef}
                className="w-full pl-3 pr-10 py-2 text-sm border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <div className="overflow-y-auto max-h-[320px]">
            {recentEmojis.length > 0 && (
              <div className="p-2 border-b border-gray-200">
                <h3 className="text-xs font-medium text-gray-500 mb-2">Usados frecuentemente</h3>
                <div className="flex flex-wrap gap-1">
                  {recentEmojis.map((emoji, index) => (
                    <button
                      key={index}
                      onClick={() => handleEmojiSelect(emoji)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {filteredCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="p-2 border-b border-gray-200">
                <h3 className="text-xs font-medium text-gray-500 mb-2">{category.name}</h3>
                <div className="grid grid-cols-8 gap-1">
                  {category.emojis.map((emojiData, emojiIndex) => (
                    <button
                      key={emojiIndex}
                      onClick={() => handleEmojiSelect(emojiData.emoji)}
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setTooltipEmoji({
                          ...emojiData,
                          position: { x: rect.left, y: rect.top }
                        });
                      }}
                      onMouseLeave={() => setTooltipEmoji(null)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded text-xl"
                    >
                      {emojiData.emoji}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {tooltipEmoji && (
            <div
              className="absolute z-50 bg-black text-white px-2 py-1 rounded text-xs whitespace-nowrap"
              style={{
                top: `${tooltipEmoji.position.y - 30}px`,
                left: `${tooltipEmoji.position.x}px`,
              }}
            >
              {tooltipEmoji.name} {tooltipEmoji.shortcode}
            </div>
          )}
        </div>
      )}
    </div>
  );
}