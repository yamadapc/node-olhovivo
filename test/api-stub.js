// Generated with:
//
// var nock = require('nock');
// before(function() { nock.recorder.rec(); });
'use strict';
var nock = require('nock');

nock('http://api.olhovivo.sptrans.com.br:80')
  .post('/v0/Login/Autenticar?token=XXX')
  .reply(200, true, {
    'cache-control': 'no-cache',
    pragma: 'no-cache',
    'content-type': 'application/json; charset=utf-8',
    expires: '-1',
    server: 'Microsoft-IIS/7.5',
    'x-aspnet-version': '4.0.30319',
    'x-powered-by': 'ASP.NET',
    date: 'Wed, 10 Jun 2015 21:01:11 GMT',
    connection: 'close',
    'content-length': '4'
  });

nock('http://api.olhovivo.sptrans.com.br:80')
  .get('/v0/Parada/BuscarParadasPorLinha')
  .reply(404, {
    "Message": "No HTTP resource was found that matches the request URI 'http://api.olhovivo.sptrans.com.br/v0/Parada/BuscarParadasPorLinha?codigoLinha[route_id]=1015-10&codigoLinha[agency_id]=1&codigoLinha[route_short_name]=1015-10&codigoLinha[route_long_name]=Chácara Maria Trindade - Terminal Jd. Britania&codigoLinha[route_type]=3&codigoLinha[route_color]=&codigoLinha[route_text_color]=&codigoLinha[nretries]=0'."
  }, {
    'cache-control': 'no-cache',
    pragma: 'no-cache',
    'content-type': 'application/json; charset=utf-8',
    expires: '-1',
    server: 'Microsoft-IIS/7.5',
    'x-aspnet-version': '4.0.30319',
    'x-powered-by': 'ASP.NET',
    date: 'Wed, 10 Jun 2015 21:01:11 GMT',
    connection: 'close',
    'content-length': '416'
  });

nock('http://api.olhovivo.sptrans.com.br:80')
  .post('/v0/Login/Autenticar?token=XXX')
  .reply(200, true, {
    'cache-control': 'no-cache',
    pragma: 'no-cache',
    'content-type': 'application/json; charset=utf-8',
    expires: '-1',
    server: 'Microsoft-IIS/7.5',
    'x-aspnet-version': '4.0.30319',
    'x-powered-by': 'ASP.NET',
    date: 'Wed, 10 Jun 2015 21:01:11 GMT',
    connection: 'close',
    'content-length': '4'
  });

