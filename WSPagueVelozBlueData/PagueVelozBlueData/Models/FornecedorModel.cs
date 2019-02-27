using PagueVelozBlueData.DAO;
using PagueVelozBlueData.Util;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace PagueVelozBlueData.Models
{
    public class FornecedorModel
    {
        [Key]
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public int IdEmpresa { get; set; }
        [DataMember]
        public string Nome { get; set; }
        [DataMember]
        public string CPFCNPJ { get; set; }
        [DataMember]
        public DateTime Data { get; set; }
        [DataMember]
        public string Telefone { get; set; }
        [DataMember]
        public DateTime DataNascimento { get; set; }
        [DataMember]
        public string RG { get; set; }

        public FornecedorModel()
        {

        }

        public FornecedorModel(int pId)
        {
            Id = pId;
        }

        public FornecedorModel(int pId, int pIdEmpresa, string pNome, string pCPFCNPJ, DateTime pData, string pTelefone, DateTime pDataNascimento, string pRG)
        {
            Id = pId;
            IdEmpresa = pIdEmpresa;
            Nome = pNome;
            CPFCNPJ = pCPFCNPJ;
            Data = pData;
            Telefone = pTelefone;
            DataNascimento = pDataNascimento;
            RG = pRG;
        }

        public string ValidaFornecedorModel(string pUF)
        {
            string retorno = string.Empty;

            if (IdEmpresa <= 0)
                retorno += "É necessário selecionar uma Empresa!";
            if (!ValidadorCNPJCPF.ValidaCNPJ(CPFCNPJ) && !ValidadorCNPJCPF.ValidaCPF(CPFCNPJ))
                retorno += "CPF/CNPJ inválido!";
            if (CPFCNPJ.Length <= 11 && DataNascimento > DateTime.Now.AddYears(-18) && pUF == "PR")
                retorno += "Empresa do Paraná. É necessário possuir mais de 18 anos!";

            return retorno;
        }
    }
}