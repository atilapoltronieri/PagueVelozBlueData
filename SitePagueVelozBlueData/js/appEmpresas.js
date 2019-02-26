var app = angular.module('myApp', ['ui.mask','ngAnimate', 'toaster', 'angularSpinner', 'bsTable']);

app.service('spinnerService', function () {
	this.show = function () {
		document.getElementById('mySpinner').className = "spinner-design"
	},

	this.hide = function () {
		document.getElementById('mySpinner').className = "spinner-design ng-hide"
	}
})

app.controller('empresaCtrl', ['$scope', '$http', '$window', '$location', 'toaster', 'spinnerService', function($scope, $http, $window, $location, toaster, spinnerService) {
	
	this.listaEmpresas = [];
	this.listaUF = [];
	this.localHost = "";
	
	$scope.carregarEmpresas = function () {
			
		var source = this;	
		source.localHost = "http://localhost:33988/api/";
		source.listaEmpresas = [];
		source.listaEmpresasFiltro = [];
		source.listaEmpresasShow = [];
		source.filtro = {};
		source.objetoTela = {};
		source.paginacao = {};
		source.paginacao.paginaAtual = 1;
		source.carregarUF();
		
		//spinnerService.show();
		
		$http.get(source.localHost + "Empresa/CarregarEmpresa")
			.success (function(response){
			 Materialize.toast('Empresas Carregadas', 4000, 'green');
			 source.listaEmpresas = JSON.parse(response);
			 source.aplicarFiltro();
		 })
		.error(function(response){			
			 Materialize.toast(response, 4000, 'red');
		 })
		.finally (function () {
		});
	}
	
	$scope.aplicarFiltro = function() {
		var source = this;		
		source.paginacao.paginaAtual = 1;
		source.listaEmpresasFiltro = source.listaEmpresas;
		
		if (source.filtro.Id != undefined && source.filtro.Id != "")
			source.listaEmpresasFiltro = Enumerable.from(source.listaEmpresasFiltro).where(function (x) {return x.Id == source.filtro.Id}).toArray();
		if (source.filtro.NomeFantasia != undefined && source.filtro.NomeFantasia != "")
			source.listaEmpresasFiltro = Enumerable.from(source.listaEmpresasFiltro).where(function (x) {return x.NomeFantasia.indexOf(source.filtro.NomeFantasia) >= 0}).toArray();
		if (source.filtro.CNPJ != undefined && source.filtro.CNPJ != "")
			source.listaEmpresasFiltro = Enumerable.from(source.listaEmpresasFiltro).where(function (x) {return x.CNPJ.indexOf(source.filtro.CNPJ) >= 0}).toArray();
		
		source.aplicarFiltroPaginacao();
	}
	
	$scope.aplicarFiltroPaginacao = function () {
		var source = this;
		
		source.listaEmpresasShow = source.listaEmpresasFiltro;
		//spinnerService.show();
		
		source.paginacao.registroInicial = ((source.paginacao.paginaAtual - 1) * 10) + 1;
		if (source.paginacao.paginaAtual * 10 < source.listaEmpresasShow.length)
			source.paginacao.registroFinal = (source.paginacao.paginaAtual * 10);
		else
			source.paginacao.registroFinal = source.listaEmpresasShow.length;
		
		source.paginacao.registrosTotais = source.listaEmpresasShow.length;
		
		source.listaEmpresasShow = source.listaEmpresasShow.slice(source.paginacao.registroInicial - 1, source.paginacao.registroFinal)
		
		source.listaEmpresasShow = Enumerable.from(source.listaEmpresasShow).orderBy(function (x) { return x.NomeFantasia}).thenBy(function (x) { return x.UF}).toArray();
		
		//spinnerService.hide();
	}
	
	$scope.validaProximaPagina = function () {
		
		var source = this;
		
		if (source.paginacao.paginaAtual * 10 < source.listaEmpresasFiltro.length)
			return false;
		
		return true;
	}
	
	$scope.validaAnteriorPagina = function () {
		
		var source = this;
		
		if (source.paginacao.paginaAtual > 1)
			return false;
		
		return true;
	}
	
	$scope.proximaPagina = function () {
		
		var source = this;
		//spinnerService.show();
		source.listaEmpresasShow = [];
		source.paginacao.paginaAtual = source.paginacao.paginaAtual + 1;
		source.aplicarFiltroPaginacao();
		
		//spinnerService.hide();
	}
	
	$scope.anteriorPagina = function () {
		
		var source = this;
		//spinnerService.show();
		source.listaEmpresasShow = [];
		source.paginacao.paginaAtual = source.paginacao.paginaAtual - 1;
		source.aplicarFiltroPaginacao();
		
		//spinnerService.hide();
	}
	
	$scope.validaSalvar = function () {
		
		var source = this;
		
		if (source.objetoTela.UFSelected != undefined &&
			source.objetoTela.NomeFantasia != undefined &&
			source.objetoTela.CNPJ != undefined && 
			!source.validarCNPJ(source.objetoTela.CNPJ)
		)		
		return false;
		
		return true;
	}
	
	$scope.validaCPF = function (cpf) {
		
		var source = this;
		
		var numeros, digitos, soma, i, resultado, digitos_iguais;
		digitos_iguais = 1;
		if (cpf.length < 11)
			  return false;
		for (i = 0; i < cpf.length - 1; i++)
			  if (cpf.charAt(i) != cpf.charAt(i + 1))
					{
					digitos_iguais = 0;
					break;
					}
		if (!digitos_iguais)
			  {
			  numeros = cpf.substring(0,9);
			  digitos = cpf.substring(9);
			  soma = 0;
			  for (i = 10; i > 1; i--)
					soma += numeros.charAt(10 - i) * i;
			  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
			  if (resultado != digitos.charAt(0))
					return false;
			  numeros = cpf.substring(0,10);
			  soma = 0;
			  for (i = 11; i > 1; i--)
					soma += numeros.charAt(11 - i) * i;
			  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
			  if (resultado != digitos.charAt(1))
					return false;
			  return true;
			  }
		else {
			source.objetoTela.cpf = "";
			Materialize.toast("CPF Inválido.", 4000, 'green');
			return false;			
		}
	}
	
	$scope.validarCNPJ = function (cnpj) {
		cnpj = cnpj.replace(/[^\d]+/g,'');
 
		if(cnpj == '') return false;
		 
		if (cnpj.length != 14)
			return false;
	 
		// Elimina CNPJs invalidos conhecidos
		if (cnpj == "00000000000000" || 
			cnpj == "11111111111111" || 
			cnpj == "22222222222222" || 
			cnpj == "33333333333333" || 
			cnpj == "44444444444444" || 
			cnpj == "55555555555555" || 
			cnpj == "66666666666666" || 
			cnpj == "77777777777777" || 
			cnpj == "88888888888888" || 
			cnpj == "99999999999999")
        return false;
         
		// Valida DVs
		tamanho = cnpj.length - 2
		numeros = cnpj.substring(0,tamanho);
		digitos = cnpj.substring(tamanho);
		soma = 0;
		pos = tamanho - 7;
		for (i = tamanho; i >= 1; i--) {
		  soma += numeros.charAt(tamanho - i) * pos--;
		  if (pos < 2)
				pos = 9;
		}
		resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
		if (resultado != digitos.charAt(0))
			return false;
			 
		tamanho = tamanho + 1;
		numeros = cnpj.substring(0,tamanho);
		soma = 0;
		pos = tamanho - 7;
		for (i = tamanho; i >= 1; i--) {
		  soma += numeros.charAt(tamanho - i) * pos--;
		  if (pos < 2)
				pos = 9;
		}
		resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
		if (resultado != digitos.charAt(1))
			  return false;
			   
		// return true;
	}
	
	$scope.novoEmpresa = function () {
		
		var source = this;	
		source.objetoTela = {};
	}
	
	$scope.salvarEmpresa = function () {
		
		var source = this;	
		
		var empresa = {};
		
		empresa.Id = source.objetoTela.Id;
		empresa.UF = source.objetoTela.UFSelected.id;
		empresa.NomeFantasia = source.objetoTela.NomeFantasia;
		empresa.CNPJ = source.objetoTela.CNPJ;
		var empresaJson = JSON.stringify(empresa);
		
		//spinnerService.show();

		$http.post(source.localHost + "Empresa/SalvarEmpresa?empresaJson=" + empresaJson)
		.success (function(response){
			
			if (empresa.Id != undefined && empresa.Id != 0)
			source.listaEmpresas = Enumerable.from(source.listaEmpresas).where(function (x) { return x.Id != empresa.Id}).toArray();
					
			source.listaEmpresas.push(JSON.parse(response));
			source.listaEmpresas = Enumerable.from(source.listaEmpresas).orderBy(function (x) { return x.Id }).toArray();
			Materialize.toast("Registro Incluído com Sucesso.", 4000, 'green');
						
			source.aplicarFiltro();
		 })
		.error(function(response){
			 Materialize.toast(response, 4000, 'red');
			 //toaster.pop('error', "Login", response);
		 })
		.finally (function () {
			//spinnerService.hide();
		});
	}
	
	$scope.confirmarDeletarEmpresa = function () {
		
		var source = this;	
		
		var empresa = {};
		
		empresa.Id = source.objetoTela.IdDeletar;
		var empresaJson = JSON.stringify(empresa);
		
		//spinnerService.show();

		$http.post(source.localHost + "Empresa/DeletarEmpresa?empresaJson=" + empresaJson)
		.success (function(response){
			
			source.listaEmpresas = Enumerable.from(source.listaEmpresas).where(function (x) { return x.Id != empresa.Id}).toArray();
						
			Materialize.toast("Registro Deletado com Sucesso.", 4000, 'green');
			
			source.aplicarFiltro();
		 })
		.error(function(response){
			 Materialize.toast(response, 4000, 'red');
		 })
		.finally (function () {
			//spinnerService.hide();
		});
	}
	
	$scope.deletarEmpresa = function (IdDeletar) {
		
		var source = this;
		
		source.objetoTela.IdDeletar = IdDeletar;
	}
	
	$scope.editarEmpresa = function(empresa) {
		var source = this;
		
		source.objetoTela.IdEmpresa = "ID: " + empresa.Id;
		source.objetoTela.Id = empresa.Id;
		source.objetoTela.UF = empresa.UF;
		source.objetoTela.NomeFantasia = empresa.NomeFantasia;
		source.objetoTela.CNPJ = empresa.CNPJ;
		source.objetoTela.UFSelected = source.listaUF.find(x => x.id === source.objetoTela.UF);
	}
	
	$scope.carregarUF = function(){
		var source = this;
		
		source.listaUF = [
		{ id : 'AC', label : 'Acre'},
		{ id : 'AL', label : 'Alagoas'},
		{ id : 'AP', label : 'Amapá'},
		{ id : 'AM', label : 'Amazonas'},
		{ id : 'BA', label : 'Bahia'},
		{ id : 'CE', label : 'Ceará'},
		{ id : 'DF', label : 'Distrito Federal'},
		{ id : 'ES', label : 'Espírito Santo'},
		{ id : 'GO', label : 'Goiás'},
		{ id : 'MA', label : 'Maranhão'},
		{ id : 'MT', label : 'Mato Grosso'},
		{ id : 'MS', label : 'Mato Grosso do Sul'},
		{ id : 'MG', label : 'Minas Gerais'},
		{ id : 'PA', label : 'Pará'},
		{ id : 'PB', label : 'Paraíba'},
		{ id : 'PR', label : 'Paraná'},
		{ id : 'PE', label : 'Pernambuco'},
		{ id : 'PI', label : 'Piauí'},
		{ id : 'RJ', label : 'Rio de Janeiro'},
		{ id : 'RN', label : 'Rio Grande do Norte'},
		{ id : 'RS', label : 'Rio Grande do Sul'},
		{ id : 'RO', label : 'Rondônia'},
		{ id : 'RR', label : 'Roraima'},
		{ id : 'SC', label : 'Santa Catarina'},
		{ id : 'SP', label : 'São Paulo'},
		{ id : 'SE', label : 'Sergipe'},
		{ id : 'TO', label : 'Tocantins'}];
	}
	
	$scope.carregarEmpresas();
}])
