var app = angular.module('myApp', ['ui.mask','ngAnimate', 'toaster', 'angularSpinner', 'bsTable']);

app.service('spinnerService', function () {
	this.show = function () {
		document.getElementById('mySpinner').className = "spinner-design"
	},

	this.hide = function () {
		document.getElementById('mySpinner').className = "spinner-design ng-hide"
	}
})

app.controller('fornecedorCtrl', ['$scope', '$http', '$window', '$location', 'toaster', 'spinnerService', function($scope, $http, $window, $location, toaster, spinnerService) {
	
	this.listaFornecedores = [];
	this.localHost = "";
	this.listEmpresa = [];
	
	$scope.carregarFornecedores = function () {
			
		var source = this;
		source.localHost = "http://localhost:33988/api/";
		source.listEmpresa = [];
		source.carregarEmpresa();	
		source.listaFornecedores = [];
		source.listaFornecedoresFiltro = [];
		source.listaFornecedoresShow = [];
		source.filtro = {};
		source.objetoTela = {};
		source.paginacao = {};
		source.paginacao.paginaAtual = 1;
		
		//spinnerService.show();
		
		$http.get(source.localHost + "Fornecedor/CarregarFornecedor")
			.success (function(response){
			 Materialize.toast('Fornecedores Carregadas', 4000, 'green');
			 source.listaFornecedores = JSON.parse(response);
			 for(i = 0; i < source.listaFornecedores.length; i++)	
			 {				 
				source.listaFornecedores[i].Data = new Date(parseInt(source.listaFornecedores[i].Data.slice(6, source.listaFornecedores[i].Data.length -2))).toLocaleDateString();
				source.listaFornecedores[i].EmpresaNome = source.listaEmpresas.find(x => x.Id === source.listaFornecedores[0].IdEmpresa).NomeFantasia;
				if (source.listaFornecedores[i].DataNascimento)
					source.listaFornecedores[i].DataNascimento = new Date(parseInt(source.listaFornecedores[i].DataNascimento.slice(6, source.listaFornecedores[i].DataNascimento.length -2))).toLocaleDateString();				
			 }
			 
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
		source.listaFornecedoresFiltro = source.listaFornecedores;
		
		if (source.filtro.Id != undefined && source.filtro.Id != "")
			source.listaFornecedoresFiltro = Enumerable.from(source.listaFornecedoresFiltro).where(function (x) {return x.Id == source.filtro.Id}).toArray();
		if (source.filtro.Nome != undefined && source.filtro.Nome != "")
			source.listaFornecedoresFiltro = Enumerable.from(source.listaFornecedoresFiltro).where(function (x) {return x.Nome.indexOf(source.filtro.Nome) >= 0}).toArray();
		if (source.filtro.CPFCNPJ != undefined && source.filtro.CPFCNPJ != "")
			source.listaFornecedoresFiltro = Enumerable.from(source.listaFornecedoresFiltro).where(function (x) {return x.CPFCNPJ.indexOf(source.filtro.CPFCNPJ) >= 0}).toArray();
		
		source.aplicarFiltroPaginacao();
	}
	
	$scope.aplicarFiltroPaginacao = function () {
		var source = this;
		
		source.listaFornecedoresShow = source.listaFornecedoresFiltro;
		//spinnerService.show();
		
		source.paginacao.registroInicial = ((source.paginacao.paginaAtual - 1) * 10) + 1;
		if (source.paginacao.paginaAtual * 10 < source.listaFornecedoresShow.length)
			source.paginacao.registroFinal = (source.paginacao.paginaAtual * 10);
		else
			source.paginacao.registroFinal = source.listaFornecedoresShow.length;
		
		source.paginacao.registrosTotais = source.listaFornecedoresShow.length;
		
		source.listaFornecedoresShow = source.listaFornecedoresShow.slice(source.paginacao.registroInicial - 1, source.paginacao.registroFinal)
		
		source.listaFornecedoresShow = Enumerable.from(source.listaFornecedoresShow).orderBy(function (x) { return x.Nome}).thenBy(function (x) { return x.UF}).toArray();
		
		//spinnerService.hide();
	}
	
	$scope.validaProximaPagina = function () {
		
		var source = this;
		
		if (source.paginacao.paginaAtual * 10 < source.listaFornecedoresFiltro.length)
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
		source.listaFornecedoresShow = [];
		source.paginacao.paginaAtual = source.paginacao.paginaAtual + 1;
		source.aplicarFiltroPaginacao();
		
		//spinnerService.hide();
	}
	
	$scope.anteriorPagina = function () {
		
		var source = this;
		//spinnerService.show();
		source.listaFornecedoresShow = [];
		source.paginacao.paginaAtual = source.paginacao.paginaAtual - 1;
		source.aplicarFiltroPaginacao();
		
		//spinnerService.hide();
	}
	
	$scope.validaSalvar = function () {
		
		var source = this;
		
		if (source.objetoTela.EmpresaSelected != undefined &&
			source.objetoTela.Nome != undefined &&
			(source.objetoTela.CPF != undefined || source.objetoTela.CNPJ != undefined))
			if ((source.objetoTela.EmpresaSelected && source.objetoTela.EmpresaSelected.UF==='PR' &&
			source.objetoTela.DataNascimento != undefined) ||
			(!source.objetoTela.EmpresaSelected || source.objetoTela.EmpresaSelected.UF!='PR'))
			if ((source.objetoTela.CPF != undefined && source.objetoTela.RG != undefined) || (source.objetoTela.CNPJ))
				return false;
		
		return true;
	}
	
	$scope.validaAniversario = function() {
		
		var source = this;
		
		if (source.objetoTela.DataNascimento != undefined && source.objetoTela.DataNascimento.length < 10)
		{
			source.objetoTela.DataNascimento = new Date(source.objetoTela.DataNascimento.slice(2, 4) + '/' + source.objetoTela.DataNascimento.slice(0, 2) + '/' + source.objetoTela.DataNascimento.slice(4, 8)).toLocaleDateString();
		}
		return false;
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
	
	$scope.validarCPFCNPJ = function (cnpj) {
		cnpj = cnpj.replace(/[^\d]+/g,'');
 
		if(cnpj == '') return false;
		 
		if (cnpj.length != 14)
			return false;
	 
		// Elimina CPFCNPJs invalidos conhecidos
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
	
	$scope.novoFornecedor = function () {
		
		var source = this;	
		source.objetoTela = {};
	}
	
	$scope.salvarFornecedor = function () {
		
		var source = this;	
		source.validaAniversario();
		var fornecedor = {};
		
		fornecedor.Id = source.objetoTela.Id;
		fornecedor.IdEmpresa = source.objetoTela.EmpresaSelected.Id;
		fornecedor.Nome = source.objetoTela.Nome;
		if (source.objetoTela.CPF != undefined)
			fornecedor.CPFCNPJ = source.objetoTela.CPF;
		else
			fornecedor.CPFCNPJ = source.objetoTela.CNPJ;
		fornecedor.Telefone = source.objetoTela.Telefone;
		if (!fornecedor.Data)
			fornecedor.Data = new Date().toLocaleDateString("en-US");
		else
			fornecedor.Data = new Date(fornecedor.Data).toLocaleDateString("en-US");
		fornecedor.DataNascimento = source.objetoTela.DataNascimento;
		fornecedor.RG = source.objetoTela.RG;
		var fornecedorJson = JSON.stringify(fornecedor);
		
		//spinnerService.show();

		$http.post(source.localHost + "Fornecedor/SalvarFornecedor?fornecedorJson=" + fornecedorJson)
		.success (function(response){
			
			if (fornecedor.Id != undefined && fornecedor.Id != 0)
			{
				source.listaFornecedores = Enumerable.from(source.listaFornecedores).where(function (x) { return x.Id != fornecedor.Id}).toArray();
			}	
			var retorno = JSON.parse(response);
							 
			retorno.Data = new Date(parseInt(retorno.Data.slice(6, retorno.Data.length -2))).toLocaleDateString();
			if (retorno.DataNascimento)
				retorno.DataNascimento = new Date(parseInt(retorno.DataNascimento.slice(6, retorno.DataNascimento.length -2))).toLocaleDateString();				
			 
			retorno.EmpresaNome = source.listaEmpresas.find(x => x.Id === retorno.IdEmpresa).NomeFantasia;
			source.listaFornecedores.push(retorno);
			source.listaFornecedores = Enumerable.from(source.listaFornecedores).orderBy(function (x) { return x.Id }).toArray();
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
	
	$scope.confirmarDeletarFornecedor = function () {
		
		var source = this;	
		
		var fornecedor = {};
		
		fornecedor.Id = source.objetoTela.IdDeletar;
		var fornecedorJson = JSON.stringify(fornecedor);
		
		//spinnerService.show();

		$http.post(source.localHost + "Fornecedor/DeletarFornecedor?fornecedorJson=" + fornecedorJson)
		.success (function(response){
			
			source.listaFornecedores = Enumerable.from(source.listaFornecedores).where(function (x) { return x.Id != fornecedor.Id}).toArray();
						
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
	
	$scope.deletarFornecedor = function (IdDeletar) {
		
		var source = this;
		
		source.objetoTela.IdDeletar = IdDeletar;
	}
	
	$scope.editarFornecedor = function(fornecedor) {
		var source = this;
		source.objetoTela.IdFornecedor = "ID: " + fornecedor.Id;
		source.objetoTela.Id = fornecedor.Id;
		source.objetoTela.IdEmpresa = fornecedor.IdEmpresa;
		source.objetoTela.EmpresaSelected = source.listaEmpresas.find(x => x.Id === source.objetoTela.IdEmpresa);
		source.objetoTela.Nome = fornecedor.Nome;
		if (fornecedor.CPFCNPJ.length > 11)
			source.objetoTela.CNPJ = fornecedor.CPFCNPJ;
		else
			source.objetoTela.CPF = fornecedor.CPFCNPJ;
		source.objetoTela.Telefone = fornecedor.Telefone;
		source.objetoTela.Data = fornecedor.Data;
		source.objetoTela.DataNascimento = fornecedor.DataNascimento;
		source.objetoTela.RG = fornecedor.RG;
	}
	
	$scope.carregarEmpresa = function() {
		var source = this;
				
		$http.get(source.localHost + "Empresa/CarregarEmpresa")
			.success (function(response){
			 source.listaEmpresas = JSON.parse(response);
			 
			 for (i = 0; i < source.listaEmpresas.length; i++)
			 {
				 source.listEmpresa.push({Id: source.listaEmpresas[i].Id, label: source.listaEmpresas[i].NomeFantasia, UF:source.listaEmpresas[i].UF });
			 }
			 $('select').material_select('destroy');
			 $('select').material_select();
		 })
		.error(function(response){			
			 Materialize.toast(response, 4000, 'red');
		 })
		.finally (function () {
		});
	}
	
	$scope.carregarFornecedores();
}])