nock('http://api.olhovivo.sptrans.com.br:80')
  .get('/v0/Linha/Buscar?termosBusca=bandeira')
  .reply(200, [{
    "CodigoLinha": 33479,
    "Circular": true,
    "Letreiro": "2002",
    "Sentido": 2,
    "Tipo": 10,
    "DenominacaoTPTS": "TERM. BANDEIRA",
    "DenominacaoTSTP": "TERM. PQ. D.PEDRO II",
    "Informacoes": null
  }, {
    "CodigoLinha": 711,
    "Circular": true,
    "Letreiro": "2002",
    "Sentido": 1,
    "Tipo": 10,
    "DenominacaoTPTS": "TERM. BANDEIRA",
    "DenominacaoTSTP": "TERM. PQ. D.PEDRO II",
    "Informacoes": null
  }, {
    "CodigoLinha": 33123,
    "Circular": false,
    "Letreiro": "6200",
    "Sentido": 2,
    "Tipo": 10,
    "DenominacaoTPTS": "TERM. BANDEIRA",
    "DenominacaoTSTP": "TERM. SANTO AMARO",
    "Informacoes": null
  }, {
    "CodigoLinha": 355,
    "Circular": false,
    "Letreiro": "6200",
    "Sentido": 1,
    "Tipo": 10,
    "DenominacaoTPTS": "TERM. BANDEIRA",
    "DenominacaoTSTP": "TERM. SANTO AMARO",
    "Informacoes": null
  }, {
    "CodigoLinha": 33236,
    "Circular": false,
    "Letreiro": "6250",
    "Sentido": 2,
    "Tipo": 10,
    "DenominacaoTPTS": "TERM. BANDEIRA",
    "DenominacaoTSTP": "JD. JAQUELINE",
    "Informacoes": null
  }, {
    "CodigoLinha": 468,
    "Circular": false,
    "Letreiro": "6250",
    "Sentido": 1,
    "Tipo": 10,
    "DenominacaoTPTS": "TERM. BANDEIRA",
    "DenominacaoTSTP": "JD. JAQUELINE",
    "Informacoes": null
  }, {
    "CodigoLinha": 1371,
    "Circular": false,
    "Letreiro": "6262",
    "Sentido": 1,
    "Tipo": 10,
    "DenominacaoTPTS": "TERM. BANDEIRA",
    "DenominacaoTSTP": "CEASA",
    "Informacoes": null
  }, {
    "CodigoLinha": 34139,
    "Circular": false,
    "Letreiro": "6262",
    "Sentido": 2,
    "Tipo": 10,
    "DenominacaoTPTS": "TERM. BANDEIRA",
    "DenominacaoTSTP": "CEASA",
    "Informacoes": null
  }, {
    "CodigoLinha": 33126,
    "Circular": false,
    "Letreiro": "6291",
    "Sentido": 2,
    "Tipo": 10,
    "DenominacaoTPTS": "TERM. BANDEIRA",
    "DenominacaoTSTP": "INOCOOP CAMPO LIMPO",
    "Informacoes": null
  }, {
    "CodigoLinha": 358,
    "Circular": false,
    "Letreiro": "6291",
    "Sentido": 1,
    "Tipo": 10,
    "DenominacaoTPTS": "TERM. BANDEIRA",
    "DenominacaoTSTP": "INOCOOP CAMPO LIMPO",
    "Informacoes": null
  }, {
    "CodigoLinha": 34062,
    "Circular": false,
    "Letreiro": "6358",
    "Sentido": 2,
    "Tipo": 10,
    "DenominacaoTPTS": "TERM. BANDEIRA",
    "DenominacaoTSTP": "JD. LUSO",
    "Informacoes": null
  }, {
    "CodigoLinha": 1294,
    "Circular": false,
    "Letreiro": "6358",
    "Sentido": 1,
    "Tipo": 10,
    "DenominacaoTPTS": "TERM. BANDEIRA",
    "DenominacaoTSTP": "JD. LUSO",
    "Informacoes": null
  }, {
    "CodigoLinha": 1295,
    "Circular": false,
    "Letreiro": "6358",
    "Sentido": 1,
    "Tipo": 41,
    "DenominacaoTPTS": "TERM. BANDEIRA",
    "DenominacaoTSTP": "V. IMPERIO",
    "Informacoes": null
  }, {
    "CodigoLinha": 34063,
    "Circular": false,
    "Letreiro": "6358",
    "Sentido": 2,
    "Tipo": 41,
    "DenominacaoTPTS": "TERM. BANDEIRA",
    "DenominacaoTSTP": "V. IMPERIO",
    "Informacoes": null
  }, {
    "CodigoLinha": 1296,
    "Circular": false,
    "Letreiro": "6366",
    "Sentido": 1,
    "Tipo": 10,
    "DenominacaoTPTS": "TERM. BANDEIRA",
    "DenominacaoTSTP": "JD. MIRIAM",
    "Informacoes": null
  }, {
    "CodigoLinha": 34064,
    "Circular": false,
    "Letreiro": "6366",
    "Sentido": 2,
    "Tipo": 10,
    "DenominacaoTPTS": "TERM. BANDEIRA",
    "DenominacaoTSTP": "JD. MIRIAM",
    "Informacoes": null
  }, {
    "CodigoLinha": 57,
    "Circular": false,
    "Letreiro": "6400",
    "Sentido": 1,
    "Tipo": 10,
    "DenominacaoTPTS": "TERMINAL BANDEIRA",
    "DenominacaoTSTP": "TERMINAL JOAO DIAS",
    "Informacoes": null
  }, {
    "CodigoLinha": 32825,
    "Circular": false,
    "Letreiro": "6400",
    "Sentido": 2,
    "Tipo": 10,
    "DenominacaoTPTS": "TERMINAL BANDEIRA",
    "DenominacaoTSTP": "TERMINAL JOAO DIAS",
    "Informacoes": null
  }, {
    "CodigoLinha": 360,
    "Circular": false,
    "Letreiro": "6414",
    "Sentido": 1,
    "Tipo": 10,
    "DenominacaoTPTS": "TERM. BANDEIRA",
    "DenominacaoTSTP": "SOCORRO",
    "Informacoes": null
  }, {
    "CodigoLinha": 33128,
    "Circular": false,
    "Letreiro": "6414",
    "Sentido": 2,
    "Tipo": 10,
    "DenominacaoTPTS": "TERM. BANDEIRA",
    "DenominacaoTSTP": "SOCORRO",
    "Informacoes": null
  }, {
    "CodigoLinha": 33129,
    "Circular": false,
    "Letreiro": "6422",
    "Sentido": 2,
    "Tipo": 10,
    "DenominacaoTPTS": "TERM. BANDEIRA",
    "DenominacaoTSTP": "V. CRUZEIRO",
    "Informacoes": null
  }, {
    "CodigoLinha": 361,
    "Circular": false,
    "Letreiro": "6422",
    "Sentido": 1,
    "Tipo": 10,
    "DenominacaoTPTS": "TERM. BANDEIRA",
    "DenominacaoTSTP": "V. CRUZEIRO",
    "Informacoes": null
  }, {
    "CodigoLinha": 32827,
    "Circular": false,
    "Letreiro": "6450",
    "Sentido": 2,
    "Tipo": 10,
    "DenominacaoTPTS": "TERM. BANDEIRA",
    "DenominacaoTSTP": "TERM. CAPELINHA",
    "Informacoes": null
  }, {
    "CodigoLinha": 59,
    "Circular": false,
    "Letreiro": "6450",
    "Sentido": 1,
    "Tipo": 10,
    "DenominacaoTPTS": "TERM. BANDEIRA",
    "DenominacaoTSTP": "TERM. CAPELINHA",
    "Informacoes": null
  }, {
    "CodigoLinha": 1509,
    "Circular": false,
    "Letreiro": "6450",
    "Sentido": 1,
    "Tipo": 51,
    "DenominacaoTPTS": "TERM. BANDEIRA",
    "DenominacaoTSTP": "VALO VELHO",
    "Informacoes": null
  }, {
    "CodigoLinha": 34277,
    "Circular": false,
    "Letreiro": "6450",
    "Sentido": 2,
    "Tipo": 51,
    "DenominacaoTPTS": "TERM. BANDEIRA",
    "DenominacaoTSTP": "VALO VELHO",
    "Informacoes": null
  }, {
    "CodigoLinha": 32829,
    "Circular": false,
    "Letreiro": "6451",
    "Sentido": 2,
    "Tipo": 10,
    "DenominacaoTPTS": "TERM. BANDEIRA",
    "DenominacaoTSTP": "TERM. CAPELINHA",
    "Informacoes": null
  }, {
    "CodigoLinha": 61,
    "Circular": false,
    "Letreiro": "6451",
    "Sentido": 1,
    "Tipo": 10,
    "DenominacaoTPTS": "TERM. BANDEIRA",
    "DenominacaoTSTP": "TERM. CAPELINHA",
    "Informacoes": null
  }, {
    "CodigoLinha": 34085,
    "Circular": false,
    "Letreiro": "6475",
    "Sentido": 2,
    "Tipo": 10,
    "DenominacaoTPTS": "TERMINAL BANDEIRA",
    "DenominacaoTSTP": "JD. VAZ DE LIMA",
    "Informacoes": null
  }, {
    "CodigoLinha": 1317,
    "Circular": false,
    "Letreiro": "6475",
    "Sentido": 1,
    "Tipo": 10,
    "DenominacaoTPTS": "TERMINAL BANDEIRA",
    "DenominacaoTSTP": "JD. VAZ DE LIMA",
    "Informacoes": null
  }, {
    "CodigoLinha": 32814,
    "Circular": false,
    "Letreiro": "6500",
    "Sentido": 2,
    "Tipo": 10,
    "DenominacaoTPTS": "TERMINAL BANDEIRA",
    "DenominacaoTSTP": "TERMINAL STO. AMARO",
    "Informacoes": null
  }, {
    "CodigoLinha": 46,
    "Circular": false,
    "Letreiro": "6500",
    "Sentido": 1,
    "Tipo": 10,
    "DenominacaoTPTS": "TERMINAL BANDEIRA",
    "DenominacaoTSTP": "TERMINAL STO. AMARO",
    "Informacoes": null
  }, {
    "CodigoLinha": 34218,
    "Circular": false,
    "Letreiro": "6505",
    "Sentido": 2,
    "Tipo": 10,
    "DenominacaoTPTS": "TERM. BANDEIRA",
    "DenominacaoTSTP": "TERM. GUARAPIRANGA",
    "Informacoes": null
  }, {
    "CodigoLinha": 1450,
    "Circular": false,
    "Letreiro": "6505",
    "Sentido": 1,
    "Tipo": 10,
    "DenominacaoTPTS": "TERM. BANDEIRA",
    "DenominacaoTSTP": "TERM. GUARAPIRANGA",
    "Informacoes": null
  }, {
    "CodigoLinha": 1465,
    "Circular": false,
    "Letreiro": "6913",
    "Sentido": 1,
    "Tipo": 10,
    "DenominacaoTPTS": "TERMINAL BANDEIRA",
    "DenominacaoTSTP": "TERMINAL VARGINHA",
    "Informacoes": null
  }, {
    "CodigoLinha": 34233,
    "Circular": false,
    "Letreiro": "6913",
    "Sentido": 2,
    "Tipo": 10,
    "DenominacaoTPTS": "TERMINAL BANDEIRA",
    "DenominacaoTSTP": "TERMINAL VARGINHA",
    "Informacoes": null
  }, {
    "CodigoLinha": 1917,
    "Circular": false,
    "Letreiro": "8605",
    "Sentido": 1,
    "Tipo": 10,
    "DenominacaoTPTS": "TERMINAL BANDEIRA",
    "DenominacaoTSTP": "TERMINAL CAMPO LIMPO",
    "Informacoes": null
  }, {
    "CodigoLinha": 34685,
    "Circular": false,
    "Letreiro": "8605",
    "Sentido": 2,
    "Tipo": 10,
    "DenominacaoTPTS": "TERMINAL BANDEIRA",
    "DenominacaoTSTP": "TERMINAL CAMPO LIMPO",
    "Informacoes": null
  }, {
    "CodigoLinha": 2063,
    "Circular": false,
    "Letreiro": "8610",
    "Sentido": 1,
    "Tipo": 10,
    "DenominacaoTPTS": "TERMINAL BANDEIRA",
    "DenominacaoTSTP": "JD. PAULO VI",
    "Informacoes": null
  }, {
    "CodigoLinha": 34831,
    "Circular": false,
    "Letreiro": "8610",
    "Sentido": 2,
    "Tipo": 10,
    "DenominacaoTPTS": "TERMINAL BANDEIRA",
    "DenominacaoTSTP": "JD. PAULO VI",
    "Informacoes": null
  }, {
    "CodigoLinha": 33674,
    "Circular": false,
    "Letreiro": "2021",
    "Sentido": 2,
    "Tipo": 10,
    "DenominacaoTPTS": "ESTACAO GUAIANAZES",
    "DenominacaoTSTP": "JD. BANDEIRANTES",
    "Informacoes": null
  }, {
    "CodigoLinha": 906,
    "Circular": false,
    "Letreiro": "2021",
    "Sentido": 1,
    "Tipo": 10,
    "DenominacaoTPTS": "ESTACAO GUAIANAZES",
    "DenominacaoTSTP": "JD. BANDEIRANTES",
    "Informacoes": null
  }], {
    'cache-control': 'no-cache',
    pragma: 'no-cache',
    'content-type': 'application/json; charset=utf-8',
    expires: '-1',
    server: 'Microsoft-IIS/7.5',
    'x-aspnet-version': '4.0.30319',
    'x-powered-by': 'ASP.NET',
    date: 'Wed, 10 Jun 2015 21:01:11 GMT',
    connection: 'close',
    'content-length': '7065'
  });

