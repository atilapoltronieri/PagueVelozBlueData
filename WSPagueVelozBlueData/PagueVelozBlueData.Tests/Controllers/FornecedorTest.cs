using Microsoft.VisualStudio.TestTools.UnitTesting;
using PagueVelozBlueData.Models;
using PagueVelozBlueData.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PagueVelozBlueData.Tests.Controllers
{
    [TestClass]
    public class FornecedorTest
    {
        [TestMethod]
        public void Sum()
        {
            Assert.AreEqual(5, 2 + 3);
        }

        [TestMethod]
        public void FornecedorMenorCPNJ()
        {
            FornecedorModel fornecedorModel = new FornecedorModel();
            fornecedorModel.IdEmpresa = 1;
            fornecedorModel.Nome = "Teste";
            fornecedorModel.RG = "11111111111";
            fornecedorModel.CPFCNPJ = "36876527859";
            fornecedorModel.DataNascimento = new DateTime(2008,1,1);
            string retorno = fornecedorModel.ValidaFornecedorModel("PR");
            Assert.AreEqual("Empresa do Paraná. É necessário possuir mais de 18 anos!", retorno);
        }

        [TestMethod]
        public void FornecedorSemEmpresa()
        {
            FornecedorModel fornecedorModel = new FornecedorModel();
            fornecedorModel.Nome = "Teste";
            fornecedorModel.RG = "11111111111";
            fornecedorModel.CPFCNPJ = "36876527859";
            fornecedorModel.DataNascimento = new DateTime(2008, 1, 1);
            string retorno = fornecedorModel.ValidaFornecedorModel("AC");
            Assert.AreEqual("É necessário selecionar uma Empresa!", retorno);
        }

        [TestMethod]
        public void FornecedorCNPJInvalido()
        {
            FornecedorModel fornecedorModel = new FornecedorModel();
            fornecedorModel.IdEmpresa = 1;
            fornecedorModel.Nome = "Teste";
            fornecedorModel.RG = "11111111111";
            fornecedorModel.CPFCNPJ = "33041260065291";
            fornecedorModel.DataNascimento = new DateTime(2008, 1, 1);
            string retorno = fornecedorModel.ValidaFornecedorModel("AC");
            Assert.AreEqual("CPF/CNPJ inválido!", retorno);
        }

        [TestMethod]
        public void FornecedorValido()
        {
            FornecedorModel fornecedorModel = new FornecedorModel();
            fornecedorModel.IdEmpresa = 1;
            fornecedorModel.Nome = "Teste";
            fornecedorModel.RG = "11111111111";
            fornecedorModel.CPFCNPJ = "33041260065290";
            fornecedorModel.DataNascimento = new DateTime(2008, 1, 1);
            string retorno = fornecedorModel.ValidaFornecedorModel("AC");
            Assert.AreEqual(string.Empty, retorno);
        }
    }
}
