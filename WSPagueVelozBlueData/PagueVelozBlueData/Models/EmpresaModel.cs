using PagueVelozBlueData.Util;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;

namespace PagueVelozBlueData.Models
{
    public class EmpresaModel
    {
        [Key]
        [DataMember]
        public int Id { get; set; }
        [DataMember]
        public string UF { get; set; }
        [DataMember]
        public string NomeFantasia { get; set; }
        [DataMember]
        public string CNPJ { get; set; }

        public EmpresaModel()
        {

        }

        public EmpresaModel(int pId, string pUF = "", string pNomeFantasia = "", string pCNPJ = "")
        {
            Id = pId;
            UF = pUF;
            NomeFantasia = pNomeFantasia;
            CNPJ = pCNPJ;
        }
        
        public string ValidaEmpresaModel()
        {
            string retorno = string.Empty;

            if (!ValidadorCNPJCPF.ValidaCNPJ(CNPJ))
                retorno += "CNPJ inválido!; ";

            return retorno;
        }
        
    }
}