nock('http://api.olhovivo.sptrans.com.br:80')
  .get('/v0/Linha/CarregarDetalhes?codigoLinha=33674')
  .reply(200, [], {
    'cache-control': 'no-cache',
    pragma: 'no-cache',
    'content-type': 'application/json; charset=utf-8',
    expires: '-1',
    server: 'Microsoft-IIS/7.5',
    'x-aspnet-version': '4.0.30319',
    'x-powered-by': 'ASP.NET',
    date: 'Wed, 10 Jun 2015 21:01:11 GMT',
    connection: 'close',
    'content-length': '2'
  });

nock('http://api.olhovivo.sptrans.com.br:80')
  .get('/v0/Parada/Buscar?termosBusca=afonso')
  .reply(200, [{
    "CodigoParada": 340015329,
    "Nome": "AFONSO BRAZ B/C1",
    "Endereco": "R ARMINDA/ R BALTHAZAR DA VEIGA",
    "Latitude": -23.592938,
    "Longitude": -46.672727
  }, {
    "CodigoParada": 340015328,
    "Nome": "AFONSO BRAZ B/C2",
    "Endereco": "R ARMINDA/ R BALTHAZAR DA VEIGA",
    "Latitude": -23.59337,
    "Longitude": -46.672766
  }, {
    "CodigoParada": 340015333,
    "Nome": "AFONSO BRAZ C/B1",
    "Endereco": "R DOUTORA MARIA AUGUSTA SARAIVA/ R NATIVIDADE",
    "Latitude": -23.59572,
    "Longitude": -46.673285
  }, {
    "CodigoParada": 340015331,
    "Nome": "AFONSO BRAZ C/B2",
    "Endereco": "R DOUTORA MARIA AUGUSTA SARAIVA/ R NATIVIDADE",
    "Latitude": -23.595087,
    "Longitude": -46.673152
  }], {
    'cache-control': 'no-cache',
    pragma: 'no-cache',
    'content-type': 'application/json; charset=utf-8',
    expires: '-1',
    server: 'Microsoft-IIS/7.5',
    'x-aspnet-version': '4.0.30319',
    'x-powered-by': 'ASP.NET',
    date: 'Wed, 10 Jun 2015 21:01:11 GMT',
    connection: 'close',
    'content-length': '599'
  });

