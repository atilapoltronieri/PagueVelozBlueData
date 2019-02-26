namespace PagueVelozBlueData
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class FornecedorModels
    {
        public int Id { get; set; }

        public int? IdEmpresa { get; set; }

        public string Nome { get; set; }

        public string CPFCNPJ { get; set; }

        public DateTime? Data { get; set; }

        public string Telefone { get; set; }

        public string RG { get; set; }

        public DateTime? DataNascimento { get; set; }
    }
}
