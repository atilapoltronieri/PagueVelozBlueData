namespace PagueVelozBlueData
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Empresa")]
    public partial class Empresa
    {
        public int Id { get; set; }

        [StringLength(20)]
        public string UF { get; set; }

        [StringLength(200)]
        public string NomeFantasia { get; set; }

        [StringLength(15)]
        public string CNPJ { get; set; }
    }
}