nock('http://api.olhovivo.sptrans.com.br:80')
  .get('/v0/Parada/BuscarParadasPorLinha?codigoLinha=1272')
  .reply(200, [{
    "CodigoParada": 480012877,
    "Nome": "MARGINAL B/C",
    "Endereco": "AC PONTE DO PIQUERI AV EMB MACEDO SOARES/ R PROFESSORA SURAIA AIDAR MENON",
    "Latitude": -23.511052,
    "Longitude": -46.705493
  }, {
    "CodigoParada": 480012881,
    "Nome": "JOSE MARIA B/C",
    "Endereco": "R BELCHIOR CARNEIRO/ PC SEBASTIAO JAYME PINTO",
    "Latitude": -23.514036,
    "Longitude": -46.702259
  }, {
    "CodigoParada": 640001414,
    "Nome": "PIQUERI B/C",
    "Endereco": "AC A AV OTAVIANO ALVES DE LIMA/ R BENEDITO MONTEIRO",
    "Latitude": -23.50616,
    "Longitude": -46.706061
  }], {
    'cache-control': 'no-cache',
    pragma: 'no-cache',
    'content-type': 'application/json; charset=utf-8',
    expires: '-1',
    server: 'Microsoft-IIS/7.5',
    'x-aspnet-version': '4.0.30319',
    'x-powered-by': 'ASP.NET',
    date: 'Wed, 10 Jun 2015 21:01:11 GMT',
    connection: 'close',
    'content-length': '494'
  });

