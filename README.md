node-olhovivo
=============
A node.js wrapper for the SPTrans Olho Vivo API.

## Progress
Wrapped endpoints:
- [x] `POST /Login/Autenticar?token={token}`
- [x] `GET /Linha/Buscar?termosBusca={termosBusca}`
- [ ] `GET /Linha/CarregarDetalhes?codigoLinha={codigoLinha}`
- [ ] `GET /Parada/Buscar?termosBusca={termosBusca}`
- [ ] `GET /Parada/BuscarParadasPorLinha?codigoLinha={codigoLinha}`
- [ ] `GET /Parada/BuscarParadasPorCorredor?codigoCorredor={codigoCorredor}`
- [ ] `GET /Corredor`
- [ ] `GET /Posicao?codigoLinha={codigoLinha}`
- [ ] `GET /Previsao?codigoParada={codigoParada}&codigoLinha={codigoLinha}`
- [ ] `GET /Previsao/Linha?codigoLinha={codigoLinha}`
- [ ] `GET /Previsao/Parada?codigoParada={codigoParada}`

## License
This code is licensed under the MIT license for Pedro Tacla Yamada. For more
information please refer to the [LICENSE](/LICENSE) file.
