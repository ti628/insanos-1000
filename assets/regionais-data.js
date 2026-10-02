(function(global) {
  var GRAUS = [
    'Grau I',
    'Grau II',
    'Brasil III',
    'Grau IV',
    'Regional V',
    'Cargo XI',
    'Full XIII',
    'Meio escudo IX',
    'Camiseta / PP X'
  ];

  var CARGOS_GRAU_I = [
    'Presidente',
    'Vice-Presidente',
    'Diretor de Disciplina Mundial',
    'Diretor Social Mundial',
    'Diretor de Comunicação Mundial',
    'Diretor Sargento de Armas Mundial',
    'Diretor Financeiro Mundial',
    'Diretor Operacional Mundial',
    'Diretor de Expansão Mundial',
    'Jurídico',
    'Inteligência Mundial'
  ];

  var REGIONAIS_DIVISOES = {
  "REGIONAL ACRE": [
    "Divisão Cruzeiro do Sul",
    "Divisão Rio Branco",
    "Divisão Boca do Acre"
  ],
  "REGIONAL AMAPÁ": [
    "Divisão Macapá Centro",
    "Divisão Santana",
    "Divisão Macapá Norte",
    "Divisão Macapá Sul"
  ],
  "REGIONAL MANAUS": [
    "Divisão Itapiranga",
    "Divisão Iranduba",
    "Divisão Manaus Sul",
    "Divisão Manaus Norte",
    "Divisão Manaus Leste",
    "Divisão Manaus Centro",
    "Divisão Manaus Oeste",
    "Divisão Itacoatiara",
    "Divisão Presidente Figueiredo",
    "Divisão Manaus Sudeste",
    "Divisão Manacapuru AM"
  ],
  "REGIONAL BAHIA I": [
    "Divisão Salvador",
    "Divisão Feira de Santana",
    "Divisão Paulo Afonso",
    "Divisão Camaçari",
    "Divisão Ribeira do Pombal",
    "Divisão Jequié",
    "Divisão Jacobina",
    "Divisão Pilar",
    "Divisão Salvador Norte",
    "Divisão Serrinha",
    "Divisão Lauro de Freitas",
    "Divisão Salvador Leste",
    "Divisão Itaberaba",
    "Divisão Valença",
    "Divisão Salvador Litoral",
    "Divisão Juazeiro"
  ],
  "REGIONAL BAHIA II": [
    "Divisão Barreiras",
    "Divisão Luís Eduardo Magalhães",
    "Divisão Barreiras Norte",
    "Divisão Serra Dourada",
    "Divisão Santa Maria da Vitória",
    "Divisão Barreiras Sul",
    "Divisão Correntina",
    "Divisão Bom Jesus da Lapa",
    "Divisão Seabra",
    "Divisão Irecê",
    "Divisão Posse"
  ],
  "REGIONAL BAHIA III": [
    "Divisão Porto Seguro",
    "Divisão Vitória da Conquista",
    "Divisão Santa Cruz de Cabralia",
    "Divisão Guanambi",
    "Divisão Ilhéus",
    "Divisão Eunápolis",
    "Divisão Caetité",
    "Divisão Planalto",
    "Divisão Arraial D' Ajuda",
    "Divisão Macaúbas",
    "Divisão Brumado"
  ],
  "REGIONAL NORDESTE II": [
    "Divisão Eusebio",
    "Divisão Fortaleza Sul",
    "Divisão Maracanaú",
    "Divisão Vale do Jaguaribe",
    "Divisão Pacajus",
    "Divisão Fortaleza Centro",
    "Divisão Fortaleza Oeste",
    "Divisão Fortaleza Leste",
    "Divisão Litoral Leste",
    "Divisão Cariri",
    "Divisão Aquiraz",
    "Divisão Mauriti"
  ],
  "REGIONAL NORDESTE X": [
    "Divisão Caucaia",
    "Divisão Paracuru",
    "Divisão Trairi",
    "Divisão Itapipoca",
    "Divisão São Gonçalo do Amarant"
  ],
  "REGIONAL BRASÍLIA I": [
    "Divisão Brasília",
    "Divisão Jardim Botânico",
    "Divisão São Sebastião",
    "Divisão Riacho Fundo",
    "Divisão Guará",
    "Divisão Vicente Pires",
    "Divisão Taguatinga"
  ],
  "REGIONAL BRASÍLIA II": [
    "Divisão Paracatu",
    "Divisão Novo Gama",
    "Divisão Jardim Ingá",
    "Divisão Jardim ABC",
    "Divisão Cristalina",
    "Divisão Valparaiso",
    "Divisão Cidade Ocidental",
    "Divisão Luziânia"
  ],
  "REGIONAL BRASÍLIA III": [
    "Divisão Águas Lindas",
    "Divisão Santa Maria",
    "Divisão Samambaia",
    "Divisão Gama",
    "Divisão Ceilândia",
    "Divisão Recanto das Emas"
  ],
  "REGIONAL BRASÍLIA IV": [
    "Divisão Planaltina",
    "Divisão Sobradinho",
    "Divisão Paranoá",
    "Divisão Formosa",
    "Divisão Unaí"
  ],
  "REGIONAL ESPIRITO SANTO NORTE": [
    "Divisão Colatina",
    "Divisão Serra",
    "Divisão Conceição da Barra",
    "Divisão Porto Canoa",
    "Divisão Ilha de Guriri",
    "Divisão Jacaraípe",
    "Divisão Mestre Alvaro",
    "Divisão Feu Rosa",
    "Divisão Capuba",
    "Divisão Pinheiros",
    "Divisão Linhares",
    "Divisão Novo Horizonte"
  ],
  "REGIONAL ESPIRITO SANTO SUL": [
    "Divisão Guaçui",
    "Divisão Guarapari",
    "Divisão Atílio Vivacqua",
    "Divisão Anchieta",
    "Divisão Itapemirim",
    "Divisão Piúma",
    "Divisão Cachoeiro de Itapemiri"
  ],
  "REGIONAL VITÓRIA": [
    "Divisão Vitória",
    "Divisão Cariacica",
    "Divisão Vila Velha",
    "Divisão Domingos Martins",
    "Divisão Vila Velha Sul"
  ],
  "REGIONAL GOIÂNIA": [
    "Divisão Goiânia Centro",
    "Divisão Goiânia Norte",
    "Divisão Aparecida de Goiânia",
    "Divisão Goianira",
    "Divisão Inhumas",
    "Divisão Trindade",
    "Divisão Nazário",
    "Divisão Goiânia Oeste",
    "Divisão Itapirapuã",
    "Divisão Goiânia Noroeste",
    "Divisão Goiânia Leste"
  ],
  "REGIONAL GOIAS I": [
    "Divisão Pires do Rio",
    "Divisão Piracanjuba",
    "Divisão Orizona",
    "Divisão Cristianópolis",
    "Divisão Pontalina"
  ],
  "REGIONAL GOIÁS II": [
    "Divisão Itumbiara",
    "Divisão Quirinopolis",
    "Divisão Rio Verde",
    "Divisão Caçu",
    "Divisão Santa Helena"
  ],
  "REGIONAL GOIAS III": [
    "Divisão Caldas Novas",
    "Divisão Ipameri",
    "Divisão Morrinhos",
    "Divisão Urutai",
    "Divisão Goiatuba",
    "Divisão Rio Quente"
  ],
  "REGIONAL GOIÁS IV": [
    "Divisão Goianésia",
    "Divisão Rialma",
    "Divisão Uruaçu",
    "Divisão Ceres",
    "Divisão Porangatu",
    "Divisão Carmo do Rio Verde",
    "Divisão Jaraguá",
    "Divisão Niquelândia",
    "Divisão Mara Rosa",
    "Divisão Nova Crixas"
  ],
  "REGIONAL GOIÁS V": [
    "Divisão Anápolis Oeste",
    "Divisão Bela Vista",
    "Divisão Senador Canedo",
    "Divisão Bonfinópolis",
    "Divisão Anápolis Leste"
  ],
  "REGIONAL SUDESTE GOIANO": [
    "Divisão Catalão Centro",
    "Divisão Campo Alegre de Goiás",
    "Divisão Anhanguera",
    "Divisão Três Ranchos",
    "Divisão Goiandira",
    "Divisão Catalão Oeste",
    "Divisão Ouvidor",
    "Divisão Corumbaíba",
    "Divisão Catalão Norte",
    "Divisão Catalão Sul"
  ],
  "REGIONAL NORDESTE I": [
    "Divisão Tianguá",
    "Divisão Ibiapina",
    "Divisão Monsenhor Tabosa",
    "Divisão Sobral",
    "Divisão Jijoca",
    "Divisão Parnaíba",
    "Divisão Teresina"
  ],
  "REGIONAL NORDESTE VI": [
    "Divisão São Luis",
    "Divisão Barreirinhas",
    "Divisão Paço do Lumiar",
    "Divisão São José de Ribamar",
    "Divisão Santa Inês",
    "Divisão Raposa"
  ],
  "REGIONAL BRASNORTE": [
    "Divisão Brasnorte",
    "Divisão Campo Novo do Parecis",
    "Divisão Juína",
    "Divisão Juara",
    "Divisão Colniza"
  ],
  "REGIONAL CUIABÁ": [
    "Divisão Cuiabá",
    "Divisão Tangará da Serra",
    "Divisão Várzea Grande",
    "Divisão Barra do Garças",
    "Divisão Rondonópolis"
  ],
  "REGIONAL SINOP": [
    "Divisão Sinop",
    "Divisão Alta Floresta",
    "Divisão Lucas do Rio Verde",
    "Divisão Sorriso",
    "Divisão Nova Mutum",
    "Divisão Colider",
    "Divisão Sorriso Centro",
    "Divisão Ipiranga do Norte",
    "Divisão Apiacás",
    "Divisão Sinop Centro",
    "Divisão Guarantã do Norte",
    "Divisão Terra Nova"
  ],
  "REGIONAL CAMPO GRANDE": [
    "Divisão Campo Grande",
    "Divisão Aquidauana",
    "Divisão Campo Grande Norte",
    "Divisão Campo Grande Centro",
    "Divisão Campo Grande Sul",
    "Divisão Campo Grande Leste",
    "Divisão Campo Grande Oeste",
    "Divisão Ribas do Rio Pardo",
    "Divisão Sidrolândia",
    "Divisão Maracaju",
    "Divisão São Gabriel do Oeste"
  ],
  "REGIONAL DOURADOS": [
    "Divisão Dourados",
    "Divisão Nova Andradina",
    "Divisão Itaporã",
    "Divisão Amambai",
    "Divisão Ivinhema",
    "Divisão Naviraí",
    "Divisão Dourados Sul",
    "Divisão Fátima do Sul",
    "Divisão Douradina"
  ],
  "REGIONAL GUAICURUS": [
    "Divisão Chapadão do Sul",
    "Divisão Inocência",
    "Divisão Cassilândia",
    "Divisão Paranaíba",
    "Divisão Costa Rica",
    "Divisão Chapadão do Céu"
  ],
  "REGIONAL JARDIM": [
    "Divisão Corumbá",
    "Divisão Ponta Porã",
    "Divisão Bonito",
    "Divisão Jardim",
    "Divisão Ladário"
  ],
  "REGIONAL TRÊS LAGOAS": [
    "Divisão Três Lagoas Sul",
    "Divisão Água Clara",
    "Divisão Selvíria",
    "Divisão Bataguassu",
    "Divisão Três Lagoas Norte",
    "Divisão Três Lagoas Oeste",
    "Divisão Aparecida do Taboado",
    "Divisão Três Lagoas Leste"
  ],
  "REGIONAL ARAXÁ": [
    "Divisão Araxá Sul",
    "Divisão Patrocinio",
    "Divisão Ibiá",
    "Divisão Rio Paranaíba",
    "Divisão Pratinha",
    "Divisão Araxá Norte",
    "Divisão Sacramento"
  ],
  "REGIONAL BAMBUÍ": [
    "Divisão Bambui",
    "Divisão Lagoa da Prata",
    "Divisão Medeiros",
    "Divisão Luz",
    "Divisão Santa Rosa da Serra",
    "Divisão Campos Altos",
    "Divisão Moema"
  ],
  "REGIONAL BELO HORIZONTE": [
    "Divisão Belo Horizonte",
    "Divisão Betim",
    "Divisão Belo Horizonte Norte",
    "Divisão Igarapé",
    "Divisão Ibirité",
    "Divisão Betim Leste"
  ],
  "REGIONAL BELO HORIZONTE 2": [
    "Divisão Venda Nova",
    "Divisão Barreiro",
    "Divisão Ribeirão das Neves",
    "Divisão Pedro Leopoldo",
    "Divisão Contagem",
    "Divisão Sabará",
    "Divisão Contagem Sul",
    "Divisão Santa Luzia",
    "Divisão Esmeraldas",
    "Divisão Caeté"
  ],
  "REGIONAL CAMPOS DAS VERTENTES": [
    "Divisão Ubá",
    "Divisão Muriae",
    "Divisão Cataguases",
    "Divisão Barbacena Norte",
    "Divisão Barbacena Sul",
    "Divisão São João del Rei",
    "Divisão Rio Pomba",
    "Divisão Manhuaçu",
    "Divisão Lajinha",
    "Divisão Astolfo Dutra"
  ],
  "REGIONAL CENTRO OESTE DE MINAS": [
    "Divisão Formiga",
    "Divisão Campo Belo",
    "Divisão Arcos Norte",
    "Divisão Bom Despacho",
    "Divisão Santo Antônio do Monte",
    "Divisão Iguatama",
    "Divisão Cana Verde",
    "Divisão Arcos Centro",
    "Divisão Araújos",
    "Divisão Itapecerica"
  ],
  "REGIONAL EXTREMA": [
    "Divisão Camanducaia",
    "Divisão Extrema",
    "Divisão Cambuí",
    "Divisão Toledo",
    "Divisão Vargem"
  ],
  "REGIONAL JUIZ DE FORA": [
    "Divisão Juiz de Fora Sul",
    "Divisão Juiz de Fora Norte",
    "Divisão Juiz de Fora Oeste",
    "Divisão Juiz de Fora Leste",
    "Divisão Chácara",
    "Divisão Santana do Deserto",
    "Divisão Juiz de Fora Centro"
  ],
  "REGIONAL LAVRAS": [
    "Divisão Lavras",
    "Divisão Três Pontas",
    "Divisão Campos Gerais",
    "Divisão Santo Antônio do Ampar",
    "Divisão Alfenas"
  ],
  "REGIONAL NORTE DE MINAS": [
    "Divisão Curvelo Centro",
    "Divisão Montes Claros",
    "Divisão Sete Lagoas",
    "Divisão Pirapora",
    "Divisão Curvelo Sul",
    "Divisão Januária",
    "Divisão Capelinha",
    "Divisão Felixlândia",
    "Divisão Inimutaba",
    "Divisão Corinto",
    "Divisão Turmalina",
    "Divisão Janaúba"
  ],
  "REGIONAL OESTE DE MINAS": [
    "Divisão Divinópolis",
    "Divisão Pará de Minas",
    "Divisão Betim Oeste",
    "Divisão Itaúna",
    "Divisão Papagaios",
    "Divisão Nova Serrana",
    "Divisão Mateus Leme",
    "Divisão Cláudio"
  ],
  "REGIONAL PASSOS": [
    "Divisão Guaxupé",
    "Divisão Piumhi",
    "Divisão Passos",
    "Divisão Pimenta",
    "Divisão Conceição da Aparecida",
    "Divisão Capitólio",
    "Divisão São Sebastião do Parai"
  ],
  "REGIONAL PATOS DE MINAS": [
    "Divisão João Pinheiro",
    "Divisão Patos de Minas",
    "Divisão Presidente Olegário",
    "Divisão Varjão de Minas",
    "Divisão Vazante",
    "Divisão Lagoa Formosa",
    "Divisão Três Marias"
  ],
  "REGIONAL POUSO ALEGRE": [
    "Divisão Santa Rita do Sapucaí",
    "Divisão Itajuba",
    "Divisão Pouso Alegre Centro",
    "Divisão Paraisópolis",
    "Divisão Borda da Mata",
    "Divisão Pouso Alegre Sul",
    "Divisão Congonhal"
  ],
  "REGIONAL TRIANGULO MINEIRO I": [
    "Divisão Monte Carmelo",
    "Divisão Araguari Sul",
    "Divisão Uberlândia Norte",
    "Divisão Santa Juliana",
    "Divisão Araguari Norte",
    "Divisão Uberlândia Leste"
  ],
  "REGIONAL TRIÂNGULO MINEIRO II": [
    "Divisão Uberlândia Sul",
    "Divisão Ituiutaba",
    "Divisão Monte Alegre de Minas",
    "Divisão Prata",
    "Divisão Capinópolis",
    "Divisão Uberlândia Oeste",
    "Divisão Campina Verde"
  ],
  "REGIONAL UBERABA": [
    "Divisão Uberaba Norte",
    "Divisão Frutal",
    "Divisão Uberaba Sul",
    "Divisão Conceição das Alagoas"
  ],
  "REGIONAL VALE DO AÇO": [
    "Divisão Ipatinga",
    "Divisão João Monlevade",
    "Divisão Coronel Fabriciano",
    "Divisão Governador Valadares",
    "Divisão Médio Piracicaba",
    "Divisão Guanhães"
  ],
  "REGIONAL VARGINHA": [
    "Divisão Varginha Centro",
    "Divisão São Lourenço",
    "Divisão Aiuruoca",
    "Divisão São Thomé das Letras",
    "Divisão Varginha Sul",
    "Divisão Caxambu",
    "Divisão Varginha Norte"
  ],
  "REGIONAL ZONA DA MATA": [
    "Divisão Congonhas",
    "Divisão Conselheiro Lafaiete",
    "Divisão Carandaí",
    "Divisão Ouro Preto",
    "Divisão Mariana",
    "Divisão Ouro Branco"
  ],
  "REGIONAL BELÉM": [
    "Divisão Belém Norte",
    "Divisão Belém Sul",
    "Divisão Paragominas",
    "Divisão Castanhal",
    "Divisão Belém Leste"
  ],
  "REGIONAL CARAJÁS": [
    "Divisão Marabá",
    "Divisão Parauapebas",
    "Divisão Redenção",
    "Divisão Canaã dos Carajás",
    "Divisão Tucuruí",
    "Divisão Curionópolis"
  ],
  "REGIONAL SANTARÉM": [
    "Divisão Santarém",
    "Divisão Belterra",
    "Divisão Alter do Chão",
    "Divisão Mojui Dos Campos",
    "Divisão Itaituba",
    "Divisão Uruará",
    "Divisão Altamira"
  ],
  "REGIONAL PARAÍBA": [
    "Divisão João Pessoa",
    "Divisão Monteiro",
    "Divisão Conde",
    "Divisão Santa Rita",
    "Divisão Alto Oeste"
  ],
  "REGIONAL CAMPO LARGO": [
    "Divisão Campo Largo Oeste",
    "Divisão Campo Magro Sul",
    "Divisão Tanguá",
    "Divisão Campo Largo Norte",
    "Divisão Campo Largo Sul",
    "Divisão Curitiba Sul",
    "Divisão Campo Largo Leste",
    "Divisão Campo Magro Norte",
    "Divisão Campo Magro Leste"
  ],
  "REGIONAL CAMPOS GERAIS": [
    "Divisão Jaguariaiva",
    "Divisão Siqueira Campos",
    "Divisão Telemaco Borba",
    "Divisão Reserva",
    "Divisão Arapoti",
    "Divisão Reserva II",
    "Divisão Joaquim Távora",
    "Divisão Wenceslau Braz"
  ],
  "REGIONAL CAMPOS GERAIS II": [
    "Divisão Ponta Grossa",
    "Divisão Palmeira",
    "Divisão Guarapuava",
    "Divisão Witmarsum",
    "Divisão Castro"
  ],
  "REGIONAL CURITIBA I SUL": [
    "Divisão Curitiba Sul",
    "Divisão São José dos Pinhais S",
    "Divisão Curitiba Leste",
    "Divisão Curitiba Extremo Sul",
    "Divisão São José dos Pinhais N",
    "Divisão Curitiba Norte",
    "Divisão Curitiba Oeste",
    "Divisão São José dos Pinhais L",
    "Divisão São José dos Pinhais O"
  ],
  "REGIONAL CURITIBA II NORTE": [
    "Divisão Almirante Tamandaré",
    "Divisão Curitiba Norte II",
    "Divisão Tranqueira",
    "Divisão Rio Branco do Sul",
    "Divisão Curitiba Centro II",
    "Divisão Curitiba Extremo Norte",
    "Divisão Curitiba Noroeste II",
    "Divisão Curitiba Leste II",
    "Divisão Curitiba Sul II",
    "Divisão Curitiba Extremo Sul I",
    "Divisão Curitiba Oeste II",
    "Divisão Almirante Tamandaré II"
  ],
  "REGIONAL CURITIBA III": [
    "Divisão Araucária Sul",
    "Divisão Bateias",
    "Divisão Curitiba III Oeste",
    "Divisão Curitiba III Sul",
    "Divisão Araucária Norte",
    "Divisão Curitiba III Extremo O",
    "Divisão Curitiba III Sudeste",
    "Divisão Araucária Leste",
    "Divisão Curitiba III Extremo S"
  ],
  "REGIONAL CURITIBA V": [
    "Divisão Pinhais Sul",
    "Divisão Piraquara",
    "Divisão Colombo",
    "Divisão Quatro Barras",
    "Divisão Bocaiúva do Sul",
    "Divisão Pinhais Norte",
    "Divisão Curitiba Extremo Leste"
  ],
  "REGIONAL FAZENDA RIO GRANDE": [
    "Divisão Fazenda Rio Grande Nor",
    "Divisão Fazenda Rio Grande Sul",
    "Divisão Curitiba Extremo Oeste",
    "Divisão Fazenda Rio Grande Les",
    "Divisão Fazenda Rio Grande Oes",
    "Divisão Curitiba Sudeste VI",
    "Divisão Fazenda Rio Grande Cen"
  ],
  "REGIONAL LITORAL DO PARANÁ": [
    "Divisão Paranaguá",
    "Divisão Guaratuba",
    "Divisão Pontal do Paraná Sul",
    "Divisão Morretes",
    "Divisão Matinhos Sul",
    "Divisão Antonina",
    "Divisão Pontal do Paraná Norte",
    "Divisão Matinhos Norte",
    "Divisão Paranaguá Sul",
    "Divisão Guaratuba Norte"
  ],
  "REGIONAL LONDRINA": [
    "Divisão Londrina",
    "Divisão Londrina Norte",
    "Divisão Bandeirantes",
    "Divisão Londrina Sul",
    "Divisão Londrina Oeste",
    "Divisão Mauá da Serra"
  ],
  "REGIONAL MARINGÁ": [
    "Divisão Maringá Sul",
    "Divisão Sarandi",
    "Divisão Maringá Norte",
    "Divisão Mandaguari",
    "Divisão Maringá Oeste",
    "Divisão Maringá Leste",
    "Divisão Floresta",
    "Divisão Marialva",
    "Divisão Santo Inácio"
  ],
  "REGIONAL NORTE DO PARANÁ": [
    "Divisão Umuarama Oeste",
    "Divisão Campo Mourão Norte",
    "Divisão Cianorte",
    "Divisão Cidade Gaúcha",
    "Divisão Umuarama Leste",
    "Divisão Campo Mourão Sul",
    "Divisão Goioerê",
    "Divisão Peabiru"
  ],
  "REGIONAL OESTE DO PARANÁ": [
    "Divisão Foz do Iguaçu",
    "Divisão Cascavel Norte",
    "Divisão Santa Terezinha de Ita",
    "Divisão Toledo",
    "Divisão Marechal Cândido Rondo",
    "Divisão Cascavel Sul",
    "Divisão Medianeira"
  ],
  "REGIONAL SUDOESTE DO PARANÁ": [
    "Divisão Pato Branco",
    "Divisão Francisco Beltrão",
    "Divisão Coronel Vivida",
    "Divisão Itapejara",
    "Divisão Clevelândia",
    "Divisão Ampére",
    "Divisão Palmas"
  ],
  "REGIONAL VALE DO CAFÉ": [
    "Divisão Cambé",
    "Divisão Arapongas",
    "Divisão Apucarana",
    "Divisão Apucarana Sul",
    "Divisão Londrina Leste",
    "Divisão Barra do Piraí",
    "Divisão Miguel Pereira",
    "Divisão Paracambi",
    "Divisão Japeri",
    "Divisão Paty do Alferes",
    "Divisão Seropédica",
    "Divisão Japeri Centro",
    "Divisão Mendes",
    "Divisão Paulo de Frontin",
    "Divisão Lages",
    "Divisão Valença",
    "Divisão Vassouras"
  ],
  "REGIONAL VALE DO IVAÍ": [
    "Divisão Terra Rica",
    "Divisão Santa Cruz de Monte Ca",
    "Divisão São Carlos do Ivaí",
    "Divisão Paranavaí Norte",
    "Divisão Alto Paraná",
    "Divisão Paranavaí Sul",
    "Divisão Nova Esperança"
  ],
  "REGIONAL VALE DOS TROPEIROS": [
    "Divisão União da Vitória",
    "Divisão São Mateus do Sul",
    "Divisão Lapa",
    "Divisão Mariental",
    "Divisão Porto Amazonas",
    "Divisão Campo Tenente",
    "Divisão Cruz Machado"
  ],
  "REGIONAL AGRESTE": [
    "Divisão Caruaru Centro",
    "Divisão Garanhuns",
    "Divisão Caruaru Leste",
    "Divisão Vitória de Santo Antão",
    "Divisão Bezerros",
    "Divisão Toritama",
    "Divisão Gravatá Centro",
    "Divisão Lajedo",
    "Divisão Caruaru Norte",
    "Divisão Santa Cruz",
    "Divisão Gravatá Norte",
    "Divisão Carpina"
  ],
  "REGIONAL RECIFE I": [
    "Divisão Recife Centro",
    "Divisão Jaboatão dos Guararape",
    "Divisão Recife Sul",
    "Divisão Litoral Sul",
    "Divisão Ribeirão",
    "Divisão Jaboatão Sul"
  ],
  "REGIONAL RECIFE II": [
    "Divisão Olinda",
    "Divisão Camaragibe",
    "Divisão Recife Norte",
    "Divisão Recife Oeste",
    "Divisão Paulista"
  ],
  "REGIONAL SERTÃO": [
    "Divisão Brejinho",
    "Divisão Afogados da Ingazeira",
    "Divisão Araripina",
    "Divisão Petrolina Centro",
    "Divisão Arcoverde",
    "Divisão Ouricuri",
    "Divisão Triunfo",
    "Divisão Petrolina Norte"
  ],
  "REGIONAL PIAUI SUL": [
    "Divisão Bom Jesus",
    "Divisão Cristino Castro",
    "Divisão Uruçuí",
    "Divisão Palmeira do Piauí",
    "Divisão Canto do Buriti"
  ],
  "REGIONAL BAIXADA FLUMINENSE I": [
    "Divisão Nilópolis Sul",
    "Divisão Mesquita",
    "Divisão Nova Iguaçu",
    "Divisão São João de Meriti",
    "Divisão Sul Baixada",
    "Divisão Centro Baixada",
    "Divisão Queimados",
    "Divisão Nilópolis Centro",
    "Divisão Miguel Couto",
    "Divisão São João de Meriti Nor",
    "Divisão Mesquita Norte",
    "Divisão Vila de Cava"
  ],
  "REGIONAL BAIXADA FLUMINENSE II": [
    "Divisão Belford Roxo",
    "Divisão Caxias Centro",
    "Divisão Piabetá",
    "Divisão Santa Cruz da Serra",
    "Divisão Xerém",
    "Divisão Magé",
    "Divisão Caxias Sul",
    "Divisão Guapimirim",
    "Divisão Belford Roxo Centro",
    "Divisão Saracuruna",
    "Divisão Caxias Norte",
    "Divisão Mauá",
    "Divisão Caxias Leste",
    "Divisão Duque de Caxias"
  ],
  "REGIONAL CAMPOS DOS GOYTACAZES": [
    "Divisão Campos Dos Goytacazes",
    "Divisão São Fidelis",
    "Divisão Bom Jesus do Itabapoan",
    "Divisão Macaé",
    "Divisão Itaperuna",
    "Divisão São João da Barra",
    "Divisão São Francisco de Itaba",
    "Divisão Italva",
    "Divisão Santo Antônio de Pádua",
    "Divisão Farol de São Tomé",
    "Divisão Itaperuna Sul",
    "Divisão Miracema",
    "Divisão Porciúncula"
  ],
  "REGIONAL COSTA VERDE": [
    "Divisão Angra dos Reis",
    "Divisão Itaguaí",
    "Divisão Mangaratiba",
    "Divisão Costa Verde Oeste",
    "Divisão Mambucaba",
    "Divisão Santa Cruz",
    "Divisão Lidice",
    "Divisão Sepetiba",
    "Divisão Muriqui",
    "Divisão Angra Leste"
  ],
  "REGIONAL LAGOS": [
    "Divisão Arraial do Cabo",
    "Divisão Cabo Frio",
    "Divisão Buzios",
    "Divisão Rio das Ostras",
    "Divisão Araruama",
    "Divisão Saquarema",
    "Divisão São Pedro da Aldeia",
    "Divisão Unamar",
    "Divisão Iguaba Grande"
  ],
  "REGIONAL LESTE FLUMINENSE": [
    "Divisão São Gonçalo Norte",
    "Divisão Maricá Leste",
    "Divisão Itaboraí",
    "Divisão Itaipuaçu",
    "Divisão Rio Bonito",
    "Divisão Manilha",
    "Divisão São Gonçalo Sul",
    "Divisão Maricá Oeste",
    "Divisão São Gonçalo Centro",
    "Divisão Itaipuaçu II",
    "Divisão Silva Jardim"
  ],
  "REGIONAL NITEROI": [
    "Divisão Niterói Centro",
    "Divisão Niterói Sul",
    "Divisão Oceânica",
    "Divisão Niterói Norte",
    "Divisão Niterói Leste",
    "Divisão Niterói Oeste",
    "Divisão Oceânica III",
    "Divisão Oceânica II"
  ],
  "REGIONAL RIO DE JANEIRO - RJ1": [
    "Divisão Centro - RJ1",
    "Divisão Tijuca - RJ1",
    "Divisão Bonsucesso - RJ1",
    "Divisão Penha - RJ1",
    "Divisão Copacabana - RJ1",
    "Divisão Ilha do Governador",
    "Divisão Méier - RJ1",
    "Divisão Maracanã",
    "Divisão Suburbana -RJ1",
    "Divisão Cachambi - RJ1",
    "Divisão Galeão - RJ1",
    "Divisão Leblon - RJ1",
    "Divisão Ribeira - RJ1",
    "Divisão Imperial - RJ1"
  ],
  "REGIONAL RIO DE JANEIRO - RJ2": [
    "Divisão Mendanha - RJ2",
    "Divisão Rio do A - RJ2",
    "Divisão Paciência - RJ2",
    "Divisão Rio da Prata - RJ2",
    "Divisão Guaratiba - RJ2",
    "Divisão Bangu - RJ2",
    "Divisão Mato Alto - RJ2",
    "Divisão Inhoaíba",
    "Divisão Padre Miguel - RJ2",
    "Divisão Campo Grande - RJ2",
    "Divisão Barra de Guaratiba",
    "Divisão Magalhães Bastos - RJ2",
    "Divisão Campinho - RJ2"
  ],
  "REGIONAL RIO DE JANEIRO - RJ3": [
    "Divisão Vila Valqueire - RJ3",
    "Divisão Inhaúma - RJ3",
    "Divisão Vila Militar - RJ3",
    "Divisão Madureira - RJ3",
    "Divisão Irajá - RJ3",
    "Divisão Sulacap - RJ3",
    "Divisão Penha Circular - RJ3",
    "Divisão Piedade - RJ3",
    "Divisão Pavuna - RJ3"
  ],
  "REGIONAL RIO DE JANEIRO - RJ4": [
    "Divisão Oeste RJ4",
    "Divisão Recreio RJ4",
    "Divisão Curicica - RJ4",
    "Divisão Barra RJ4",
    "Divisão Taquara RJ4",
    "Divisão Gardênia RJ4"
  ],
  "REGIONAL SERRANA": [
    "Divisão Petrópolis Centro",
    "Divisão Petrópolis Norte",
    "Divisão Nova Friburgo",
    "Divisão Cachoeiras de Macacu",
    "Divisão Teresópolis",
    "Divisão Rio das Flores",
    "Divisão Sumidouro",
    "Divisão Areal",
    "Divisão Três Rios",
    "Divisão Bom Jardim",
    "Divisão Nova Friburgo Norte",
    "Divisão Paraíba do sul"
  ],
  "REGIONAL SUL FLUMINENSE": [
    "Divisão Barra Mansa",
    "Divisão Volta Redonda",
    "Divisão Resende",
    "Divisão Piraí",
    "Divisão Penedo",
    "Divisão Visconde de Mauá",
    "Divisão Pinheiral",
    "Divisão Volta Redonda Sul",
    "Divisão Porto Real",
    "Divisão Bananal",
    "Divisão Volta Redonda Oeste"
  ],
  "REGIONAL NORDESTE III": [
    "Divisão Natal",
    "Divisão Parnamirim",
    "Divisão Mossoró",
    "Divisão Ceará-Mirim"
  ],
  "REGIONAL PASSO FUNDO": [
    "Divisão Maximiliano de Almeida",
    "Divisão Passo Fundo Sul",
    "Divisão Maraú",
    "Divisão Passo Fundo Norte"
  ],
  "REGIONAL PORTO ALEGRE": [
    "Divisão Porto Alegre",
    "Divisão Alvorada",
    "Divisão Porto Alegre Sul",
    "Divisão Porto Alegre Norte",
    "Divisão Litoral Gaúcho",
    "Divisão Extremo Sul",
    "Divisão Vale dos Sinos",
    "Divisão Carbonífera",
    "Divisão Vale do Gravataí"
  ],
  "REGIONAL SANTA MARIA": [
    "Divisão Santa Maria",
    "Divisão Três Passos",
    "Divisão Fronteira Oeste",
    "Divisão Tupanciretã",
    "Divisão São Gabriel",
    "Divisão Sant'Ana do Livramento",
    "Divisão Itaara",
    "Divisão Alegrete",
    "Divisão Horizontina"
  ],
  "REGIONAL SERRA GAUCHA": [
    "Divisão Santa Cruz do Sul",
    "Divisão Bento Gonçalves",
    "Divisão Caxias do Sul",
    "Divisão Hortênsias"
  ],
  "REGIONAL RONDÔNIA": [
    "Divisão Ariquemes",
    "Divisão Porto Velho",
    "Divisão Cacoal",
    "Divisão Pimenta Bueno",
    "Divisão Vilhena",
    "Divisão Jí-Paraná"
  ],
  "REGIONAL RORAIMA": [
    "Divisão Boa Vista Sul",
    "Divisão Boa Vista Norte",
    "Divisão Boa Vista Oeste",
    "Divisão Boa Vista Leste",
    "Divisão Boa Vista Centro",
    "Divisão Rorainópolis",
    "Divisão Rorainópolis II"
  ],
  "REGIONAL CHAPECÓ": [
    "Divisão Passo Fundo",
    "Divisão Norte Gaúcho",
    "Divisão São Lourenço do Oeste",
    "Divisão Chapecó",
    "Divisão Ponte Serrada",
    "Divisão Xanxerê",
    "Divisão Oeste Catarinense"
  ],
  "REGIONAL CONCÓRDIA": [
    "Divisão Concórdia",
    "Divisão Caçador",
    "Divisão Videira"
  ],
  "REGIONAL FLORIANOPOLIS": [
    "Divisão Florianopolis",
    "Divisão Criciúma",
    "Divisão Tubarão",
    "Divisão Palhoça",
    "Divisão São José",
    "Divisão Passo de Torres"
  ],
  "REGIONAL LITORAL LESTE": [
    "Divisão Balneário Camboriú",
    "Divisão Brusque",
    "Divisão Camboriú",
    "Divisão Balneário Camboriú Sul",
    "Divisão Camboriú Sul"
  ],
  "REGIONAL LITORAL NORTE": [
    "Divisão São Fco do Sul",
    "Divisão Joinville",
    "Divisão Araquari",
    "Divisão Joinville Norte",
    "Divisão Itapoá",
    "Divisão Joinville Leste",
    "Divisão Itapoa Norte",
    "Divisão Ubatuba",
    "Divisão São Sebastião Norte 1",
    "Divisão Caraguatatuba Sul",
    "Divisão Ilhabela",
    "Divisão Caraguatatuba Norte",
    "Divisão São Sebastião Sul",
    "Divisão Caraguatatuba Centro",
    "Divisão São Sebastião Centro",
    "Divisão São Sebastião Norte 2"
  ],
  "REGIONAL LITORAL SUL": [
    "Divisão Tijucas",
    "Divisão Itapema",
    "Divisão Bombinhas",
    "Divisão Porto Belo"
  ],
  "REGIONAL PLANALTO NORTE": [
    "Divisão Jaraguá do Sul",
    "Divisão Guaramirim",
    "Divisão Canoinhas",
    "Divisão Rio Negrinho",
    "Divisão Mafra",
    "Divisão São Bento do Sul",
    "Divisão Schroeder",
    "Divisão Porto União",
    "Divisão Campo Alegre",
    "Divisão Corupá"
  ],
  "REGIONAL VALE DO ITAJAÍ": [
    "Divisão Itajaí Leste",
    "Divisão Penha",
    "Divisão Navegantes",
    "Divisão Barra Velha",
    "Divisão Balneário Piçarras",
    "Divisão Itajaí Oeste",
    "Divisão Ilhota"
  ],
  "REGIONAL VALE EUROPEU": [
    "Divisão Blumenau",
    "Divisão Alto Vale",
    "Divisão Indaial"
  ],
  "REGIONAL ABC1": [
    "Divisão São Bernardo do Campo",
    "Divisão Riacho Grande"
  ],
  "REGIONAL ABC2": [
    "Divisão Santo André Centro",
    "Divisão Santo André Sul",
    "Divisão Santo André Extremo No",
    "Divisão Santo André Extremo Su",
    "Divisão Santo André Norte",
    "Divisão Santo André Oeste",
    "Divisão Santo André Leste"
  ],
  "REGIONAL ABC3": [
    "Divisão Mauá Centro - ABC3",
    "Divisão Mauá Oeste - ABC3",
    "Divisão Mauá Sul - ABC3",
    "Divisão Mauá Norte - ABC3",
    "Divisão Mauá Leste - ABC3",
    "Divisão Mauá Extremo Leste",
    "Divisão Mauá Extremo Sul",
    "Divisão Mauá Extremo Oeste",
    "Divisão Mauá Extremo Norte"
  ],
  "REGIONAL ABC4": [
    "Divisão Ribeirão Pires Centro",
    "Divisão Rio Grande da Serra",
    "Divisão Paranapiacaba",
    "Divisão Ribeirão Pires Sul",
    "Divisão Ribeirão Pires Norte",
    "Divisão Ribeirão Pires Leste"
  ],
  "REGIONAL ABC5": [
    "Divisão Santo André Oeste",
    "Divisão Santo André Leste",
    "Divisão Santo André Norte",
    "Divisão Santo André Extremo Oe",
    "Divisão Santo André Extremo Le",
    "Divisão Santo André Extremo No",
    "Divisão Santo André Centro",
    "Divisão Santo André Sul"
  ],
  "REGIONAL ABC6": [
    "Divisão São Caetano do Sul Sul",
    "Divisão São Caetano do Sul Cen",
    "Divisão São Caetano do Sul Les",
    "Divisão São Caetano do Sul Oes"
  ],
  "REGIONAL ABC7": [
    "Divisão Diadema Sul",
    "Divisão Diadema Norte",
    "Divisão Diadema Leste",
    "Divisão Diadema Oeste"
  ],
  "REGIONAL ALTO DO TIETÊ 1": [
    "Divisão Suzano",
    "Divisão Ferraz de Vasconcelos",
    "Divisão Poá",
    "Divisão Suzano Sul",
    "Divisão Poá Sul"
  ],
  "REGIONAL ALTO DO TIETÊ 2": [
    "Divisão Biritiba Mirim",
    "Divisão Guararema",
    "Divisão Mogi das Cruzes Centro",
    "Divisão Mogi das Cruzes Oeste",
    "Divisão Sabaúna",
    "Divisão Mogi das Cruzes Sul",
    "Divisão Mogi das Cruzes Norte",
    "Divisão Mogi das Cruzes Extrem",
    "Divisão Mogi das Cruzes Leste"
  ],
  "REGIONAL ALTO DO TIETÊ 3": [
    "Divisão Itaquaquecetuba",
    "Divisão Arujá",
    "Divisão Santa Isabel",
    "Divisão Itaquaquecetuba Sul",
    "Divisão Igaratá",
    "Divisão Itaquaquecetuba Leste",
    "Divisão Arujá Norte"
  ],
  "REGIONAL AMERICANA": [
    "Divisão Santa Bárbara d'Oeste",
    "Divisão Americana",
    "Divisão Cosmópolis",
    "Divisão Artur Nogueira",
    "Divisão Holambra",
    "Divisão Americana Sul",
    "Divisão Engenheiro Coelho"
  ],
  "REGIONAL ANDRADINA": [
    "Divisão Castilho",
    "Divisão Ilha Solteira",
    "Divisão Andradina",
    "Divisão Pereira Barreto",
    "Divisão Murutinga do Sul",
    "Divisão Mirandópolis"
  ],
  "REGIONAL ARAÇATUBA": [
    "Divisão Birigui",
    "Divisão Araçatuba",
    "Divisão Valparaiso",
    "Divisão Penápolis",
    "Divisão Piacatu",
    "Divisão Luiziânia",
    "Divisão Buritama",
    "Divisão Coroados",
    "Divisão Guararapes"
  ],
  "REGIONAL ARARAQUARA": [
    "Divisão Araraquara",
    "Divisão Américo Brasiliense",
    "Divisão Matão",
    "Divisão Boa Esperança do Sul"
  ],
  "REGIONAL ARARAS": [
    "Divisão Leme",
    "Divisão Rio Claro",
    "Divisão Santa Gertrudes",
    "Divisão Araras"
  ],
  "REGIONAL AVARÉ": [
    "Divisão Manduri",
    "Divisão Avaré",
    "Divisão Cerqueira César",
    "Divisão Holambra II",
    "Divisão Paranapanema",
    "Divisão Taquarituba",
    "Divisão Itai",
    "Divisão Águas de Santa Bárbara"
  ],
  "REGIONAL BARUERI": [
    "Divisão Barueri Norte",
    "Divisão Barueri Centro",
    "Divisão Alphaville",
    "Divisão Barueri Sul",
    "Divisão Barueri Leste",
    "Divisão Alphaville II"
  ],
  "REGIONAL BAURU": [
    "Divisão Bauru",
    "Divisão Agudos",
    "Divisão Piratininga",
    "Divisão Pederneiras"
  ],
  "REGIONAL BOTUCATU": [
    "Divisão Botucatu",
    "Divisão Itatinga",
    "Divisão São Manuel",
    "Divisão Guareí",
    "Divisão Pratânia",
    "Divisão Botucatu Oeste",
    "Divisão Bofete",
    "Divisão São Manuel Centro",
    "Divisão Pardinho",
    "Divisão Torre de Pedra",
    "Divisão Aparecida de São Manue"
  ],
  "REGIONAL BRAGANÇA": [
    "Divisão Bragança Paulista Sul",
    "Divisão Bragança Paulista Cent",
    "Divisão Piracaia",
    "Divisão Tuiuti",
    "Divisão Pinhalzinho",
    "Divisão Atibaia Centro",
    "Divisão Morungaba",
    "Divisão Bragança Paulista Nort",
    "Divisão Nazaré Paulista",
    "Divisão Pedra Bela",
    "Divisão Joanópolis",
    "Divisão Bragança Paulista Lest",
    "Divisão Atibaia Sul",
    "Divisão Bom Jesus dos Perdões"
  ],
  "REGIONAL CAIEIRAS": [
    "Divisão Caieiras Norte",
    "Divisão Franco da Rocha Norte",
    "Divisão Franco da Rocha Sul",
    "Divisão Caieiras Sul",
    "Divisão Franco da Rocha Oeste",
    "Divisão Caieiras Oeste"
  ],
  "REGIONAL CAMPINAS": [
    "Divisão Campinas Centro",
    "Divisão Campinas Sul",
    "Divisão Campinas Oeste",
    "Divisão Campinas Sudoeste"
  ],
  "REGIONAL CAMPINAS II": [
    "Divisão Campinas Leste",
    "Divisão Campinas Norte",
    "Divisão Barão I",
    "Divisão Sousas"
  ],
  "REGIONAL CAPÃO REDONDO": [
    "Divisão Capao Redondo",
    "Divisão Campo Limpo",
    "Divisão Campo Limpo Leste",
    "Divisão Capão Redondo Leste"
  ],
  "REGIONAL CARAPICUÍBA": [
    "Divisão Carapicuíba Centro",
    "Divisão Carapicuíba Norte",
    "Divisão Carapicuíba Oeste",
    "Divisão Carapicuíba Sul",
    "Divisão Carapicuíba Leste"
  ],
  "REGIONAL CERQUILHO": [
    "Divisão Cerquilho",
    "Divisão Tietê",
    "Divisão Laranjal Paulista",
    "Divisão Capivari",
    "Divisão Iperó",
    "Divisão Rafard",
    "Divisão Conchas",
    "Divisão Capela do Alto",
    "Divisão Mombuca",
    "Divisão Cesário Lange",
    "Divisão Pereiras"
  ],
  "REGIONAL CIRCUITO DAS ÁGUAS": [
    "Divisão Amparo",
    "Divisão Serra Negra",
    "Divisão Aguas de Lindoia",
    "Divisão Socorro",
    "Divisão Lindoia",
    "Divisão Monte Alegre do Sul",
    "Divisão Monte Sião"
  ],
  "REGIONAL COTIA I": [
    "Divisão Granja Viana",
    "Divisão Cotia I Oeste",
    "Divisão Cotia I Centro",
    "Divisão Cotia I Sul"
  ],
  "REGIONAL COTIA II": [
    "Divisão Vargem Grande Paulista",
    "Divisão Caucaia do Alto Norte",
    "Divisão Cotia II Norte",
    "Divisão Caucaia do Alto Sul"
  ],
  "REGIONAL COTIA III": [
    "Divisão Cotia III Centro",
    "Divisão Cotia III Leste",
    "Divisão Cotia III Sul",
    "Divisão Cotia III Norte"
  ],
  "REGIONAL FRANCA": [
    "Divisão Cristais Paulista",
    "Divisão Franca",
    "Divisão Pedregulho",
    "Divisão Patrocínio Paulista",
    "Divisão Claraval"
  ],
  "REGIONAL FRANCISCO MORATO": [
    "Divisão Francisco Morato Centr",
    "Divisão Francisco Morato Leste",
    "Divisão Francisco Morato Oeste",
    "Divisão Francisco Morato Norte",
    "Divisão Francisco Morato Sul"
  ],
  "REGIONAL GUARULHOS I": [
    "Divisão Centro Gru I",
    "Divisão Leste Gru I",
    "Divisão Oeste Gru I",
    "Divisão Extremo Leste Gru I",
    "Divisão Sul Gru I",
    "Divisão Norte GRU I",
    "Divisão Extremo Oeste Gru I"
  ],
  "REGIONAL GUARULHOS II": [
    "Divisão Sul Gru II",
    "Divisão Norte Gru II",
    "Divisão Extremo Oeste Gru II",
    "Divisão Centro Gru II",
    "Divisão Extremo Norte Gru II",
    "Divisão Leste Gru II"
  ],
  "REGIONAL GUARULHOS III": [
    "Divisão Extremo Sul Gru III",
    "Divisão Extremo Norte Gru III",
    "Divisão Sul Gru III",
    "Divisão Leste Gru III",
    "Divisão Norte Gru III",
    "Divisão Centro Gru III",
    "Divisão Oeste Gru III",
    "Divisão Extremo Leste Gru III"
  ],
  "REGIONAL IBIÚNA": [
    "Divisão São Roque",
    "Divisão Ibiúna",
    "Divisão São Roque Norte",
    "Divisão Ibiúna Leste",
    "Divisão São Roque Leste",
    "Divisão São Roque Oeste"
  ],
  "REGIONAL ITAPECERICA DA SERRA": [
    "Divisão Itapecerica da Serra",
    "Divisão Embu das Artes Leste",
    "Divisão Embu das Artes Oeste",
    "Divisão Embu das Artes Centro",
    "Divisão Juquitiba",
    "Divisão Embu das Artes Norte"
  ],
  "REGIONAL ITAPETININGA": [
    "Divisão Tatuí",
    "Divisão Itapetininga Norte",
    "Divisão Alambari",
    "Divisão Capão Bonito",
    "Divisão Itapetininga Oeste",
    "Divisão Ribeirão Grande",
    "Divisão Guapiara",
    "Divisão Angatuba",
    "Divisão Sarapuí",
    "Divisão Itapetininga Centro",
    "Divisão Itapetininga Leste",
    "Divisão Itapetininga Sul"
  ],
  "REGIONAL ITAPEVA": [
    "Divisão Itapeva Norte",
    "Divisão Buri",
    "Divisão Itaberá",
    "Divisão Itararé Norte",
    "Divisão Taquarivaí",
    "Divisão Itapeva Sul",
    "Divisão Itararé Sul",
    "Divisão Itapeva Leste",
    "Divisão Ribeirão Branco"
  ],
  "REGIONAL ITAPEVI": [
    "Divisão Itapevi Centro",
    "Divisão Itapevi Norte",
    "Divisão Itapevi Sul",
    "Divisão Itapevi Oeste",
    "Divisão Itapevi Leste"
  ],
  "REGIONAL ITATIBA": [
    "Divisão Itatiba Sul",
    "Divisão Itatiba Norte",
    "Divisão Itatiba Centro",
    "Divisão Itatiba Leste"
  ],
  "REGIONAL ITU": [
    "Divisão Indaiatuba",
    "Divisão Itu",
    "Divisão Porto Feliz",
    "Divisão Boituva",
    "Divisão Salto",
    "Divisão Elias Fausto",
    "Divisão Salto Norte",
    "Divisão Indaiatuba Norte",
    "Divisão Indaiatuba Leste",
    "Divisão Itu Norte"
  ],
  "REGIONAL ITUVERAVA": [
    "Divisão Ituverava",
    "Divisão Guaíra",
    "Divisão Igarapava",
    "Divisão Ipuã",
    "Divisão Guará",
    "Divisão Miguelópolis",
    "Divisão Orlandia",
    "Divisão São Joaquim da Barra",
    "Divisão Nuporanga"
  ],
  "REGIONAL JABOTICABAL": [
    "Divisão Jaboticabal",
    "Divisão Guariba",
    "Divisão Ibitinga",
    "Divisão Bebedouro",
    "Divisão Taquaritinga",
    "Divisão Pitangueiras"
  ],
  "REGIONAL JANDIRA": [
    "Divisão Jandira Centro",
    "Divisão Jandira Norte",
    "Divisão Jandira Sul",
    "Divisão Jandira Oeste"
  ],
  "REGIONAL JARAGUÁ": [
    "Divisão Jaraguá",
    "Divisão Canta Galo",
    "Divisão Panamericano",
    "Divisão Aurora",
    "Divisão Taipas"
  ],
  "REGIONAL JAÚ": [
    "Divisão Bariri",
    "Divisão Jaú",
    "Divisão Brotas",
    "Divisão Itapuí"
  ],
  "REGIONAL JUNDIAÍ I": [
    "Divisão Jundiaí Oeste",
    "Divisão Jundiaí Leste",
    "Divisão Jundiaí Extremo Oeste",
    "Divisão Jundiaí Extremo Leste",
    "Divisão Jundiaí Oeste 2",
    "Divisão Jundiaí Centro Leste",
    "Divisão Jundiaí Noroeste"
  ],
  "REGIONAL JUNDIAÍ II": [
    "Divisão Jundiaí Sul",
    "Divisão Jundiaí Norte",
    "Divisão Jundiaí Centro",
    "Divisão Jundiaí Extremo Sul",
    "Divisão Jundiaí Extremo Norte",
    "Divisão Jundiaí II Centro Oest"
  ],
  "REGIONAL LENÇÓIS PAULISTA": [
    "Divisão Lençóis Paulista",
    "Divisão Barra Bonita",
    "Divisão Areiópolis",
    "Divisão Igaraçu do Tietê"
  ],
  "REGIONAL LIMEIRA": [
    "Divisão Limeira",
    "Divisão Cordeirópolis",
    "Divisão Iracemápolis",
    "Divisão Limeira Sul",
    "Divisão Limeira Norte",
    "Divisão Limeira Leste"
  ],
  "REGIONAL LITORAL SUL I": [
    "Divisão Praia Grande Centro",
    "Divisão São Vicente Centro",
    "Divisão São Vicente Norte",
    "Divisão Praia Grande Sul",
    "Divisão Praia Grande Norte",
    "Divisão São Vicente Sul"
  ],
  "REGIONAL LITORAL SUL II": [
    "Divisão Mongaguá",
    "Divisão Itanhaém",
    "Divisão Peruibe",
    "Divisão Itariri",
    "Divisão Pedro de Toledo"
  ],
  "REGIONAL LITORAL SUL III": [
    "Divisão Santos",
    "Divisão Cubatão Norte",
    "Divisão Guarujá",
    "Divisão Cubatão Sul",
    "Divisão Bertioga",
    "Divisão Santos Noroeste"
  ],
  "REGIONAL MAIRINQUE": [
    "Divisão Mairinque",
    "Divisão Alumínio",
    "Divisão Mairinque Norte",
    "Divisão Alumínio Norte",
    "Divisão Mairinque Leste",
    "Divisão Mairinque Sul",
    "Divisão Alumínio Leste",
    "Divisão Mairinque Oeste"
  ],
  "REGIONAL MAIRIPORÃ": [
    "Divisão Mairiporã",
    "Divisão Cantareira",
    "Divisão Terra Preta",
    "Divisão Santa Inês"
  ],
  "REGIONAL MARÍLIA": [
    "Divisão Marilia",
    "Divisão Tupã",
    "Divisão Promissão",
    "Divisão Lins",
    "Divisão Assis",
    "Divisão Duartina",
    "Divisão Cafelândia",
    "Divisão Vera Cruz"
  ],
  "REGIONAL MOCOCA": [
    "Divisão Casa Branca",
    "Divisão Caconde",
    "Divisão Mococa",
    "Divisão São José do Rio Pardo",
    "Divisão São Sebastião da Grama",
    "Divisão Tapiratiba"
  ],
  "REGIONAL MOGIANA": [
    "Divisão Mogi Mirim",
    "Divisão Mogi Guaçu",
    "Divisão Itapira Norte",
    "Divisão Espírito Santo do Pinh",
    "Divisão Jaguariúna",
    "Divisão Pedreira",
    "Divisão Estiva Gerbi",
    "Divisão Itapira Sul"
  ],
  "REGIONAL NORDESTE VII": [
    "Divisão Socorro",
    "Divisão Propriá",
    "Divisão Barra dos Coqueiros",
    "Divisão Aracaju",
    "Divisão Tobias Barreto",
    "Divisão Maceio Centro",
    "Divisão Arapiraca Centro",
    "Divisão São Miguel dos Campos",
    "Divisão Maceio Norte",
    "Divisão Arapiraca Norte",
    "Divisão Santana do Ipanema",
    "Divisão Rio Largo",
    "Divisão Bom Conselho"
  ],
  "REGIONAL OSASCO 1": [
    "Divisão Osasco 1 Centro",
    "Divisão Osasco 1 Leste",
    "Divisão Osasco 1 Extremo Sul",
    "Divisão Osasco 1 Extremo Oeste"
  ],
  "REGIONAL OSASCO 2": [
    "Divisão Osasco 2 Norte",
    "Divisão Osasco 2 Centro Velho",
    "Divisão Osasco 2 Oeste",
    "Divisão Extremo Leste OZ 2"
  ],
  "REGIONAL OSASCO 3": [
    "Divisão Osasco 3 Extremo Norte",
    "Divisão Osasco 3 Sul",
    "Divisão Osasco 3 Centro",
    "Divisão Osasco 3 Oeste",
    "Divisão Osasco 3 Norte",
    "Divisão Osasco 3 Extremo Oeste"
  ],
  "REGIONAL OSASCO 4": [
    "Divisão Sul OZ4",
    "Divisão Extremo Leste OZ4",
    "Divisão Oeste OZ4",
    "Divisão Norte OZ4"
  ],
  "REGIONAL OSASCO 5": [
    "Divisão Centro OZ 5",
    "Divisão Leste OZ 5",
    "Divisão Osasco 5 Extremo Oeste"
  ],
  "REGIONAL OURINHOS": [
    "Divisão Ribeirão Claro",
    "Divisão Ourinhos",
    "Divisão Santa Cruz do Rio Pard",
    "Divisão Piraju",
    "Divisão Salto Grande"
  ],
  "REGIONAL PERUS": [
    "Divisão Perus",
    "Divisão Cajamar Sul",
    "Divisão Morro Doce",
    "Divisão Cajamar Norte",
    "Divisão Jardim Canaã"
  ],
  "REGIONAL PIRACICABA": [
    "Divisão Piracicaba",
    "Divisão São Pedro",
    "Divisão Rio das Pedras",
    "Divisão Saltinho",
    "Divisão Charqueada",
    "Divisão Ipeúna",
    "Divisão Águas de São Pedro",
    "Divisão Piracicaba Norte",
    "Divisão Piracicaba Sul",
    "Divisão Piracicaba Leste"
  ],
  "REGIONAL PIRASSUNUNGA": [
    "Divisão Pirassununga",
    "Divisão Porto Ferreira",
    "Divisão São Carlos Sul",
    "Divisão Santa Cruz das Palmeir",
    "Divisão Tambaú",
    "Divisão Descalvado",
    "Divisão Santa Rita do Passa Qu",
    "Divisão São Carlos Norte"
  ],
  "REGIONAL PRESIDENTE PRUDENTE": [
    "Divisão Presidente Prudente",
    "Divisão Presidente Venceslau",
    "Divisão Tupi Paulista",
    "Divisão Dracena",
    "Divisão Pirapozinho",
    "Divisão Osvaldo Cruz",
    "Divisão Junqueirópolis",
    "Divisão Martinópolis"
  ],
  "REGIONAL RIBEIRÃO PRETO": [
    "Divisão Ribeirao Preto Centro",
    "Divisão Batatais",
    "Divisão Sertãozinho",
    "Divisão Cravinhos",
    "Divisão Ribeirão Preto Leste",
    "Divisão Ribeirão Preto Sul",
    "Divisão Ribeirão Preto Norte",
    "Divisão Ribeirão Preto Oeste",
    "Divisão Ribeirão Preto Bonfim"
  ],
  "REGIONAL SALTO DE PIRAPORA": [
    "Divisão São Miguel Arcanjo",
    "Divisão Araçoiaba da Serra",
    "Divisão Piedade",
    "Divisão Salto de Pirapora",
    "Divisão Pilar do Sul",
    "Divisão Tapiraí"
  ],
  "REGIONAL SANTANA DE PARNAIBA": [
    "Divisão Araçariguama",
    "Divisão Santana de Parnaíba Le",
    "Divisão Aldeia da Serra Sul",
    "Divisão Santana de Parnaíba Ce",
    "Divisão Pirapora do Bom Jesus",
    "Divisão Tamboré",
    "Divisão Aldeia da Serra Norte",
    "Divisão Colinas da Anhanguera",
    "Divisão Fazendinha"
  ],
  "REGIONAL SÃO JOÃO DA BOA VISTA": [
    "Divisão Aguaí",
    "Divisão São Joao da Boa Vista",
    "Divisão Vargem Grande do Sul",
    "Divisão Águas da Prata",
    "Divisão Poços de Caldas"
  ],
  "REGIONAL SÃO JOSÉ DO RIO PRETO": [
    "Divisão Fronteira",
    "Divisão São José do Rio Preto",
    "Divisão Olimpia",
    "Divisão Mirassol",
    "Divisão José Bonifácio",
    "Divisão Barretos",
    "Divisão Catanduva",
    "Divisão Guaraci",
    "Divisão Monte Aprazível"
  ],
  "REGIONAL SOROCABA": [
    "Divisão Sorocaba Oeste",
    "Divisão Votorantim",
    "Divisão Sorocaba Norte",
    "Divisão Sorocaba Centro",
    "Divisão Sorocaba Sul",
    "Divisão Sorocaba Aparecidinha",
    "Divisão Sorocaba Éden",
    "Divisão Votorantim Leste",
    "Divisão Brigadeiro Tobias",
    "Divisão Sorocaba Leste"
  ],
  "REGIONAL SP1": [
    "Divisão Extremo Norte - SP1",
    "Divisão Leste - SP1",
    "Divisão Extremo Sul - SP1",
    "Divisão Extremo Leste - SP1",
    "Divisão Centro - SP1"
  ],
  "REGIONAL SP10": [
    "Divisão Norte - SP10",
    "Divisão Extremo Norte - SP10",
    "Divisão Extremo Sul - SP10",
    "Divisão Leste - SP10",
    "Divisão Oeste - SP10",
    "Divisão Extremo Oeste - SP10",
    "Divisão Extremo Leste - SP10",
    "Divisão Centro - SP10",
    "Divisão Sul - SP10"
  ],
  "REGIONAL SP11": [
    "Divisão Sul - SP11",
    "Divisão Leste - SP11",
    "Divisão Extremo Sul - SP11",
    "Divisão Extremo Leste - SP11",
    "Divisão Norte - SP11",
    "Divisão Oeste - SP11",
    "Divisão Centro -SP11"
  ],
  "REGIONAL SP12": [
    "Divisão Extremo Leste - SP12",
    "Divisão Centro - SP12",
    "Divisão Extremo Sul - SP12",
    "Divisão Extremo Norte - SP12"
  ],
  "REGIONAL SP13": [
    "Divisão Oeste - SP13",
    "Divisão Leste - SP13",
    "Divisão Centro - SP13",
    "Divisão Norte - SP13",
    "Divisão Extremo Leste - SP13"
  ],
  "REGIONAL SP14": [
    "Divisão Oeste - SP14",
    "Divisão Sul - SP14",
    "Divisão Norte - Sp14",
    "Divisão Extremo Oeste - SP14",
    "Divisão Extremo Sul - SP14",
    "Divisão Leste - SP14"
  ],
  "REGIONAL SP15": [
    "Divisão Leste - SP15",
    "Divisão Norte - SP15",
    "Divisão Oeste - SP15",
    "Divisão Sul - SP15",
    "Divisão Extremo Norte - SP15"
  ],
  "REGIONAL SP16": [
    "Divisão São Luís - SP16",
    "Divisão Jardim Angela - SP16",
    "Divisão Guarapiranga - SP16",
    "Divisão Vila das Belezas - SP1"
  ],
  "REGIONAL SP17": [
    "Divisão Sul - SP17",
    "Divisão Oeste - SP17",
    "Divisão Centro - SP17",
    "Divisão Norte - SP17"
  ],
  "REGIONAL SP18": [
    "Divisão Norte - SP18",
    "Divisão Sul - SP18",
    "Divisão Leste - SP18",
    "Divisão Oeste - SP18",
    "Divisão Extremo Norte - SP18",
    "Divisão Extremo Sul - SP18",
    "Divisão Extremo Leste - SP18",
    "Divisão Extremo Oeste - SP18"
  ],
  "REGIONAL SP19": [
    "Divisão Norte - SP19",
    "Divisão Sul - SP19",
    "Divisão Leste - SP19",
    "Divisão Oeste - SP19",
    "Divisão Centro Velho - SP19"
  ],
  "REGIONAL SP2": [
    "Divisão Leste - SP2",
    "Divisão Sul - SP2",
    "Divisão Oeste - SP2",
    "Divisão Norte - SP2",
    "Divisão Centro - SP2"
  ],
  "REGIONAL SP20": [
    "Divisão Norte - SP20",
    "Divisão Sul - SP20",
    "Divisão Leste - SP20",
    "Divisão Oeste - SP20"
  ],
  "REGIONAL SP21": [
    "Divisão Norte - SP21",
    "Divisão Sul - SP21",
    "Divisão Leste SP21",
    "Divisão Oeste - SP21",
    "Divisão Extremo Norte - SP21"
  ],
  "REGIONAL SP22": [
    "Divisão Norte - SP22",
    "Divisão Sul - SP22",
    "Divisão Leste - SP22"
  ],
  "REGIONAL SP23": [
    "Divisão Sul - SP23",
    "Divisão Norte - SP23"
  ],
  "REGIONAL SP25": [
    "Divisão Leste - SP25",
    "Divisão Norte - SP25",
    "Divisão Sul - SP25",
    "Divisão Oeste - SP25"
  ],
  "REGIONAL SP26": [
    "Divisão Sul - SP26",
    "Divisão Norte - SP26"
  ],
  "REGIONAL SP3": [
    "Divisão Oeste - SP3",
    "Divisão Extremo Sul - SP3",
    "Divisão Sul - SP3",
    "Divisão Norte - SP3",
    "Divisão Leste - SP3",
    "Divisão Extremo Oeste - SP3",
    "Divisão Extremo Leste - SP3",
    "Divisão Extremo Norte - SP3",
    "Divisão Centro - SP3"
  ],
  "REGIONAL SP4": [
    "Divisão Oeste SP4",
    "Divisão Extremo Oeste SP4",
    "Divisão Extremo Norte SP4",
    "Divisão Norte SP4",
    "Divisão Leste SP4",
    "Divisão Sul SP4"
  ],
  "REGIONAL SP5": [
    "Divisão Norte - SP5",
    "Divisão Sul - SP5",
    "Divisão Oeste - SP5",
    "Divisão Extremo Sul - SP5",
    "Divisão Extremo Norte - SP5",
    "Divisão Extremo Oeste 1 - SP5",
    "Divisão Extremo Oeste 2 - SP5",
    "Divisão Extremo Leste 2 - SP5",
    "Divisão Extremo Leste - SP5"
  ],
  "REGIONAL SP6": [
    "Divisão Leste - SP6",
    "Divisão Sul - SP6",
    "Divisão Norte - SP6",
    "Divisão Oeste - SP6",
    "Divisão Extremo Norte - SP6",
    "Divisão Extremo Leste - SP6"
  ],
  "REGIONAL SP7": [
    "Divisão Parelheiros - SP7",
    "Divisão Interlagos - SP7",
    "Divisão Grajaú - SP7",
    "Divisão Embu-Guaçu - SP7",
    "Divisão Rio Bonito - SP7",
    "Divisão Pedreira - SP7",
    "Divisão Santo Amaro - SP7",
    "Divisão Cupecê - SP7"
  ],
  "REGIONAL SP8": [
    "Divisão Norte - SP8",
    "Divisão Sul - SP8",
    "Divisão Oeste - SP8",
    "Divisão Leste - SP8",
    "Divisão Centro - SP8",
    "Divisão Extremo Oeste - SP8",
    "Divisão Extremo Sul - SP8",
    "Divisão Extremo Norte - SP8",
    "Divisão Extremo Leste - SP8"
  ],
  "REGIONAL SP9": [
    "Divisão Norte - SP9",
    "Divisão Extremo Leste - SP9",
    "Divisão Centro - SP9",
    "Divisão Extremo Norte - SP9",
    "Divisão Sul - SP9",
    "Divisão Oeste - SP9",
    "Divisão Leste - SP9",
    "Divisão Extremo Oeste - SP9",
    "Divisão Extremo Sul - SP9"
  ],
  "REGIONAL SUMARÉ": [
    "Divisão Hortolandia",
    "Divisão Paulínia",
    "Divisão Sumaré",
    "Divisão Nova Odessa",
    "Divisão Monte Mor",
    "Divisão Sumaré II",
    "Divisão Hortolândia II"
  ],
  "REGIONAL TABOÃO DA SERRA": [
    "Divisão Taboão da Serra Leste",
    "Divisão Valo Velho",
    "Divisão Taboão da Serra Centro",
    "Divisão Taboão da Serra Oeste"
  ],
  "REGIONAL VALE DO PARAIBA I": [
    "Divisão São José dos Campos Su",
    "Divisão São José dos Campos No",
    "Divisão Caçapava",
    "Divisão São José dos Campos Le",
    "Divisão São José dos Campos Oe",
    "Divisão São José dos Campos Ce",
    "Divisão São José dos Campos Ex",
    "Divisão Paraibuna",
    "Divisão Caçapava II"
  ],
  "REGIONAL VALE DO PARAÍBA II": [
    "Divisão Campos do Jordão",
    "Divisão Taubaté",
    "Divisão Pindamonhangaba",
    "Divisão Tremembé",
    "Divisão Santo Antônio do Pinha",
    "Divisão Guaratinguetá",
    "Divisão Redenção da Serra",
    "Divisão Moreira Cesar",
    "Divisão Pindamonhangaba II",
    "Divisão Pindamonhangaba III",
    "Divisão Taubaté 2"
  ],
  "REGIONAL VALE DO PARAÍBA III": [
    "Divisão Jacareí Sul",
    "Divisão Jacareí Norte",
    "Divisão Jacareí Leste",
    "Divisão Jacareí Oeste",
    "Divisão Jacareí Centro",
    "Divisão Santa Branca",
    "Divisão Jacareí Extremo Sul"
  ],
  "REGIONAL VALE DO RIBEIRA": [
    "Divisão Iguape",
    "Divisão Apiaí",
    "Divisão Registro",
    "Divisão Eldorado",
    "Divisão Sete Barras",
    "Divisão Cajati",
    "Divisão Cananéia"
  ],
  "REGIONAL VARZEA PAULISTA": [
    "Divisão Várzea Paulista Sul",
    "Divisão Jarinu",
    "Divisão Campo Limpo Paulista N",
    "Divisão Varzea Paulista Centro",
    "Divisão Campo Limpo Paulista S",
    "Divisão Várzea Paulista Norte"
  ],
  "REGIONAL VINHEDO": [
    "Divisão Valinhos",
    "Divisão Itupeva",
    "Divisão Cabreuva",
    "Divisão Louveira Norte",
    "Divisão Vinhedo",
    "Divisão Louveira Sul"
  ],
  "REGIONAL VOTUPORANGA": [
    "Divisão Fernandópolis",
    "Divisão Votuporanga",
    "Divisão Santa Fé do Sul",
    "Divisão Três Fronteiras",
    "Divisão Iturama"
  ],
  "REGIONAL TOCANTINS": [
    "Divisão Palmas",
    "Divisão Araguaína",
    "Divisão Gurupi Sul",
    "Divisão Paraiso",
    "Divisão Gurupi Norte"
  ]
};

  var REGIONAIS = Object.keys(REGIONAIS_DIVISOES);

  global.REGIONAIS_DIVISOES = REGIONAIS_DIVISOES;
  global.REGIONAIS = REGIONAIS;
  global.GRAUS = GRAUS;
  global.CARGOS_GRAU_I = CARGOS_GRAU_I;

  if (!global.BondeService) global.BondeService = {};
  global.BondeService.REGIONAIS_DIVISOES = REGIONAIS_DIVISOES;
  global.BondeService.REGIONAIS = REGIONAIS;
  global.BondeService.GRAUS = GRAUS;
  global.BondeService.CARGOS_GRAU_I = CARGOS_GRAU_I;
})(typeof window !== "undefined" ? window : globalThis);