nock('http://api.olhovivo.sptrans.com.br:80')
  .get('/v0/Corredor')
  .reply(200, [{
    "CodCot": 0,
    "CodCorredor": 8,
    "Nome": "Campo Limpo"
  }, {
    "CodCot": 0,
    "CodCorredor": 9,
    "Nome": "Expresso Tiradentes"
  }, {
    "CodCot": 0,
    "CodCorredor": 3,
    "Nome": "Inajar de Souza"
  }, {
    "CodCot": 0,
    "CodCorredor": 7,
    "Nome": "Parelheiros"
  }, {
    "CodCot": 0,
    "CodCorredor": 1,
    "Nome": "Pirituba"
  }, {
    "CodCot": 0,
    "CodCorredor": 2,
    "Nome": "Santo Amaro"
  }, {
    "CodCot": 0,
    "CodCorredor": 10,
    "Nome": "Paes de Barros"
  }], {
    'cache-control': 'no-cache',
    pragma: 'no-cache',
    'content-type': 'application/json; charset=utf-8',
    expires: '-1',
    server: 'Microsoft-IIS/7.5',
    'x-aspnet-version': '4.0.30319',
    'x-powered-by': 'ASP.NET',
    date: 'Wed, 10 Jun 2015 21:01:11 GMT',
    connection: 'close',
    'content-length': '364'
  });

