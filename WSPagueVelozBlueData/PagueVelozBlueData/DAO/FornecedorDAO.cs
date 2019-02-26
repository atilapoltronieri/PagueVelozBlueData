using PagueVelozBlueData.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Web;

namespace PagueVelozBlueData.DAO
{
    public class FornecedorDAO : DbContext
    {
        public FornecedorDAO() : base("ApplicationServices")
        {

        }
        
        public DbSet<FornecedorModel> Fornecedor { get; set; }

        public FornecedorModel SalvarFornecedor(FornecedorModel pFornecedor)
        {
            var erroValidacao = pFornecedor.ValidaFornecedorModel();

            if (pFornecedor.Data <= DateTime.MinValue)
                pFornecedor.Data = DateTime.Now;
            if (pFornecedor.DataNascimento <= DateTime.MinValue)
                pFornecedor.DataNascimento = new DateTime(1753, 1, 1);

            if (!string.IsNullOrEmpty(erroValidacao))
                throw new Exception(erroValidacao);

            using (var dto = new FornecedorDAO())
            {
                dto.Fornecedor.AddOrUpdate(pFornecedor);
                dto.SaveChanges();
            }

            return pFornecedor;
        }

        public FornecedorModel DeletarFornecedor(FornecedorModel pFornecedor)
        {
            using (var dto = new FornecedorDAO())
            {
                dto.Fornecedor.Attach(pFornecedor);
                dto.Fornecedor.Remove(pFornecedor);
                dto.SaveChanges();
            }

            return pFornecedor;
        }

        public List<FornecedorModel> CarregarTodosFornecedor()
        {
            List<FornecedorModel> listaRetorno = new List<FornecedorModel>();
            using (var dto = new FornecedorDAO())
            {
                var query = from p in dto.Fornecedor
                            orderby p.Nome
                            select p;

                foreach (var Fornecedor in query)
                {
                    listaRetorno.Add(new FornecedorModel(Fornecedor.Id, Fornecedor.IdEmpresa, Fornecedor.Nome, Fornecedor.CPFCNPJ, Fornecedor.Data, Fornecedor.Telefone, Fornecedor.DataNascimento, Fornecedor.RG));
                }
            }

            return listaRetorno;
        }

        public List<FornecedorModel> BuscarFornecedor(FornecedorModel pFornecedorModel)
        {
            List<FornecedorModel> listaRetorno = new List<FornecedorModel>();
            using (var dto = new FornecedorDAO())
            {
                var query = from p in dto.Fornecedor
                            orderby p.Nome
                            where p.Id == 1
                            select p;

                query = FiltarObjeto(Fornecedor, pFornecedorModel);

                foreach (var Fornecedor in query)
                {
                    listaRetorno.Add(new FornecedorModel(Fornecedor.Id, Fornecedor.IdEmpresa, Fornecedor.Nome, Fornecedor.CPFCNPJ, Fornecedor.Data, Fornecedor.Telefone, Fornecedor.DataNascimento, Fornecedor.RG));
                }
            }

            return listaRetorno;
        }

        private IQueryable<FornecedorModel> FiltarObjeto(IQueryable<FornecedorModel> pQuery, FornecedorModel pFornecedorModel)
        {
            if (pFornecedorModel.Id > 0)
                pQuery = pQuery.Where(c => c.Id == pFornecedorModel.Id);
            if (pFornecedorModel.IdEmpresa > 0)
                pQuery = pQuery.Where(c => c.IdEmpresa == pFornecedorModel.IdEmpresa);
            if (!string.IsNullOrEmpty(pFornecedorModel.Nome))
                pQuery = pQuery.Where(c => c.Nome.ToUpper().Contains(pFornecedorModel.Nome.ToUpper()));
            if (!string.IsNullOrEmpty(pFornecedorModel.CPFCNPJ))
                pQuery = pQuery.Where(c => c.CPFCNPJ.ToUpper().Contains(pFornecedorModel.CPFCNPJ.ToUpper()));
            if (pFornecedorModel.Data != DateTime.MinValue)
                pQuery = pQuery.Where(c => c.Data == pFornecedorModel.Data);
            if (!string.IsNullOrEmpty(pFornecedorModel.Telefone))
                pQuery = pQuery.Where(c => c.Telefone.ToUpper().Contains(pFornecedorModel.Telefone.ToUpper()));

            return pQuery;
        }
    }
}