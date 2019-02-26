namespace PagueVelozBlueData
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class EmpresaModels
    {
        public int Id { get; set; }

        public string UF { get; set; }

        public string NomeFantasia { get; set; }

        public string CNPJ { get; set; }
    }
}