nock('http://api.olhovivo.sptrans.com.br:80')
  .get('/v0/Posicao?codigoLinha=33674')
  .reply(200, {
    "hr": "18:01",
    "vs": [{
      "p": "36274",
      "a": false,
      "py": -23.544531,
      "px": -46.38983
    }, {
      "p": "36530",
      "a": true,
      "py": -23.538495750000003,
      "px": -46.40091375
    }, {
      "p": "36285",
      "a": true,
      "py": -23.5427495,
      "px": -46.4132915
    }]
  }, {
    'cache-control': 'no-cache',
    pragma: 'no-cache',
    'content-type': 'application/json; charset=utf-8',
    expires: '-1',
    server: 'Microsoft-IIS/7.5',
    'x-aspnet-version': '4.0.30319',
    'x-powered-by': 'ASP.NET',
    date: 'Wed, 10 Jun 2015 21:01:11 GMT',
    connection: 'close',
    'content-length': '199'
  });

nock('http://api.olhovivo.sptrans.com.br:80')
  .get('/v0/Previsao/Linha?codigoLinha=33674')
  .reply(200, {
    "hr": "18:01",
    "ps": []
  }, {
    'cache-control': 'no-cache',
    pragma: 'no-cache',
    'content-type': 'application/json; charset=utf-8',
    expires: '-1',
    server: 'Microsoft-IIS/7.5',
    'x-aspnet-version': '4.0.30319',
    'x-powered-by': 'ASP.NET',
    date: 'Wed, 10 Jun 2015 21:01:11 GMT',
    connection: 'close',
    'content-length': '22'
  });

