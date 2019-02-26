namespace PagueVelozBlueData
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class PagueVelozBlueDataEDM : DbContext
    {
        public PagueVelozBlueDataEDM()
            : base("name=PagueVelozBlueDataEDM")
        {
        }

        public virtual DbSet<C__MigrationHistory> C__MigrationHistory { get; set; }
        public virtual DbSet<Empresa> Empresa { get; set; }
        public virtual DbSet<EmpresaModels> EmpresaModels { get; set; }
        public virtual DbSet<FornecedorModels> FornecedorModels { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Empresa>()
                .Property(e => e.UF)
                .IsUnicode(false);

            modelBuilder.Entity<Empresa>()
                .Property(e => e.NomeFantasia)
                .IsUnicode(false);

            modelBuilder.Entity<Empresa>()
                .Property(e => e.CNPJ)
                .IsUnicode(false);
        }
    }
}
